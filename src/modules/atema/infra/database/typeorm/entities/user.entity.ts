import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: "users"})
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({example: "johndoe", description: "Nome de usuário"})
  @Column({type: "varchar", length: 255, nullable: false})
  username?: string;

  @ApiProperty({example: "senha123", description: "Senha do usuário"})
  @Column({type: "varchar", length: 255, nullable: false})
  password?: string;

  @ApiProperty({example: "johndoe@email.com", description: "Email do usuário"})
  @Column({type: "varchar", length: 255, nullable: false, unique: true})
  email?: string;

  @ApiProperty({example: true, description: "Permissão de deletar"})
  @Column({type: "boolean", default: false})
  delete?: boolean;

  @ApiProperty({example: true, description: "Permissão de inserir"})
  @Column({type: "boolean", default: false})
  insert?: boolean;

  @ApiProperty({example: true, description: "Permissão de atualizar"})
  @Column({type: "boolean", default: false})
  update?: boolean;

  @ApiProperty({example: true, description: "Permissão de blog"})
  @Column({type: "boolean", default: false})
  blog?: boolean;

  @ApiProperty({example: true, description: "Permissão de admin"})
  @Column({type: "boolean", default: false})
  admin?: boolean;

  @ApiProperty()
  @CreateDateColumn({name: "created_at"})
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({name: "updated_at"})
  updatedAt?: Date;
}
