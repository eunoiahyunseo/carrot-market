import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";
import { User } from "@prisma/client";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { id },
    session: { user },
  } = req;

  // 이미 현재 사용자가 해당 상품에 좋아요를 한 기록이 있다면?
  const alreadyEx = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });

  if (alreadyEx) {
    // delete
    await client.fav.delete({
      where: {
        id: alreadyEx.id,
      },
    });
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({ ok: true });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
