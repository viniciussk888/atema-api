import {WinstonModuleOptions} from "nest-winston";
import * as winston from "winston";
import {transports} from "winston";

const winstonConfig: WinstonModuleOptions = {
  handleExceptions: true,
  transports: new transports.Console({
    format: winston.format.json(),
    level: "debug"
  })
};

export default winstonConfig;
