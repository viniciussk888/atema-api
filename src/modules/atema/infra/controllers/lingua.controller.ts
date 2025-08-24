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
import {LinguaEntity} from "../database/typeorm/entities/lingua.entity";
import {CreateLinguaDto} from "../../domain/dto/create-lingua.dto";
import {JwtAuthGuard} from "../../../../common/auth/jwt-auth.guard";

@ApiTags("Lingua")
@Controller("lingua")
export class LinguaController {
  private readonly logger = new Logger(LinguaController.name);

  constructor(
    @InjectRepository(LinguaEntity)
    private readonly linguaRepository: Repository<LinguaEntity>
  ) {}

  @ApiOperation({summary: "Listar todas as Línguas"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de línguas retornada com sucesso",
    type: [LinguaEntity]
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<LinguaEntity[]> {
    this.logger.log("GET /lingua");
    return this.linguaRepository.find();
  }

  @ApiOperation({summary: "Criar uma nova Língua"})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Língua criada com sucesso",
    type: LinguaEntity
  })
  @Post()
  async store(@Body() data: CreateLinguaDto): Promise<LinguaEntity> {
    this.logger.log("POST /lingua");
    const lingua = this.linguaRepository.create(data);
    return this.linguaRepository.save(lingua);
  }

  @ApiOperation({summary: "Deletar uma Língua por ID"})
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Língua deletada com sucesso"
  })
  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<void> {
    this.logger.log(`DELETE /lingua/${id}`);
    const lingua = await this.linguaRepository.findOne({
      where: {id: Number(id)}
    });
    if (!lingua) {
      throw new NotFoundException(`Língua com id ${id} não encontrada`);
    }
    await this.linguaRepository.remove(lingua);
  }
}
