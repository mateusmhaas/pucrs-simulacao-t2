"use strict"

var config = require("./config.json")

var Random = require("./Random")
const random = new Random()

var queues = config.queues

var eventos = [
    { 'key': 'Q0', 'tempo': 1, 'sorteio': 1 },
]

const get_random = (min_max) => {
    return (min_max[1] - min_max[0]) * random.linear_random() + min_max[0];
}

const random_next_event = (key) => {
    var r = random.linear_random();
    
    var current = queues[key]
    
    for (var k in current.probabilities) {
        r -= current.probabilities[k]
        if (r <= 0)
            return k
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
    }
    else 
        next.perda += 1

    if (next.entrance)
        agenda(evento.key, null, evento['tempo'], get_random(next.CH), "entrance")

}

const eventoSA = (evento, previous) => {
    previous.estados[previous.fila] += evento['sorteio']
    previous.fila -= 1

    if (previous.fila >= previous.C)
        agenda(random_next_event(evento.previous), evento.previous, evento['tempo'], get_random(previous.SA), "SA1")
}

const eventoPIPE = (evento) => {
    var previous = queues[evento.previous]
    var current = queues[evento.key]    
    
    if (current)
        eventoCH(evento, current)

    if (previous)
        eventoSA(evento, previous)
}

const run = () => {
    for (var k in queues) {
        queues[k].fila = 0;
        queues[k].perda = 0;
        queues[k].estados = [];

        for (var i = 0; i <= queues[k].K; i++)
            queues[k].estados[i] = 0;
    }

    for (var i = 0; i < config.iterations; i++) {
        const next_evento = get_next_evento()
        eventoPIPE(next_evento)
    }
}



const print_statistics = () => {
    console.log("GERANDO STATÍSTICAS: ")
    
    for (var k in queues){
        console.log("Fila: ", k)
        console.log("Perdas: ", queues[k].perda)

        console.log("\nTempo (un) em cada estado:")
        queues[k].estados.filter( v => v > 0 )
            .forEach((value, index)=>{
                console.log(`\tEstado [${index}]: ${value.toFixed(4)} un`)
            })

        var totalTime = queues[k].estados.reduce((acc, curr) => acc + curr)
        var probs = []

        for (var i in queues[k].estados)
            probs[i] = (queues[k].estados[i] / totalTime) * 100;

        console.log('\nProbabilidade (%) de se encontrar em cada estado:')
        probs.filter( v => v > 0 )
            .forEach((value, index) => {
                console.log(`\tEstado [${index}]: ${value.toFixed(4)}%`)
            })

        console.log("\n___________________________________________________________________\n\n")
    }
}

const main = () => {
    run()
    print_statistics()
}

main()