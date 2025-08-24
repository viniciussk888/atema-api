import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AtemaController} from "./infra/controllers/atema.controller";
import {AtemaEntity} from "./infra/database/typeorm/entities/atema.entity";
import {ElementoController} from "./infra/controllers/elemento.controller";
import {ElementoEntity} from "./infra/database/typeorm/entities/elemento.entity";
import {EtimologiaEntity} from "./infra/database/typeorm/entities/etimologia.entity";
import {EtimologiaController} from "./infra/controllers/etimologia.controller";
import {LinguaController} from "./infra/controllers/lingua.controller";
import {LinguaEntity} from "./infra/database/typeorm/entities/lingua.entity";
import {TaxonomiaController} from "./infra/controllers/taxonomia.controller";
import {TaxonomiaEntity} from "./infra/database/typeorm/entities/taxonomia.entity";
import {UserController} from "./infra/controllers/user.controller";
import {UserEntity} from "./infra/database/typeorm/entities/user.entity";
import {SessionController} from "./infra/controllers/session.controller";
import {AuthModule} from "../../common/auth/auth.module";
import {RelateController} from "./infra/controllers/relate.controller";
import {PostController} from "./infra/controllers/post.controller";
import {PostEntity} from "./infra/database/typeorm/entities/post.entity";

@Module({
  imports: [
    HttpModule,
    AuthModule,
    TypeOrmModule.forFeature([
      AtemaEntity,
      ElementoEntity,
      EtimologiaEntity,
      LinguaEntity,
      TaxonomiaEntity,
      UserEntity,
      PostEntity
    ])
  ],
  controllers: [
    AtemaController,
    ElementoController,
    EtimologiaController,
    LinguaController,
    TaxonomiaController,
    UserController,
    SessionController,
    RelateController,
    PostController
  ],
  providers: [],
  exports: []
})
export class AtemaModule {}
