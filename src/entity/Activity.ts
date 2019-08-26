import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsDate } from "class-validator";
import { User } from "./User";
import { Application } from "./Application";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  from: Date;

  @Column()
  @IsDate()
  to: Date;

  @ManyToOne(type => User, user => user.activites)
  user: User;

  @ManyToOne(type => Application, application => application.activites)
  application: Application;
}
