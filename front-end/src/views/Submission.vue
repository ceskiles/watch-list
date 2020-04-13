<template>
<div class="wrapper">
  <h1>Submit a Movie Suggestion</h1>
  <p>Fill out all of the information below and click submit to add a movie</p>
  <form @submit.prevent="addMovieToList">
    <h2>Movie Information</h2>
    <label>Movie Title:</label>
    <input v-model="movie.title" placeholder="Titanic" />
    <label>Release Year:</label>
    <input v-model="movie.releaseDate" placeholder="1997" />
    <label>Genres:</label>
    <input v-model="movie.genre" placeholder="Drama|Romance" />
    <label>Director:</label>
    <input v-model="movie.director" placeholder="James Cameron" />
    <label>Producers:</label>
    <input v-model="movie.producers" placeholder="Rae Sanchini" />
    <label>Production Company:</label>
    <input v-model="movie.company" placeholder="Twentieth Century Fox" />
    <br>
    <label>Streaming Provider:</label>
    <input v-model="movie.viewService" placeholder="Amazon Prime Video" />
    <button type='submit'>Submit</button>
  </form>
  <h2 v-if="submitted">Thank you!</h2>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Submission',
  data() {
    return {
      movie: {
        title: "",
        releaseDate: "",
        genre: "",
        director: "",
        producers: "",
        company: "",
        viewService: "",
        userId: this.$root.$data.user._id,
        userDisplayName: this.$root.$data.user.displayName,
      },
      submitted: false,
    }
  },
  methods: {
    async addMovieToList() {
      try {
        await axios.post('/api/movies', this.movie);
        this.getMovies();
      } catch (error) {
        //console.log(error); //FIXME May cause crash
      }
      this.movie = {
          title: "",
          releaseDate: "",
          genre: "",
          director: "",
          producers: "",
          company: "",
          viewService: "",
          userId: this.$root.$data.user._id,
          userDisplayName: this.$root.$data.user.displayName,
        },
        this.submitted = true;
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
        //console.log(error); //FIXME this may cause issues
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  padding-top: .5cm;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--secondary-color);
}

.wrapper * {
  margin: 10px;
}

form {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: 50px;
}

input {
  padding-left: 10px;
  width: 40%;
  height: 2em;
  font-size: 20px;
}

button {
  height: 40px;
  width: 75px;
  background: var(--secondary-color);
  border-radius: 3px;
  color: white;
  border: 1px solid black;
  text-align: center;
  font-weight: bold;
  font-size: 90%;
}

button:hover {
  background-color: var(--secondary-hover);
}
</style>
