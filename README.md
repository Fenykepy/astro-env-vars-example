# astro-env-vars-example

Small astro project to understand how Astro env vars works and some other quirks.

## Setup
- Intall dependencies:
  ```
  $ npm install
  ```

- Set env files:
  ```
  $ cp .env-example .env
  $ cp .env.development .env.production
  ```

## Env vars quirk

### In development mode

- Launch development server:
  ```
  $ npm run dev
  ```

- Open your browser and navigate to `/`, to `/static_page` and to `/ssr_page`. Try sending a message with form. Everything behaves correctly.

### In preview or production mode

- Build project:
  ```
  $ npm run build
  ```

- Start preview server:
  ```
  $ npm run preview
  ```

- Open your browser.
- Navigate to `/`: It should work.
- Navigate to `/static_page`: It should work.
- Navigate to `/ssr_page`, it fails:

```
[ERROR] EnvInvalidVariables: The following environment variables defined in `env.schema` are invalid:
BACKEND_API_KEY is missing
```

But this env var is never imported in ssr_page's code…

- Set `BACKEND_API_KEY` as `public` in `astro.config.mjs`, everything works again, but `BACKEND_API_KEY` is now part of the build (which we don't want).
