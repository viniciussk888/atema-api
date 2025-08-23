import {PartialType} from "@nestjs/swagger";
import {CreateAtemaDto} from "./create-atema.dto";

export class UpdateAtemaDto extends PartialType(CreateAtemaDto) {}
