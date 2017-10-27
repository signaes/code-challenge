import { lat, lng } from '../gotham';

const random = (min, max) => Math.random() * (max - min) + min;

const getCurrentPosition = () => ({
  lat: random(lat.min, lat.max),
  lng: random(lng.min, lng.max),
});

const batman = { getCurrentPosition };

export default batman;
