import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RecoveryPasswordDto {
  @ApiProperty({example: "jon@email.com", description: "Email do usuário"})
  @IsNotEmpty({message: "O email é obrigatório"})
  @IsString({message: "O email deve ser uma string"})
  email?: string;
}
