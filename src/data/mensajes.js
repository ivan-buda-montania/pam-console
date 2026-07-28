import { fechaRel } from "./seed";

// Comunicación interna por evento (módulo 3.5). Semilla; los mensajes nuevos
// se agregan y persisten en localStorage (ver mensajesService).
export const MENSAJES_SEED = {
  "evt-11": [
    { id: "msg-11-1", autor: "Poncho Arocha", texto: "Confirmado el escenario con el proveedor. Falta cerrar catering.", fecha: fechaRel(-3) },
    { id: "msg-11-2", autor: "Logística", texto: "Vuelos y hotel reservados para el equipo (12 pax).", fecha: fechaRel(-2) },
    { id: "msg-11-3", autor: "Booking", texto: "Preventa arriba del 70%, vamos muy bien.", fecha: fechaRel(-1) },
  ],
  "evt-6": [
    { id: "msg-6-1", autor: "Producción", texto: "Rider técnico entregado al festival.", fecha: fechaRel(-16) },
    { id: "msg-6-2", autor: "Poncho Arocha", texto: "Gran presentación, mucho alcance en redes. ¡Felicidades al equipo!", fecha: fechaRel(-14) },
  ],
  "evt-15": [
    {
      id: "msg-15-1",
      autor: "Poncho Arocha",
      texto: "El cliente confirmó 3 tandas. Ajusté el cachet en el contrato adjunto.",
      fecha: fechaRel(-1),
      adjunto: { nombre: "Contrato Palenque GDL.pdf", tipo: "contrato" },
    },
  ],
  "evt-3": [
    { id: "msg-3-1", autor: "Cobranza", texto: "La factura de este evento está vencida. Dando seguimiento con el cliente.", fecha: fechaRel(-2) },
  ],
};
