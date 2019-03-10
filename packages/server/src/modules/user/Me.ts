import { Resolver, Ctx, Query } from "type-graphql";

import User from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext): Promise<User | null | undefined> {
    if (!context.req.session!.userId) {
      return null;
    }

    return User.findOne(context.req.session!.userId);
  }
}
