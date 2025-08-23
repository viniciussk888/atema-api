import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AtemaRepository} from "./infra/database/typeorm/repository/atema.repository";
import {AtemaController} from "./infra/controllers/atema.controller";
import {AtemaEntity} from "./infra/database/typeorm/entities/atema.entity";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([AtemaEntity])],
  controllers: [AtemaController],
  providers: [AtemaRepository],
  exports: [AtemaRepository]
})
export class AtemaModule {}
