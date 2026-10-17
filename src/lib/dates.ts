// Los eventos se cargan en hora de Argentina (UTC-3, sin horario de verano),
// pero el servidor corre en UTC: hay que fijar el offset al convertir.
const ARGENTINA_OFFSET = "-03:00";
const ARGENTINA_OFFSET_MS = 3 * 60 * 60 * 1000;

// "2026-11-07T21:00" (valor de <input type="datetime-local">) -> Date
export function parseArgentinaDatetimeLocal(value: string) {
  return new Date(`${value.slice(0, 16)}:00${ARGENTINA_OFFSET}`);
}

// Date -> "2026-11-07T21:00" en hora de Argentina
export function toArgentinaDatetimeLocal(date: Date) {
  return new Date(date.getTime() - ARGENTINA_OFFSET_MS)
    .toISOString()
    .slice(0, 16);
}

// Date -> "2026-11-07T21:00:00-03:00" (ISO 8601 con el offset de Argentina)
export function toArgentinaIso(date: Date | string) {
  return `${toArgentinaDatetimeLocal(new Date(date))}:00${ARGENTINA_OFFSET}`;
}
