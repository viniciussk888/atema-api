import {Test} from "@nestjs/testing";
import {HealthcheckController} from "./healthcheck.controller";
import {GetHealthcheckCompleteUsecase} from "../../../application/get-healthcheck-complete/get-healthcheck-complete.usecase";
import {GetHealthcheckUsecase} from "../../../application/get-healthcheck/get-healthcheck.usecase";
import {HealthcheckResponseDto} from "../dto/healthcheck-response.dto";

describe("HealthcheckController", () => {
  let healthcheckController: HealthcheckController;
  let getHealthcheckUsecase: GetHealthcheckUsecase;
  let getHealthcheckCompleteUsecase: GetHealthcheckCompleteUsecase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [GetHealthcheckUsecase, GetHealthcheckCompleteUsecase]
    }).compile();

    healthcheckController = moduleRef.get<HealthcheckController>(
      HealthcheckController
    );
    getHealthcheckUsecase = moduleRef.get<GetHealthcheckUsecase>(
      GetHealthcheckUsecase
    );
    getHealthcheckCompleteUsecase =
      moduleRef.get<GetHealthcheckCompleteUsecase>(
        GetHealthcheckCompleteUsecase
      );
  });

  describe("get", () => {
    it("should call getHealthcheckUsecase.execute and return healthcheck response", () => {
      const expectedResponse: HealthcheckResponseDto = {status: "ok"};
      jest
        .spyOn(getHealthcheckUsecase, "execute")
        .mockReturnValue(expectedResponse);

      const result = healthcheckController.get();

      expect(getHealthcheckUsecase.execute).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getComplete", () => {
    it("should call getHealthcheckCompleteUsecase.execute and return healthcheck response", () => {
      const expectedResponse: HealthcheckResponseDto = {
        status: "ok",
        meta: {
          name: "Package name",
          description: "Package description",
          version: "1.0.0",
          nodeVersion: "v18.0.0"
        },
        dependencies: []
      };
      jest
        .spyOn(getHealthcheckCompleteUsecase, "execute")
        .mockReturnValue(expectedResponse);

      const result = healthcheckController.getComplete();

      expect(getHealthcheckCompleteUsecase.execute).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });
});
