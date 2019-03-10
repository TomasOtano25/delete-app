# Movies App

1. Install Type-Graphql

```bash
yarn add apollo-server-express express graphql reflect-metadata type-graphql
yarn add -D @types/express @types/graphql @types/node nodemon ts-node typescript
```

2. Create "./tsconfig.json"

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
    "sourceMap": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "declaration": false,
    "composite": false,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "rootDir": "src"
  },
  "exclude": ["node_modules"],
  "include": ["./src/**/*.tsx", "./src/**/*.ts"]
}

```

3. Create "./src/index.ts"

```ts
import "reflect-metadata";
import { ApolloServer } from "apollo-sever-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server started on http://localhost:4000/graphql`);
  });
};

main();
```

4. Update "package.json":

```json
  "scripts": {
    "start": "nodemon --exec ts-node src/index.ts"
  }
```

4.1. Para cambiar el nombre de la consulta:

```ts
class HelloResolver {
  @Query(() => String, { name: "helloWorld" })
  async hello() {
```

4.2. Para permitir que un Resolver devuelva null:

```ts
class HelloResolver {
  @Query(() => String, { nullable: true })
  async hello() {
```

5. Install postgres and TypeOrm:

```bash
yarn add pg typeorm bcryptjs
yarn add -D @types/bcryptjs
```

6. Create database: 

> Entrar en la consola de la base de datos y digitar:

```sql
create database movies_app_default;
```

7. Create file "src/entity" and "src/entity/User.ts"

6. Create "ormconfig.json":

```json
{
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "1212",
  "database": "movies_app_default",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entity/*.*"]
}

```

7. Update "src/index.ts": 

```ts
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server started on http://localhost:4000/graphql`);
  });
};

main();
```

8. Create Entity "User" in "src/entity/User.ts": 

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  lastName: string | null;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => String, { nullable: true })
  name: string;

  @Field()
  @Column({ type: "text", unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

``` 

9. Create Resolver "Register" in "src/modules/user/Register.ts":

```ts
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
```

## Modulo de validacion

10. Install "ts-node-dev":

```bash
yarn add -D ts-node-dev
```

11. Update "package.json": 

```json
"scripts": {
    "start": "ts-node-dev --respawn src/index.ts"
  },
```

12. Install "class-validator":

```bash
yarn add class-validator
```

13. Create "src/modules/user/register/isEmailAlreadyExist.ts":

```ts
import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from "class-validator";

import User from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreayExistConstraint
  implements ValidatorConstraintInterface {
  validate(email: string): boolean | Promise<boolean> {
    return User.findOne({ where: { email } }).then(user => {
      if (user) return false;
      return true;
    });
  }
}

export function IsEmailAlreayExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreayExistConstraint
    });
  };
}
```

14. Sustituir los Argumentos por un InputType, creando el documento "src/modules/user/register/RegisterInput.ts":

```ts
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
```

15. Update "src/modules/user/Register.ts":

```ts
// @Resolver(User)
@Resolver()
export class RegisterResolver {
```

```ts
 @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
```

16. Update "src/index.ts":

```ts
import { buildSchema, formatArgumentValidationError } from "type-graphql";

const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });
```

## Modulo de login

17. Intallar dependencias:

```bash
yarn add express-session connect-redis ioredis cors
yarn add -D @types/express-session @types/connect-redis @types/ioredis @types/cors
```

Tarea Completar

## Confirmacion de email

18. Install dependencias:

```bash
yarn add nodemailer uuid
yarn add -D @types/nodemailer @types/uuid
yarn add dotenv-safe
yarn add -D @types/dotenv-safe
```

## Logout

## Testing

### Testing Setup a test environment


Install dependencias:

```bash
 yarn add -D jest typescript ts-jest @types/jest
```

Creating config file:

```bash
yarn ts-jest config:init
```


```bash
yarn add faker
yarn add -D faker @types/faker
```
