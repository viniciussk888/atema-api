import {NestFactory} from "@nestjs/core";
import {WinstonModule, WINSTON_MODULE_NEST_PROVIDER} from "nest-winston";
import * as winston from "winston";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {AppModule} from "./app.module";
import {setupSwagger} from "./common/swagger.config";
import winstonTransports from "./common/winston.logger";

const port: number = parseInt(process.env.APP_PORT || "3000", 10);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger(winstonTransports)
    }
  );
  const logger = app.get<winston.Logger>(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  app.enableCors({
    origin: "*"
  });

  setupSwagger(app);

  await app.listen(port, "0.0.0.0");

  logger.warn(`Application is running on port ${port}`);
}

bootstrap();
