// src/components/PantallaInicio.tsx
import { useTorneoStore } from '../store/usetorneostore';

export const PantallaInicio = () => {
  const empezarSimulacion = useTorneoStore((state) => state.empezarSimulacion);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden animate-fade-in px-4 py-10">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 md:left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#c09d3b] rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 md:right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#eab308] rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center w-full">
        
        <span className="bg-[#1f2937] text-[#d4af37] border border-[#d4af37]/30 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 md:mb-8 shadow-lg text-center">
          Edición 48 Equipos
        </span>

        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#fde047] via-[#c09d3b] to-[#aa8529] uppercase tracking-tighter drop-shadow-2xl mb-4 md:mb-6 leading-tight">
          Simulador<br/>Mundial 2026
        </h1>

        <p className="text-base md:text-lg xl:text-xl text-slate-400 font-medium max-w-2xl mb-10 md:mb-12 leading-relaxed px-2">
          Toma el control del torneo futbolístico más grande de la historia. 
          Define los grupos, clasifica a los mejores terceros y corona al campeón.
        </p>

        <button 
          onClick={empezarSimulacion}
          className="group relative inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 font-black text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-[#c09d3b] to-[#8a6d25] rounded-2xl hover:from-[#d4af37] hover:to-[#aa8529] hover:scale-105 hover:shadow-[0_0_40px_rgba(192,157,59,0.4)] focus:outline-none w-full sm:w-auto"
        >
          <span className="text-lg md:text-xl tracking-widest uppercase text-[#0a0e17] drop-shadow-sm">
            Empezar
          </span>
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0a0e17] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

      </div>
    </div>
  );
};