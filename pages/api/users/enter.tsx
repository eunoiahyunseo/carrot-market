import client from "@libs/client/client";
import type { Prisma } from "@prisma/client";
import withHandler from "@libs/server/withHandler";
import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from "next";

interface reqDataType {
  email?: string;
  phone?: string;
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, phone }: reqDataType = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const token = await client.token.create({
    data: {
      payload: "1231231231",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "Anonymous",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);

  res.status(200).end();
};

export default withHandler("POST", handler);
