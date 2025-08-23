import {Inject, Injectable} from "@nestjs/common";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async info(message: string): Promise<void> {
    this.logger.info(message);
  }

  async error(message: string): Promise<void> {
    this.logger.error(message);
  }
}
