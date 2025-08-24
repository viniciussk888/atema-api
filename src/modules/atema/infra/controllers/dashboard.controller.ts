import {Controller, Logger, UseGuards, HttpStatus, Get} from "@nestjs/common";
import {DataSource} from "typeorm";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../../common/auth/jwt-auth.guard";

@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);

  constructor(private readonly dataSource: DataSource) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Totais de dashboard carregados com sucesso"
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getDashboard() {
    this.logger.log("GET /dashboard");

    // Query principal (totais)
    const queryTotals = `
      SELECT 
        COUNT(*) AS totalToponimos,
        COUNT(DISTINCT municipio) AS totalMunicipios,
        COUNT(DISTINCT elementogeografico) AS totalElementosGeograficos
      FROM atemas;
    `;

    // Query para os 10 municípios com mais topônimos
    const queryTopMunicipios = `
      SELECT 
        municipio,
        COUNT(*) AS total
      FROM atemas
      WHERE municipio IS NOT NULL
      GROUP BY municipio
      ORDER BY total DESC
      LIMIT 10;
    `;

    const [totals] = await this.dataSource.query(queryTotals);
    const topMunicipios = await this.dataSource.query(queryTopMunicipios);

    return {
      toponimos: Number(totals.totaltoponimos),
      municipios: Number(totals.totalmunicipios),
      elementogeograficos: Number(totals.totalelementosgeograficos),
      topMunicipios: topMunicipios.map((row: any) => ({
        municipio: row.municipio,
        total: Number(row.total)
      }))
    };
  }
}
