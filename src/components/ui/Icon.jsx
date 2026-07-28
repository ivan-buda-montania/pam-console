// Iconos SVG inline (sin dependencias externas). Estilo lineal, stroke currentColor.
const PATHS = {
  inicio: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>,
  artistas: <><path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /><path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" /></>,
  agenda: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
  facturacion: <><path d="M6 3h9l3 3v15l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  configuracion: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  logout: <><path d="M15 4h4v16h-4" /><path d="M10 8l-4 4 4 4M6 12h9" /></>,
  menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  "chevron-left": <><path d="m15 5-7 7 7 7" /></>,
  "chevron-right": <><path d="m9 5 7 7-7 7" /></>,
  "chevron-down": <><path d="m6 9 6 6 6-6" /></>,
  external: <><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>,
  tiktok: <><path d="M15 4c.5 2.5 2 4 4.5 4.3" /><path d="M15 4v9.5a4 4 0 1 1-4-4" /></>,
  youtube: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M11 9.5v5l4-2.5-4-2.5Z" fill="currentColor" /></>,
  spotify: <><circle cx="12" cy="12" r="9" /><path d="M7.5 10c3-1 6.5-.7 9 1M8 13c2.3-.7 5-.5 7 .8M8.5 16c1.8-.5 3.7-.3 5 .6" /></>,
  contrato: <><path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" /></>,
  dossier: <><path d="M4 5a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" /></>,
  rider: <><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 3h6v3H9zM9 11h6M9 15h4" /></>,
  doc: <><path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v4h4" /></>,
  download: <><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" /></>,
  alerta: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 10v4M12 17.5v.5" /></>,
  check: <><path d="m5 12 5 5 9-11" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>,
  editar: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="M14 5l4 4" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  excel: <><path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v4h4M10 12l4 5M14 12l-4 5" /></>,
  pie: <><path d="M12 3a9 9 0 1 0 9 9h-9V3Z" /><path d="M14 3.5A9 9 0 0 1 20.5 10H14V3.5Z" /></>,
  barras: <><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></>,
  dinero: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.2c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.8-2.5.8-2.5 1.8 1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7" /></>,
  ubicacion: <><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  reloj: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  filtro: <><path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" /></>,
  usuario: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  telefono: <><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 17v4a17 17 0 0 1-16-16Z" /></>,
  evento: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4M8 13h3v3H8z" /></>,
  arriba: <><path d="M12 19V5M6 11l6-6 6 6" /></>,
  abajo: <><path d="M12 5v14M6 13l6 6 6-6" /></>,
  sol: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" /></>,
  luna: <><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></>,
  maletin: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
  campana: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0" /></>,
  adjuntar: <><path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5L11 20" /></>,
  enviar: <><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></>,
  tabla: <><rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M3 9.5h18M3 14.5h18M9 4.5v15" /></>,
  tarjetas: <><rect x="3" y="4" width="7" height="7" rx="1.5" /><rect x="14" y="4" width="7" height="7" rx="1.5" /><rect x="3" y="13" width="7" height="7" rx="1.5" /><rect x="14" y="13" width="7" height="7" rx="1.5" /></>,
  entrada: <><path d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" /><path d="M14 8l4 4-4 4M18 12H9" /></>,
};

export default function Icon({ name, size = 20, className = "", strokeWidth = 1.75, ...rest }) {
  const inner = PATHS[name];
  if (!inner) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {inner}
    </svg>
  );
}
