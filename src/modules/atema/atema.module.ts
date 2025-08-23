import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AtemaController} from "./infra/controllers/atema.controller";
import {AtemaEntity} from "./infra/database/typeorm/entities/atema.entity";
import {ElementoController} from "./infra/controllers/elemento.controller";
import {ElementoEntity} from "./infra/database/typeorm/entities/elemento.entity";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([AtemaEntity, ElementoEntity])
  ],
  controllers: [AtemaController, ElementoController],
  providers: [],
  exports: []
})
export class AtemaModule {}
