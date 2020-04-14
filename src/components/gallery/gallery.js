import apiService from '../../services/apiService';
import galleryItem from '../../templates/galleryItem.hbs';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.forms.searchForm,
  query: document.forms.searchForm.elements.query,
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
  modalImage: document.querySelector('.modalImage'),
};

refs.query.addEventListener('input', debounce(searchImages, 500));
refs.loadMoreBtn.addEventListener('click', loadMoreImages);
refs.gallery.addEventListener('click', showModalWindow);

function searchImages(e) {
  e.preventDefault();
  PNotify.info({
    title: 'yellow+blue',
    text: 'Use + for two-and-more params of picture you want to find.',
  });
  PNotify.closeAll();

  const inputValue = refs.query.value;

  clearListItems();
  apiService.resetPage();
  apiService.searchQuery = inputValue;
  apiService
    .fetchImages()
    .then(data => getImages(data))
    .catch(error => console.error('ERROR--', error));
}

function getImages(data) {
  const markup = data.map(image => galleryItem(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function loadMoreImages() {
  apiService
    .fetchImages()
    .then(data => getImages(data))
    .finally(() => scroll());
}

function scroll() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function showModalWindow(e) {
  console.log(e.target);
  if (e.target.nodeName === 'IMG') {
    const largeImageURL = e.target.dataset.action;
    basicLightbox
      .create(
        `
    <img width="800" height="500" src="${largeImageURL}">`,
      )
      .show();
  }
}

// function getImages(data) {
//   const markup = data.reduce((acc, image) => {
//     return (acc += galleryItem(image));
//   }, '');
//   refs.gallery.innerHTML = markup;
// }
