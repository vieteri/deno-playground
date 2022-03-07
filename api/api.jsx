

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function App() {
  return (
    <html>
      <head>
        <title>Hello from Viet</title>
      </head>
      <body>
      <h3>
          Viet Tran
          <small class="text-muted"> Teekkari</small>
        </h3>
        <img src="https://picsum.photos/200/300?random=1"></img>


      </body>
    </html>
  );
}

function handler(req) {
  const html = renderSSR(<App />);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);