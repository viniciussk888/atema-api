import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional
} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: "johndoe", description: "Nome de usuário"})
  @IsNotEmpty({message: "O username é obrigatório"})
  @IsString({message: "O username deve ser uma string"})
  username?: string;

  @ApiProperty({example: "senha123", description: "Senha do usuário"})
  @IsNotEmpty({message: "A senha é obrigatória"})
  @IsString({message: "A senha deve ser uma string"})
  password?: string;

  @ApiProperty({example: "johndoe@email.com", description: "Email do usuário"})
  @IsNotEmpty({message: "O email é obrigatório"})
  @IsEmail({}, {message: "Email inválido"})
  email?: string;

  @ApiPropertyOptional({example: true, description: "Permissão de deletar"})
  @IsOptional()
  @IsBoolean()
  delete?: boolean;

  @ApiPropertyOptional({example: true, description: "Permissão de inserir"})
  @IsOptional()
  @IsBoolean()
  insert?: boolean;

  @ApiPropertyOptional({example: true, description: "Permissão de atualizar"})
  @IsOptional()
  @IsBoolean()
  update?: boolean;

  @ApiPropertyOptional({example: true, description: "Permissão de blog"})
  @IsOptional()
  @IsBoolean()
  blog?: boolean;

  @ApiPropertyOptional({example: true, description: "Permissão de admin"})
  @IsOptional()
  @IsBoolean()
  admin?: boolean;
}
