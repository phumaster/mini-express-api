import { Request, Response } from 'express';

const TestController = {
  test(req: Request, res: Response) {
    res.send("Hello")
  }
};

export default TestController;
