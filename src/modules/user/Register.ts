import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";

import User from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";

// @Resolver(User)
@Resolver()
export class RegisterResolver {
  // @Authorized()
  @UseMiddleware(isAuth, logger)
  @Query(() => String, { name: "helloWorld", nullable: true })
  async hello() {
    return "Hello World!";
  }

  // @FieldResolver()
  // async name(@Root() parent: User) {
  //   const { firstName, lastName } = parent;

  //   return firstName || lastName
  //     ? `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim()
  //     : null;
  // }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      isActive: true,
      email,
      password: hashedPassword
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
