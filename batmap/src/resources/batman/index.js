const random = (min, max) => Math.random() * (max - min) + min;

const gothamBox = {
  bottomLeft: [
    40.746422,
    -73.994753
  ],
  topRight: [
    40.763328,
    -73.968039
  ]
};

const getCurrentPosition = () => ({
  lat: random(gothamBox.topRight[0], gothamBox.bottomLeft[0]),
  lng: random(gothamBox.bottomLeft[1], gothamBox.topRight[1]),
});

const batman = { getCurrentPosition };

export default batman;
