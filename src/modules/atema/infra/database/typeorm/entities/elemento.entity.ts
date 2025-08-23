import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: "elementos"})
export class ElementoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  name?: string;

  @ApiProperty()
  @CreateDateColumn({name: "created_at"})
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({name: "updated_at"})
  updatedAt?: Date;
}
