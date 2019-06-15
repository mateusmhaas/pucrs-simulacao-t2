require("ggplot2")

setwd("/home/guedes/Projects/pucrs-simulacao-t2")

perdas <- read.csv("perdas.csv")
probabilidades <- read.csv("probabilidades.csv")
tempos <- read.csv("tempos.csv")


ggplot(data = tempos, 
       aes(x=ESTADO, y=TEMPO,fill = factor(FILA), color = factor(FILA))) +
  geom_bar(stat = "identity", alpha=0.4, position="dodge") +   facet_grid(~FILA)

ggsave("plots/tempos.png", width = 10, height = 4)


ggplot(data = probabilidades, 
       aes(x=ESTADO, y=PROBABILIDADE,fill = factor(FILA), color = factor(FILA))) +
  geom_bar(stat = "identity", alpha=0.4, position="dodge") +   facet_grid(~FILA)

ggsave("plots/probabilidades.png", width = 10, height = 4)


ggplot(data = perdas,
       aes(x=FILA, y=PERDAS,fill = factor(FILA), color = factor(FILA))) +
  geom_bar(alpha=0.4, stat="identity")

ggsave("plots/perdas.png", width = 10, height = 4)

