import { configure, renderFile } from "../deps.jsx"

const log = async({request}, next) => {
  console.log(`${request.url.pathname} - ${request.method}`);
  await next();
};


const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const renderMiddleware = async (context, next) => {
  configure({
    views: "./views/",
  });

  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};


const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

const authmiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/behavior')){
    let authenticated = await context.session.get('authenticated');
    if (!authenticated){
      context.response.redirect('/auth/login');
      return;
    }

  } 
  await next();
}

const registeredmiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/auth/register')){
    let authenticated = await context.session.get('authenticated');
    if (authenticated){
      context.response.redirect('/behavior');
      return;
    }

  } 
  await next();
}
export {errorMiddleware, serveStaticFilesMiddleware, authmiddleware, registeredmiddleware, log, renderMiddleware}