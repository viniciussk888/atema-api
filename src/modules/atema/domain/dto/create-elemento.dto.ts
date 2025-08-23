import {IsNotEmpty, IsString} from "class-validator";

export class CreateElementoDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
