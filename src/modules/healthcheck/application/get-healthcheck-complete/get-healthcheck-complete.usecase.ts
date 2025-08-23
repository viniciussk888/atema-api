import {Injectable} from "@nestjs/common";
import {HealthcheckResponseDto} from "../../infra/fastify/dto/healthcheck-response.dto";

@Injectable()
export class GetHealthcheckCompleteUsecase {
  execute(): HealthcheckResponseDto {
    return {
      meta: {
        name: "@chuck-norris-gateway",
        description: "Micro serviço para integração com API do Chuck Norris",
        version: "1.0.0",
        nodeVersion: process.version
      },
      dependencies: [],
      status: "ok"
    };
  }
}
