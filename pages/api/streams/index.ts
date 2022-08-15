import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    session: { user },
    body: { name, price, description },
    query: { page },
  } = req as any;

  if (req.method === "GET") {
    let streams: any = await client.stream.findMany({
      skip: (+page - 1) * 10,
      take: 10,
    });

    const addedStreams = await Promise.all(
      streams.map(async (stream: any) =>
        fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFARE_ACCOUNT_ID}/stream/live_inputs/${stream.cloudflareId}/videos`,
          {
            headers: {
              "X-Auth-Email": "heart20021010@gmail.com",
              "X-Auth-Key": process.env
                .CLOUDFLARE_GLOBAL_TOKEN as string,
            },
          }
        )
      )
    );

    let resultStreams: any = await Promise.all(
      addedStreams.map((stream) => stream.json())
    );

    streams = streams.map((stream: any, index: number) => ({
      ...stream,
      uid: resultStreams[index].result[
        resultStreams[index].result.length - 1
      ].uid,
    }));

    console.log(streams);

    res.json({
      ok: true,
      streams,
    });
  } else if (req.method === "POST") {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFARE_ACCOUNT_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFARE_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10 } }`,
        }
      )
    ).json();
    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.json({ ok: true, stream });
  }
  res.json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
