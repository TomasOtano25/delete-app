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
    "allowSyntheticDefaultImports": false,
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

