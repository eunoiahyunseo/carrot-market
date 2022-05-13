import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import twilio from "twilio";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

interface reqDataType {
  email?: string;
  phone?: string;
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, phone }: reqDataType = req.body;
  const user = phone
    ? { phone: +phone }
    : email
    ? { email }
    : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(10000 + Math.random() * 90000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      // 원래라면 phone으로 보내야 하지만 -> dev process에서는 그냥 내 폰으로
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });

    console.log(message);
  } else if (email) {
    const email = await mail.send({
      from: "heart20021010@gmail.com",
      to: "dhdbswl021010@naver.com",
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email);
  }

  res.status(200).json({ ok: true });
};

export default withHandler("POST", handler);
