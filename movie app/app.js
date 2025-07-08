const API_KEY = '7a3bd025';

    async function searchMovie() {
      const query = document.getElementById('searchInp').value.trim();
      const resultDiv = document.getElementById('results');

      if (!query) {
        resultDiv.innerHTML = '<p>Please enter the movie name.</p>';
        return;
      }

      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "False") {
          resultDiv.innerHTML = `<p>No results found. Please try another movie.</p>`;
          return;
        }

        resultDiv.innerHTML = "";

        data.Search.forEach(movie => {
          const movieDiv = document.createElement("div");
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          `;
          resultDiv.appendChild(movieDiv);
        });

      } catch (error) {
        resultDiv.innerHTML = '<p>Error occurred while fetching data.</p>';
        console.error(error);
      }
    }

    function toggleMode() {
      document.body.classList.toggle('dark-mode');
    }
