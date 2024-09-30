let movies = [];

fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => response.json())
    .then(data => {
        movies = data; 
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
        const lista = document.getElementById('lista');
        lista.innerHTML = '<li class="list-group-item">Error al cargar películas.</li>';
    });

function displayMovies(moviesToShow) {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; 

    if (moviesToShow.length === 0) {
        lista.innerHTML = '<li class="list-group-item">No se encontraron resultados.</li>';
        return;
    }

    moviesToShow.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div class="card d-flex flex-row align-items-center justify-content-between" style="cursor: pointer;" data-movie-id="${movie.id}">
                <div class="card-content">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-tagline">${movie.tagline || 'Sin lema'}</p>
                </div>
                <div class="rating"> 
                    ${'<span class="fa fa-star checked"></span>'.repeat(Math.round(movie.vote_average / 2))}
                    ${'<span class="fa fa-star"></span>'.repeat(5 - Math.round(movie.vote_average / 2))}
                </div>
            </div>
        `;

        listItem.addEventListener('click', () => showMovieDetails(movie));

        lista.appendChild(listItem);
    });
}

            function showMovieDetails(movie) {
                const offcanvasTitle = document.getElementById('offcanvasTopLabel');
                const movieOverview = document.getElementById('movieOverview');
                const movieGenres = document.getElementById('movieGenres');
                const dropdownDetalles = document.getElementById('dropdownDetalles');

                offcanvasTitle.textContent = movie.title;
                movieOverview.textContent = movie.overview;

                movieGenres.innerHTML = '';
                movie.genres.forEach(genre => {
                    const listItem = document.createElement('li');
                    listItem.textContent = genre.name;
                    movieGenres.appendChild(listItem);
                });

    dropdownDetalles.innerHTML = '';
    dropdownDetalles.innerHTML += `<li><a class="dropdown-item">Año: ${new Date(movie.release_date).getFullYear()}</a></li>`;
    dropdownDetalles.innerHTML += `<li><a class="dropdown-item">Duración: ${movie.runtime} min</a></li>`;
    dropdownDetalles.innerHTML += `<li><a class="dropdown-item">Presupuesto: $${movie.budget.toLocaleString()}</a></li>`;
    dropdownDetalles.innerHTML += `<li><a class="dropdown-item">Ganancias: $${movie.revenue.toLocaleString()}</a></li>`;

    const offcanvas = new bootstrap.Offcanvas(document.getElementById('movieOffcanvas'));
    offcanvas.show();
}

            function filterMovies() {
                const input = document.getElementById('inputBuscar').value.toLowerCase();

                if (input.trim() === '') {
                    document.getElementById('lista').innerHTML = ''; 
                    return;
                }

                const filteredMovies = movies.filter(movie => 
                    movie.title.toLowerCase().includes(input) ||
                    (movie.tagline && movie.tagline.toLowerCase().includes(input)) ||
                    (movie.overview && movie.overview.toLowerCase().includes(input))
                );

                displayMovies(filteredMovies);
            }

    document.getElementById('inputBuscar').addEventListener('input', function() {
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(filterMovies, 300);
});