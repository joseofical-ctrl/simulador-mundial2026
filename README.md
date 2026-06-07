# 🌍 Simulador del Mundial 2026 — Formato Expandido 48 Equipos

**Simulador del Mundial 2026** es una aplicación web de alta fidelidad diseñada para gestionar el nuevo formato de 48 selecciones. Combina una experiencia visual premium en **Dark Mode** con un motor deportivo preciso, mapeo oficial de cruces y un flujo de simulación de torneo interactivo.

## 🚀 Descripción

Esta web implementa un simulador completo para el Mundial 2026, con:
- Pantalla de inicio inmersiva.
- Gestión de 12 grupos de 4 equipos.
- Clasificación automática de los 8 mejores terceros mediante puntos Elo.
- Bracket eliminatorio interactivo con doble vista y propagación en cadena.

El proyecto está construido con **React 18 + Vite + TypeScript** y utiliza **Zustand** para manejar el estado global del torneo.

## 🔧 Características principales

### Interfaz y experiencia
- **Landing page interactiva** con animaciones y fondos degradados dorados pulsantes.
- **Dark Mode premium** con acentos dorados para una apariencia elegante y moderna.
- **Diseño responsive mobile-first** con breakpoints dinámicos y deslizamiento horizontal suave en el bracket.

### Fase de grupos
- Visualización de **12 grupos** con posiciones 1°, 2° y 3°.
- Selección de posiciones mediante clics con **control de errores** para evitar duplicados.
- Renderizado de **banderas SVG en alta definición**.

### Mejores terceros y clasificación
- Reúne los **12 terceros lugares** para calcular los 8 mejores.
- Clasifica los terceros automáticamente usando **Puntos Elo** como criterio competitivo.
- Lógica estable para desempates basada en ranking FIFA simulado.

### Eliminatorias y bracket
- **Cruces oficiales de FIFA**: ningún primer lugar se enfrenta a otro primer lugar en la primera ronda.
- **Bracket interactivo de doble vista**:
  - Pestaña **16avos**: cuadrícula de 16 tarjetas para la primera ronda.
  - Pestaña **Árbol principal**: 7 columnas fluidas desde octavos hasta la final.
- **Escalado dinámico** máximo `max-w-[1320px]` para una presentación óptima en pantallas grandes.
- **Propagación en cadena y limpieza recursiva**: cambios en resultados anteriores actualizan automáticamente el árbol y eliminan datos inconsistentes.

## 🧭 Estructura del proyecto

```text
├── public/
│   └── Logo.webp (Logo oficial para Open Graph y favicon)
├── src/
│   ├── components/
│   │   ├── Bracket.tsx (Controla la fase eliminatoria con sistema de doble pestaña)
│   │   ├── Mejoresterceros.tsx (Clasificación automática de terceros por puntos Elo)
│   │   ├── Pantallainicio.tsx (Landing page interactiva de bienvenida)
│   │   └── Tablagrupo.tsx (Gestión visual de los 12 grupos del torneo)
│   ├── data/
│   │   └── equipos.json (Base de datos de las 48 selecciones con Elo y flags SVG)
│   ├── store/
│   │   └── usetorneostore.ts (Store global de Zustand con algoritmos de propagación)
│   ├── types/
│   │   └── types.ts (Tipados estrictos de TypeScript para equipos y partidos)
│   ├── utils/
│   │   └── simulador.ts (Utilidades lógicas auxiliares)
│   ├── App.tsx (Enrutador condicional de fases)
│   ├── index.css (Estilos globales)
│   └── main.tsx (Punto de entrada de React)
├── index.html (Configurado con SEO estándar, Open Graph y Twitter Cards)
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── pnpm-lock.yaml
```

## 🧱 Tecnologías usadas

- **React 18**
- **Vite**
- **TypeScript**
- **Zustand**
- **Tailwind CSS**
- **pnpm**
- **SVG** para banderas y assets vectoriales

## ⚙️ Instalación local

Sigue estos pasos para ejecutar el proyecto en tu máquina:

1. Clona el repositorio.
2. Navega a la carpeta del proyecto.
3. Instala dependencias:

```bash
pnpm install
```

4. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

5. Genera una versión optimizada de producción:

```bash
pnpm build
```

## 🧪 ¿Qué incluye el motor deportivo?

- **Asignación de posiciones** en fase de grupos con validación activa.
- **Filtro de mejores terceros** con cálculo automático basado en Elo.
- **Mapeo oficial de cruces** conforme al formato de FIFA para 32 clasificados.
- **Bracket eliminatorio** con doble representación y navegación táctil.
- **Propagación recursiva**: avanzar un ganador limpia los resultados futuros si se modifica un partido anterior.

## 📈 Próximas mejoras

- Simulación detallada por **marcadores y goles**.
- **Persistencia local** en `localStorage` usando Zustand.
- Añadir **estadísticas de rendimiento** por selección.
- Implementar **animaciones avanzadas** para transiciones de fase y resultados.
- Extender la lógica para soportar **modos de torneo personalizados**.

## 🧾 Cierre

Este README documenta un proyecto de alto nivel para un simulador de torneo con arquitectura moderna, experiencia de usuario premium y lógica deportiva robusta. Está diseñado para presentarse como un caso de estudio profesional en portafolios de ingeniería de software.
