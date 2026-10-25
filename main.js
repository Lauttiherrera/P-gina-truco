import { TrucoGame } from './Truco.js';
import { BotAI } from './Bot.js';

const juego = new TrucoGame(15);
juego.iniciarNuevaMano();

// Captura de elementos del DOM
const ptsJugadorEl = document.getElementById('pts-jugador');
const ptsBotEl = document.getElementById('pts-bot');
const cartasJugadorEl = document.getElementById('cartas-jugador');
const cartasBotEl = document.getElementById('cartas-bot');
const mesaJugadorEl = document.getElementById('mesa-jugador');
const mesaBotEl = document.getElementById('mesa-bot');
const logEl = document.getElementById('log-mensajes');

// Botones
const btnEnvido = document.getElementById('btn-envido');
const btnTruco = document.getElementById('btn-truco');
const btnMazo = document.getElementById('btn-ir-al-mazo');

// Función para actualizar toda la pantalla
function renderizarMesa() {
  // 1. Actualizar Marcador
  ptsJugadorEl.textContent = juego.puntosJugador;
  ptsBotEl.textContent = juego.puntosBot;

  // 2. Renderizar cartas en mano del Jugador
  cartasJugadorEl.innerHTML = '';
  juego.cartasJugador.forEach(carta => {
    const el = crearElementoCarta(carta);
    el.addEventListener('click', () => alHacerClicEnCarta(carta.id));
    cartasJugadorEl.appendChild(el);
  });

  // 3. Renderizar cartas del Bot (ocultas)
  cartasBotEl.innerHTML = '';
  juego.cartasBot.forEach(() => {
    const el = document.createElement('div');
    el.className = 'carta cubierta';
    cartasBotEl.appendChild(el);
  });

  // 4. Renderizar Cartas en la Mesa
  mesaJugadorEl.innerHTML = '';
  juego.mesaJugador.forEach(c => mesaJugadorEl.appendChild(crearElementoCarta(c)));

  mesaBotEl.innerHTML = '';
  juego.mesaBot.forEach(c => mesaBotEl.appendChild(crearElementoCarta(c)));
}

// Función auxiliar para construir el HTML de una carta
function crearElementoCarta(carta) {
  const div = document.createElement('div');
  div.className = 'carta';
  div.innerHTML = `
    <span>${carta.numero}</span>
    <span class="palo">${carta.palo}</span>
  `;
  return div;
}

// Evento al tirar una carta
function alHacerClicEnCarta(cartaId) {
  if (juego.turno !== 'jugador') return;

  const jugadaValida = juego.jugarCarta('jugador', cartaId);

  if (jugadaValida) {
    logEl.textContent = "Jugaste una carta...";
    renderizarMesa();

    // Comprobar si la mano terminó tras la jugada
    if (juego.manoFinalizada) {
      evaluarFinDeMano();
      return;
    }

    // Turno del Bot
    if (juego.turno === 'bot') {
      ejecutarTurnoBot();
    }
  }
}

function ejecutarTurnoBot() {
  logEl.textContent = "El bot está pensando...";
  setTimeout(() => {
    const cartaBot = BotAI.seleccionarCartaAJugar(juego.cartasBot, juego);
    juego.jugarCarta('bot', cartaBot.id);
    logEl.textContent = "El bot jugó una carta.";
    renderizarMesa();

    if (juego.manoFinalizada) {
      evaluarFinDeMano();
    }
  }, 1000);
}

function evaluarFinDeMano() {
  logEl.textContent = "Mano finalizada. Repartiendo...";
  setTimeout(() => {
    juego.iniciarNuevaMano();
    renderizarMesa();
    logEl.textContent = "Nueva mano iniciada. ¡Tu turno!";
  }, 2000);
}

// Eventos para Cantos
btnEnvido.addEventListener('click', () => {
  if (juego.envidoCantado) return;
  const puntosBot = juego.calcularEnvido([...juego.cartasBot, ...juego.mesaBot]);
  const respBot = BotAI.decidirRespuestaEnvido(puntosBot);

  const res = juego.resolverEnvido('jugador', respBot);
  if (respBot === 'quiero') {
    logEl.textContent = `Bot dijo QUIERO. Ganó ${res.ganador} (Tú: ${res.pJugador} pts | Bot: ${res.pBot} pts)`;
  } else {
    logEl.textContent = "El bot dijo NO QUIERO al Envido.";
  }
  renderizarMesa();
});

btnTruco.addEventListener('click', () => {
  const respBot = BotAI.decidirRespuestaTruco(juego.cartasBot, juego);
  if (respBot === 'quiero') {
    juego.cantarTruco(2);
    logEl.textContent = "El bot dijo ¡QUIERO el Truco!";
  } else {
    logEl.textContent = "El bot dijo NO QUIERO el Truco. Ganás la mano.";
    juego.finalizarMano('jugador', 1);
    evaluarFinDeMano();
  }
});

btnMazo.addEventListener('click', () => {
  logEl.textContent = "Te fuiste al mazo.";
  juego.finalizarMano('bot', juego.estadoTruco);
  evaluarFinDeMano();
});

// Inicializar la interfaz
renderizarMesa();