import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
/**
 * Default url endpoint for Swagger UI.
 */
const DEFAULT_SWAGGER_PREFIX = "/docs";

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle("Atema API")
    .setDescription("API documentation for the Atema service")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const path = process.env.SWAGGER_PREFIX ?? DEFAULT_SWAGGER_PREFIX;

  SwaggerModule.setup(path, app, document);
};
