import { fechaRel } from "./seed";

// Proveedores, patrocinadores y alianzas (módulo 3.4). Solo lectura.
// tipo: proveedor | patrocinador | alianza
// cuentas[].direccion: pago (por pagar a proveedor) | cobro (por cobrar a patrocinador) | comision (alianza)
// cuentas[].estado: pendiente | pagado | vencido
export const ENTIDADES = [
  {
    id: "ent-1",
    razonSocial: "Sonido Profesional del Norte, S.A.",
    tipo: "proveedor",
    rubro: "Audio e iluminación",
    ciudad: "Monterrey",
    contacto: { nombre: "Raúl Cavazos", telefono: "+52 81 8123 4567", email: "raul@sonidonorte.mx" },
    condiciones: "Pago a 15 días. Incluye operador. Requiere adelanto del 30% para fechas foráneas.",
    cuentas: [
      { id: "cta-1-1", concepto: "Sonido — Palenque San Marcos", monto: 82000, direccion: "pago", estado: "pagado", fecha: fechaRel(-40), eventoId: "evt-1" },
      { id: "cta-1-2", concepto: "Monitores — Tecate Live Out", monto: 120000, direccion: "pago", estado: "pendiente", fecha: fechaRel(6), eventoId: "evt-6" },
    ],
  },
  {
    id: "ent-2",
    razonSocial: "Backline & Escenarios MX",
    tipo: "proveedor",
    rubro: "Producción de escenario",
    ciudad: "Guadalajara",
    contacto: { nombre: "Mónica Íñiguez", telefono: "+52 33 3145 8899", email: "monica@backlinemx.com" },
    condiciones: "Pago contra entrega. Montaje y desmontaje incluido. Penalización por cambios <72h.",
    cuentas: [
      { id: "cta-2-1", concepto: "Escenario — Palenque GDL", monto: 78000, direccion: "pago", estado: "pagado", fecha: fechaRel(-10), eventoId: "evt-7" },
      { id: "cta-2-2", concepto: "Producción — Arena VFG", monto: 160000, direccion: "pago", estado: "pendiente", fecha: fechaRel(30), eventoId: "evt-19" },
      { id: "cta-2-3", concepto: "Backline — Expo León", monto: 90000, direccion: "pago", estado: "vencido", fecha: fechaRel(-4), eventoId: "evt-3" },
    ],
  },
  {
    id: "ent-3",
    razonSocial: "Transportes Arocha Logística",
    tipo: "proveedor",
    rubro: "Transporte y traslados",
    ciudad: "Monterrey",
    contacto: { nombre: "Jorge Medina", telefono: "+52 81 8390 1122", email: "operaciones@transportesarocha.mx" },
    condiciones: "Pago a 30 días. Flota propia (autobús + 3 camionetas). Casetas y combustible por separado.",
    cuentas: [
      { id: "cta-3-1", concepto: "Traslados — Feria San Marcos", monto: 46000, direccion: "pago", estado: "pagado", fecha: fechaRel(-38), eventoId: "evt-1" },
      { id: "cta-3-2", concepto: "Traslados — Palenque GDL", monto: 80000, direccion: "pago", estado: "pendiente", fecha: fechaRel(16), eventoId: "evt-15" },
    ],
  },
  {
    id: "ent-4",
    razonSocial: "Catering Gourmet Eventos",
    tipo: "proveedor",
    rubro: "Catering y hospitalidad",
    ciudad: "Ciudad de México",
    contacto: { nombre: "Alejandra Nava", telefono: "+52 55 5512 7788", email: "eventos@cateringgourmet.mx" },
    condiciones: "Pago 50% anticipo, 50% al cierre. Menú personalizable. Mínimo 20 comensales.",
    cuentas: [
      { id: "cta-4-1", concepto: "Catering — Boda Treviño", monto: 110000, direccion: "pago", estado: "pagado", fecha: fechaRel(-18), eventoId: "evt-5" },
      { id: "cta-4-2", concepto: "Catering backstage — Auditorio", monto: 60000, direccion: "pago", estado: "pendiente", fecha: fechaRel(4), eventoId: "evt-11" },
    ],
  },
  {
    id: "ent-5",
    razonSocial: "Grupo Modelo",
    tipo: "patrocinador",
    rubro: "Bebidas",
    ciudad: "Ciudad de México",
    contacto: { nombre: "Diana Robles", telefono: "+52 55 2288 4410", email: "diana.robles@gmodelo.com.mx" },
    condiciones: "Patrocinio por evento + activación de marca. Pago a 45 días contra reporte de métricas.",
    cuentas: [
      { id: "cta-5-1", concepto: "Patrocinio — Activación Modelo", monto: 320000, direccion: "cobro", estado: "pagado", fecha: fechaRel(-35), eventoId: "evt-2" },
      { id: "cta-5-2", concepto: "Patrocinio — Activación (creadora)", monto: 240000, direccion: "cobro", estado: "pendiente", fecha: fechaRel(18), eventoId: "evt-31" },
    ],
  },
  {
    id: "ent-6",
    razonSocial: "Cervecería Tecate (HEINEKEN MX)",
    tipo: "patrocinador",
    rubro: "Bebidas",
    ciudad: "Monterrey",
    contacto: { nombre: "Paola Guerra", telefono: "+52 81 8155 6620", email: "paola.guerra@tecatelivout.mx" },
    condiciones: "Patrocinio de escenario en festival. Naming rights. Pago a 30 días.",
    cuentas: [
      { id: "cta-6-1", concepto: "Naming escenario — Live Out", monto: 420000, direccion: "cobro", estado: "vencido", fecha: fechaRel(-6), eventoId: "evt-6" },
      { id: "cta-6-2", concepto: "Patrocinio — Pa'l Norte", monto: 380000, direccion: "cobro", estado: "pendiente", fecha: fechaRel(8), eventoId: "evt-12" },
    ],
  },
  {
    id: "ent-7",
    razonSocial: "Coca-Cola FEMSA",
    tipo: "patrocinador",
    rubro: "Bebidas",
    ciudad: "Monterrey",
    contacto: { nombre: "Mariana Elizondo", telefono: "+52 81 8318 1000", email: "mariana.elizondo@kof.com.mx" },
    condiciones: "Campañas de contenido + presencia en eventos. Pago a 45 días.",
    cuentas: [
      { id: "cta-7-1", concepto: "Campaña de contenido — creadora", monto: 300000, direccion: "cobro", estado: "pagado", fecha: fechaRel(-20), eventoId: "evt-30" },
      { id: "cta-7-2", concepto: "Presencia — Convención FEMSA", monto: 200000, direccion: "cobro", estado: "pendiente", fecha: fechaRel(84), eventoId: "evt-27" },
    ],
  },
  {
    id: "ent-8",
    razonSocial: "OCESA",
    tipo: "alianza",
    rubro: "Venue y boletaje",
    ciudad: "Ciudad de México",
    contacto: { nombre: "Laura Cantú", telefono: "+52 55 4412 9087", email: "laura.cantu@ocesa.mx" },
    condiciones: "Alianza de boletaje y recintos. Comisión del 8% sobre taquilla. Liquidación post-evento.",
    cuentas: [
      { id: "cta-8-1", concepto: "Comisión boletaje — Auditorio", monto: 84000, direccion: "comision", estado: "pendiente", fecha: fechaRel(4), eventoId: "evt-11" },
      { id: "cta-8-2", concepto: "Comisión boletaje — Zócalo", monto: 0, direccion: "comision", estado: "pendiente", fecha: fechaRel(70), eventoId: "evt-25" },
    ],
  },
  {
    id: "ent-9",
    razonSocial: "Palenque de la Feria — Guadalajara",
    tipo: "alianza",
    rubro: "Recinto",
    ciudad: "Guadalajara",
    contacto: { nombre: "Roberto Íñiguez", telefono: "+52 33 3612 7788", email: "roberto@palenquegdl.mx" },
    condiciones: "Alianza de recinto. Renta + porcentaje de consumo. Fechas prioritarias para talento PAM.",
    cuentas: [
      { id: "cta-9-1", concepto: "Liquidación — Palenque GDL", monto: 60000, direccion: "comision", estado: "pagado", fecha: fechaRel(-10), eventoId: "evt-7" },
    ],
  },
  {
    id: "ent-10",
    razonSocial: "Agencia Digital Pulso",
    tipo: "alianza",
    rubro: "Medios y contenido",
    ciudad: "Ciudad de México",
    contacto: { nombre: "Sofía Márquez", telefono: "+52 55 6677 8899", email: "hola@agenciapulso.mx" },
    condiciones: "Alianza de contenido: producción audiovisual a cambio de créditos y difusión. Intercambio.",
    cuentas: [
      { id: "cta-10-1", concepto: "Intercambio — cobertura festivales", monto: 0, direccion: "comision", estado: "pagado", fecha: fechaRel(-14), eventoId: "evt-6" },
    ],
  },
];
