# Consola PAM — Poncho Arocha Management

Prototipo navegable de la **Consola de Facturación, Costos y Administración** para
Poncho Arocha Management (gestión de talento y eventos). Interfaz 100 % en español,
con datos de ejemplo. **No tiene backend**: los datos viven en fixtures y los cambios
se guardan en `localStorage` de este navegador.

## Acceso

Código de demostración: **`PONCHO2026`** (visible en la pantalla de acceso).

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción a dist/
npm run preview    # sirve el build de producción
npm run lint       # oxlint
```

## Alcance (MVP núcleo)

- **Inicio** — panorama: eventos próximos, facturas vencidas, facturado del mes.
- **Artistas** — perfiles con pestañas: general y redes, documentos (repositorio
  simulado), historial de eventos y precios/negociación.
- **Agenda** — calendario mensual con código de color por estado de contrato
  (verde = confirmado, ámbar = pendiente, rojo = cancelado, gris = en revisión),
  alertas de eventos próximos (7/15/30 días), vista de lista y filtros.
- **Evento** — desglose de costos del show, desglose de precio de venta y
  rentabilidad (margen).
- **Facturación** — listado con semáforo de estado, filtros avanzados (fechas,
  categorías, estado, cliente, artista), detalle con conceptos categorizados,
  cambio de estado (se persiste), y **resumen por categoría** con gráfica.
- **Configuración** — edición de categorías de facturación y restablecer datos de demo.

## Notas del prototipo

- Las acciones **Exportar PDF/Excel**, **Enviar por correo** y **Subir documento**
  son simuladas (muestran un aviso). Estarán disponibles en la versión final.
- Las **fechas** de los datos de ejemplo son relativas a "hoy" para que las alertas
  y las facturas vencidas siempre luzcan bien en la demostración.
- Moneda **MXN**, IVA **16 %** (centralizados; fáciles de cambiar).
- Al **eliminar una categoría**, las líneas de factura que la usaban se muestran
  como «Otras» (categoría de respaldo, no eliminable).

## Arquitectura (pensada para crecer)

Todo el acceso a datos pasa por una **capa de servicios** (`src/services/*`) que hoy
lee de fixtures + `localStorage`. Para convertirlo en la app real (React + API Python
+ Postgres), se reemplaza esa capa por llamadas HTTP **sin tocar los componentes**.

```
src/
├── data/          fixtures (artistas, clientes, eventos, facturas, categorías)
├── services/      capa de datos (auth, artistas, eventos, facturas, categorías)
├── utils/         formato, fechas, cálculos, estados/colores
├── hooks/         useAsyncData, useCatalogos
├── components/    ui/ (kit), layout/, artistas/, agenda/, eventos/, facturacion/, configuracion/
└── pages/         una por ruta
```

Stack: Vite + React 19 (JSX), React Router v7, Tailwind CSS 3, framer-motion, recharts.
# pam-console-demo
# pam-console-demo
# pam-console-demo
# pam-console-demo
# pam-console-demo
# pam-console-demo
# pam-console
