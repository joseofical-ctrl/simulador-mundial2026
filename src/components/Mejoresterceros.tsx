// src/components/MejoresTerceros.tsx
import type { Equipo } from '../types/types';

interface MejoresTercerosProps {
  equipos: Equipo[];
  onAvanzar: (tercerosClasificados: string[]) => void;
}

export const MejoresTerceros = ({ equipos, onAvanzar }: MejoresTercerosProps) => {
  const terceros = equipos.filter(eq => eq.posicionGrupo === 3);
  const tercerosOrdenados = [...terceros].sort((a, b) => b.puntosElo - a.puntosElo);
  const clasificadosIds = tercerosOrdenados.slice(0, 8).map(eq => eq.id);
  const gruposListos = terceros.length === 12;

  return (
    <div className="max-w-3xl mx-auto bg-[#111827] rounded-2xl shadow-2xl border border-[#2d3748] overflow-hidden">
      <div className="bg-[#1f2937] px-6 py-5 flex justify-between items-center border-b border-[#374151]">
        <div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#d97706] uppercase tracking-wide">
            Repechaje de Terceros
          </h2>
          <p className="text-sm text-slate-400 mt-1 font-medium">Los 8 con mejor puntaje Elo avanzan</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Seleccionados</span>
          <p className="text-3xl font-black text-slate-200">{terceros.length} <span className="text-lg font-normal text-slate-600">/ 12</span></p>
        </div>
      </div>

      <div className="p-6">
        {terceros.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-xl font-medium">Aún no hay terceros lugares.</p>
            <p className="text-sm mt-2 text-slate-600">Asigna las posiciones en los grupos superiores.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tercerosOrdenados.map((equipo, index) => {
              const pasaDeRonda = index < 8;
              return (
                <div 
                  key={equipo.id}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    pasaDeRonda ? 'bg-[#451a03] border-[#b48629]' : 'bg-[#1f2937] border-[#374151] opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-black w-6 text-lg ${pasaDeRonda ? 'text-[#fbbf24]' : 'text-slate-500'}`}>
                      {index + 1}
                    </span>
                    <img src={equipo.banderaUrl} className="w-8 h-8 rounded-full object-cover border border-[#374151]" alt={equipo.nombre} />
                    <span className="font-bold text-slate-200">{equipo.nombre}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded w-20 text-center tracking-wider mb-1 ${
                      pasaDeRonda ? 'bg-[#f59e0b] text-[#451a03]' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {pasaDeRonda ? 'Avanza' : 'Eliminado'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Elo: {equipo.puntosElo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center border-t border-[#374151] pt-8">
          <button
            onClick={() => onAvanzar(clasificadosIds)}
            disabled={!gruposListos}
            className={`font-black text-lg px-10 py-5 rounded-2xl shadow-xl transition-all transform duration-300 w-full md:w-auto uppercase tracking-widest ${
              gruposListos 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8529] hover:from-[#fde047] hover:to-[#c09d3b] text-[#111827] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d4af37]/20 cursor-pointer' 
                : 'bg-[#374151] text-slate-500 cursor-not-allowed'
            }`}
          >
            {gruposListos ? 'Generar Bracket Eliminatorio' : 'Asigna 12 terceros para continuar'}
          </button>
        </div>
      </div>
    </div>
  );
};