import mongoose from 'mongoose';
import { HttpRequestDocument } from '../interfaces/request';

const requestSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    method: String,
    headers: String,
    url: String,
    ip:  String,
    data: {
      body: String,
      query: String,
      params: String
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      }
    }
  }
);

export const HttpRequest = mongoose.model<HttpRequestDocument>('HttpRequest', requestSchema, 'http_requests');
