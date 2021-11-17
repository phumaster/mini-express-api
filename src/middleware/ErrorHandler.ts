import { Request, Response, NextFunction } from "express";

import HttpException from "../exceptions/HttpException";

const ErrorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;
  response.status(status).send(error);
};

export default ErrorHandler;
