import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'   // <-- REQUIRED

export default defineConfig({
  plugins: [
    tailwindcss(),

    // Plugin to copy .htaccess after build
    {
      name: "copy-htaccess",
      closeBundle() {
        fs.copyFileSync(".htaccess", "dist/.htaccess");
      }
    }
  ],

  base: "/",
});
