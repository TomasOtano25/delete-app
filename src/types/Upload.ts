import { Stream } from "stream";

export interface Upload {
  filename: string;
  nimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
