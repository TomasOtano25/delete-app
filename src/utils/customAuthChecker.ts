import { AuthChecker } from "type-graphql";
import { MyContext } from "../types/MyContext";

import User from "../entity/User";

export const customAuthChecker: AuthChecker<MyContext> = async (
  { context: { req } },
  roles
) => {
  if (roles.length === 0) {
    // return req.session!.userId !== undefined;
    return !!req.session!.userId;
  }

  const user = await User.findOne(req.session!.userId);

  if (!user) return false;

  if (user.roles.some(role => roles.includes(role))) {
    return true;
  }

  return false; // or false if access denied
};
