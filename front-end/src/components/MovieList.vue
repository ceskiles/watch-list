<template>
<div class="wrapper">
  <div class="movies">
    <div class="movie" v-for="movie in movies" :key="movie.title">
      <div class="film">
        <div class="title">
          <p><em>{{movie.studio}}</em> presents</p>
          <h1>{{movie.title}}</h1>
          <p>{{movie.genre}}</p>
        </div>
        <div class="description">
          <p>Released: <span>{{movie.date}}</span></p>
          <p>Director: <span>{{movie.director}}</span></p>
          <p>Producer: <span>{{movie.producer}}</span></p>
          <p>Find on: <span>{{movie.provider}}</span></p>
        </div>
      </div>
      <div class="options">
        <!--  I'm not sure yet -->
        <button v-if="onList(movie)" v-on:click="removeFromWatchlist(movie)">Remove from My List</button>
        <button v-else v-on:click="addToWatchList(movie)">Add to My List</button>
        <button v-on:click="toggleWatched(movie)">
          <input type="checkbox" v-model="movie.watched">
          Watched
        </button>
        <p><em>Suggested by {{movie.contributor}}</em></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: Array
  },
  methods: {
    addToWatchList(movie) {
      this.$root.$data.watchlist.push(movie);
    },
    removeFromWatchlist(movie) {
      var index = this.$root.$data.watchlist.indexOf(movie);
      this.$root.$data.watchlist.splice(index, 1);
    },
    toggleWatched(movie) {
      movie.watched = !movie.watched;
    },
    onList(movie) {
      return this.$root.$data.watchlist.includes(movie);
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.movies {
  width: 75%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.movie {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
  padding: 30px;
  width: 300px;
  text-align: center;
  border: 1px solid blue;
  background-color: var(--primary-color);
  border-radius: 10px;
  color: #eee;
}

.movie * {
  margin-bottom: 5px;
}

.title {
  padding: 10px;
  text-align: center;
  font-size: 90%;
  font-family: sans-serif;
  border-bottom: none;
}

.title>h1 {
  text-align: center;
  border-top: 1px solid var(--secondary-color);
  border-bottom: 1px solid var(--secondary-color);
  padding: 10px;
  color: white;
}

.description {
  padding: 5%;
  text-align: center;
}

.description>p {
  display: flex;
  justify-content: space-between;
}

.options {
  display: flex;
  flex-direction: column;
}

.options>p {
  font-size: 80%;
}

button {
  height: 50px;
  background: var(--secondary-color);
  border-radius: 3px;
  color: white;
  border: 1px solid black;
  text-align: center;
  font-weight: bold;
  font-size: 90%;
}

button>input[type="checkbox"] {
  margin-left: 15px;
  opacity: .5;
  transform: scale(2);
  float: left;
}

button:hover {
  background-color: var(--secondary-hover);
}
</style>
