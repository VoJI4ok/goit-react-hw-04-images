import axios from 'axios';

const API_KEY = '30922920-26de99380603b5291145480c1';

async function fetchPictures(searchQuery, pageNumber) {
  const base_url = 'https://pixabay.com/api/?';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageNumber,
    per_page: 12,
  });
  const data = await axios.get(`${base_url}${searchParams}`);
  return data.data.hits;
}

export default fetchPictures;
