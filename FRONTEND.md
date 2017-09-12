# Front-end code challenge ![alt Batlogo](public/images/batlogo-small.png)

Batman needs your help! A supervillain was found.

You must create an interface for the Batdevices to show information about the possible attacks to Gotham

In this interface, Batman must be able to tell the Batcave's supercomputer the location (coordinate) of the recently found supervillain to identify which locations are most likely to be attacked.

Since Batman has the Batmobile to fight crime more effectively, calculate a route from Batman's current position to all locations the supercomputer reported. Consider the probability for ordering.


> Remember, this interface can be accessed by other Batdevices besides the batmobile GPS.

> It is essential to visualize the villain's position and the route.

> The Batman's current location can be set randomly within the [Gotham boundaries](https://gist.githubusercontent.com/pitteri/d56780d610cb8e0a43bfa94fc54b71cd/raw/dcdd965c84cd05d856ae32646be69868d4a80afa/gotham_bbox.json), or in a specific location such as the GCPD, for example.

> Remember, Batman is very demanding, even with the quality of the codes. Surprise him!

### Batcave Supercomputer API

**Input**

Villain coordinate: http://code-challenge.maplink.com.br/coordinate?q={latitude},{longitude}

**Output**

[Sample](https://gist.githubusercontent.com/pitteri/578a6801d6f504eda6f6ce84cad59f89/raw)  
