import {
  Arg,
  ClassType,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware
} from "type-graphql";
import Movie from "../../entity/Movie";
import User from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { Middleware } from "type-graphql/interfaces/Middleware";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  // @Resolver({ isAbstract: true })
  // abstract class BaseResolver {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: any): Promise<T> {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class MovieInput {
  @Field()
  name: string;
}

// const BaseCreateUser = createResolver("User", User, RegisterInput, User);
// const BaseCreateMovie = createResolver("Movie", Movie, MovieInput, Movie);

// @Resolver()
// export class CreateUserResolver extends BaseCreateUser {
//   // @Mutation(() => User)
//   // async createUser(@Arg("data") data: RegisterInput): Promise<User> {
//   //   return User.create(data).save();
//   // }
// }

// @Resolver()
// export class CreateMovieResolver extends BaseCreateMovie {
//   // @Mutation(() => User)
//   // async createUser(@Arg("data") data: RegisterInput): Promise<User> {
//   //   return User.create(data).save();
//   // }
// }

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);

export const CreateMovieResolver = createResolver(
  "Movie",
  Movie,
  MovieInput,
  Movie
);
