export class BotAI {
  static decidirRespuestaEnvido(puntosBot) {
    // Si el bot tiene más de 25 puntos de envido, acepta
    return puntosBot >= 25 ? 'quiero' : 'no_quiero';
  }

  static decidirRespuestaTruco(cartasBot, juego) {
    // Evalúa si la carta más alta del bot es fuerte
    const valores = cartasBot.map(c => juego.getValorCarta(c));
    const maxValor = Math.max(...valores);

    // Si tiene un 3 o superior (valor >= 10 en la jerarquía), acepta
    return maxValor >= 10 ? 'quiero' : 'no_quiero';
  }

  static seleccionarCartaAJugar(cartasBot, juego) {
    // El bot tira su carta más alta disponible
    let mejorCarta = cartasBot[0];
    let maxVal = -1;

    cartasBot.forEach(carta => {
      const v = juego.getValorCarta(carta);
      if (v > maxVal) {
        maxVal = v;
        mejorCarta = carta;
      }
    });

    return mejorCarta;
  }
}