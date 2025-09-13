async function loadMovies() {
  try {
    const res = await fetch('data/movies.json');
    const movies = await res.json();
    window.allMovies = movies;
    displayMovies(movies);
  } catch (err) {
    document.getElementById('movie-list').innerText = 'Error: Gagal memuat data film';
  }
}

function displayMovies(movies) {
  const list = document.getElementById('movie-list');
  if (!movies.length) {
    list.innerHTML = '<p>Film tidak ditemukan.</p>';
    return;
  }
  list.innerHTML = movies.map(m => `
    <div class="movie-card" onclick="goToFilm('${m.id}')">
      <img src="${m.poster}" alt="${m.title}">
      <h3>${m.title}</h3>
      <p>${m.genre}</p>
    </div>`).join('');
}

function filterGenre(genre) {
  if (genre === 'All') {
    displayMovies(window.allMovies);
  } else {
    displayMovies(window.allMovies.filter(m => m.genre === genre));
  }
}

function searchMovie() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  displayMovies(window.allMovies.filter(m => m.title.toLowerCase().includes(q)));
}

function goToFilm(id) {
  window.location.href = `film.html?id=${id}`;
}

async function loadFilmDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const res = await fetch('data/movies.json');
    const movies = await res.json();
    const movie = movies.find(m => m.id === id);
    const detail = document.getElementById('film-detail');

    if (movie) {
      detail.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title}" style="max-width:200px">
        <p><b>Genre:</b> ${movie.genre}</p>
        <p>${movie.description}</p>
      `;

      // Tambahkan embed video jika ada
      if (movie.video) {
        detail.innerHTML += `
          <div style="margin-top:20px">
            <iframe width="560" height="315" 
              src="${movie.video}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>`;
      }
    } else {
      detail.innerHTML = '<p>Film tidak ditemukan.</p>';
    }
  } catch (err) {
    document.getElementById('film-detail').innerText = 'Error: gagal memuat detail film';
  }
}

if (document.getElementById('movie-list')) loadMovies();
if (document.getElementById('film-detail')) loadFilmDetail();
