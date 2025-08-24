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
  UseGuards
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TaxonomiaEntity} from "../database/typeorm/entities/taxonomia.entity";
import {CreateTaxonomiaDto} from "../../domain/dto/create-taxonomia.dto";
import {JwtAuthGuard} from "../../../../common/auth/jwt-auth.guard";

@ApiTags("Taxonomia")
@Controller("taxonomia")
export class TaxonomiaController {
  private readonly logger = new Logger(TaxonomiaController.name);

  constructor(
    @InjectRepository(TaxonomiaEntity)
    private readonly taxonomiaRepository: Repository<TaxonomiaEntity>
  ) {}

  @ApiOperation({summary: "Listar todas as Taxonomias"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de taxonomias retornada com sucesso",
    type: [TaxonomiaEntity]
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<TaxonomiaEntity[]> {
    this.logger.log("GET /taxonomia");
    return this.taxonomiaRepository.find();
  }

  @ApiOperation({summary: "Criar uma nova Taxonomia"})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Taxonomia criada com sucesso",
    type: TaxonomiaEntity
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() data: CreateTaxonomiaDto): Promise<TaxonomiaEntity> {
    this.logger.log("POST /taxonomia");
    const taxonomia = this.taxonomiaRepository.create(data);
    return this.taxonomiaRepository.save(taxonomia);
  }

  @ApiOperation({summary: "Deletar uma Taxonomia por ID"})
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Taxonomia deletada com sucesso"
  })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<void> {
    this.logger.log(`DELETE /taxonomia/${id}`);
    const taxonomia = await this.taxonomiaRepository.findOne({
      where: {id: Number(id)}
    });
    if (!taxonomia) {
      throw new NotFoundException(`Taxonomia com id ${id} não encontrada`);
    }
    await this.taxonomiaRepository.remove(taxonomia);
  }
}
