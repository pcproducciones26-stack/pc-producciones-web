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

## Instagram

Hay dos secciones distintas relacionadas con Instagram en la home, con fuentes de datos separadas:

- **"Seguinos en Instagram"** (`InstagramFeed`): un widget de terceros (LightWidget) embebido a todo el ancho, controlado por `NEXT_PUBLIC_INSTAGRAM_WIDGET_ID`. Sin ese id configurado, se muestra un cartel con link al perfil.
- **"Eventos pasados"** (`PastEventsSection`): lee de la tabla `InstagramPost`, la misma que se administra en `/admin/instagram`. Cada foto se muestra con su descripción superpuesta y linkea al post/reel real al hacer click.

`/admin/instagram` alimenta **solo** la sección "Eventos pasados" — las fotos que cargues ahí (a mano o vía la sincronización con la API de Meta) van a esa sección, no al widget de "Seguinos en Instagram" (que es independiente).

### Setup del widget de LightWidget

Crear una cuenta en [lightwidget.com](https://lightwidget.com/create-account), generar un widget para `@pcproduccionesok`, y cargar el id que te dan (el código entre `/widgets/` y `.html` del embed) en `NEXT_PUBLIC_INSTAGRAM_WIDGET_ID` (en Vercel y en `.env` local).

### Setup de la galería propia (API de Meta) — opcional, solo si se vuelve a activar

### Setup inicial (una sola vez, lo tiene que hacer alguien con acceso a la cuenta de Instagram/Facebook de PC)

1. La cuenta de Instagram (`@pcproduccionesok`) tiene que ser **Business o Creator**, no personal (se cambia desde la app, en Configuración → Cuenta → Cambiar a cuenta profesional).
2. Entrar a [developers.facebook.com/apps](https://developers.facebook.com/apps) y crear una app.
3. Dentro de la app, agregar el producto **Instagram** → **API setup with Instagram login** (Business Login).
4. En la configuración del producto vas a encontrar el **Instagram App ID** y el **Instagram App Secret** — van en las variables de entorno `INSTAGRAM_APP_ID` y `INSTAGRAM_APP_SECRET`.
5. En la lista de **OAuth redirect URIs**, agregar: `https://www.pcproducciones.com.ar/api/admin/instagram/callback` (y mientras el dominio no esté activo, también `https://pc-producciones-web.vercel.app/api/admin/instagram/callback`).
6. Cargar esas variables en Vercel (`INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI`) y un `CRON_SECRET` (cualquier string largo al azar) para autenticar los cron jobs.
7. Entrar a `/admin/instagram` en el sitio ya deployado y click en **"Conectar cuenta de Instagram"** — pide loguearse con la cuenta de Instagram de PC y autorizar. Como es la cuenta del dueño de la app, no hace falta pasar por revisión de Meta (App Review); queda funcionando en modo Development indefinidamente.

## Configuración del sitio (`/admin/settings`)

Panel para editar contenido general sin tocar código:

- **Video de fondo del hero**: se sube el archivo directo desde el navegador (drag & drop / seleccionar archivo), sin pasar por el límite de 4.5MB de las funciones de Vercel — usa la subida directa a **Vercel Blob** (`upload()` de `@vercel/blob/client`, con el token de un lado a otro vía `/api/admin/site-settings/hero-video`). Requiere la variable `BLOB_READ_WRITE_TOKEN` (ya conectada en Vercel al crear el Blob Store `pc-producciones-assets`; para probar la subida en local hay que copiarla también al `.env`, ej. con `vercel env pull`).
- **Artistas de la marquesina**: lista editable que alimenta el scroll debajo del hero.

Todo se guarda en la tabla `SiteSettings` (fila única `id="singleton"`). Si no hay nada cargado, se usan valores por defecto (el video local `public/video/hero-bg.mp4` y una lista de artistas de placeholder).

## Pendientes antes de producción

Ver la sección 6 de [PROMPT_DESARROLLO_LANDING.md](./PROMPT_DESARROLLO_LANDING.md): copys y contenido pendiente.

- [ ] El video del hero es de stock (Pexels, uso libre comercial) por defecto — subir uno real desde `/admin/settings`.
- [ ] Cargar los nombres reales de artistas en la marquesina desde `/admin/settings`.
- [ ] Conectar la cuenta de Instagram desde `/admin/instagram` (ver sección de arriba) o configurar el widget de LightWidget para que el feed se sincronice solo.
- [ ] **El formulario de contacto no envía emails todavía** — sin `RESEND_API_KEY` configurada, los mensajes solo quedan en el log del servidor. Hay que crear una cuenta en [resend.com](https://resend.com) y cargar la API key.
- [x] Dominio (`pcproducciones.com.ar`) — activo y funcionando en producción.
