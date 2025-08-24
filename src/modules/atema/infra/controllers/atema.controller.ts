import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  Logger,
  NotFoundException,
  UseGuards,
  HttpException
} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AtemaEntity} from "../database/typeorm/entities/atema.entity";
import {CreateAtemaDto} from "../../domain/dto/create-atema.dto";
import {UpdateAtemaDto} from "../../domain/dto/update-atema.dto";
import {JwtAuthGuard} from "../../../../common/auth/jwt-auth.guard";
import {FilterAtemaDto} from "../../domain/dto/filter-atema.dto";

@ApiTags("Atema")
@Controller("atema")
export class AtemaController {
  private readonly logger = new Logger(AtemaController.name);

  constructor(
    @InjectRepository(AtemaEntity)
    private readonly atemaRepository: Repository<AtemaEntity>
  ) {}

  @ApiOperation({summary: "Listar todos os Atemas"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de Atemas retornada com sucesso",
    type: [AtemaEntity]
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<AtemaEntity[]> {
    this.logger.log("GET /atema");
    return this.atemaRepository.find();
  }

  @ApiOperation({summary: "Criar um novo Atema"})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Atema criado com sucesso",
    type: AtemaEntity
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() data: CreateAtemaDto): Promise<AtemaEntity> {
    this.logger.log("POST /atema");
    const atema = this.atemaRepository.create(data);
    return this.atemaRepository.save(atema);
  }

  @ApiOperation({summary: "Buscar um Atema por ID"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Atema encontrado",
    type: AtemaEntity
  })
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async show(@Param("id") id: string): Promise<AtemaEntity> {
    this.logger.log(`GET /atema/${id}`);
    const atema = await this.atemaRepository.findOne({where: {id: Number(id)}});
    if (!atema) {
      throw new NotFoundException(`Atema com id ${id} não encontrado`);
    }
    return atema;
  }

  @ApiOperation({summary: "Atualizar um Atema por ID"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Atema atualizado com sucesso",
    type: AtemaEntity
  })
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: UpdateAtemaDto
  ): Promise<AtemaEntity> {
    this.logger.log(`PUT /atema/${id}`);
    const atema = await this.atemaRepository.findOne({where: {id: Number(id)}});
    if (!atema) {
      throw new NotFoundException(`Atema com id ${id} não encontrado`);
    }
    Object.assign(atema, data);
    return this.atemaRepository.save(atema);
  }

  @ApiOperation({summary: "Deletar um Atema por ID"})
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Atema deletado com sucesso"
  })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<void> {
    this.logger.log(`DELETE /atema/${id}`);
    const atema = await this.atemaRepository.findOne({where: {id: Number(id)}});
    if (!atema) {
      throw new NotFoundException(`Atema com id ${id} não encontrado`);
    }
    await this.atemaRepository.remove(atema);
  }

  @ApiOperation({
    summary: "Filtrar Atemas por mesorregião, microrregião ou município"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Atemas filtrados com sucesso",
    type: FilterAtemaDto
  })
  @UseGuards(JwtAuthGuard)
  @Post("filter")
  async filter(
    @Body("mesorregiao") mesorregiao?: string,
    @Body("microrregiao") microrregiao?: string,
    @Body("municipio") municipio?: string
  ): Promise<AtemaEntity[]> {
    this.logger.log(
      `POST /atema/filter - body: ${JSON.stringify({
        mesorregiao,
        microrregiao,
        municipio
      })}`
    );

    if (municipio) {
      return this.atemaRepository.find({
        where: {municipio}
      });
    } else if (microrregiao) {
      return this.atemaRepository.find({
        where: {microrregiao}
      });
    } else if (mesorregiao) {
      return this.atemaRepository.find({
        where: {mesorregiao}
      });
    } else {
      throw new HttpException(
        "É necessário informar mesorregiao, microrregiao ou municipio",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
