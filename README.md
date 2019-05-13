# Simulacao Trabalho 1

1.Requisitos para Rodar o programa   
* Node e Npm instalados (disponíveins em https://nodejs.org/en/) 
  * Utilizar versão >= 9 do ````Node.js````
2. Modo de Rodar     
* No Terminal, na pasta do projeto, rodar o comando ````npm install````   
* No terminal escreva o comando ````npm start```` no diretório do projeto

**Exemplo**
````sh
cd {{project}}
npm install
npm start
````

````js
{
    "iterations": {type: Int, required: true, obs: "Representa o número de iterações"},
    
    "queues": {
        // EXEMPLO DESCRITIVO
        "Q0": {
            //Total da soma de probabilidades deve ser um, 
            //não há validação no programa para fazer esta verificação
            "probabilities":{
                "Q1": {type: Float, required: true, "A chave 'Q1' representa o destino, 
                      e deve ser informado um valor entre 0 e 1 que represente a probabilidade de mudaça de estado"},
                "F":  {type: Float, required: true, obs: "Chave F repersenta a saída"}
            },
            "C": {type: Int, required: true, obs: "Número de servidores"},
            "K": {type: Int, required: true, obs: "tamanho da fila"},
            "CH":[{type: Int, required: true, length:2, obs: "index 1 representa o min e index 2 o max"}],
            "SA":[{type: Int, required: true, length:2, obs: "index 1 representa o min e index 2 o max"}],
            "entrance": {type: Boolean, required: false, obs: "Flag que indica se é entrada" }
        },
        //EXEMPLO COMPLETO
        "Q1": {
            "probabilities":{
                "F": 1.0
            },
            "C": 1,
            "K": 10,
            "CH": [3,10],
            "SA": [3,8],
            "entrance": false
        }
    }
}
````
