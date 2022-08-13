import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";
import { reqType } from "pages/api/posts/[id]/wonder";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { id },
    session: { user },
  } = req as reqType;

  // const stream = await client.stream.findUnique({
  //   where: {
  //     id: +id.toString(),
  //   },
  //   select: {
  //     id: true,
  //     createdAt: true,
  //     updatedAt: true,
  //     name: true,
  //     description: true,
  //     price: true,
  //     userId: true,
  //     cloudflareId: true,
  //     messages: {
  //       select: {
  //         id: true,
  //         message: true,
  //         user: {
  //           select: {
  //             avatar: true,
  //             id: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });
  const isOwner = stream?.userId === user?.id;

  if (stream && !isOwner) {
    stream.cloudflareKey = "xxxxx";
    stream.cloudflareUrl = "xxxxx";
  }

  res.json({
    ok: true,
    // stream: iwOwner ? ownedStream : stream,
    stream,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
