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
import { signIn } from "next-auth/react";
import { Books } from "../../../modals/Books";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const books = await Books.find().limit(80);
      res.status(200).json(books);
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  } else {
    errorHandler("Invalid Request Type", res);
  }
}
