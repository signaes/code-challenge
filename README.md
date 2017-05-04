Maplink - Code Challenge
======================================

Esta página contém detalhes do desafio para desenvolvedores backend.

## Tarefa

Você precisa criar um algoritmo para o supercomputador da Batcaverna!
Esse algoritmo sera responsável por calcular a probabilidade de um super-vilão atacar nas imediações de Gotham.

O algoritmo deve receber um endereço  ou um par de coordenadas(latitude,longitude) do batmóvel. Quando o input é um endereço, o algoritmo deve transformá-lo em coordenadas, usando uma API de geocodificação da sua escolha(Google, Bing, Yahoo etc).

O algoritmo usará esta coordenada para determinar a probabilidade dos próximos alvos do super-vilão, que deve ser escolhido aleatoriamente(Coringa, Duas Caras, Charada, Pinguim etc).

Calcule a posicao do super-vilão aleatoriamente dentro de um bounding box localizado em Gotham(bottom left:40.746422, -73.994753, top right:40.763328,-73.968039). Baseado nesta posição, calcule as probabilidades de ataque em cada alvo de acordo com a distancia do super-vilão para o mesmo. Quanto mais perto do alvo o super-vilão estiver, mais provável o seu ataque.

Lembre-se, esse algoritmo vai ser acessado por todos os Batdispositivos.

### Input

O endereco ou as coordenadas do Batdispositivo. Devem ser valores restritos dentro do bounding box especificado em *Tarefa*, caso contrario o supercomputador deve retornar um erro.

### Output

Cada ataque deve conter o super-vilão e a lista de alvos com a probabilidade de ataque.

[Output](https://gist.githubusercontent.com/pitteri/578a6801d6f504eda6f6ce84cad59f89/raw/60498482b132f2d530e4ac7edc76175cac616a9f/output.json)    

### Alvos

[Lista de alvos](https://gist.githubusercontent.com/pitteri/b0c06e2c9b89541559fb2d90c6ae7ccd/raw/8553d6bbbadde292548d66afd7923026ddd3e402/targets.json)
