import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { Activity } from "./Activity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true
  })
  age: number;

  @OneToMany(type => Activity, activity => activity.user)
  activites: Activity[];
}
