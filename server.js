import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const app = express();

async function createServer() {
  let vite;

  if (!isProd) {
    vite = await (await import("vite")).createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist/client")));
  }

  // ⭐ Works ONLY on Express 4 (not 5)
  app.get("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      let template, render;

      if (!isProd) {
        template = fs.readFileSync("index.html", "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        template = fs.readFileSync(
          path.join(__dirname, "dist/client/index.html"),
          "utf-8"
        );
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const appHtml = render(url);

      const html = template.replace("<!--ssr-html-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite?.ssrFixStacktrace?.(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`SSR server running at http://localhost:${PORT}`);
  });
}

createServer();
