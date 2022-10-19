var btnJugar = document.querySelector(".boton-jugar");
var btnPalabraNueva = document.querySelector(".btn-nPalabra");
document.querySelector(".pagina-juego").style.display = "none";
document.querySelector(".pagina-agregar").style.display = "none";
var btnNuevo = document.querySelector(".boton-nuevo");
var btnSalir = document.querySelector(".boton-salir");
var btnGuardar = document.querySelector(".boton_guardar");
var btnCancelar = document.querySelector(".boton_cancelar");
var abrirGano = document.querySelector(".info_gano");
var abrirPerdio = document.querySelector(".info_perdio");
var okGano = document.querySelector(".info_ok");
var okPerdio = document.querySelector(".info_ok--end");

var words = ["Oracle", "Alura", "ahorcado", "laptop", "programador", "horca", "Europa",
  "Alemania", "Dante", "design", "tenis", "css", "deportes", "firefox", "html",
  "Warner", "internet", "frontEnd", "verdugo", "Ellison", ];

btnJugar.onclick = jugar;
btnPalabraNueva.onclick = agregarPalabra;
btnNuevo.onclick = nuevoJuego;
btnSalir.onclick = salir;
btnGuardar.onclick = guardar;
btnCancelar.onclick = cancelar;

function alearorio() {
  var localRandom = Math.floor(Math.random() * newWords.length);
  var rWords = newWords[localRandom].toUpperCase();
  gameHorca.secretWord = rWords;
  dibujo(gameHorca);
}

function jugar() {
  document.querySelector(".principal").style.display = "none";
  document.querySelector(".pagina-juego").style.display = "block";
  nuevoJuego();
}

function agregarPalabra() {
  document.querySelector(".principal").style.display = "none";
  document.querySelector(".pagina-agregar").style.display = "block";
}

function nuevoJuego() {
  alearorio();
  gameHorca.state = 8;
  gameHorca.guessed = [];
  gameHorca.wrong = [];
  dibujo(gameHorca);
}

function salir() {
  document.querySelector(".principal").style.display = "block";
  document.querySelector(".pagina-juego").style.display = "none";
}

localStorage.setItem("myNewWords", JSON.stringify(words));
var newWords = JSON.parse(localStorage.getItem("myNewWords"));
function ingresoPalabra() {
  var inputWord = document.getElementById("agregar_palabra").value;
  if (
    /^[A-zÑñ]*$/.test(inputWord) &&
    inputWord.length > 1 &&
    inputWord.length <= 8
  ) {
    console.log(inputWord);
    newWords.push(inputWord);
    localStorage.setItem("myNewWords", JSON.stringify(newWords));
    document.getElementById("agregar_palabra").value = "";
  }
}
function guardar() {
  document.querySelector(".principal").style.display = "block";
  document.querySelector(".pagina-agregar").style.display = "none";
  ingresoPalabra();
}
function cancelar() {
  document.querySelector(".principal").style.display = "block";
  document.querySelector(".pagina-agregar").style.display = "none";
}

var gameHorca = {
  state: 8,
  guessed: [],
  wrong: [],
  secretWord: "",
};

var $html = {
  ahorcado: document.getElementById("ahorcado"),
  guessed: document.querySelector(".letra-acertada"),
  wrong: document.querySelector(".letra-error"),
};

function dibujo(gameHorca) {

  var $elem;
  $elem = $html.ahorcado;

  var state = gameHorca.state;
  if (state === 9) {
    state = gameHorca.previus;
  }
  $elem.src = "./images/intent0" + state + ".png";
 
  $elem = $html.guessed;
  var guessed = gameHorca.guessed;
  var secretWord = gameHorca.secretWord;
  $elem.innerHTML = "";
  for (var i = 0; i < secretWord.length; i++) {
    var $span = document.createElement("span");
    var $text = document.createTextNode("");
    if (guessed.indexOf(secretWord[i]) >= 0) {
      $text.nodeValue = secretWord[i];
    }
    $span.setAttribute("class", "word guessed");
    $span.appendChild($text);
    $elem.appendChild($span);
  }
  var wrong = gameHorca.wrong;
  $elem = $html.wrong;
  $elem.innerHTML = "";
  for (var i = 0; i < wrong.length; i++) {
    $span = document.createElement("span");
    $text = document.createTextNode(wrong[i]);
    $span.setAttribute("class", "word wrong");
    $span.appendChild($text);
    $elem.appendChild($span);
  }
}

function adivinar(gameHorca, letter) {
  var state = gameHorca.state;
  var secretWord = gameHorca.secretWord;
  if (state === 1 || state === 9) {
    return;
  }

  var guessed = gameHorca.guessed;
  var wrong = gameHorca.wrong;
  if (guessed.indexOf(letter) >= 0 || wrong.indexOf(letter) >= 0) {
    return;
  }

  if (secretWord.indexOf(letter) >= 0) {
    var win = true;
    for (var i = 0; i < secretWord.length; i++) {
      if (guessed.indexOf(secretWord[i]) < 0 && secretWord[i] != letter) {
        win = false;
        gameHorca.previus = gameHorca.state;
        break;
      }
    }
    if (win) {
      gameHorca.state = 9;
    }
    guessed.push(letter);
  } else {
    gameHorca.state--;
    wrong.push(letter);
  }
}

function obtenerLetra(texto) {
  document.getElementById("words").texto;
  var text = texto.charAt(texto.length - 1);
  text = text.toUpperCase();
  if (/^[A-zÑñ]*$/.test(text)) {
    adivinar(gameHorca, text);
    dibujo(gameHorca);
  }

  var state = gameHorca.state;
  if (state === 9) {
    gano();
    nuevoJuego();
    document.getElementById("words").value = "";
  } else if (state === 1) {
    perdio();
    nuevoJuego();
    document.getElementById("words").value = "";
  }
}

window.onkeypress = function obtenerLetra(e) {
  var letter = e.key;
  letter = letter.toUpperCase();
  if (/^[A-zÑñ]*$/.test(letter)) {
    
    adivinar(gameHorca, letter);
    dibujo(gameHorca);
  }
  var state = gameHorca.state;
  if (state === 9) {
    gano();
    nuevoJuego();
  } else if (state === 1) {
    perdio();
    nuevoJuego();
  }
};

function gano() {
  abrirGano.classList.add("info_gano--show");
}

function perdio() {
  abrirPerdio.classList.add("info_perdio--show");
  var end = document.getElementById("end");
  end.innerText = "La palabra era " + gameHorca.secretWord;
}

okGano.addEventListener("click", (e) => {
  e.preventDefault();
  abrirGano.classList.remove("info_gano--show");
});

okPerdio.addEventListener("click", (e) => {
  e.preventDefault();
  abrirPerdio.classList.remove("info_perdio--show");
});