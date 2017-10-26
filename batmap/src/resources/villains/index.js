import axios from 'axios';

const villains = ({ lat, lng }) => axios.get(`http://code-challenge.maplink.com.br/coordinate?q=${lat},${lng}`);

export default villains;
