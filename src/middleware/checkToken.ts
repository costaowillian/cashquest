import * as jwt from "jsonwebtoken";
import { serverError } from "../controllers/helpers";
import { Request, Response, NextFunction } from "express";

export const chectToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET ?? "";

    jwt.verify(token, secret);

    next();
  } catch (err) {
    return serverError("03");
  }
};
