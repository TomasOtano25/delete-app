import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./customAuthChecker";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import {
  CreateUserResolver,
  CreateMovieResolver
} from "../modules/user/CreateUser";

export const createSchema = () =>
  buildSchema({
    // resolvers: [__dirname + "/../modules/*/*.ts"],
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreateMovieResolver
    ],
    authChecker: customAuthChecker
  });