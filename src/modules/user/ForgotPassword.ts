import { Resolver, Mutation, Arg } from "type-graphql";
import { v4 } from "uuid";

import { sendEmail } from "../../utils/sendEmail";
import { redis } from "../../redis";
import User from "../../entity/User";
import { forgotPasswordPrefix } from "../constants/redisPrefix";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true; // Poner a revision
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day

    await sendEmail(
      email,
      `${process.env.FRONTEND_URL}/user/change-password/${token}`
    );

    return true;
  }
}
