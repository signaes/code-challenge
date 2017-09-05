# Back-end code challenge ![alt Batlogo](public/images/batlogo-small.png)

Batman needs your help!

You should create an algorithm for the Batcave supercomputer that should be able to calculate the probability of a super villain attacking Gotham.

This algorithm must have an address, a location or a coordinate (the clock tower or the current position of the villain, for example). When the input is an address or a location, you must transform it into a coordinate (using Google, Maplink, Yahoo, Bing, etc).

You will use this coordinate to determine the probability of an attack on nearby  [locations](https://gist.githubusercontent.com/pitteri/b0c06e2c9b89541559fb2d90c6ae7ccd/raw/8553d6bbbadde292548d66afd7923026ddd3e402/targets.json) within the [Gotham boundaries](https://gist.githubusercontent.com/pitteri/d56780d610cb8e0a43bfa94fc54b71cd/raw/dcdd965c84cd05d856ae32646be69868d4a80afa/gotham_bbox.json).

The probability is given by the linear distance between the villain and the target, that is, the closer, greater is the probability of an attack. To calculate the linear distance use the [Haversine Formula](https://rosettacode.org/wiki/Haversine_formula). Consider the radius of the Earth as 6371km, and to facilitate disregard the elevation in the calculations!

The range of action of the villain is 2km, and the maximum probability of attack is 95% in cases where the result is greater than that. (After all, who would understand what goes on inside the head of a super villain ?!)

> Remember, Batman is very demanding, even with the quality of the codes. Surprise him!

### Input

The villain address, location or coordinate.

#### Sample:
* **GET** /address?q=_Rua Fidêncio Ramos, 302 - São Paulo_
* **GET** /location?q=_Maplink_
* **GET** /coordinate?q=_-23.594684,-46.685900_

The coordinate must be within the Gotham city boundaries, otherwise it must be notified in some way.

### Output

Each response should contain the location of the villain and the information about the locations that are under the risk of attack.


[Sample](https://gist.githubusercontent.com/pitteri/578a6801d6f504eda6f6ce84cad59f89/raw).
