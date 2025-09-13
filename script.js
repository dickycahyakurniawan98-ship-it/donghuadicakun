// Render daftar film
const movieList = document.getElementById("movieList");

function renderMovies(list) {
  movieList.innerHTML = "";
  list.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    div.onclick = () => {
      window.location.href = `film.html?id=${movie.id}`;
    };
    movieList.appendChild(div);
  });
}

// Filter berdasarkan genre
function filterMovies(genre) {
  if (genre === "all") {
    renderMovies(movies);
  } else {
    renderMovies(movies.filter(m => m.genre === genre));
  }
}

// Pencarian
function searchMovies() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(input));
  renderMovies(filtered);
}

// Detail film
const urlParams = new URLSearchParams(window.location.search);
const filmId = parseInt(urlParams.get("id"));

if (filmId) {
  const movie = movies.find(m => m.id === filmId);
  if (movie) {
    document.getElementById("film-title").innerText = movie.title;
    document.getElementById("film-genre").innerText = "Genre: " + movie.genre;
    document.getElementById("film-description").innerText = movie.description;
    document.getElementById("film-video-src").src = movie.video;
    document.getElementById("film-video").load();
  }
}

// Tampilkan semua film di beranda
if (movieList) {
  renderMovies(movies);
}
