import {IsNotEmpty, IsString} from "class-validator";

export class CreateLinguaDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
