window.onload = function () {
    var elemento = document.getElementById("cont");
    var contexto = elemento.getContext("2d");
    if (contexto) {
        class Destino {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.w = 10;
                this.h = 10;
            }

            update(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        class Bola {
            constructor(x, y, r, vX, vY) {
                this.x = x;
                this.y = y;
                this.vX = vX;
                this.vY = vY;
                this.r = r;
                this.dX = 0;
                this.dY = 0;
                this.mover = 0;
                this.sX = 1;
                this.sY = 1;
            }

            update() {
                this.x += this.vX;
                this.y += this.vY;
            }

            checkColision() {
                if ((this.x + this.r) >= larguraTela) {
                    this.vX *= -1;
                    this.sX = -this.sX;
                } else if ((this.x - this.r) < 0) {
                    this.vX *= -1;
                    this.sX = -this.sX;
                }
                if ((this.y + this.r) >= alturaTela) {
                    this.vY *= -1;
                    this.sY = -this.sY;
                } else if ((this.y - this.r) < 0) {
                    this.vY *= -1;
                    this.sY = -this.sY;
                }
            }

            setaDestinoX(x) {
                this.dX = x;
            }

            setaDestinoY(y) {
                this.dY = y;
            }

            moveAuto() {
                var x = retornaParImpar();
                if (x == true) {
                    this.vX *= -1;
                    this.sX = -this.sX;
                } else {
                    this.vY *= -1;
                    this.sY = -this.sY;
                }
            }

            checaDestino() {
                if (this.mover == 1) {

                    if (this.sX == 1) {
                        if (this.x > this.dX) {
                            this.sX = -this.sX;
                            this.vX *= -1;
                        }
                    } else if (this.sX == -1) {
                        if (this.x < this.dX) {
                            this.sX = -this.sX;
                            this.vX *= -1;
                        }
                    }

                    if (this.sY == 1) {
                        if (this.y > this.dY) {
                            this.sY = -this.sY;
                            this.vY *= -1;
                        }
                    } else if (this.sY == -1) {
                        if (this.y < this.dY) {
                            this.sY = -this.sY;
                            this.vY *= -1;
                        }
                    }

                    if ((this.x > (this.dX - this.vX) && this.x < (this.dX + this.vX)) && (this.y > (this.dY - this.vY) && this.y < (this.dY + this.vY))) {
                        this.mover = 0;
                    }
                    this.update();
                }
            }
        }


        var alturaTela = elemento.height;
        var larguraTela = elemento.width;

        var x = Math.floor((Math.random() * larguraTela) + 1);
        var y = Math.floor((Math.random() * alturaTela) + 1);
        var r = 10;
        var vX = 5;
        var vY = 5;
        var bola = new Bola(x, y, r, vX, vY);
        var eu = new Bola(Math.floor((Math.random() * larguraTela) + 1), Math.floor((Math.random() * alturaTela) + 1), r, vX, vY);
        var destino = new Destino(eu.x, eu.y);
        var bolas = new Array();
        bolas.push(bola);
        bolas.push(eu);

        setInterval(function () { bola.moveAuto(); }, 2000);

        dibujar();

        animar();
    } else {
        console.log("No funciona en absoluto");
    }

    function dibujar() {
        contexto.clearRect(0, 0, larguraTela, alturaTela);
        contexto.fillStyle = "#FF0000";
        contexto.beginPath();
        contexto.moveTo(bola.x, bola.y);
        contexto.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2);
        contexto.closePath();
        contexto.fill();

        contexto.fillStyle = "#0000FF";
        contexto.beginPath();
        contexto.moveTo(eu.x, eu.y);
        contexto.arc(eu.x, eu.y, eu.r, 0, Math.PI * 2);
        contexto.closePath();
        contexto.fill();

        contexto.beginPath();
        contexto.fillStyle = "#FF7F50";
        contexto.fillRect(destino.x, destino.y, destino.w, destino.h);
        contexto.fill();
    }

    function animar() {
        bola.checkColision();
        bola.update();

        eu.checkColision();
        eu.checaDestino();
        asesinato();
        dibujar();

        setTimeout(animar, 30);
    }

    elemento.onclick = function (e) {
        var pX;
        var pY;
        pX = e.pageX - this.offsetLeft;
        pY = e.pageY - this.offsetTop;
        eu.setaDestinoX(pX);
        eu.setaDestinoY(pY);
        eu.mover = 1;

        destino.update(pX, pY);


    }

    function asesinato() {
        for (var i = 0; i + 1 < bolas.length; i++) {
            var j = i + 1;
            var anterior = bolas[i];
            var proximo = bolas[j];

            if ((
                (bolas[i].x + 2 * bolas[i].r) > bolas[j].x
                &&
                (bolas[i].x + 2 * bolas[i].r) < (2 * bolas[j].r + bolas[j].x)
            ) &&
                (
                    (bolas[i].y + 2 * bolas[i].r) > bolas[j].y
                    &&
                    (bolas[i].y + 2 * bolas[i].r) < (2 * bolas[j].r + bolas[j].y)
                )
            ) {
                alert("Felicidades has colisionado las bolas");
                location.reload()

            }

        }
    }

    function retornaParImpar() {
        var um;
        var check;
        um = Math.floor((Math.random() * 6) + 1);
        check = (um % 2 == 0 ? true : false);
        return check;
    }
}