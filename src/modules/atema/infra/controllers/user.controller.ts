import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  Logger,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../database/typeorm/entities/user.entity";
import {CreateUserDto} from "../../domain/dto/create-user.dto";
import * as bcrypt from "bcrypt";

@ApiTags("User")
@Controller("user")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  @ApiOperation({summary: "Listar todos os usuários"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de usuários retornada com sucesso",
    type: [UserEntity]
  })
  @Get()
  async index(): Promise<UserEntity[]> {
    this.logger.log("GET /user");
    return this.userRepository.find();
  }

  @ApiOperation({summary: "Criar um novo usuário"})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Usuário criado com sucesso",
    type: UserEntity
  })
  @Post()
  async store(@Body() data: CreateUserDto): Promise<UserEntity> {
    this.logger.log("POST /user");

    // check if user exists
    const existingUser = await this.userRepository.findOne({
      where: {email: data.email}
    });
    if (existingUser) {
      throw new ConflictException("Ocorreu um conflito: Email já cadastrado");
    }

    // Cria a instância do usuário
    const user = this.userRepository.create(data);

    // Gera hash da senha antes de salvar
    const saltRounds = 10;

    const encryptedPassword = await bcrypt.hash(
      data.password as string,
      saltRounds
    );
    user.password = encryptedPassword;

    // Salva no banco
    return this.userRepository.save(user);
  }

  @ApiOperation({summary: "Deletar um usuário por ID"})
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Usuário deletado com sucesso"
  })
  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<void> {
    this.logger.log(`DELETE /user/${id}`);
    const user = await this.userRepository.findOne({where: {id: Number(id)}});
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    await this.userRepository.remove(user);
  }
}
