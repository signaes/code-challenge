# Back-end code challenge ![alt Batlogo](public/images/batlogo-small.png)

O homem morcego precisa de sua ajuda!
Você deve criar um algoritmo para o supercomputador da Batcaverna que deve ser capaz de calcular a probabilidade de um super-vilão atacar as imediações de Gotham.

Este algorítimo deve esperar um endereço, uma localidade ou uma coordenada (a torre do relógio ou a posiçao atual do Coringa, por exemplo). Quando o input for um endereço ou uma localidade, você deve transformá-lo em uma coordenada (utilizando Google, Yahoo, Bing, etc).

Você irá utilizar esta coordenada para determinar a probabilidade de ataque de um super-vilão nos [locais](https://gist.githubusercontent.com/pitteri/b0c06e2c9b89541559fb2d90c6ae7ccd/raw/8553d6bbbadde292548d66afd7923026ddd3e402/targets.json) próximos, dentro dos [limites de Gotham](https://gist.githubusercontent.com/pitteri/d56780d610cb8e0a43bfa94fc54b71cd/raw/dcdd965c84cd05d856ae32646be69868d4a80afa/gotham_bbox.json). A probabilidade se dá pela distância linear entre o vilão e o alvo, ou seja, quanto mais próximo, maior a probabilidade de um ataque. O super-vilão pode ser escolhido aleatoriamente (Coringa, Mulher Gato, Duas Caras, Charada, Pinguim, etc).

> Lembre-se, este algoritmo vai ser acessado por todos os Batdispositivos.

### Input

O endereço, localidade ou coordenada do vilão.

A coordenada deve estar dentro dos limites de Gotham, caso contrário, é preciso notificar de alguma forma.

### Output

Cada ataque deve conter a informacão do super-vilão e dos locais com a probabilidade de ataque que foi calculada.

[Exemplo](https://gist.githubusercontent.com/pitteri/578a6801d6f504eda6f6ce84cad59f89/raw/60498482b132f2d530e4ac7edc76175cac616a9f/output.json)  
