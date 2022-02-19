import { HttpRequest } from '../models/request';
import { RequestData } from '../interfaces/request';

const getIp = (xForwardedFor: string, remoteAddress: string) => xForwardedFor || remoteAddress;

export const logRequest = (requestData: RequestData) => {
  const ip = getIp(requestData.xForwardedFor, requestData.remoteAddress);
  const httpRequest = new HttpRequest({
    date: Date.now(),
    method: requestData.method,
    headers: requestData.headers,
    url: requestData.url,
    ip: ip,
    data: {
      body: JSON.stringify({body: requestData.body }),
      query: JSON.stringify({query: requestData.query }),
      params: JSON.stringify({params: requestData.params })
    }
  });
  return httpRequest.save();
}