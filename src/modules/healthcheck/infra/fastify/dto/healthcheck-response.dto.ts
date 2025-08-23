import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";
import {MetaDto} from "./meta.dto";

export class HealthcheckResponseDto {
  @ApiProperty({description: "Detalhes da aplicação", example: "{}"})
  @IsOptional()
  @IsString()
  meta?: MetaDto;

  @ApiProperty({description: "Status da aplicação", example: "ok"})
  @IsString()
  status?: string;

  @ApiProperty({description: "Dependências", example: "[]"})
  @IsOptional()
  @IsString()
  dependencies?: string[];
}
