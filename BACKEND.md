# Back-end code challenge ![alt Batlogo](public/images/batlogo-small.png)

<b>O homem morcego precisa de sua ajuda!</b>

Você deve criar um algoritmo para o supercomputador da Batcaverna que deve ser capaz de calcular a probabilidade do arqui-inimigo Coringa atacar as imediações de Gotham.

Este algorítimo deve esperar um endereço, uma localidade ou uma coordenada (a torre do relógio ou a posiçao atual do Coringa, por exemplo). Quando o input for um endereço ou uma localidade, você deve transformá-lo em uma coordenada (utilizando Google, Yahoo, Bing, etc).

Você irá utilizar esta coordenada para determinar a probabilidade de um ataque do Coringa nos [locais](https://gist.githubusercontent.com/pitteri/b0c06e2c9b89541559fb2d90c6ae7ccd/raw/8553d6bbbadde292548d66afd7923026ddd3e402/targets.json) próximos, dentro dos [limites de Gotham](https://gist.githubusercontent.com/pitteri/d56780d610cb8e0a43bfa94fc54b71cd/raw/dcdd965c84cd05d856ae32646be69868d4a80afa/gotham_bbox.json).

A probabilidade se dá pela distância linear entre o Coringa e o alvo, ou seja, quanto mais próximo, maior a probabilidade de um ataque. Para calcular a distância linear utilize a [Fórmula de Haversine](https://pt.wikipedia.org/wiki/F%C3%B3rmula_de_Haversine). Considere o raio da Terra como 6371km, e para facilitar desconsidere a elevação nos cálculos!

O raio de atuação do Coringa é de 2km, e a probabilidade máxima de ataque é de 95% nos casos em que o resultado seja maior que isso. (Afinal, quem entenderia o que se passa na cabeça do Coringa?!)

> Lembre-se, este algoritmo vai ser acessado por todos os Batdispositivos.

### Input

O endereço, localidade ou coordenada do vilão.

#### Endpoints:
1) GET /address?q=\<endereço\>
2) GET /location?q=\<localidade\>
3) GET /coordinate?q=\<latitude\>,\<longitude\>

A coordenada deve estar dentro dos limites de Gotham, caso contrário, é preciso notificar de alguma forma.

### Output

Cada resposta deve conter a localização do Coringa e as informações dos locais que sofrem risco de ataque.

[Exemplo](https://gist.githubusercontent.com/pitteri/578a6801d6f504eda6f6ce84cad59f89/raw) com dados fictícios.
