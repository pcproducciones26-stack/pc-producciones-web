# Prompt de desarrollo — Landing Page Productora "PC"

Contexto: clon casi exacto (estructura, layout y estilo visual) de **https://6pasos.com**, adaptado a la marca "PC" (productora de eventos en vivo). Sitio 100% en español.

## 1. Stack técnico

- **Framework**: Next.js (App Router) + TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: Postgres (Vercel Postgres o Supabase) vía Prisma ORM — necesaria para el panel de admin de fechas
- **Almacenamiento de imágenes**: Vercel Blob (o Cloudinary) para las imágenes de cada evento subidas desde el admin
- **Envío de emails**: Resend (o similar) para el formulario de contacto
- **Deploy**: Vercel
- **Dominio**: aún no definido — dejar como variable de entorno `NEXT_PUBLIC_SITE_URL` fácil de reemplazar

## 2. Branding

- Logo: dos versiones ya provistas en `/LOGOS`:
  - `pc-negro.png` → usar sobre fondos claros
  - `pc-blanco.png` → usar sobre fondos oscuros / header transparente sobre hero
- Paleta: **estrictamente blanco y negro** (más escala de grises), sin color de acento. Todo el contrastes, botones, hovers y estados se resuelven con blanco/negro/grises, al estilo editorial/minimalista.
- Tipografía: sans-serif moderna tipo la de 6pasos.com (ej. Inter, Neue Montreal o similar), pesos bold para títulos grandes.
- Idioma: español únicamente, sin selector de idioma.

## 3. Estructura de secciones (clon de 6pasos.com)

### 3.1 Header / Navegación
- Sticky, fondo transparente sobre el hero que pasa a sólido al hacer scroll.
- Logo PC a la izquierda (versión blanca u negra según fondo).
- Links: **Próximos Shows**, **Shows**, **Quiénes Somos**, **Contacto**.
- Versión mobile: menú hamburguesa.

### 3.2 Hero
- Título grande tipo "Experiencias en vivo" (adaptar copy a la voz de PC — usar placeholder marcado `[COPY HERO]` hasta tener el texto definitivo).
- Bajada/descripción corta sobre la productora.
- Dos CTAs: "Ver próximos shows" (ancla a sección de fechas) y "Conocé la productora" (ancla a Quiénes Somos).

### 3.3 Carrusel de artistas
- Marquee horizontal en loop continuo con nombres/logos de artistas producidos, separados por viñetas, igual que en 6pasos.com.
- Contenido placeholder `[LISTADO DE ARTISTAS]` a completar.

### 3.4 Próximas Fechas (grid de eventos) — **con carga vía admin**
- Grid de cards, cada una con:
  - Imagen destacada del evento
  - Título del evento
  - Fecha (formato "DESDE / DÍA MES AÑO")
  - Lugar/venue
  - Botón **"Comprar entradas"** → link externo por evento (campo `ticket_url`, apunta a Passline, Eventbrite, Ticketek, etc. según cada evento)
- Mostrar un número inicial de eventos (ej. 9) con paginación "Anteriores / Siguientes" o botón "Ver más", igual que el original.
- Los eventos pasados no se muestran (filtrar por fecha) o se listan en una sección aparte "Shows realizados" (evaluar si se replica esa sección de 6pasos.com).

### 3.5 Quiénes Somos
- Descripción de PC como productora especializada en desarrollo de experiencias en vivo.
- Enumeración de áreas de trabajo (placeholder `[4 ÁREAS DE TRABAJO]`).
- Listado de artistas internacionales/nacionales producidos y mención a eventos corporativos (placeholder `[TEXTO QUIENES SOMOS]`).

### 3.6 Feed de Instagram
- Widget embebido (tipo SnapWidget, Elfsight o LightWidget) conectado a la cuenta de Instagram de PC, mostrando el contenido subido en tiempo real, sin necesidad de mantenimiento manual.
- Definir cuenta de Instagram a conectar (placeholder `[@USUARIO_INSTAGRAM]`).

### 3.7 Contacto
- Formulario con campos: **Nombre**, **Email**, **Teléfono (opcional)**, **Mensaje**.
- Al enviarse:
  - Se manda un email a **info@pcproducciones.com.ar** (vía Resend).
  - Se muestra además un botón directo de **WhatsApp** (`https://wa.me/[NUMERO_WHATSAPP]`) con mensaje precargado tipo "Hola, quiero hacer una consulta a PC Producciones". El número queda como variable de entorno `WHATSAPP_NUMBER` — **placeholder pendiente de completar**.
- Mostrar también email y ubicación (Santa Fe, Argentina) como en el sitio original.

### 3.8 Footer
- Logo PC.
- Links de navegación repetidos.
- Iconos de redes sociales (Instagram, Facebook, X, LinkedIn — confirmar cuáles aplican, dejar placeholders `[LINK RED SOCIAL]`).
- Copyright con año dinámico.
- Botón "Volver arriba".

## 4. Panel de administración (`/admin`)

- Ruta protegida por login (usuario/contraseña), sin registro público. Usar NextAuth (Credentials Provider) o un middleware simple con sesión + password hasheada en variable de entorno.
- **CRUD de "Próximas Fechas"**, con los campos:
  - `title` (texto)
  - `date` (fecha/hora)
  - `venue` (lugar)
  - `image` (subida de imagen)
  - `ticket_url` (link externo de entradas)
  - `description` (texto opcional)
  - `status` (publicado / borrador)
- Listado de eventos cargados con opción de editar/eliminar/reordenar.
- El grid de "Próximas Fechas" de la home debe consumir estos datos dinámicamente (no hardcodeados).
- Fuera de alcance del admin: el feed de Instagram (se gestiona solo desde la cuenta de IG vía el widget).

## 5. No funcional

- Diseño 100% responsive, mobile-first (validar especialmente el grid de eventos y el carrusel de artistas en mobile).
- SEO: metadata por página, Open Graph con imagen del logo/hero, sitemap.xml.
- Performance: imágenes optimizadas (next/image), lazy loading en el grid de eventos y el feed de Instagram.
- Accesibilidad: contraste adecuado en el esquema blanco/negro, alt text en imágenes, navegación por teclado.
- Analítica: dejar preparado un slot para Google Analytics / Vercel Analytics (a activar cuando haya dominio final).

## 6. Placeholders pendientes de completar antes de producción

- [ ] Número de WhatsApp Business (`WHATSAPP_NUMBER`)
- [ ] Dominio final (`NEXT_PUBLIC_SITE_URL`)
- [ ] Copy del Hero
- [ ] Texto y áreas de trabajo de "Quiénes Somos"
- [ ] Listado de artistas producidos (carrusel + sección Quiénes Somos)
- [ ] Usuario de Instagram a conectar en el widget
- [ ] Links de redes sociales del footer (Instagram, Facebook, X, LinkedIn)
- [ ] Credenciales de acceso al panel `/admin`
- [ ] Confirmar si se replica sección "Shows realizados" además de "Próximas Fechas"

## 7. Entregables

1. Sitio deployado en Vercel, conectado a un dominio provisorio (`.vercel.app`) hasta tener el dominio final.
2. Panel `/admin` funcional para cargar/editar/borrar fechas con sus links de entradas.
3. Formulario de contacto operativo enviando a info@pcproducciones.com.ar + botón de WhatsApp.
4. Feed de Instagram embebido y funcionando.
5. Documentación breve de cómo cargar una fecha nueva desde el admin (para uso no técnico).
