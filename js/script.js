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


       
    } else {
        console.log("No funciona en absoluto");
    }
}