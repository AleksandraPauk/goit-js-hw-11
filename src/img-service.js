const URL = 'https://pixabay.com/api/';
const KEY = '31465723-59c9170543570d8286da770f4';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    return fetch(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {
        this.increamentPage();
        return data.hits;
      });
    // const response = await fetch(
    //   `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    // )
    // const articles = await response.json()
    // return articles
  }

  // giveArticlesHits() {
  //   this.fetchArticles().then(data => {
  //     this.increamentPage();
  //     console.log(data.hits)
  //       return data.hits;
  //     });
  // }

 fetchArticlesWithTotalHits() {
    return fetch(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {

        return data.totalHits;
      })
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
