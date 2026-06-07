// src/utils/simulador.ts

export const calcularProbabilidades = (eloA: number, eloB: number) => {
  // Calculamos la probabilidad base de victoria para el Equipo A
  const exponente = (eloB - eloA) / 400;
  const probA = 1 / (1 + Math.pow(10, exponente));
  
  // La probabilidad del Equipo B es el resto
  const probB = 1 - probA;
  
  return { probA, probB };
};

export const simularPartido = (eloA: number, eloB: number) => {
  const { probA } = calcularProbabilidades(eloA, eloB);
  
  // Generamos un número aleatorio entre 0 y 1
  const suerte = Math.random();
  
  let golesA: number;
  let golesB: number;

  // Introducimos un margen para los empates (muy común en el fútbol)
  const margenEmpate = 0.20; 

  if (suerte < probA - (margenEmpate / 2)) {
    // Gana el Equipo A
    golesA = Math.floor(Math.random() * 3) + 1; // 1 a 3 goles
    golesB = Math.floor(Math.random() * golesA); // Menos goles que A
  } else if (suerte > probA + (margenEmpate / 2)) {
    // Gana el Equipo B
    golesB = Math.floor(Math.random() * 3) + 1; 
    golesA = Math.floor(Math.random() * golesB); 
  } else {
    // Empate
    golesA = Math.floor(Math.random() * 3); // 0 a 2 goles
    golesB = golesA;
  }

  return { golesA, golesB };
};