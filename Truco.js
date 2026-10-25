// Jerarquía de cartas del Truco (de mayor a menor valor)
const PALOS = ['Espada', 'Basto', 'Oro', 'Copa'];

const JERARQUIA = [
  { numero: 1, palo: 'Espada', valor: 14 },
  { numero: 1, palo: 'Basto', valor: 13 },
  { numero: 7, palo: 'Espada', valor: 12 },
  { numero: 7, palo: 'Oro', valor: 11 },
  { numero: 3, palo: 'Cualquiera', valor: 10 },
  { numero: 2, palo: 'Cualquiera', valor: 9 },
  { numero: 1, palo: 'Oro', valor: 8 },
  { numero: 1, palo: 'Copa', valor: 8 },
  { numero: 12, palo: 'Cualquiera', valor: 7 },
  { numero: 11, palo: 'Cualquiera', valor: 6 },
  { numero: 10, palo: 'Cualquiera', valor: 5 },
  { numero: 7, palo: 'Basto', valor: 4 },
  { numero: 7, palo: 'Copa', valor: 4 },
  { numero: 6, palo: 'Cualquiera', valor: 3 },
  { numero: 5, palo: 'Cualquiera', valor: 2 },
  { numero: 4, palo: 'Cualquiera', valor: 1 }
];

export class TrucoGame {
  constructor(puntosLimite = 15) {
    this.puntosLimite = puntosLimite;
    this.puntosJugador = 0;
    this.puntosBot = 0;
    
    // Estado de la mano
    this.mazo = [];
    this.cartasJugador = [];
    this.cartasBot = [];
    this.mesaJugador = [];
    this.mesaBot = [];
    
    this.turno = 'jugador'; // 'jugador' | 'bot'
    this.manoInicial = 'jugador'; // Quién repartió/empieza la mano
    this.rondaActual = 1; // 1, 2 o 3
    this.ganadoresRondas = []; // Array con 'jugador', 'bot' o 'parda'
    
    // Estado de cantos
    this.estadoTruco = 1; // 1 (sin cantar = 1 pto), 2 (Truco), 3 (Re Truco), 4 (Vale 4)
    this.envidoCantado = false;
    this.manoFinalizada = false;
  }

  // Genera y mezcla las 40 cartas
  crearMazo() {
    this.mazo = [];
    for (const palo of PALOS) {
      for (let numero = 1; numero <= 12; numero++) {
        if (numero !== 8 && numero !== 9) {
          this.mazo.push({ id: `${numero}-${palo}`, numero, palo });
        }
      }
    }
    this.mazo.sort(() => Math.random() - 0.5);
  }

  // Inicia una nueva mano repartiendo cartas
  iniciarNuevaMano() {
    this.crearMazo();
    this.cartasJugador = [this.mazo.pop(), this.mazo.pop(), this.mazo.pop()];
    this.cartasBot = [this.mazo.pop(), this.mazo.pop(), this.mazo.pop()];
    this.mesaJugador = [];
    this.mesaBot = [];
    this.rondaActual = 1;
    this.ganadoresRondas = [];
    this.estadoTruco = 1;
    this.envidoCantado = false;
    this.manoFinalizada = false;
    this.turno = this.manoInicial;
  }

  // Obtiene el poder/valor de una carta según las reglas
  getValorCarta(carta) {
    const especifica = JERARQUIA.find(j => j.numero === carta.numero && j.palo === carta.palo);
    if (especifica) return especifica.valor;
    const general = JERARQUIA.find(j => j.numero === carta.numero && j.palo === 'Cualquiera');
    return general ? general.valor : 0;
  }

  // Calcula los puntos de Envido para un mazo de 3 cartas
  calcularEnvido(cartas) {
    const palosGroup = {};
    cartas.forEach(c => {
      if (!palosGroup[c.palo]) palosGroup[c.palo] = [];
      const val = (c.numero >= 10) ? 0 : c.numero;
      palosGroup[c.palo].push(val);
    });

    let maxEnvido = 0;
    for (const palo in palosGroup) {
      const vals = palosGroup[palo];
      if (vals.length >= 2) {
        vals.sort((a, b) => b - a); // Ordenar descendente
        const env = 20 + vals[0] + vals[1];
        if (env > maxEnvido) maxEnvido = env;
      } else {
        if (vals[0] > maxEnvido) maxEnvido = vals[0];
      }
    }
    return maxEnvido;
  }

