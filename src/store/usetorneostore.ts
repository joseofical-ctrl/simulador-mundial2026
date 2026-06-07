// src/store/useTorneoStore.ts
import { create } from 'zustand';
import equiposData from '../data/equipos.json';
import type { Equipo } from '../types/types';

const equiposIniciales: Equipo[] = equiposData.map(eq => ({
  ...eq,
  posicionGrupo: 0, 
  puntos: 0, golesFavor: 0, golesContra: 0, partidosJugados: 0
}));

export interface PartidoEliminatorio {
  id: string; 
  equipoLocalId: string | null;
  equipoVisitaId: string | null;
  ganadorId: string | null;
  ronda: 'R32' | 'OCTAVOS' | 'CUARTOS' | 'SEMIS' | 'FINAL' | 'TERCEROS';
  lado: 'IZQ' | 'DER' | 'CENTRO';
}

interface TorneoState {
  equipos: Equipo[];
  faseActual: 'INICIO' | 'GRUPOS' | 'ELIMINATORIAS'; // Agregamos 'INICIO'
  partidos: PartidoEliminatorio[];
  empezarSimulacion: () => void; // Nueva función
  moverEquipoPosicion: (equipoId: string, nuevaPosicion: number) => void;
  avanzarAEliminatorias: (tercerosClasificadosIds: string[]) => void;
  seleccionarGanador: (partidoId: string, ganadorId: string) => void;
  resetearTorneo: () => void;
}

