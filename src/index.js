import './sass/main.scss';
import API from './partials/fetch-hits.js';
import cardsTable from './templates/pictures-table.hbs';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';


const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-button');
const loadMoreBtn = document.querySelector('.load-more');

const DEBOUNCE_DELAY = 300;
let inputValue = '';
let pageNmb = 1;

searchBtn.setAttribute('disabled', true);
loadMoreBtn.classList.add('unvisible');

searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
    pageNmb = 1;
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
        const responce = await API.fetchHits(inputValue, pageNmb);
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

        if (hits.length < 40) {
            loadMoreBtn.classList.add('unvisible');
        }

        renderCardsTable(hits);
    } catch (error) {
        Notiflix.Notify.failure('OOOOPS');
    }
}

function renderCardsTable(hit) {
    const markup = cardsTable(hit);
    gallery.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', onClickLoadMore);

async function onClickLoadMore() {
    pageNmb += 1;
    const responce = await API.fetchHits(inputValue, pageNmb);
    const hits = responce.hits;
    renderCardsTable(hits);

    if (hits.length < 40) {
        loadMoreBtn.classList.add('unvisible');
        Notiflix.Notify.info('Were sorry, but you`ve reached the end of search results.');
    }
    console.log(hits);
    console.log(pageNmb);
}


