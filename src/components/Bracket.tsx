// src/components/Bracket.tsx
import { useState } from 'react';
import { useTorneoStore, type PartidoEliminatorio } from '../store/usetorneostore';
import type { Equipo } from '../types/types';

// ==========================================
// 1. COMPONENTE: TARJETA DE PARTIDO
// ==========================================
interface TarjetaProps {
  partido: PartidoEliminatorio;
  equipos: Equipo[];
  onSelectGanador: (partidoId: string, ganadorId: string) => void;
  inverted?: boolean;
  fullWidth?: boolean;
  isCompact?: boolean; 
}

const TarjetaPartidoElegante = ({ partido, equipos, onSelectGanador, inverted, fullWidth, isCompact }: TarjetaProps) => {
  const obtener = (id: string | null) => equipos.find(eq => eq.id === id) || null;
  const local = obtener(partido.equipoLocalId);
  const visita = obtener(partido.equipoVisitaId);
  const tieneGanador = partido.ganadorId !== null;

  const textSize = isCompact ? 'text-[11px] lg:text-xs xl:text-sm' : 'text-sm md:text-base xl:text-xl';
  const imgSize = isCompact ? 'w-5 h-5 xl:w-6 xl:h-6' : 'w-7 h-7 md:w-9 md:h-9 xl:w-11 xl:h-11';
  const padding = isCompact ? 'p-2' : 'p-3 md:p-4';

  const renderBotonEquipo = (team: Equipo | null) => (
    <button 
      onClick={() => team && onSelectGanador(partido.id, team.id)}
      disabled={!team}
      className={`flex items-center gap-2 ${padding} rounded-xl border-2 transition-all duration-300 w-full ${
        team ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'
      } ${
        partido.ganadorId === team?.id 
          ? 'bg-[#064e3b] border-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
          : tieneGanador 
            ? 'bg-[#1a1a1a] border-transparent opacity-40' 
            : 'bg-[#1f2937] border-transparent hover:border-[#4b5563]'
      } ${inverted ? 'flex-row-reverse' : ''}`}
    >
      {team ? (
        <>
          <img src={team.banderaUrl} alt={team.nombre} className={`${imgSize} rounded-full object-cover border border-[#374151] flex-shrink-0`} />
          <span className={`font-black ${textSize} tracking-wide flex-1 ${inverted ? 'text-right' : 'text-left'} truncate ${partido.ganadorId === team.id ? 'text-[#34d399]' : 'text-slate-100'}`}>
            {team.nombre}
          </span>
        </>
      ) : (
        <div className={`flex items-center gap-1.5 opacity-50 flex-shrink-0 w-full justify-center ${inverted ? 'flex-row-reverse' : ''}`}>
          <div className={`${imgSize} rounded-full bg-slate-800 border border-dashed border-slate-600 flex items-center justify-center font-bold text-[8px] text-slate-500`}>?</div>
          <span className={`font-bold text-slate-500 italic ${isCompact ? 'text-[10px]' : 'text-sm'}`}>Por definir</span>
        </div>
      )}
    </button>
  );

  return (
    <div className={`bg-[#111827] border border-[#2d3748] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10 hover:border-[#c09d3b]/50 transition-colors ${fullWidth ? 'w-full' : isCompact ? 'w-full' : 'w-56 md:w-64'}`}>
      <div className={`bg-[#1f2937] px-2.5 py-1.5 text-[8px] xl:text-[10px] font-black text-slate-400 border-b border-[#2d3748] flex justify-between uppercase tracking-widest`}>
        <span>{partido.ronda}</span>
        <span className="text-[#d4af37]">{partido.id}</span>
      </div>
      <div className="p-2 flex flex-col gap-1 bg-gradient-to-b from-[#111827] to-[#0f1420]">
        {renderBotonEquipo(local)}
        <div className="w-full h-px bg-[#1f2937] relative my-1">
           <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-black text-[#d4af37] bg-[#111827] px-1 uppercase">VS</span>
        </div>
        {renderBotonEquipo(visita)}
      </div>
    </div>
  );
};

// ==========================================
// 2. COMPONENTE: RENDERIZADOR DE COLUMNAS 
// ==========================================
interface RenderColProps {
  ids: string[];
  inverted?: boolean;
  tipo: 'OCT' | 'CRT' | 'SMS';
}

const RenderCol = ({ ids, inverted, tipo }: RenderColProps) => {
  const partidos = useTorneoStore(state => state.partidos);
  const equipos = useTorneoStore(state => state.equipos);
  const seleccionarGanador = useTorneoStore(state => state.seleccionarGanador);

  const getP = (id: string) => partidos.find(p => p.id === id);

  return (
    <div className={`flex flex-col justify-around h-full py-4 relative ${tipo === 'OCT' ? 'gap-3' : 'gap-14'} ${inverted ? 'items-end' : 'items-start'}`} w-full="true">
      {ids.map(id => {
        const partido = getP(id);
        if (!partido) return null;
        return (
          <div key={id} className="relative group w-full">
            <TarjetaPartidoElegante 
              partido={partido} 
              equipos={equipos} 
              onSelectGanador={seleccionarGanador} 
              inverted={inverted} 
              isCompact={true} 
            />
            {tipo !== 'SMS' && (
              <div className={`absolute top-1/2 w-4 lg:w-5 h-[2px] bg-[#aa8529]/30 group-hover:bg-[#d4af37] transition-colors z-0 ${inverted ? '-left-4 lg:-left-5' : '-right-4 lg:-right-5'}`}></div>
            )}
            {tipo === 'OCT' && (
              <div className={`absolute w-[2px] bg-[#aa8529]/30 group-hover:bg-[#d4af37] transition-colors z-0 ${inverted ? '-left-4 lg:-left-5' : '-right-4 lg:-right-5'} ${id.includes('1') || id.includes('3') ? 'top-1/2 h-[calc(50%+1.5rem)]' : 'bottom-1/2 h-[calc(50%+1.5rem)]'}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// 3. COMPONENTE PRINCIPAL: BRACKET
// ==========================================
export const Bracket = () => {
  const partidos = useTorneoStore(state => state.partidos);
  const equipos = useTorneoStore(state => state.equipos);
  const resetearTorneo = useTorneoStore(state => state.resetearTorneo);
  const seleccionarGanador = useTorneoStore(state => state.seleccionarGanador);

  const [vista, setVista] = useState<'R32' | 'ARBOL'>('R32');

  const getP = (id: string) => partidos.find(p => p.id === id);
  const partidosR32 = partidos.filter(p => p.ronda === 'R32');

  return (
    <div className="w-full text-white animate-fade-in pb-10">
      
      {/* Cabecera Responsiva */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b border-slate-800 pb-4 px-4 gap-4">
        <div className="text-center md:text-left w-full md:w-auto">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-[#fde047] uppercase tracking-tighter">
            Fase Eliminatoria
          </h2>
        </div>

        <div className="flex bg-[#111827] p-1 rounded-xl border border-[#2d3748] shadow-lg w-full sm:w-auto justify-center">
          <button 
            onClick={() => setVista('R32')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg font-bold text-xs tracking-widest transition-all uppercase ${vista === 'R32' ? 'bg-[#c09d3b] text-[#0a0e17] shadow-md' : 'text-slate-400 hover:text-white hover:bg-[#1f2937]'}`}
          >
            16avos
          </button>
          <button 
            onClick={() => setVista('ARBOL')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg font-bold text-xs tracking-widest transition-all uppercase ${vista === 'ARBOL' ? 'bg-[#c09d3b] text-[#0a0e17] shadow-md' : 'text-slate-400 hover:text-white hover:bg-[#1f2937]'}`}
          >
            Árbol Principal
          </button>
        </div>

        <button 
          onClick={resetearTorneo} 
          className="bg-[#1f2937] hover:bg-rose-900 text-slate-300 hover:text-white font-bold py-2 px-5 rounded-xl transition-all cursor-pointer uppercase text-xs tracking-wider w-full sm:w-auto"
        >
          Reiniciar Todo
        </button>
      </div>

      {/* VISTA 1: 16AVOS */}
      {vista === 'R32' && (
        <div className="w-full max-w-[1440px] mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partidosR32.map(partido => (
              <TarjetaPartidoElegante 
                key={partido.id} 
                partido={partido} 
                equipos={equipos} 
                onSelectGanador={seleccionarGanador} 
                fullWidth={true} 
              />
            ))}
          </div>
          <div className="text-center mt-12">
             <button 
                onClick={() => setVista('ARBOL')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#aa8529] text-[#0a0e17] hover:-translate-y-1 font-black py-4 px-10 rounded-xl shadow-xl transition-all cursor-pointer uppercase tracking-widest text-sm"
             >
                Ver Árbol Principal 🏆
             </button>
          </div>
        </div>
      )}

      {/* VISTA 2: ÁRBOL ESPEJO COMODO Y RESPONSIVO */}
      {vista === 'ARBOL' && (
        /* overflow-x-auto protege contra pantallas compactas de celulares y laptops pequeñas */
        <div className="w-full overflow-x-auto custom-scrollbar pb-4 mt-4">
          
          {/* min-w-[1100px] protege el tamaño para que no colisione en móviles, max-w-[1320px] lo centra en monitores grandes sin scroll */}
          <div className="min-w-[1100px] max-w-[1320px] mx-auto px-4">
            
            {/* Títulos de Ronda */}
            <div className="grid grid-cols-7 gap-3 lg:gap-5 text-center text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
              <div>Octavos</div><div>Cuartos</div><div>Semis</div>
              <div className="text-[#d4af37] text-sm xl:text-base font-black">Final</div>
              <div>Semis</div><div>Cuartos</div><div>Octavos</div>
            </div>

            <div className="grid grid-cols-7 h-[78vh] lg:h-[82vh] gap-3 lg:gap-5 relative">
              
              {/* Lado IZQUIERDO */}
              <div className="col-span-1"><RenderCol ids={['OCT-L1', 'OCT-L2', 'OCT-L3', 'OCT-L4']} tipo="OCT" /></div>
              <div className="col-span-1"><RenderCol ids={['CRT-L1', 'CRT-L2']} tipo="CRT" /></div>
              <div className="col-span-1"><RenderCol ids={['SMS-L1']} tipo="SMS" /></div>

              {/* CENTRO */}
              <div className="flex flex-col justify-center items-center gap-10 h-full col-span-1 relative z-20 px-1">
                 <div className="absolute left-0 top-[35%] w-[calc(50%+12px)] lg:w-[calc(50%+20px)] -ml-3 lg:-ml-5 h-[2px] bg-[#aa8529]/40 -z-10"></div>
                 <div className="absolute right-0 top-[35%] w-[calc(50%+12px)] lg:w-[calc(50%+20px)] -mr-3 lg:-mr-5 h-[2px] bg-[#aa8529]/40 -z-10"></div>

                 <div className="w-full scale-105 lg:scale-115 origin-center">
                    {getP('FNL-1') && <TarjetaPartidoElegante partido={getP('FNL-1')!} equipos={equipos} onSelectGanador={seleccionarGanador} isCompact={true} fullWidth={true} />}
                 </div>
                 
                 <div className="w-full opacity-95 scale-95 lg:scale-105 origin-center mt-6 lg:mt-8">
                    {getP('TRC-1') && <TarjetaPartidoElegante partido={getP('TRC-1')!} equipos={equipos} onSelectGanador={seleccionarGanador} isCompact={true} fullWidth={true} />}
                    <div className="text-center text-[8px] lg:text-[10px] font-bold text-amber-600 uppercase mt-2 tracking-widest">
                      Tercer Puesto
                    </div>
                 </div>
              </div>

              {/* Lado DERECHO */}
              <div className="col-span-1"><RenderCol ids={['SMS-R1']} tipo="SMS" inverted /></div>
              <div className="col-span-1"><RenderCol ids={['CRT-R1', 'CRT-R2']} tipo="CRT" inverted /></div>
              <div className="col-span-1"><RenderCol ids={['OCT-R1', 'OCT-R2', 'OCT-R3', 'OCT-R4']} tipo="OCT" inverted /></div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};