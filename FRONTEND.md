# Front-end code challenge ![alt Batlogo](public/images/batlogo-small.png)

O homem morcego precisa de sua ajuda! Um super-vilão foi localizado pelo Batman.

Você deve criar uma interface para que os Batdispositivos mostrem informações sobre os possíveis ataques a Gotham.

Nesta interface o Batman deve ser capaz de indicar ao supercomputador da Batcaverna a posição (coordenada) do super-vilão localizado, para identificar quais os locais que correm mais risco de ataque (com maior probabilidade).

Considerando que o Batman dispõe do Batmóvel para combater o crime com maior eficácia, calcule uma rota da posição atual do Batman para todas as localidades que o supercomputador informou. Considere a probabilidade decrecente para ordenação.

> Lembre-se, essa interface pode ser acessada por outros Batdispositivos além do GPS do Batmóvel.

> É imprescindível visualizar a posicão do vilão e a rota.

> A localização atual do Batman pode ser definida aleatóriamente dentro dos [limites de Gotham](https://gist.githubusercontent.com/pitteri/d56780d610cb8e0a43bfa94fc54b71cd/raw/dcdd965c84cd05d856ae32646be69868d4a80afa/gotham_bbox.json), ou em um local específico como o GCPD, por exemplo.


### Supercomputador da Batcaverna

**Input**

Coordenada do vilão.

http://code-challenge.maplink.com.br/batman/api/calc-threat?lat={y}&lon={x}

**Output**

[Exemplo](https://gist.githubusercontent.com/pitteri/578a6801d6f504eda6f6ce84cad59f89/raw/60498482b132f2d530e4ac7edc76175cac616a9f/output.json)  
