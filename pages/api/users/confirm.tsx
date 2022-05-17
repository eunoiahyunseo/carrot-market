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
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: {
      user: true,
    },
  });

  if (!foundToken) return res.status(404).end() as any;

  req.session.user = {
    id: foundToken.userId,
  };

  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  res.json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
