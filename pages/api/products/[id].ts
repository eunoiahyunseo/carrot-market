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
  // id -> string / string[] cause of dynamic routing
  const { id } = req.query;

  const product = await client.product.findUnique({
    where: { id: +id.toString() },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

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

  console.log(relatedProducts);
  res.json({ ok: true, product, relatedProducts });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
