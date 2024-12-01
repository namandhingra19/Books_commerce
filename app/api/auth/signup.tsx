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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { fullname, email, password } = req.body;
      const payload = { email, password };
      const response_validate = validateUser({ email, password, fullname });
      if (response_validate.error) {
        throw getValue(
          response_validate.error,
          ["details", "0", "message"],
          "Error in form"
        );
      }

      const rest = await User.findOne({ email: email });
      if (rest) throw "Email already present";

      const newUser = new User({
        email,
        password: await hash(password, 12),
        name: fullname,
      });
      const response_save = await newUser.save();
      if (response_save != null) {
        const _user = response_save._doc;
        delete _user.password;
        responseHandler(_user, res);
      } else {
        throw "Something went wrong";
      }
    } catch (err) {
      errorHandler(err, res);
    }
  } else {
    errorHandler("Invalid Request Type", res);
  }
}
