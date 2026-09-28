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

## Pendientes antes de producción

Ver la sección 6 de [PROMPT_DESARROLLO_LANDING.md](./PROMPT_DESARROLLO_LANDING.md): número de WhatsApp real, dominio final, copys, listado de artistas, usuario de Instagram, redes del footer y credenciales de admin definitivas.

- [ ] `public/video/hero-bg.mp4` es un video de stock genérico (Pexels, uso libre comercial) usado como placeholder del fondo del hero. Reemplazar por material real de PC (shows, backstage, etc).
