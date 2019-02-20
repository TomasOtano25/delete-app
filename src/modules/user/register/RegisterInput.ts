import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { IsEmailAlreayExist } from "./isEmailAlreadyExist";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field(() => String, { nullable: true })
  @Length(0, 255)
  firstName?: string;

  @Field(() => String, { nullable: true })
  @Length(0, 255)
  lastName?: string;

  @Field()
  @IsEmail()
  @IsEmailAlreayExist({ message: "email already in use" })
  email: string;

  // @Field()
  // @Min(5)
  // password: string;
}