export const useTorneoStore = create<TorneoState>((set) => ({
  equipos: equiposIniciales,
  faseActual: 'INICIO', // El estado inicial ahora es INICIO
  partidos: [],
  
  empezarSimulacion: () => set({ faseActual: 'GRUPOS' }),

  moverEquipoPosicion: (equipoId, nuevaPosicion) => set((state) => {
    const equipoActual = state.equipos.find(e => e.id === equipoId);
    if (!equipoActual) return state;

    const equipoEnDestino = nuevaPosicion !== 0 
      ? state.equipos.find(e => 
          e.grupo === equipoActual.grupo && 
          e.posicionGrupo === nuevaPosicion &&
          e.id !== equipoId
        )
      : undefined;

    return {
      equipos: state.equipos.map(eq => {
        if (eq.id === equipoId) return { ...eq, posicionGrupo: nuevaPosicion };
        if (equipoEnDestino && eq.id === equipoEnDestino.id) {
          return { ...eq, posicionGrupo: equipoActual.posicionGrupo || 0 }; 
        }
        return eq;
      })
    };
  }),

  avanzarAEliminatorias: (tercerosClasificadosIds) => set((state) => {
    const primeros = state.equipos.filter(eq => eq.posicionGrupo === 1);
    const segundos = state.equipos.filter(eq => eq.posicionGrupo === 2);
    const terceros = state.equipos.filter(eq => tercerosClasificadosIds.includes(eq.id));

    const todosLosPartidos: PartidoEliminatorio[] = [];

    // ==========================================
    // MAPEO OFICIAL FIFA (16avos de Final)
    // Garantiza que los 1ros lugares sean recompensados
    // ==========================================

    // LADO IZQUIERDO (L1 a L8)
    todosLosPartidos.push({ id: 'R32-L1', equipoLocalId: primeros[0]?.id || null, equipoVisitaId: terceros[0]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L2', equipoLocalId: segundos[0]?.id || null, equipoVisitaId: segundos[1]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L3', equipoLocalId: primeros[1]?.id || null, equipoVisitaId: terceros[1]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L4', equipoLocalId: primeros[2]?.id || null, equipoVisitaId: segundos[2]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L5', equipoLocalId: primeros[3]?.id || null, equipoVisitaId: terceros[2]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L6', equipoLocalId: segundos[3]?.id || null, equipoVisitaId: segundos[4]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L7', equipoLocalId: primeros[4]?.id || null, equipoVisitaId: terceros[3]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'R32-L8', equipoLocalId: primeros[5]?.id || null, equipoVisitaId: segundos[5]?.id || null, ganadorId: null, ronda: 'R32', lado: 'IZQ' });

    // LADO DERECHO (R1 a R8)
    todosLosPartidos.push({ id: 'R32-R1', equipoLocalId: primeros[6]?.id || null, equipoVisitaId: terceros[4]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R2', equipoLocalId: segundos[6]?.id || null, equipoVisitaId: segundos[7]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R3', equipoLocalId: primeros[7]?.id || null, equipoVisitaId: terceros[5]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R4', equipoLocalId: primeros[8]?.id || null, equipoVisitaId: segundos[8]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R5', equipoLocalId: primeros[9]?.id || null, equipoVisitaId: terceros[6]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R6', equipoLocalId: segundos[9]?.id || null, equipoVisitaId: segundos[10]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R7', equipoLocalId: primeros[10]?.id || null, equipoVisitaId: terceros[7]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });
    todosLosPartidos.push({ id: 'R32-R8', equipoLocalId: primeros[11]?.id || null, equipoVisitaId: segundos[11]?.id || null, ganadorId: null, ronda: 'R32', lado: 'DER' });

    // Generar casillas vacías para las rondas futuras
    for (let i = 0; i < 4; i++) {
      todosLosPartidos.push({ id: `OCT-L${i+1}`, equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'OCTAVOS', lado: 'IZQ' });
      todosLosPartidos.push({ id: `OCT-R${i+1}`, equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'OCTAVOS', lado: 'DER' });
    }
    for (let i = 0; i < 2; i++) {
      todosLosPartidos.push({ id: `CRT-L${i+1}`, equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'CUARTOS', lado: 'IZQ' });
      todosLosPartidos.push({ id: `CRT-R${i+1}`, equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'CUARTOS', lado: 'DER' });
    }
    todosLosPartidos.push({ id: 'SMS-L1', equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'SEMIS', lado: 'IZQ' });
    todosLosPartidos.push({ id: 'SMS-R1', equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'SEMIS', lado: 'DER' });
    todosLosPartidos.push({ id: 'FNL-1', equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'FINAL', lado: 'CENTRO' });
    todosLosPartidos.push({ id: 'TRC-1', equipoLocalId: null, equipoVisitaId: null, ganadorId: null, ronda: 'TERCEROS', lado: 'CENTRO' });

    return { faseActual: 'ELIMINATORIAS', partidos: todosLosPartidos };
  }),

  seleccionarGanador: (partidoId, ganadorId) => set((state) => {
    let partidosActualizados = [...state.partidos];
    const partidoActual = partidosActualizados.find(p => p.id === partidoId);
    if (!partidoActual) return state;
    
    partidosActualizados = partidosActualizados.map(p => p.id === partidoId ? { ...p, ganadorId } : p);

    const [rondaActual, resto] = partidoId.split('-');
    const ladoActual = resto.substring(0, 1); 
    const numeroActual = parseInt(resto.substring(1) || '1', 10);
    
    let sigRonda = ''; let sigLado = ladoActual; let sigNum = Math.ceil(numeroActual / 2); let esLocal = numeroActual % 2 !== 0;

    if (rondaActual === 'R32') sigRonda = 'OCT';
    else if (rondaActual === 'OCT') sigRonda = 'CRT';
    else if (rondaActual === 'CRT') sigRonda = 'SMS';
    else if (rondaActual === 'SMS') {
      sigRonda = 'FNL'; sigLado = '1'; sigNum = 1; esLocal = ladoActual === 'L';
      const perdedorId = ganadorId === partidoActual.equipoLocalId ? partidoActual.equipoVisitaId : partidoActual.equipoLocalId;
      partidosActualizados = partidosActualizados.map(p => p.id === 'TRC-1' ? (ladoActual === 'L' ? {...p, equipoLocalId: perdedorId} : {...p, equipoVisitaId: perdedorId}) : p);
    }

    if (sigRonda) {
      const sigId = sigRonda === 'FNL' ? 'FNL-1' : `${sigRonda}-${sigLado}${sigNum}`;
      partidosActualizados = partidosActualizados.map(p => {
        if (p.id === sigId) return esLocal ? { ...p, equipoLocalId: ganadorId, ganadorId: null } : { ...p, equipoVisitaId: ganadorId, ganadorId: null };
        return p;
      });

      let idLimpieza = sigId;
      while (idLimpieza) {
        const [r, rest] = idLimpieza.split('-');
        const l = rest.substring(0,1); const n = parseInt(rest.substring(1) || '1', 10);
        let sR = '';
        if (r === 'R32') sR = 'OCT'; else if (r === 'OCT') sR = 'CRT'; else if (r === 'CRT') sR = 'SMS'; else if (r === 'SMS') sR = 'FNL';

        if(sR) {
          const sId = sR === 'FNL' ? 'FNL-1' : `${sR}-${l}${Math.ceil(n/2)}`;
          const sLoc = n % 2 !== 0;
          partidosActualizados = partidosActualizados.map(p => {
            if (p.id === sId) return sLoc ? { ...p, equipoLocalId: null, ganadorId: null } : { ...p, equipoVisitaId: null, ganadorId: null };
            return p;
          });
          idLimpieza = sId;
        } else break;
      }
    }
    return { partidos: partidosActualizados };
  }),

  // El reset ahora te devuelve a la pantalla de INICIO en lugar de los GRUPOS
  resetearTorneo: () => set({ equipos: equiposIniciales, faseActual: 'INICIO', partidos: [] }),
}));