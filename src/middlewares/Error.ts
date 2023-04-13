import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";

class Error {
  error(
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const statusCode = error.statusCode ?? 500;
    console.log(error);
    const message = error.statusCode ? error.message : "Internal Server Error";
    return res.status(statusCode).json({ message });
  }
}
export default new Error();
