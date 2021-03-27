import axios from 'axios';

const api = axios.create({
  // Modificar de acordo com o endereço do servidor/dispositivo utilizado (emulador Android, iOS, etc.)
  baseURL: "http://10.0.2.2:3333", // Para o Android
  //baseURL: "http://localhost:3333", // Para o iOS
});

export default api;
