import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FilterAtemaDto {
  @ApiProperty({example: "Centro-Oeste", description: "Mesorregiao"})
  @IsNotEmpty({message: "Mesorregiao é obrigatório"})
  @IsString({message: "A mesorregiao deve ser uma string"})
  mesorregiao?: string;

  @ApiProperty({example: "Norte", description: "Microrregiao"})
  @IsString({message: "A microrregiao deve ser uma string"})
  microrregiao?: string;

  @ApiProperty({example: "Goiás", description: "Estado"})
  @IsString({message: "A municipio deve ser uma string"})
  municipio?: string;
}
