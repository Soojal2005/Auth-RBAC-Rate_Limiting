import { buildapp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
const Port = env.PORT;

async function startServer(){
  const app = await buildapp();
  await app.listen({port:Port});
  app.log.info(`server started on port ${Port}`);
}
 startServer().catch((err)=>{
  logger.error(err);
  process.exit(1);
 })
