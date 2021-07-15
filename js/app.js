let tablero = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const app = {
  cargarTablero: function () {
    this.divTablero = document.getElementById("tablero");

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
  },

  iniciar: function () {
    const titulo = document.getElementById("titulo");
    const abecedario = "abcdefghijklmnopqrstuvwxyz";
    titulo.innerHTML = "Introduce coordenadas y clica!";

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
    if (tablero[letra][numero] === 1) {
      tablero[letra][numero] = "x";
      this.crearEspacios();
      this.cargarTablero();
    } else if (tablero[letra][numero] === 0) {
      tablero[letra][numero] = "o";
      this.crearEspacios();

      this.cargarTablero();
    }
  },
  crearEspacios: function () {
    let br = document.createElement("br");
    this.divTablero.appendChild(br);
  },
};

app.iniciar();