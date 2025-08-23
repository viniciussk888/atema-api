import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTaxonomiaDto {
  @ApiProperty({example: "Planta", description: "Nome da taxonomia"})
  @IsNotEmpty({message: "O nome da taxonomia é obrigatório"})
  @IsString({message: "O nome deve ser uma string"})
  name?: string;
}
