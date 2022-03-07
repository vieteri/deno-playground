import { Application } from "./deps.jsx";
import { viewEngine, engineFactory, adapterFactory, Session } from "./deps.jsx";
import { router } from "./routes/routes.jsx";

const app = new Application();
const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {viewRoot: "./views"}));


app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
  app.listen({ port: 8000 });
}
else {
  app.listen({ port: 8000 });
}
export default app;
