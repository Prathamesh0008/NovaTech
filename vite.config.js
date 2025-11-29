// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["optionalChaining", "nullishCoalescingOperator"],
        },
      },
    }),
    tailwindcss(),

    // TEMP: remove prerender plugin until config is stable

    {
      name: "copy-htaccess",
      closeBundle() {
        const src = "public/.htaccess";
        const dest = "dist/.htaccess";

        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log("✔ .htaccess copied to dist/");
        } else {
          console.warn("⚠ .htaccess NOT FOUND in public/");
        }
      },
    },
  ],
  build: {
    minify: false,
    target: "es2015",
    chunkSizeWarningLimit: 2000,
  },
});



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import fs from "fs";
// import path from "path";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),

//     // Copy .htaccess to the CLIENT build (GoDaddy needs this)
//     {
//       name: "copy-htaccess",
//       closeBundle() {
//         const src = "public/.htaccess";
//         const dest = "dist/client/.htaccess";

//         if (fs.existsSync(src)) {
//           fs.copyFileSync(src, dest);
//           console.log("✔ .htaccess copied to dist/client/");
//         } else {
//           console.warn("⚠ .htaccess NOT FOUND in public/");
//         }
//       },
//     },
//   ],

//   build: {
//     // SSR BUILD → server folder
//     ssr: "src/entry-server.jsx",
//     outDir: "dist/server",

//     rollupOptions: {
//       input: path.resolve(__dirname, "index.html"),
//     },
//   },

//   ssr: {
//     noExternal: ["react-router-dom"],
//   },
// });
