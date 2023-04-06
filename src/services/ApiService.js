import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;
axios.defaults.params = {
  key: '33310644-33c3a55021d389068af948751',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getImages = async (query, page) => {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response.data;
};

const api = {
  getImages,
};

export default api;
