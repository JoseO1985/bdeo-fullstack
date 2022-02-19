import { Document } from 'mongoose';

export interface RequestData {
  method: string;
  headers: string;
  url: string;
  body: any;
  query: any;
  params: any;
  xForwardedFor: string;
  remoteAddress: string;
}

export interface HttpRequestDocument extends Document {
  date: Date;
  method: string;
  headers: string;
  url: string;
  ip: string;
  data: {
    body?: string;
    query?: string;
    params?: string;
  }
};
