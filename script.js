// Render daftar film
const movieList = document.getElementById('movieList');

function renderMovies(list) {
  movieList.innerHTML = "";
  list.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";
    div.setAttribute("data-genre", movie.genre);
    div.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    div.onclick = () => window.open(movie.url, "_blank");
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
  const input = document.getElementById('searchInput').value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(input));
  renderMovies(filtered);
}

// Default tampil semua film
renderMovies(movies);
