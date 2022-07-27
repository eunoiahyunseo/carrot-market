import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler: NextApiHandler<ResponseType> = async (
  req,
  res
) => {
  // GET은 SWR을 통해서 모든 상품들의 목록을 조회하는 과정이다.
  if (req.method === "GET") {
    const products = await client.product.findMany({
      include: {
        favs: true,
      },
    });
    // console.log(products);
    res.json({
      ok: true,
      products,
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        // 이미지는 나중에 수정이 필요함
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      product,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