  // Jugar una carta desde la mano del jugador o bot
  jugarCarta(quien, cartaId) {
    if (this.manoFinalizada || this.turno !== quien) return false;

    const origen = quien === 'jugador' ? this.cartasJugador : this.cartasBot;
    const destino = quien === 'jugador' ? this.mesaJugador : this.mesaBot;

    const idx = origen.findIndex(c => c.id === cartaId);
    if (idx === -1) return false;

    const [carta] = origen.splice(idx, 1);
    destino.push(carta);

    // Si ambos ya tiraron carta en esta ronda, evaluamos el ganador de la ronda
    if (this.mesaJugador.length === this.rondaActual && this.mesaBot.length === this.rondaActual) {
      this.evaluarRonda();
    } else {
      // Cambiar de turno
      this.turno = quien === 'jugador' ? 'bot' : 'jugador';
    }

    return true;
  }

  // Determina quién gana la ronda (1, 2 o 3)
  evaluarRonda() {
    const cJugador = this.mesaJugador[this.rondaActual - 1];
    const cBot = this.mesaBot[this.rondaActual - 1];

    const vJugador = this.getValorCarta(cJugador);
    const vBot = this.getValorCarta(cBot);

    let ganadorRonda = 'parda';
    if (vJugador > vBot) {
      ganadorRonda = 'jugador';
      this.turno = 'jugador';
    } else if (vBot > vJugador) {
      ganadorRonda = 'bot';
      this.turno = 'bot';
    } else {
      // En parda, el turno siguiente pasa a la Mano
      this.turno = this.manoInicial;
    }

    this.ganadoresRondas.push(ganadorRonda);
    this.comprobarGanadorMano();
  }

  // Lógica para determinar si alguien ganó la mano (al mejor de 3 rondas)
  comprobarGanadorMano() {
    const g = this.ganadoresRondas;
    let ganadorMano = null;

    // Caso 1: Alguien ganó 2 rondas
    const jugGanas = g.filter(x => x === 'jugador').length;
    const botGanas = g.filter(x => x === 'bot').length;

    if (jugGanas === 2) ganadorMano = 'jugador';
    else if (botGanas === 2) ganadorMano = 'bot';

    // Caso 2: Empates (Pardas)
    else if (g[0] === 'parda' && g[1] && g[1] !== 'parda') ganadorMano = g[1];
    else if (g[0] !== 'parda' && g[1] === 'parda') ganadorMano = g[0];
    else if (g[0] === 'parda' && g[1] === 'parda' && g[2] && g[2] !== 'parda') ganadorMano = g[2];
    else if (g.length === 3 && g[2] === 'parda') ganadorMano = g[0] !== 'parda' ? g[0] : this.manoInicial;

    if (ganadorMano) {
      this.finalizarMano(ganadorMano, this.estadoTruco);
    } else {
      this.rondaActual++;
    }
  }

  // Finaliza la mano y otorga los puntos acumulados
  finalizarMano(ganador, puntos) {
    if (ganador === 'jugador') this.puntosJugador += puntos;
    if (ganador === 'bot') this.puntosBot += puntos;

    this.manoFinalizada = true;
    this.manoInicial = this.manoInicial === 'jugador' ? 'bot' : 'jugador';
  }

  // Cantar Envido
  resolverEnvido(quienCanta, respuesta) {
    this.envidoCantado = true;
    if (respuesta === 'quiero') {
      const pJugador = this.calcularEnvido([...this.cartasJugador, ...this.mesaJugador]);
      const pBot = this.calcularEnvido([...this.cartasBot, ...this.mesaBot]);

      let ganador = 'jugador';
      if (pBot > pJugador) ganador = 'bot';
      else if (pBot === pJugador) ganador = this.manoInicial; // A igual punto, gana la mano

      if (ganador === 'jugador') this.puntosJugador += 2;
      else this.puntosBot += 2;

      return { ganador, pJugador, pBot };
    } else {
      // No quiero: otorga 1 punto al que cantó
      if (quienCanta === 'jugador') this.puntosJugador += 1;
      else this.puntosBot += 1;
      return { ganador: quienCanta, rechazado: true };
    }
  }

  // Subir apuestas de Truco
  cantarTruco(nivelDeseado) {
    // nivelDeseado: 2 = Truco, 3 = Re Truco, 4 = Vale Cuatro
    this.estadoTruco = nivelDeseado;
  }
}