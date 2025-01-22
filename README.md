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

- Set `BACKEND_API_KEY` as `public` in `astro.config.mjs`:
  ```
  [...]
  BACKEND_API_KEY: envField.string({ context: "server", access: "public"}),
  [...]
  ```
- Build project again, start preview server, now everything works, but `BACKEND_API_KEY` is part of the build (which we'd prefer to avoid, and isn't necessary).

## Img src quirk

- Keep `BACKEND_API_KEY` as `public` in `astro.config.mjs`, buid and run preview server.
- Open `/static_page` in your browser, look at logo `src` attribute in dev tools. It should be something like `/_astro/astro.[build_hash].svg`. This seems ok.
- Now open `/ssr_page` in your browser, look againt at logo `src`attribute in dev tools. It should be something like `/_image?href=%2F_astro%2Fastro.[build_hash].svg&w=115&h=48&f=svg`. Albeit from same component, it's now dynamically served.
  - That means logo will be reloaded when navigating between static and ssr pages, even if it's same component…
  - That also means static files will be served by standalone server for ssr pages, while it should be by my reverse proxy (nginx, faster at serving static files).
  - Is there a way to deactivate this behavior?, I found nothing in documentation about it.
