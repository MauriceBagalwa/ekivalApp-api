import logger from "pino";
import day from "dayjs";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${day().format()}"`,
});

export default log;
