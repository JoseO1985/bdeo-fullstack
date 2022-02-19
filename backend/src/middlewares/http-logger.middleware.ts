import { NextFunction, Request, Response } from 'express';
import catchAsync from '../util/catchAsync';
import * as httpLogger from '../services/http-logger.service';


export const log = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const requestData = {
    method: req.method,
    headers: JSON.stringify(req.headers),
    url: req.url,
    body: req.body, 
    query: req.query,
    params: req.params,
    xForwardedFor: req.headers['x-forwarded-for'] as string,
    remoteAddress: req.socket.remoteAddress
  };

  await httpLogger.logRequest(requestData);
  next();
});
