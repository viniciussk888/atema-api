import {ApiProperty} from "@nestjs/swagger";

export class CreateAtemaDto {
  @ApiProperty({required: false})
  mesorregiao?: string;

  @ApiProperty({required: false})
  microrregiao?: string;

  @ApiProperty({required: false})
  municipio?: string;

  @ApiProperty({required: false})
  toponimo?: string;

  @ApiProperty({required: false})
  elementogeografico?: string;

  @ApiProperty({required: false})
  variante?: string;

  @ApiProperty({required: false})
  tipo?: string;

  @ApiProperty({required: false})
  area?: string;

  @ApiProperty({required: false})
  linguaOrigem?: string;

  @ApiProperty({required: false})
  etimologia?: string;

  @ApiProperty({required: false})
  etimologiaEsc?: string;

  @ApiProperty({required: false})
  taxionomia?: string;

  @ApiProperty({required: false})
  estruturaMorfologica?: string;

  @ApiProperty({required: false})
  referencias?: string;

  @ApiProperty({required: false})
  fonte?: string;

  @ApiProperty({required: false})
  dataColeta?: string;

  @ApiProperty({required: false})
  responsavel?: string;

  @ApiProperty({required: false})
  revisor?: string;

  @ApiProperty({required: false})
  observacoes?: string;
}
