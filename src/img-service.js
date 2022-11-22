const axios = require('axios').default;

const URL = 'https://pixabay.com/api/';
const KEY = '31465723-59c9170543570d8286da770f4';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticlesHits() {
    const response = await axios.get(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    this.increamentPage();
    return response.data.hits;
  }

  async fetchArticlesWithTotalHits() {
    const response = await axios.get(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    return response.data.totalHits;
  }

  resetPage() {
    this.page = 1;
  }

  increamentPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
