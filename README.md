# PC Producciones — Landing page

Landing page de la productora de eventos PC, con panel de administración para cargar las próximas fechas. Ver [PROMPT_DESARROLLO_LANDING.md](./PROMPT_DESARROLLO_LANDING.md) para el brief completo.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + PostgreSQL (con `@prisma/adapter-pg`)
- Resend para el email de contacto
- Autenticación de admin propia (cookie + JWT firmado con `jose`)

## Desarrollo local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Tener una base Postgres corriendo y crear `.env` a partir de `.env.example` (ya existe un `.env` de desarrollo apuntando a una base local `pc_dev`).

3. Correr las migraciones:

   ```bash
   npm run db:migrate
   ```

4. Generar el hash de la contraseña de admin y pegarlo en `ADMIN_PASSWORD_HASH` dentro de `.env`:

   ```bash
   npm run admin:hash-password -- "tu-password"
   ```

5. Levantar el servidor:

   ```bash
   npm run dev
   ```

   Abrir [http://localhost:3000](http://localhost:3000) (si el puerto está ocupado, Next usa el siguiente disponible, ej. 3001).

## Panel de administración

`/admin/login` — protegido por usuario/contraseña (`ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH`). Desde `/admin` se pueden crear, editar y eliminar las próximas fechas (título, fecha, lugar, imagen, link de entradas, estado publicado/borrador).

## Producción

- **Hosting**: Vercel, proyecto `pc-producciones-web` (cuenta `pcproducciones26-stack`), conectado por Git al repo de GitHub — cada push a `main` dispara un deploy.
- **Base de datos**: Supabase Postgres (proyecto `ogumsazgbgkguedjtlpi`).
  - ⚠️ **Usar siempre el connection pooler** (`aws-0-us-east-1.pooler.supabase.com:6543`, usuario `postgres.<project-ref>`), **no** la conexión directa (`db.<project-ref>.supabase.co:5432`). La conexión directa de Supabase solo resuelve por IPv6, y las funciones serverless de Vercel no tienen salida IPv6 — la app fallaba con `Can't reach database server` hasta cambiar al pooler.
- **Dominio**: `pcproducciones.com.ar` / `www.pcproducciones.com.ar` ya están cargados en el proyecto de Vercel, pero el DNS del dominio todavía apunta al proveedor original (no a Vercel) — falta cargar un registro `A` (`@` → `76.76.21.21`) y `CNAME` (`www` → `cname.vercel-dns.com.`) en el panel de DNS del registrador. Mientras tanto el sitio está online en `https://pc-producciones-web.vercel.app`.

## Instagram automático

El feed de Instagram de la home (`InstagramFeed`) es un grid full-width que lee de la tabla `InstagramPost`. Esa tabla se llena de dos formas:

1. **Automática (recomendada)**: conectando la cuenta de Instagram desde `/admin/instagram`. Una vez conectada, un cron job de Vercel sincroniza las fotos todos los días (no se puede más seguido: el plan gratuito de Vercel solo permite cron jobs con frecuencia diaria) y renueva el token antes de que venza. También hay un botón "Sincronizar ahora" para forzarlo.
2. **Manual**: pegando una URL de imagen (y opcionalmente el link al post) desde el mismo panel — útil como fallback o para fotos que no están en Instagram.

### Setup inicial (una sola vez, lo tiene que hacer alguien con acceso a la cuenta de Instagram/Facebook de PC)

1. La cuenta de Instagram (`@pcproduccionesok`) tiene que ser **Business o Creator**, no personal (se cambia desde la app, en Configuración → Cuenta → Cambiar a cuenta profesional).
2. Entrar a [developers.facebook.com/apps](https://developers.facebook.com/apps) y crear una app.
3. Dentro de la app, agregar el producto **Instagram** → **API setup with Instagram login** (Business Login).
4. En la configuración del producto vas a encontrar el **Instagram App ID** y el **Instagram App Secret** — van en las variables de entorno `INSTAGRAM_APP_ID` y `INSTAGRAM_APP_SECRET`.
5. En la lista de **OAuth redirect URIs**, agregar: `https://www.pcproducciones.com.ar/api/admin/instagram/callback` (y mientras el dominio no esté activo, también `https://pc-producciones-web.vercel.app/api/admin/instagram/callback`).
6. Cargar esas variables en Vercel (`INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI`) y un `CRON_SECRET` (cualquier string largo al azar) para autenticar los cron jobs.
7. Entrar a `/admin/instagram` en el sitio ya deployado y click en **"Conectar cuenta de Instagram"** — pide loguearse con la cuenta de Instagram de PC y autorizar. Como es la cuenta del dueño de la app, no hace falta pasar por revisión de Meta (App Review); queda funcionando en modo Development indefinidamente.

## Pendientes antes de producción

Ver la sección 6 de [PROMPT_DESARROLLO_LANDING.md](./PROMPT_DESARROLLO_LANDING.md): número de WhatsApp real, dominio final, copys, listado de artistas y redes del footer.

- [ ] `public/video/hero-bg.mp4` es un video de stock genérico (Pexels, uso libre comercial) usado como placeholder del fondo del hero. Reemplazar por material real de PC (shows, backstage, etc).
- [ ] Conectar la cuenta de Instagram desde `/admin/instagram` (ver sección de arriba) para que el feed se sincronice solo.
