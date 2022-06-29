import axios from 'axios';

export const yandexApi = axios.create({
  baseURL: 'https://ya-praktikum.tech',
});
