import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    await res.revalidate("/community");

    res.json({
      ok: true,
      post,
    });
  }

  if (req.method === "GET") {
    console.log(req.query);
    const {
      query: { latitude, longitude },
    } = req;
    // @ts-ignore
    const parsedLatitude = parseFloat(latitude.toString());
    // @ts-ignore
    const parsedLongitude = parseFloat(longitude.toString());
    // 질문에, 질문자의 정보가 필요함
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answers: true,
          },
        },
      },
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
    });
    res.json({ ok: true, posts });
  }
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
