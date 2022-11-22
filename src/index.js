import ImgApiService from './img-service';
import Notiflix from 'notiflix';
const axios = require('axios').default;

const refs = {
  form: document.querySelector('#search-form'),
  box: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoad);

const imgApiService = new ImgApiService();

function onSearch(event) {
    event.preventDefault();
  imgApiService.resetPage();
    imgApiService.query = event.target.elements.searchQuery.value.trim();
    if (imgApiService.query === "") {
        return
    }
  imgApiService.fetchArticles().then(hits => {
    clearBox();
    appendHitsMarkup(hits);
  });
  imgApiService.fetchArticlesWithTotalHits().then(totalHits => {
    requestResultNotification(totalHits);
  });
}

function onLoad() {
  imgApiService.fetchArticles().then(appendHitsMarkup);
  imgApiService.fetchArticles().then(stopLoadingMore);
}

function appendHitsMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">${likes}
                <b>Likes</b>
                </p>
                <p class="info-item">${views}
                <b>Views</b>
                </p>
                <p class="info-item">${comments}
                <b>Comments</b>
                </p>
                <p class="info-item">${downloads}
                <b>Downloads</b>
                </p>
            </div>
        </div>`;
      }
    )
    .join('');
  refs.box.insertAdjacentHTML('beforeend', markup);
}

function clearBox() {
  refs.box.innerHTML = '';
}

function stopLoadingMore(hits) {
  if (hits.length < 40) {
    refs.loadMoreBtn.disabled = true;
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function requestResultNotification(totalHits) {
  if (totalHits === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
  }
}
