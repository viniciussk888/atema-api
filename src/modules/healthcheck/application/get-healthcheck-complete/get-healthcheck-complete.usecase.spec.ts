import {GetHealthcheckCompleteUsecase} from "./get-healthcheck-complete.usecase";
import {HealthcheckResponseDto} from "../../infra/fastify/dto/healthcheck-response.dto";

describe("GetHealthcheckCompleteUsecase", () => {
  let usecase: GetHealthcheckCompleteUsecase;

  beforeEach(() => {
    usecase = new GetHealthcheckCompleteUsecase();
  });

  it("should return healthcheck response with metadata", () => {
    const expectedResponse: HealthcheckResponseDto = {
      meta: {
        name: "@chuck-norris-gateway",
        description: "Micro serviço para integração com API do Chuck Norris",
        version: "1.0.0",
        nodeVersion: process.version
      },
      dependencies: [],
      status: "ok"
    };

    const result = usecase.execute();

    expect(result).toEqual(expectedResponse);
  });
});
