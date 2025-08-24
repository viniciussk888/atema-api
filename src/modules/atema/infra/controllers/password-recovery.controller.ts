import {Controller, Post, Body, BadRequestException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import {UserEntity} from "../database/typeorm/entities/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {RecoveryPasswordDto} from "../../domain/dto/recovery-password.dto";
import {UpdatePasswordDto} from "../../domain/dto/update-password.dto";
import * as bcrypt from "bcrypt";

@ApiTags("Auth")
@Controller("auth")
export class PasswordRecoveryController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService
  ) {}

  @Post("recover-password")
  async recoverPassword(@Body() body: RecoveryPasswordDto) {
    const {email} = body;

    // Verifica se o usuário existe
    const user = await this.userRepository.findOne({where: {email}});

    if (!user) {
      throw new BadRequestException("Usuário não encontrado com este e-mail");
    }

    // ⚠️ Aqui estamos enviando a senha atual (não recomendado em produção)
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Recuperação de senha",
      text: `Seu token para recuperar a senha é: ${user.password} acesse o link e altere sua senha com este token: https://atema.net.br/update-password`
    });

    return {message: "Senha enviada para o e-mail cadastrado."};
  }

  @Post("update-password")
  async updatePassword(@Body() body: UpdatePasswordDto) {
    const {email, hash, newPassword} = body;

    const user = await this.userRepository.findOne({where: {email}});

    if (!user) {
      throw new BadRequestException("Usuário não encontrado");
    }

    // Verifica se o hash enviado bate com o hash armazenado
    if (hash !== user.password) {
      throw new BadRequestException("Hash inválido");
    }

    // Atualiza a senha
    const newHashedPassword = await bcrypt.hash(newPassword as string, 10);

    user.password = newHashedPassword;
    await this.userRepository.save(user);

    return {message: "Senha atualizada com sucesso"};
  }
}
