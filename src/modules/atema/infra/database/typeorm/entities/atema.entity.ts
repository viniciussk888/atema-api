import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: "atemas"})
export class AtemaEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  mesorregiao?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  microrregiao?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  municipio?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  elementogeografico?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: false})
  toponimo?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  variante?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  tipo?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  area?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  linguaOrigem?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  etimologia?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  etimologiaEsc?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  taxionomia?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  estruturaMorfologica?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  referencias?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  fonte?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  dataColeta?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  responsavel?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  revisor?: string;

  @ApiProperty()
  @Column({type: "varchar", nullable: true})
  observacoes?: string;

  @ApiProperty()
  @CreateDateColumn({name: "created_at"})
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({name: "updated_at"})
  updatedAt?: Date;
}
