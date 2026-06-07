// src/App.tsx
import { useTorneoStore } from './store/usetorneostore';
import { PantallaInicio } from './components/Pantallainicio';
import { TablaGrupo } from './components/Tablagrupo';
import { MejoresTerceros } from './components/Mejoresterceros';
import { Bracket } from './components/Bracket';

function App() {
  const equipos = useTorneoStore((state) => state.equipos);
  const faseActual = useTorneoStore((state) => state.faseActual);
  const avanzarAEliminatorias = useTorneoStore((state) => state.avanzarAEliminatorias);
  
  const letrasGrupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-200 font-sans selection:bg-[#c09d3b] selection:text-white overflow-x-hidden">
      
      {faseActual === 'INICIO' && (
        <PantallaInicio />
      )}

      {faseActual === 'GRUPOS' && (
        <div className="p-3 sm:p-4 md:p-8 animate-fade-in w-full max-w-[1920px] mx-auto">
          <header className="mb-6 md:mb-10 text-center py-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#c09d3b] to-[#fde047] drop-shadow-lg tracking-tighter uppercase">
              Fase de Grupos
            </h1>
            <p className="text-sm sm:text-base md:text-lg mt-2 text-slate-400 font-medium text-center tracking-wide uppercase px-2">
              Elige las posiciones finales de cada selección
            </p>
          </header>

          <main className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {letrasGrupos.map((letra) => {
              const equiposDelGrupo = equipos.filter((eq) => eq.grupo === letra);
              return <TablaGrupo key={letra} letra={letra} equipos={equiposDelGrupo} />;
            })}
          </main>

          <section className="w-full mt-10 md:mt-16 mb-10 md:mb-20 border-t border-slate-800 pt-8 md:pt-10">
            <MejoresTerceros 
              equipos={equipos} 
              onAvanzar={avanzarAEliminatorias} 
            />
          </section>
        </div>
      )}

      {faseActual === 'ELIMINATORIAS' && (
        <main className="w-full pt-4 md:pt-6">
          <Bracket />
        </main>
      )}

    </div>
  );
}

export default App;