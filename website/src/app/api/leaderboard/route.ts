import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message: string;
}

const GET = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  res.status(200).json({ message: "Hello World" });
};

export { GET };
