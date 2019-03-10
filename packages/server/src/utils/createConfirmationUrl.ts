import { v4 } from "uuid";
import { redis } from "../redis";
import { confirmUserPrefix } from "../modules/constants/redisPrefix";

export const createConfirmationUrl = async (
  userId: number
): Promise<string> => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day

  return `${process.env.FRONTEND_URL}/user/confirm/${token}`;
};
