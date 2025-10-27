import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.fsph.se.gov.br',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
