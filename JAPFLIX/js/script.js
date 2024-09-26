 let movies = []; 

  document.addEventListener('DOMContentLoaded', function() {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        movies = data; 
        renderMovies(movies); 
      })
      .catch(error => {
        console.error('Solicitud no exitosa', error);
      });

    // Evento de entrada para filtrar mientras se escribe
    document.getElementById('inputBuscar').addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
      renderMovies(filteredMovies);
    });
  });

  function renderMovies(movies) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    if (movies.length === 0) {
      lista.innerHTML = '<li class="list-group-item">No se encontraron resultados.</li>';
      return;
    }

    movies.forEach(movie => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = movie.title; 
      lista.appendChild(li);
    });
  }
