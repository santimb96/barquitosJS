let tablero = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const app = {
  intentos: 0,
  hundido: 0,
  barcos: 0,
  numBarcos: document.getElementById("numBarcos"),
  ganador: document.getElementById("ganador"),
  divTablero: document.getElementById("tablero"),
  info: document.getElementById("info"),
  error: document.getElementById("error"),

  cargarTablero: function () {
    numBarcos.innerHTML = `Hay ${this.barcos} barcos`;
    ganador.innerHTML = `Llevas ${this.intentos} intentos`;

    if (this.divTablero.childNodes.length > 0) {
      this.divTablero.innerHTML = " ";
    }

    let contador = 0;
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        if (contador === tablero[i].length) {
          this.crearEspacios();
          contador = 0;
        }
        if (tablero[i][j] !== "x" && tablero[i][j] !== "o") {
          this.divTablero.appendChild(document.createTextNode(`- `));
          contador++;
        } else {
          this.divTablero.appendChild(
            document.createTextNode(`${tablero[i][j]} `)
          );
          contador++;
        }
      }
    }
    this.comprobarVictoria();
  },

  iniciar: function () {
    const abecedario = "abcdefghijklmnopqrstuvwxyz";
    info.innerHTML = "Introduce coordenadas y clica!";

    document.getElementById("accion").addEventListener(
      "click",
      function () {
        this.coordenadas(abecedario);
      }.bind(this)
    );
  },

  coordenadas: function (abecedario) {
    const input = document.getElementById("letra").value.toLowerCase();
    const letra = abecedario.indexOf(input);
    const numero = document.getElementById("numero").value;

    this.comprobacion(letra, numero);
  },

  comprobacion: function (letra, numero) {
    error.innerHTML = " ";
    try {
      if (tablero[letra][numero] === 1) {
        tablero[letra][numero] = "x";
        this.hundido++;
        this.intentos++;
        this.cargarTablero();
      } else if (tablero[letra][numero] === 0) {
        tablero[letra][numero] = "o";
        this.intentos++;
        this.cargarTablero();
      } else {
        this.mensajeError();
      }
    } catch (e) {
      console.log(e);
      this.mensajeError();
    }
  },

  mensajeError: function () {
    error.innerHTML = `Te has equivocado de coordenadas!`;
  },

  crearEspacios: function () {
    let br = document.createElement("br");
    this.divTablero.appendChild(br);
  },

  numeroDeBarcos: function () {
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        if (tablero[i][j] === 1) {
          this.barcos++;
        }
      }
    }
  },
  
  comprobarVictoria: function () {
    if (this.barcos === this.hundido) {
      ganador.innerHTML = `Has ganado con ${this.intentos} intentos.<br>
      Refresca la página para volver a jugar!`;
    }
  },
};
app.numeroDeBarcos();
app.iniciar();
