import { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../modals/Order";
import {
  errorHandler
} from "../../../utils/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const orders = await Order.find({}).populate(["bookId", "userId"]);
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  } else {
    errorHandler("Invalid Request Type", res);
  }
}
