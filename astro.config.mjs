// @ts-check
import { defineConfig, envField } from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  prefetch: true,

  env: {
    schema: {
      // Backend API configuration, should not be part of build
      BACKEND_API_KEY: envField.string({ context: "server", access: "secret"}),

      // Mail configuration, shoud be part of build
      MAIL_HOST: envField.string({ context: "server", access: "public" }),
      MAIL_PORT: envField.number({ context: "server", access: "public", default: 587 }),
      MAIL_SECURE: envField.boolean({ context: "server", access: "public", default: false }),
      MAIL_AUTH_USER: envField.string({ context: "server", access: "public" }),
      MAIL_AUTH_PASS: envField.string({ context: "server", access: "public" }),
    }
  },

  adapter: node({
    mode: "standalone"
  })
});