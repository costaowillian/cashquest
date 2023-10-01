import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { httpStatusCode } from "../controllers/protocols";

export const chectToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(httpStatusCode.UNAUTHORIZED).json({ Error: "Access denied!" });

  try {
    const secret = process.env.SECRET ?? "";

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(httpStatusCode.BAD_REQUEST).json({ Error: "The Token is invalid!" });
  }
};
