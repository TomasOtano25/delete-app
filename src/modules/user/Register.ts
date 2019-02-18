import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import * as bcrypt from "bcryptjs";

import User from "../../entity/User";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, { name: "helloWorld", nullable: true })
  async hello() {
    return "Hello World!";
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName ? parent.firstName : ""} ${
      parent.lastName ? parent.lastName : ""
    }`.trim();
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName", { nullable: true }) firstName: string,
    @Arg("lastName", { nullable: true }) lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      isActive: true,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
