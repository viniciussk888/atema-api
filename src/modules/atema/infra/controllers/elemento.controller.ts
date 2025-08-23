import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpStatus
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ElementoEntity} from "../../infra/database/typeorm/entities/elemento.entity";
import {CreateElementoDto} from "../../domain/dto/create-elemento.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("Elemento")
@Controller("elemento")
export class ElementoController {
  constructor(
    @InjectRepository(ElementoEntity)
    private readonly elementoRepository: Repository<ElementoEntity>
  ) {}

  @ApiOperation({summary: "Listar todos os Elementos"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de Elementos retornada com sucesso",
    type: [ElementoEntity]
  })
  @Get()
  async index() {
    return await this.elementoRepository.find();
  }

  @ApiOperation({summary: "Criar um novo Elemento"})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Elemento criado com sucesso",
    type: CreateElementoDto
  })
  @Post()
  async store(@Body() data: CreateElementoDto) {
    const elemento = this.elementoRepository.create(data);
    return await this.elementoRepository.save(elemento);
  }

  @ApiOperation({summary: "Deletar um Elemento por ID"})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Elemento deletado com sucesso"
  })
  @Delete(":id")
  async destroy(@Param("id") id: number) {
    const elemento = await this.elementoRepository.findOne({where: {id}});

    if (!elemento) {
      throw new NotFoundException(`Elemento com id ${id} não encontrado`);
    }

    await this.elementoRepository.remove(elemento);
    return {message: `Elemento ${id} removido com sucesso`};
  }
}
