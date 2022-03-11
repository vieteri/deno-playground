import { Application } from "./deps.jsx";
import { viewEngine, engineFactory, adapterFactory, Session } from "./deps.jsx";
import {log, authmiddleware, errorMiddleware, serveStaticFilesMiddleware, registeredmiddleware, renderMiddleware} from './middlewares/middlewares.jsx';
import { router } from "./routes/routes.jsx";

const app = new Application();
/*
const session = new Session({ framework: "oak" });
await session.init();
*/
const session = new Session();
app.use(session.initMiddleware());
router.get("/session", async (ctx) => {

  // Examples of getting and setting variables on a session
  if (!await ctx.state.session.has("pageCount")) {
      await ctx.state.session.set("pageCount", 0);

  } else {
      await ctx.state.session.set("pageCount", await ctx.state.session.get("pageCount") + 1);
  }

  // If you only want a variable to survive for a single request, you can "flash" it instead
  await ctx.state.session.flash("message", "I am good for form validations errors, success messages, etc.")
  
  ctx.response.body = `Visited page ${await ctx.state.session.get("pageCount")} times`;
})
.post('/delete', async (ctx) => {
  // Call the delete method
  await ctx.state.session.deleteSession()
  // Optionally, you can also pass the context if you're not in a session route
  // await session.deleteSession(ctx)
  // or, the string of the session ID in case you aren't within any routing context.
  // await session.deleteSession(ctx.cookies.get('session'))

  ctx.response.redirect('/')
});
/*
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {viewRoot: "./views"}));
* */
app.use(registeredmiddleware);
app.use(errorMiddleware);
app.use(serveStaticFilesMiddleware);
app.use(authmiddleware);
app.use(log); 
app.use(renderMiddleware);
app.use(router.routes());

let port = 8000;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

//app.listen({ port: port });

export { app };
