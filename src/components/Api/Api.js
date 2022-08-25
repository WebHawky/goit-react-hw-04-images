const axios = require('axios');

const API_KEY = '28739489-898791d54d19d9dcf448a419d';
const STANDARD_PARAMS = '&image_type=photo&orientation=horizontal';

export const Api = {
  galleryFetch: async (searchName, currentPage) => {
    const fetchingData = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchName}${STANDARD_PARAMS}&page=${currentPage}&per_page=12`
    );

    const recievedData = await fetchingData.data;

    return recievedData.hits;
  },
};
