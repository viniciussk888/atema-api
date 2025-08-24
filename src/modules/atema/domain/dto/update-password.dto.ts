import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePasswordDto {
  @ApiProperty({example: "jon@email.com", description: "Email do usuário"})
  @IsNotEmpty({message: "O email é obrigatório"})
  @IsString({message: "O email deve ser uma string"})
  email?: string;

  @ApiProperty({
    example: "hash_recebido",
    description: "Hash recebido por e-mail"
  })
  @IsNotEmpty({message: "O hash é obrigatório"})
  @IsString({message: "O hash deve ser uma string"})
  hash?: string;

  @ApiProperty({example: "nova_senha", description: "Nova senha do usuário"})
  @IsNotEmpty({message: "A nova senha é obrigatória"})
  @IsString({message: "A nova senha deve ser uma string"})
  newPassword?: string;
}
