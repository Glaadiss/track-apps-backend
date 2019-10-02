import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsEmail, IsDate } from "class-validator";
import { Activity } from "./Activity";
import { Rating } from "./Rating";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({
    nullable: true
  })
  age: number;

  @Column()
  @IsDate()
  created: Date;

  @OneToMany(type => Activity, activity => activity.user)
  activites: Activity[];

  @OneToMany(type => Rating, rating => rating.user)
  ratings: Rating[];
}
