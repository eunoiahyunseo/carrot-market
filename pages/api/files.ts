import withHandler from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // https://developers.cloudflare.com/images/cloudflare-images/upload-images/direct-creator-upload/
  // Direct Creator Upload
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFARE_IMAGE_TOKEN}`,
        },
      }
    )
  ).json();

  console.log("image response >> ", response);

  res.json({
    ok: true,
    ...response.result,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
