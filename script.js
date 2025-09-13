// Render daftar film
const movieList = document.getElementById('film-list');

function renderMovies(list) {
  if (!movieList) return; // biar gak error di film.html
  movieList.innerHTML = "";
  list.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";
    div.setAttribute("data-genre", movie.genre);
    div.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    // arahkan ke detail
    div.onclick = () => window.location.href = `film.html?id=${movie.id}`;
    movieList.appendChild(div);
  });
}

// Filter genre
function filterMovies(genre) {
  if (genre === "all") {
    renderMovies(movies);
  } else {
    renderMovies(movies.filter(m => m.genre === genre));
  }
}

// Pencarian
function searchMovies() {
  const input = document.getElementById('search').value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(input));
  renderMovies(filtered);
}

// Render detail film
function renderFilmDetail() {
  const detailEl = document.getElementById('film-detail');
  if (!detailEl) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const movie = movies.find(m => m.id === id);

  if (movie) {
    detailEl.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="${movie.poster}" alt="${movie.title}">
      <p>Genre: ${movie.genre}</p>
    `;
  } else {
    detailEl.innerHTML = `<p>Film tidak ditemukan.</p>`;
  }
}

// Default tampil film di beranda
if (movieList) renderMovies(movies);

// Tampilkan detail kalau di halaman film.html
renderFilmDetail();
