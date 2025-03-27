'use strict';

import 'dotenv/config';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = process.env.API_KEY;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: process.env.API_KEY,
};

export const getImages = async (query = '') => {
  const params = new URLSearchParams({
    key: API_KEY,
  });

  if (query) {
    params.append('q', query);
  }

  return fetch(`${BASE_URL}/?${params}`);
};
