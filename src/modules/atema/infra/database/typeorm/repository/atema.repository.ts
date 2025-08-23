import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AtemaEntity} from "../../typeorm/entities/atema.entity";
import {CreateAtemaDto} from "../../../../domain/dto/create-atema.dto";
import {UpdateAtemaDto} from "../../../../domain/dto/update-atema.dto";

@Injectable()
export class AtemaRepository {
  constructor(
    @InjectRepository(AtemaEntity)
    private readonly repository: Repository<AtemaEntity>
  ) {}

  async findAll(): Promise<AtemaEntity[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<AtemaEntity> {
    return this.repository.findOneOrFail({where: {id: Number(id)}});
  }

  async create(data: CreateAtemaDto): Promise<AtemaEntity> {
    const atema = this.repository.create(data);
    return this.repository.save(atema);
  }

  async update(id: string, data: UpdateAtemaDto): Promise<AtemaEntity> {
    const atema = await this.repository.findOneOrFail({
      where: {id: Number(id)}
    });
    Object.assign(atema, data);
    return this.repository.save(atema);
  }

  async remove(id: string): Promise<void> {
    const atema = await this.repository.findOneOrFail({
      where: {id: Number(id)}
    });
    await this.repository.remove(atema);
  }
}
