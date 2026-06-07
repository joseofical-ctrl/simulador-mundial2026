// src/types/types.ts
export interface Equipo {
  id: string; // ej: "ARG", "MEX"
  nombre: string;
  grupo: string; // "A" hasta "L"
  puntosElo: number; // Para calcular probabilidades
  banderaUrl: string; // AHORA ES UNA URL DE IMAGEN (flagcdn)
  
  // Campos dinámicos para la simulación
  puntos: number;
  golesFavor: number;
  golesContra: number;
  partidosJugados: number;
  posicionGrupo: number; // 1, 2, 3 (pasan) o 0 (eliminado)
}