import './sass/main.scss';
import API from './partials/fetch-hits.js';
import cardsTable from './templates/pictures-table.hbs';
import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-button');
const loadMoreBtn = document.querySelector('.load-more');
let inputValue = '';
let pageNmb = 1;

searchBtn.setAttribute('disabled', true);
loadMoreBtn.classList.add('unvisible');

searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
    inputValue = event.target.value;
    searchBtn.removeAttribute('disabled');
    if (!inputValue) {
        searchBtn.setAttribute('disabled', true);
    }
    console.log(inputValue);
};

searchBtn.addEventListener('click', onButtonClick);

async function onButtonClick(event) {
    event.preventDefault();
    try {
        const responce = await API.fetchHits(inputValue);
        const hits = responce.hits;
        const totalHits = responce.totalHits;
        loadMoreBtn.classList.remove('unvisible');

        if (inputValue) {
            gallery.innerHTML = '';
            hits;
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
        }

        if (inputValue.trim('') === '') {
            return;
        }

        if (hits.length === 0) {
             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

        renderCardsTable(hits);
        console.log(totalHits);
        console.log(hits);
    } catch (error) {
        Notiflix.Notify.failure('OOOOPS');
    }
}

function renderCardsTable(hit) {
    const markup = cardsTable(hit);
    gallery.insertAdjacentHTML('beforeend', markup);
}

// loadMoreBtn.addEventListener('click', () => {
//     pageNmb += 1;
// });




