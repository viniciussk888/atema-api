import {Test} from "@nestjs/testing";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import * as sinon from "sinon";
import * as winston from "winston";

import {LoggingService} from "./logging.service";

describe("Logging service", () => {
  let loggingService: LoggingService;

  const logger = sinon.stub(winston.createLogger());

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoggingService,
        {provide: WINSTON_MODULE_PROVIDER, useValue: logger}
      ]
    }).compile();

    loggingService = module.get(LoggingService);
  });

  afterEach(() => {
    sinon.reset();
  });

  describe("When tring to get external link", () => {
    it("Should get the external link", async () => {
      await loggingService.info("teste");
    });
  });
});
