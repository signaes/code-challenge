# Back-end code challenge ![alt Bat-logo](public/images/batlogo-small.png)

Você precisa criar um algoritmo para o super Bat-computador!
Esse algoritmo será responsável por calcular a probabilidade de um supervilão foragido atacar as imediações de Gotham City (Manhattan).

> Lembre-se, esse algoritmo vai ser acessado por todos os Bat-dispositivos (Devices).

Se o algoritmo receber um endereço, será necessário transformar este endereço em coordenadas geográficas usando uma api de geocodificação da sua escolha (ex. Google Geocode).
O algoritmo deve usar esta coordenada para calcular os alvos dos ataques do supervilão. Considere para o exercício que o supervilão eh escolhido aleatoriamente dentro de lista de supervilões.
Calcule a posicao do supervilao aleatoriamente dentro dos bounds de Manhattan (a definir). Baseado na posicao do supervilao calcule as probabilidades de ataque em alguns alvos específicos ([neste arquivo](a definir)) de acordo com a distância do supervilão para o alvo. Quanto mais perto do alvo o supervilão estiver mais provável é o seu ataque.

### Input

O endereco ou as coordenadas do Bat-dispositivo. Devem ser valores restritos a cidade de Manhattan, caso contrario o supercomputador deve retornar um erro. Especificar bounds.

### Output

Cada ataque deve conter o supervilao e a lista de alvos com a probabilidade de ataque.

```json
{
    "supervilao": "Coringa",
    "alvos": [{
      "local": "International Bank Of Manhattan",
      "coordenada": {
        "lat": -23.00001,
        "lng": -46.000033
      },
      "probabilidade": 75
    },{
      "local": "International Bank Of Manhattan",
      "coordenada": {
        "lat": -23.00001,
        "lng": -46.000033
      },
      "probabilidade": 75
    },{
      "local": "International Bank Of Manhattan",
      "coordenada": {
        "lat": -23.00001,
        "lng": -46.000033
      },
      "probabilidade": 75
    }]
}
```      

### POIs
{
pegar manualmente n poas
}
