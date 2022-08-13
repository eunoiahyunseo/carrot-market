import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";
import { reqType } from "pages/api/posts/[id]/wonder";

const handler: NextApiHandler = async (req, res) => {
  // id -> string / string[] cause of dynamic routing
  const {
    query: { id },
    session: { user },
  } = req as reqType;

  const product = await client.product.findUnique({
    where: { id: +id.toString() },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // 현재 상품의 이름을 공백을 기준으로 분리해
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  /**
   * [
   *  {
   *    name: {
   *      contains: "Galaxy"
   *    }
   *  },
   *  {
   *    name: {
   *      contains: "S22"
   *    }
   *  }
   * ]
   */
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  const isLiked = Boolean(
    await client.fav.findFirst({
      // fav의 productId중에 product.id가 있는지 없는지 체크
      where: {
        productId: product?.id,
        userId: user?.id,
      },
    })
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
