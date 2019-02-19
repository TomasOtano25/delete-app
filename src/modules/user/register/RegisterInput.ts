import { InputType, Field } from "type-graphql";
import { IsEmail, Length, MinLength } from "class-validator";

import { IsEmailAlreayExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
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

  @Field()
  @MinLength(4)
  password: string;
}
