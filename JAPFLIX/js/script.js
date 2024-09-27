let movies = [];


fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => response.json())
    .then(data => {
        movies = data; 
    })
    .catch(error => console.error('Error al cargar los datos:', error));

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
            <div class="card d-flex flex-row align-items-center justify-content-between">
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
        lista.appendChild(listItem);
    });
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

document.getElementById('inputBuscar').addEventListener('input', filterMovies);