import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from "next/types";

type method = "GET" | "POST" | "DELETE";

type MethodType = method[];

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
interface ConfigType {
  methods: MethodType;
  handler: NextApiHandler<ResponseType>;
  isPrivate?: boolean;
}

type HandlerType = {
  (config: ConfigType): NextApiHandler;
};

const withHandler: HandlerType = ({
  methods,
  handler,
  isPrivate = true,
}) => {
  return async function (req, res): Promise<any> {
    if (req.method && !methods.includes(req.method as method)) {
      res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, error: "Plz log in." });
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
