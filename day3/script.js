let data = [];
const fetchMovies = async () => {
  let res = await fetch("https://api.jikan.moe/v4/anime");
  data = await res.json();
  console.log(data);
  makeMovieList(data.data);
};

fetchMovies();

const makeMovieList = (data) => {
  const movieDiv = document.getElementById("movies");
  movieDiv.innerHTML = "";
  const movieList = data
    .map((movie) => {
      return `
      <div class="movie">
        <img src="${movie.images.jpg.image_url}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>Score: ${movie.score}</p>
        </div>`;
    })
    .join("");
  movieDiv.innerHTML = movieList;
  return movieList;
};

const searchMovies = () => {
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value.toLowerCase();
  const filteredMovies = data.data.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue)
  );
  console.log(filteredMovies);
  makeMovieList(filteredMovies);
};

const sortAsc = () => {
  let arr = data.data;
  arr.sort((a, b) => a.score - b.score);
  makeMovieList(arr);
};

const sortDsc = () => {
  let arr = data.data;
  arr.sort((a, b) => b.score - a.score);
  makeMovieList(arr);
};
