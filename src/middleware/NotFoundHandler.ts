import { Request, Response, NextFunction } from "express";

const NotFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = "Resource not found";
  response.status(404).send(message);
};

export default NotFoundHandler;

