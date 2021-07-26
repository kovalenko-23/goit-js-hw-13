import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=22617397-addb084a927a6e55ecd24a84b';
const REQUEST = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';


async function fetchHits(inputValue, pageNmb) {
    const responce = await axios.get(`${BASE_URL}${KEY}&q=${inputValue}&${REQUEST}&page=${pageNmb}`);
    const hits = await responce;
    return hits.data;
}

export default {fetchHits};