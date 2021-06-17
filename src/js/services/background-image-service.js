import axios from 'axios';
//подключение через Аксиос апи биксабея для загрузки фотографий с использованием геолокации
export default {
  searchQuery: 'Lipetsk',
  apiKey: '16192319-9ae9d95026dacaeb88e2fcf6c',

  makeQuery() {
    const url = `https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=${this.query}&per_page=5&key=${this.apiKey}`;

    return axios.get(url).then(({ data: { hits } }) => {
      return hits;
    });
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};
