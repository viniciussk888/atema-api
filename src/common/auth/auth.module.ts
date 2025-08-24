import {Module} from "@nestjs/common";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [],
  controllers: [],
  providers: [JwtStrategy],
  exports: []
})
export class AuthModule {}
