// insert your code here
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '47398342-c4f399e57f5c71f1dbfff10b5';
const PIXABAY_API = 'https://pixabay.com/api/';

const gallery = document.querySelector('.gallery');

async function imageParams(search) {
  try {
    const response = await axios.get(PIXABAY_API, {
      params: {
        key: API_KEY,
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    });

    const data = response.data;
    console.log(data);

    console.log(response.data);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Error');
  }
}

