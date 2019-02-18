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
