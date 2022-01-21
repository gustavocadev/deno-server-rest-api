import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from './routes/clients.routes.ts'
import logger from "https://deno.land/x/oak_logger/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';

// intance
const app = new Application()

app.use(logger.logger)
app.use(logger.responseTime)
// middlewares  
app.use(oakCors());
app.use(router.routes())
app.use(router.allowedMethods())


const DEFAULT_PORT = 4000

const argPort = parse(Deno.args).port

await app.listen({port: argPort ? Number(argPort) : DEFAULT_PORT})

