import { GetHealthcheckUsecase } from './get-healthcheck.usecase';
import { HealthcheckResponseDto } from '../../infra/fastify/dto/healthcheck-response.dto';

describe('GetHealthcheckUsecase', () => {
  let usecase: GetHealthcheckUsecase;

  beforeEach(() => {
    usecase = new GetHealthcheckUsecase();
  });

  it('should return healthcheck response', () => {
    const expectedResponse: HealthcheckResponseDto = { status: 'ok' };
    const result = usecase.execute();
    expect(result).toEqual(expectedResponse);
  });
});
