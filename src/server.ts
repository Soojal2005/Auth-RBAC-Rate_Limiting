import { buildapp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
const Port = env.PORT;
const app = buildapp();
app.listen({ port: Port }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  app.log.info(`Server is running on port ${Port}`);
});
