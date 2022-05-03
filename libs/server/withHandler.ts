import type {
  NextApiRequest,
  NextApiResponse,
} from "next/types";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => void
) {
  // 우리가 NexJS에서 실행할 함수를 return해야 합니다.
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  };
}
