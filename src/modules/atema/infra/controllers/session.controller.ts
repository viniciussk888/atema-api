import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../database/typeorm/entities/user.entity";
import {LoginUserDto} from "../../domain/dto/login-user.dto";

@ApiTags("Session")
@Controller("session")
export class SessionController {
  private readonly logger = new Logger(SessionController.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  @ApiOperation({summary: "Criar uma sessão (login)"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Sessão criada com sucesso e token retornado"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Email ou senha inválidos"
  })
  @Post()
  async store(@Body() data: LoginUserDto) {
    this.logger.log(`POST /session - email: ${data.email}`);

    // Busca usuário pelo email
    const user = await this.userRepository.findOne({
      where: {email: data.email}
    });

    if (!user) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    // Verifica senha
    const isPasswordValid = await bcrypt.compare(
      data.password as string,
      user.password as string
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    // Gera token JWT
    const payload = {sub: user.id, username: user.username, email: user.email};
    const token = this.jwtService.sign(payload);

    // Retorna token e informações do usuário
    return {
      accessToken: token,
      user: {
        username: user.username,
        admin: user.admin,
        update: user.update,
        delete: user.delete,
        insert: user.insert,
        blog: user.blog
      }
    };
  }
}
