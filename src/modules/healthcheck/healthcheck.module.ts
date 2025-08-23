import {Module} from "@nestjs/common";
import {GetHealthcheckCompleteUsecase} from "./application/get-healthcheck-complete/get-healthcheck-complete.usecase";
import {GetHealthcheckUsecase} from "./application/get-healthcheck/get-healthcheck.usecase";
import {HealthcheckController} from "./infra/fastify/controller/healthcheck.controller";

@Module({
  controllers: [HealthcheckController],
  providers: [GetHealthcheckUsecase, GetHealthcheckCompleteUsecase],
  exports: [GetHealthcheckUsecase, GetHealthcheckCompleteUsecase]
})
export class HealthcheckModule {}
