Maplink - Desafio Desenvolvedor Backend
======================================

Esta página contém detalhes do desafio para desenvolvedores backend.

## Tarefa

Você precisa criar um algoritmo para o supercomputador da BatCaverna!
Esse algoritmo sera responsavel por calcular a probabilidade de um supervilao atacar nas imediacoes de Gotham (Manhattan).

Lembre-se, esse algoritmo vai ser acessado por todos os Bat-dispositivos (Mobal).

Se o algoritmo receber um endereco vc deve transformar este endereco em coordenadas usando uma api de geocodificacao da sua escolha (ex. Google Geocode).
O algoritmo deve usar esta coordenada para calcular os alvos dos ataques do supervilao. Considere para o exercicio que o supervilao eh escolhido aleatoriamente dentro da lista de superviloes Coringa, Charada, Pinguin, Duas caras, etc. Calcule a posicao do supervilao aleatoriamente dentro dos bounds de Manhattan (definir). Baseado na posicao do supervilao calcule as probabilidades de ataque em cada alvo de acordo com a distancia do supervilao para o alvo. Quanto mais perto do alvo o supervilao estiver mais provavel o seu ataque.

### Input

O endereco ou as coordenadas do Bat-dispositivo. Devem ser valores restritos a cidade de Manhattan, caso contrario o supercomputador deve retornar um erro. Especificar bounds.

### Output

Cada ataque deve conter o supervilao e a lista de alvos com a probabilidade de ataque.

```json
{
    "supervilao": "Coringa",
    "alvos": [{
      "local":"International Bank Of Manhattan",
      "coordenada": {"lat":-23.00001, "lng":-46.000033},
      "probabilidade":75},{
      "local":"International Bank Of Manhattan",
      "coordenada": {"lat":-23.00001, "lng":-46.000033},
      "probabilidade":75},{
      "local":"International Bank Of Manhattan",
      "coordenada": {"lat":-23.00001, "lng":-46.000033},
      "probabilidade":75}
    ]
}
```      

### POIs
{
pegar manualmente n poas
}
