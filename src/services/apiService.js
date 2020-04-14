const baseUrl = 'https://pixabay.com/api/';
const key = '16022576-fff7d7449458f2c934f19517f';

export default {
  page: 1,
  query: '',
  fetchImages() {
    return fetch(
      `${baseUrl}/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${key}`,
    )
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
