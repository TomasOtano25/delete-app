import { InputType, Field, ClassType } from "type-graphql";
import { Min } from "class-validator";

// @InputType()
// export class PasswordInput {
//   @Field()
//   @Min(5)
//   password: string;
// }

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @Min(5)
    password: string;
  }
  return PasswordInput;
};
