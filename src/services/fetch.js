import axios from 'axios';

const API_KEY = '36043841-d1f663e1c84af1682a6f63198';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page) {

    const params = new URLSearchParams({
            key: API_KEY,  
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 12,
    });
    
    const response = await axios.get(`${BASE_URL}/?${params}`);

    return response.data.hits;
}