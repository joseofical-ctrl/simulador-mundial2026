// src/components/TablaGrupo.tsx
import type { Equipo } from '../types/types';
import { useTorneoStore } from '../store/usetorneostore';

interface TablaGrupoProps {
  letra: string;
  equipos: Equipo[];
}

export const TablaGrupo = ({ letra, equipos }: TablaGrupoProps) => {
  const moverEquipo = useTorneoStore(state => state.moverEquipoPosicion);

  const equiposOrdenados = [...equipos].sort((a, b) => {
    const posA = a.posicionGrupo || 0;
    const posB = b.posicionGrupo || 0;
    if (posA === 0 && posB !== 0) return 1;
    if (posA !== 0 && posB === 0) return -1;
    return posA - posB;
  });

  const manejarClick = (equipoId: string, posActual: number) => {
    if (posActual !== 0) {
      moverEquipo(equipoId, 0);
      return;
    } 
    
    const posicionesOcupadas = equipos
      .map(eq => eq.posicionGrupo || 0)
      .filter(p => p > 0);
      
    let nuevaPos = 0;
    
    if (!posicionesOcupadas.includes(1)) nuevaPos = 1;
    else if (!posicionesOcupadas.includes(2)) nuevaPos = 2;
    else if (!posicionesOcupadas.includes(3)) nuevaPos = 3;

    if (nuevaPos !== 0) {
      moverEquipo(equipoId, nuevaPos);
    }
  };

  return (
    // Fondo ligeramente más claro que el fondo general para que resalte la tarjeta
    <div className="bg-[#111827] rounded-2xl overflow-hidden border border-[#2d3748] p-4 shadow-2xl transition-all hover:border-[#4b5563]">
      <div className="text-center mb-5 border-b border-[#1f2937] pb-3">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#aa8529] tracking-widest uppercase">
          Grupo {letra}
        </h2>
      </div>
      
      <div className="flex flex-col gap-2">
        {equiposOrdenados.map((equipo) => {
          const posicion = equipo.posicionGrupo || 0;
          
          let bgStyle = "bg-[#1f2937] border-transparent hover:bg-[#374151]";
          let textStyle = "text-transparent";
          let posLabel = "";

          if (posicion === 1 || posicion === 2) {
            bgStyle = "bg-[#064e3b] border-[#10b981]";
            textStyle = "text-[#34d399]";
            posLabel = `${posicion}°`;
          } else if (posicion === 3) {
            bgStyle = "bg-[#451a03] border-[#f59e0b]";
            textStyle = "text-[#fbbf24]";
            posLabel = "3°";
          }

          return (
            <button 
              key={equipo.id} 
              onClick={() => manejarClick(equipo.id, posicion)}
              className={`flex items-center justify-between w-full p-3 rounded-xl border ${bgStyle} transition-all duration-300 cursor-pointer text-left focus:outline-none`}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={equipo.banderaUrl} 
                  alt={`Bandera de ${equipo.nombre}`} 
                  className="w-9 h-9 rounded-full object-cover shadow-md bg-white border-2 border-[#374151]"
                />
                <span className="font-bold text-slate-100 text-lg tracking-wide">
                  {equipo.nombre}
                </span>
              </div>

              <span className={`text-2xl font-black ${textStyle}`}>
                {posLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};