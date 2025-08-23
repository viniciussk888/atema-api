import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class MetaDto {
  @ApiProperty({description: "Nome do pacote", example: "Package name"})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Descrição do pacote",
    example: "Package description"
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Versão da aplicação",
    example: "1.0.0"
  })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiProperty({
    description: "Tempo da aplicação",
    example: "01:00:00"
  })
  @ApiProperty({
    description: "Versão do Nodejs",
    example: "v18.0.0"
  })
  @IsOptional()
  @IsString()
  nodeVersion?: string;
}
