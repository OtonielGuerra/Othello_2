//Codigo para el movimiento de las flechas
document.addEventListener("keydown", movimiento);

//Codigo para declarar un espacio del archivo para trabajar
var canvas = document.getElementById('fondo');

//Codigo para declarar que las imagenes son 2d
var lapiz = canvas.getContext('2d');

//Variable para declarar Array
var matriz = new Array(8);

//Variable "X" y "Y"
var x = 5;
var y = 5;

// fichas ganadoras
var BF = 0;
var NF = 0;
var cont = 0;

//switch
var SW = true;

//Switch 2
var WS = false;

//variable para el turno
var noTurno = false;

//Varible de 50 para mover fichas
var DIMENSION = 50;

//Declarando todas las imagenes y el fondo
var fondo = {
    url: './imagenes/TableroNew.png',
    image: Image,
    cargaOK: false
};

var fichaBlanca = {
    url: './imagenes/FichaBlanca.png',
    image: Image,
    cargaOK: false
};

var fichaNegra = {
    url: './imagenes/FichaNegra.png',
    image: Image,
    cargaOK: false
};

//Codigo que dice que las imagenes son de tipo Image
fondo.imagen = new Image();
fichaBlanca.imagen = new Image();
fichaNegra.imagen = new Image();

//Declaro que la imagen esta en una ruta especifica
fondo.imagen.src = fondo.url;
fichaBlanca.imagen.src = fichaBlanca.url;
fichaNegra.imagen.src = fichaNegra.url;

//Cargar las imagenes
fondo.imagen.addEventListener("load", function() {
    fondo.cargaOK = true;
    dibujar();
});

fichaBlanca.imagen.addEventListener("load", function() {
    fichaBlanca.cargaOK = true;
    dibujar();
});

fichaNegra.imagen.addEventListener("load", function() {
    fichaNegra.cargaOK = true;
    dibujar();
});

iniciarMatriz();

//Llena la matriz de x en los espacios
function iniciarMatriz() {
    for (var i = 0; i < matriz.length; i++) {
        matriz[i] = new Array(8);
        for (var j = 0; j < matriz.length; j++) {
            matriz[i][j] = 'x';
        }
    }
}

//Funcion para regresar ficha
function regresar() {
    if (cont == 60) {
        MensajeGanador();
    }
    if (noTurno == true) {
        lapiz.drawImage(fichaNegra.imagen, x, y);
    } else {
        if (fichaNegra.cargaOK == true) {
            lapiz.drawImage(fichaBlanca.imagen, x, y);
        }

    }
}

//Dibujando
function dibujar() {
    if (fondo.cargaOK == true && SW == true) {
        lapiz.drawImage(fondo.imagen, 0, 0);
    }
    regresar();
    if (fichaBlanca.cargaOK == true && SW == true) {
        matriz[3][4] = 'fb';
    }
    if (fichaBlanca.cargaOK == true && SW == true) {
        matriz[4][3] = 'fb';
    }
    if (fichaNegra.cargaOK == true && SW == true) {
        matriz[3][3] = 'fn';
    }
    if (fichaNegra.cargaOK == true && SW == true) {
        matriz[4][4] = 'fn';
    }
    if (fondo.cargaOK == true && SW == false) {
        lapiz.drawImage(fondo.imagen, 0, 0);
    }
    fichas();
};

function fichas() {
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz.length; j++) {
            if (matriz[i][j] == 'fn') {
                lapiz.drawImage(fichaNegra.imagen, (i * DIMENSION) + 5, (j * DIMENSION) + 5);
                regresar();
            } else if (matriz[i][j] == 'fb') {
                lapiz.drawImage(fichaBlanca.imagen, (i * DIMENSION) + 5, (j * DIMENSION) + 5);
                regresar();
            }
        }
    }
}

//Codigo de programacion para las flechas
var tecla = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
};

