import mongoose from "mongoose";
import { hash } from "bcryptjs";
import User from "../../../modals/User";
import {
  errorHandler,
  getValue,
  responseHandler,
  validateUser,
} from "../../../utils/common";
import { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../modals/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { bookItems, emailId } = req.body;
      const promises = [];
      const user = await User.findOne({ email: emailId });
      for (let i = 0; i < bookItems.length; i++) {
        const order = new Order();
        order.userId = user._id.toString();
        order.bookId = bookItems[i]._id;
        order.price = bookItems[i].price;
        order.quantity = bookItems[i].quantity;
        const priomise = order.save();
        promises.push(priomise);
      }
      const data = await Promise.all(promises);
      const orderIds = data.map((data1) => data1._id);
      const user1 = await User.findByIdAndUpdate(
        user._id,
        { $push: { orderedItems: { $each: orderIds } } },
        { new: true }
      );
      res.status(200).json(user1);
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  } else {
    errorHandler("Invalid Request Type", res);
  }
}
