import {ApiProperty} from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("posts")
export class PostEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  title?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  content?: string;

  @ApiProperty()
  @Column({type: "varchar", length: 255, nullable: true})
  image?: string; // aqui vai armazenar o nome do arquivo ou a URL

  @ApiProperty()
  @CreateDateColumn({name: "created_at"})
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({name: "updated_at"})
  updatedAt?: Date;
}
