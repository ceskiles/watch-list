<template>
<div class="wrapper">
  <div class="search">
    <form>
      <i>Search</i><input v-model="searchText" placeholder="Movie Title" />
    </form>
  </div>
  <div class="movies">
    <div class="movie" v-for="movie in searchResults" :key="movie._id">
      <div class="film">
        <div class="title">
          <p><em>{{movie.company}}</em> presents</p>
          <h1>{{movie.title}}</h1>
          <p>{{movie.genre}}</p>
        </div>
        <div class="description">
          <p>Released: <span>{{movie.releaseDate}}</span></p>
          <p>Directed by: <span>{{movie.director}}</span></p>
          <p>Produced by:</p>
          <p><span></span><span>{{movie.producers}}</span></p>
          <p>Find on:<span>{{movie.viewService}}</span></p>
        </div>
      </div>
      <div class="options">
        <button v-if="onList(movie)" v-on:click="toggleWatchList(movie)">Remove from My List</button>
        <button v-else v-on:click="toggleWatchList(movie)">Add to My List</button>
        <button class='watched-button' v-on:click="toggleWatched(movie)">
          <input v-if="isWatched(movie)" class='watch-checked' type="checkbox" checked disabled />
          <input v-else class='watch-checked' type="checkbox" unchecked disabled />
          Watched
          <div></div>
        </button>
        <button v-if='isUser(movie)' v-on:click='removeMovie(movie)'>
          Delete your suggestion
        </button>
      </div>
      <p><em>Suggested by {{movie.userDisplayName}}</em></p>
    </div>
  </div>
</div>
</template>

<script scoped>
import axios from 'axios';
export default {
  name: 'MovieList',
  props: {
    movies: Array
  },
  data() {
    return {
      searchText: "",
    }
  },
  created() {
    this.getMovies();
  },
  computed: {
    searchResults() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchText.toLowerCase()));
    },
  },
  methods: {
    isUser(movie) {
      if (movie.userId == this.$root.$data.user._id) return true;
      else return false;
    },
    isWatched(movie) {
      if (this.$root.$data.user.watchedList.includes(movie._id)) return true;
      else return false;
    },
    onList(movie) {
      return this.$root.$data.user.watchList.includes(movie._id);
    },
    async toggleWatchList(movie) {
      try {
        await axios.put('/api/user/watch-list/' + this.$root.$data.user._id, movie);
        this.getMovies();
      } catch (error) {
        //console.log(error);
      }
    },
    async toggleWatched(movie) {
      try {
        await axios.put('/api/user/watched-list/' + this.$root.$data.user._id, movie);
        this.getMovies();
      } catch (error) {
        //console.log(error);
      }
    },
    async removeMovie(movie) {
      try {
        this.getMovies();
        await axios.delete('/api/movie/' + movie._id);
        if (this.$root.$data.watchList.includes(movie)) {
          this.toggleWatchList(movie);
        }
        if (this.$root.$data.user.watchedList.includes(movie._id)) {
          this.toggleWatched(movie);
        }
        this.getMovies();
      } catch (error) {
        //  console.log(error);
      }
    },
    async getMovies() {
      try {
        let response = await axios.get("/api/movies");
        this.$root.$data.movies = response.data;

        response = await axios.get('/api/user/' + this.$root.$data.user._id);
        this.$root.$data.user = response.data;

        this.$root.$data.watchList = this.$root.$data.movies.filter(movie =>
          this.$root.$data.user.watchList.includes(movie._id));
      } catch (error) {
        //  console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  width: 75px;
  border-right: 2px solid #ccc;
  text-align: center;
  text-justify: center;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
  padding-left: 10px;
}

input::placeholder {
  font-size: 15px;
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
  width: 350px;
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
  flex-direction: row;
  justify-content: space-between;
}

.description>p>span {
  text-align: right;
}

.options {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

button {
  height: 50px;
  background: var(--secondary-color);
  border-radius: 3px;
  color: white;
  border: 1px solid black;
  font-weight: bold;
  font-size: 16px;
}

.watched-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.watch-checked {
  height: 15px;
  width: 15px;
  margin-left: 15px;
  opacity: .5;
  transform: scale(2);
  position: relative;
  top: 2px;
}

button:hover {
  background-color: var(--secondary-hover);
}
</style>
