import 'dotenv/config';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoCardTemplate from './templates/photo-card.hbs';

createLoader();

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const { searchForm, gallery, loader } = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  toggleLoader();
  const query = e.target.searchQuery.value || null;
  getImages(query);
});

async function getImages(query) {
  const params = { per_page: 40 };

  if (query) params.q = query;

  const response = await axios.get('', {
    params,
  });
  renderGallery(response.data.hits);
  lightbox.refresh();
  toggleLoader();

  searchForm.elements.searchQuery.value = '';
}

getImages();

const renderGallery = (images) => {
  clearGallery();

  const markup = [...images].map((img) => photoCardTemplate(img)).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
};

const clearGallery = () => {
  gallery.innerHTML = '';
};

function createLoader() {
  const loader = `
    <div class="loader">
      <div class="spinner">
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', loader);
}

function toggleLoader() {
  loader.classList.toggle('hidden');
}
