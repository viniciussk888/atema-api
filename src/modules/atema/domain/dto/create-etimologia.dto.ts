import {IsNotEmpty, IsString} from "class-validator";

export class CreateEtimologiaDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
