import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Logger,
  UseGuards,
  HttpStatus
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {AtemaEntity} from "../database/typeorm/entities/atema.entity";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../../common/auth/jwt-auth.guard";

@ApiTags("Relate")
@Controller("relate")
export class RelateController {
  private readonly logger = new Logger(RelateController.name);

  constructor(
    @InjectRepository(AtemaEntity)
    private readonly dataSource: DataSource
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Relação realizada com sucesso"
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async relate(@Body() body: {tableName?: string}) {
    const {tableName} = body;

    if (!tableName) {
      throw new BadRequestException("Informe um campo da tabela!");
    }

    this.logger.log(`Relating by: ${tableName}`);

    const query = `
      SELECT a.${tableName} as name, COUNT(*) as total
      FROM atemas a
      GROUP BY a.${tableName}
    `;

    const result = await this.dataSource.query(query);

    return result;
  }
}
