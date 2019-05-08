module.exports = class Random {
    constructor() {
        this.x_anterior = 19
        this.M = 4493
        this.a = 500
        this.c = 4
        this.quantidade_iteracoes = 0
    }
    linear_random() {
        this.quantidade_iteracoes += 1
        let x_atual = (this.a * this.x_anterior + this.c) % this.M
        this.x_anterior = x_atual
        return x_atual / this.M
    }
}