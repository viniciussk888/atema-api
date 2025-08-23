import { Injectable } from '@nestjs/common';
import { HealthcheckResponseDto } from '../../infra/fastify/dto/healthcheck-response.dto';

@Injectable()
export class GetHealthcheckUsecase {
  execute(): HealthcheckResponseDto {
    return { status: 'ok' };
  }
}
