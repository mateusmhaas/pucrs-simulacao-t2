"use strict"

/**
 * Seta Variáveis Globais
 */

var config = require("./config.json")
var interacoes = 200

var eventos = [
    { 'key': 'Q0', 'tempo': 1, 'sorteio': 1 },
]

class Random {
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

const random = new Random()

const get_random = (min_max) => {
    return (min_max[1] - min_max[0]) * random.linear_random() + min_max[0];
}

const random_next_event = (key) => {
    var r = random.linear_random();
    var current = config[key]
    for (var k in current.probabilities) {
        r -= current.probabilities[k]
        if (r <= 0) {
            return k
        }
    }
}
var agenda = (key, prev, tempo, sorteio, code) =>
    eventos = eventos.concat({ 'key': key, 'previous': prev, 'tempo': (tempo + sorteio), 'sorteio': sorteio, 'code': code })

const get_next_evento = () => {
    eventos.sort((a, b) => {
        if (a.tempo < b.tempo) return 1
        if (a.tempo > b.tempo) return -1
        return 0
    })
    let next = eventos.pop()
    return next
}

const eventoCH = (evento, next) => {
    if (next.fila < next.K) {
        next.estados[next.fila] += evento['sorteio']
        next.fila += 1
        if (next.fila <= next.C)
            agenda(random_next_event(evento.key), evento.key, evento['tempo'], get_random(next.SA), "SA")
    } else next.perda += 1
    if (next.entrance){
        agenda(evento.key, null, evento['tempo'], get_random(next.CH), "entrance")
    }

}

const eventoSA = (evento, previous) => {
    previous.estados[previous.fila] += evento['sorteio']
    previous.fila -= 1
    if (previous.fila >= previous.C)
        agenda(random_next_event(evento.previous), evento.previous, evento['tempo'], get_random(previous.SA), "SA1")
}

const eventoPIPE = (evento) => {
    var previous = config[evento.previous]
    var current = config[evento.key]    
    if (current) {
        eventoCH(evento, current)
    }
    if (previous) {
        eventoSA(evento, previous)
    }
}

const run = () => {
    for (var k in config) {
        config[k].fila = 0;
        config[k].perda = 0;
        config[k].estados = [];
        for (var i = 0; i <= config[k].K; i++) {
            config[k].estados[i] = 0;
        }
    }
    for (var i = 0; i < interacoes; i++) {
        const next_evento = get_next_evento()
        eventoPIPE(next_evento)
    }
}
const print_statistics = () => {
    console.log("GERANDO STATÍSTICAS: ")
    // console.log(config)
    for(var k in config){
        console.log("Fila: ", k)
        console.log("Perdas: ", config[k].perda)
        console.log("Tempo em cada estado:")
        console.log(config[k].estados)
        var totalTime = config[k].estados.reduce((acc, curr) => acc + curr)
        var probs = []
        for(var i in config[k].estados) {
            probs[i] = (config[k].estados[i] / totalTime) * 100;
        }
        console.log('Probabilidade percentual de se encontrar em cada estado:')
        console.log(probs)

        console.log("\n___________________________________________________________________\n\n")
    }
}

const main = () => {
    run()
    print_statistics()
}

main()