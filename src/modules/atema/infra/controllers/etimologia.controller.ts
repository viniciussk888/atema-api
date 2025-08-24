import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EtimologiaEntity} from "../../infra/database/typeorm/entities/etimologia.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateEtimologiaDto} from "../../domain/dto/create-etimologia.dto";
import {JwtAuthGuard} from "../../../../common/auth/jwt-auth.guard";

@ApiTags("Etimologias")
@Controller("etimologia")
export class EtimologiaController {
  constructor(
    @InjectRepository(EtimologiaEntity)
    private readonly etimologiaRepository: Repository<EtimologiaEntity>
  ) {}

  @ApiOperation({summary: "Listar todos os Etimologias"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de Etimologias retornada com sucesso",
    type: [EtimologiaEntity]
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return await this.etimologiaRepository.find();
  }

  @ApiOperation({summary: "Criar um novo Etimologia"})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Etimologia criado com sucesso",
    type: CreateEtimologiaDto
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() data: CreateEtimologiaDto) {
    const Etimologia = this.etimologiaRepository.create(data);
    return await this.etimologiaRepository.save(Etimologia);
  }

  @ApiOperation({summary: "Deletar um Etimologia por ID"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Etimologia deletado com sucesso"
  })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async destroy(@Param("id") id: number) {
    const Etimologia = await this.etimologiaRepository.findOne({where: {id}});

    if (!Etimologia) {
      throw new NotFoundException(`Etimologia com id ${id} não encontrado`);
    }

    await this.etimologiaRepository.remove(Etimologia);
    return {message: `Etimologia ${id} removido com sucesso`};
  }
}
