'use strict';

import Notiflix from 'notiflix';

import { getImages } from './api.js';

const input = document.querySelector('.search-form input');
const divGallery = document.querySelector('.gallery');
const searchForm = document.querySelector('form');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.style.display = 'none';

const renderImages = ({ hits }) => {
  divGallery.innerHTML = '';

  hits.forEach((element) => {
    const newPhoto = `
    <div class="card">
      <img class="card-image" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes </b>${element.likes}
        </p>
        <p class="info-item">
          <b>Views </b>${element.views}
        </p>
        <p class="info-item">
          <b>Comments </b>${element.comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>${element.downloads}
        </p>
      </div>
    </div>
  `;

    divGallery.insertAdjacentHTML('beforeend', newPhoto);
    loadMoreButton.style.display = 'block';
  });
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const query = e.target.elements.searchQuery.value;

  getImages(query)
    .then((res) => res.json())

    .then((data) => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
      } else {
        renderImages(data);
      }
    });
});
