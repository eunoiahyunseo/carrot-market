import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from "next/types";

type MethodType = "GET" | "POST" | "DELETE";
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type HandlerType = {
  (
    method: MethodType,
    handler: NextApiHandler<ResponseType>
  ): NextApiHandler;
};

const withHandler: HandlerType = (method, handler) => {
  return async function (req, res) {
    if (req.method !== method) {
      res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};

export default withHandler;
