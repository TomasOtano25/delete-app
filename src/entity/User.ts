import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

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

  // @Field(() => String, { nullable: true })
  // name: string | null;

  @Field(() => String, { nullable: true })
  name(@Root() parent: User): string | null {
    const { firstName, lastName } = parent;

    return firstName || lastName
      ? `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim()
      : null;
  }

  @Field(() => [String])
  @Column({ type: "simple-array", default: "CUSTOMER" })
  roles: string[];

  @Field()
  @Column({ type: "text", unique: true })
  email: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
