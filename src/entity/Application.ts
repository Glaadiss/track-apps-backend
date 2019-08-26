import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Activity } from "./Activity";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(type => Activity, activity => activity.application)
  activites: Activity[];
}
