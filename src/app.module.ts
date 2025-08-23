import {Module} from "@nestjs/common";
import {WinstonModule} from "nest-winston";
import {ConfigModule} from "@nestjs/config";
import winstonConfig from "./common/winston.logger";
import {HealthcheckModule} from "./modules/healthcheck/healthcheck.module";
import {AtemaModule} from "./modules/atema/atema.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      ssl: {
        rejectUnauthorized: false
      }
    }),
    JwtModule.register({
      global: true
    }),
    HealthcheckModule,
    AtemaModule,
    WinstonModule.forRoot(winstonConfig)
  ]
})
export class AppModule {}
