import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsDate, IsNumber, Min, Max } from "class-validator";
import { User } from "./User";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Column()
  @IsDate()
  date: Date;

  @ManyToOne(type => User, user => user.ratings)
  user: User;
}