//Codigo para mover las fichas
function movimiento(evento) {
    switch (evento.keyCode) {

        case tecla.LEFT:
            if (x > 5) {
                x = x - DIMENSION;
                basicas();
            }
            break;

        case tecla.UP:
            if (y > 5) {
                y = y - DIMENSION;
                basicas();
            }
            break;

        case tecla.RIGHT:
            if (x < 355) {
                x = x + DIMENSION;
                basicas();
            }
            break;

        case tecla.DOWN:
            if (y < 355) {
                y = y + DIMENSION;
                basicas();
            }
            break;

        case tecla.ENTER:
            WS = false;
            if (noTurno == false) {
                Movida(x, y, 'fb', 'fn', " negra");
            } else {
                Movida(x, y, 'fn', 'fb', " blanca");
            }
            x = 5;
            y = 5;
            basicas();
            console.log(cont);
            break;
    }
}

function Movida(x, y, F1, F2, color) {
    if (matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] == 'x') {
        //Lado Izquierdo
        if (((x - 55) / DIMENSION) >= 0) {
            if (matriz[(x - 55) / DIMENSION][(y - 5) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((x - (i * DIMENSION) - 5) / DIMENSION) >= 0) {
                        if (matriz[(x - (i * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x - (j * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] == F1) {
                                    if (matriz[4][4] == 'fb') {
                                        SW = false;
                                    }
                                    break;
                                }
                                matriz[(x - (j * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x - (i * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //lado derrecho
        if (((x + 45) / DIMENSION) < 8) {
            if (matriz[(x + 45) / DIMENSION][(y - 5) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((x + (i * DIMENSION) - 5) / DIMENSION) < 8) {
                        if (matriz[(x + (i * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x + (j * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] == F1) {
                                    if (matriz[3][3] == 'fb') {
                                        SW = false;
                                    }
                                    break;
                                }
                                matriz[(x + (j * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x + (i * DIMENSION) - 5) / DIMENSION][(y - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //Arriba
        if (((y - 55) / DIMENSION) >= 0) {
            if (matriz[(x - 5) / DIMENSION][(y - 55) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((y - (i * DIMENSION) - 5) / DIMENSION) >= 0) {
                        if (matriz[(x - 5) / DIMENSION][(y - (i * DIMENSION) - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x - 5) / DIMENSION][(y - (j * DIMENSION) - 5) / DIMENSION] == F1) {
                                    if (matriz[4][4] == 'fb') {
                                        SW = false;
                                    }
                                    break;
                                }
                                matriz[(x - 5) / DIMENSION][(y - (j * DIMENSION) - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x - 5) / DIMENSION][(y - (i * DIMENSION) - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //Abajo
        if (((y + 45) / DIMENSION) < 8) {
            if (matriz[(x - 5) / DIMENSION][(y + 45) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((y + (i * DIMENSION) - 5) / DIMENSION) < 8) {
                        if (matriz[(x - 5) / DIMENSION][(y + (i * DIMENSION) - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x - 5) / DIMENSION][(y + (j * DIMENSION) - 5) / DIMENSION] == F1) {
                                    if (matriz[3][3] == 'fb') {
                                        SW = false;
                                    }
                                    break;
                                }
                                matriz[(x - 5) / DIMENSION][(y + (j * DIMENSION) - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x - 5) / DIMENSION][(y + (i * DIMENSION) - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //Diagonal abajo derecha
        if (((y + 45) / DIMENSION) < 8 && ((x + 55) / DIMENSION) < 8) {
            if (matriz[(x + 45) / DIMENSION][(y + 45) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((y + (i * DIMENSION) - 5) / DIMENSION) < 8 && ((x + (i * DIMENSION) - 5) / DIMENSION) < 8) {
                        if (matriz[(x + (i * DIMENSION) - 5) / DIMENSION][(y + (i * DIMENSION) - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x + (j * DIMENSION) - 5) / DIMENSION][(y + (j * DIMENSION) - 5) / DIMENSION] == F1) {
                                    break;
                                }
                                matriz[(x + (j * DIMENSION) - 5) / DIMENSION][(y + (j * DIMENSION) - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x + (i * DIMENSION) - 5) / DIMENSION][(y + (i * DIMENSION) - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //Diagonal abajo izquierda
        if (((y + 45) / DIMENSION) < 8 && ((x - 55) / DIMENSION) >= 0) {
            if (matriz[(x - 55) / DIMENSION][(y + 45) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((y + (i * DIMENSION) - 5) / DIMENSION) < 8 && ((x - (i * DIMENSION) - 5) / DIMENSION) >= 0) {
                        if (matriz[(x - (i * DIMENSION) - 5) / DIMENSION][(y + (i * DIMENSION) - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x - (j * DIMENSION) - 5) / DIMENSION][(y + (j * DIMENSION) - 5) / DIMENSION] == F1) {
                                    break;
                                }
                                matriz[(x - (j * DIMENSION) - 5) / DIMENSION][(y + (j * DIMENSION) - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x - 5) / DIMENSION][(y + (i * DIMENSION) - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //Diagonal arriba Derecha
        if (((y - 55) / DIMENSION) >= 0 && ((x + 45) / DIMENSION) < 8) {
            if (matriz[(x + 45) / DIMENSION][(y - 55) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((y - (i * DIMENSION) - 5) / DIMENSION) >= 0 && ((x + (i * DIMENSION) - 5) / DIMENSION) < 8) {
                        if (matriz[(x + (i * DIMENSION) - 5) / DIMENSION][(y - (i * DIMENSION) - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x + (j * DIMENSION) - 5) / DIMENSION][(y - (j * DIMENSION) - 5) / DIMENSION] == F1) {
                                    if (matriz[4][4] == 'fb') {
                                        SW = false;
                                    }
                                    break;
                                }
                                matriz[(x + (j * DIMENSION) - 5) / DIMENSION][(y - (j * DIMENSION) - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x + (i * DIMENSION) - 5) / DIMENSION][(y - (i * DIMENSION) - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
        //Diagonal arriba Izquierda
        if (((y - 55) / DIMENSION) >= 0 && ((x - 55) / DIMENSION) >= 0) {
            if (matriz[(x - 55) / DIMENSION][(y - 55) / DIMENSION] == F2) {
                for (var i = 2; i < 8; i++) {
                    if (((y - (i * DIMENSION) - 5) / DIMENSION) >= 0 && ((x - (i * DIMENSION) - 5) / DIMENSION) >= 0) {
                        if (matriz[(x - (i * DIMENSION) - 5) / DIMENSION][(y - (i * DIMENSION) - 5) / DIMENSION] == F1) {
                            for (var j = 1; i < 8; j++) {
                                if (matriz[(x - (j * DIMENSION) - 5) / DIMENSION][(y - (j * DIMENSION) - 5) / DIMENSION] == F1) {
                                    break;
                                }
                                matriz[(x - (j * DIMENSION) - 5) / DIMENSION][(y - (j * DIMENSION) - 5) / DIMENSION] = F1;
                                matriz[(x - 5) / DIMENSION][(y - 5) / DIMENSION] = F1;
                                turno();
                            }
                        }
                        if (matriz[(x - (i * DIMENSION) - 5) / DIMENSION][(y - (i * DIMENSION) - 5) / DIMENSION] == 'x') {
                            break;
                        }
                    }
                }
            }
        }
    }
}

//Funciones basicas llamadas para recargar las imagenes
function basicas() {
    regresar();
    dibujar();
    fichas();
}

//Funcion de switch para los turnos
function turno() {
    if (WS == false) {
        if (noTurno == true) {
            noTurno = false;
        } else {
            noTurno = true;
        }
        WS = true;
        cont++;
    }
}

//Mensaje Ganador
function MensajeGanador() {
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz.length; j++) {
            if (matriz[i][j] == "fb") {
                BF = BF + 1;
            }
            if (matriz[i][j] == "fn") {
                NF = NF + 1;
            }
        }
    }
    if (BF + NF == 64) {
        if (NF > BF) {
            alert("Gana La Ficha Negra");
        }
        if (Bf > NF) {
            alert("Gana La Ficha Blanca");
        }
        if (BF == NF) {
            alert("Empate");
        }
    }
    location.reload();
}