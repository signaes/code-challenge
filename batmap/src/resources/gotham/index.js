const box = {
  bottomLeft: [
    40.746422,
    -73.994753
  ],
  topRight: [
    40.763328,
    -73.968039
  ]
};

export const lat = {
  min: box.topRight[0],
  max: box.bottomLeft[0]
};

export const lng = {
  min: box.bottomLeft[1],
  max: box.topRight[1]
};

export default { box, lat, lng };
