import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "copy-htaccess",
      closeBundle() {
        const src = "public/.htaccess";     // << correct location
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
});
