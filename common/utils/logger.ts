import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import "winston-daily-rotate-file";

const logger = WinstonModule.createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: `logs/%DATE%.log`,
      format: format.combine(format.timestamp(), format.json()),
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "90d",
    }),
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        })
      ),
    }),
  ],
});

export { logger };
