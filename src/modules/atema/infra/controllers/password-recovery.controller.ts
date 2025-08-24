import {Controller, Post, Body, BadRequestException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import {UserEntity} from "../database/typeorm/entities/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {RecoveryPasswordDto} from "../../domain/dto/recovery-password.dto";

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
      text: `Sua senha atual é: ${user.password}`
    });

    return {message: "Senha enviada para o e-mail cadastrado."};
  }
}
