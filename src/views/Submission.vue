<template>
<div class="wrapper">
  <h1>Submit a Movie Suggestion</h1>
  <p>Fill out all of the information below and click submit to add a movie</p>
  <form @submit.prevent="addMovieToList">
    <h2>Your Informatioin</h2>
    <label>Your Username:</label>
    <input v-model="movie.contributor" placeholder="johnnyappleseed42" />
    <h2>Movie Information</h2>
    <label>Movie Title:</label>
    <input v-model="movie.title" placeholder="Titanic" />
    <label>Release Year:</label>
    <input v-model="movie.date" placeholder="1997" />
    <label>Genres:</label>
    <input v-model="movie.genre" placeholder="Drama|Romance" />
    <label>Director:</label>
    <input v-model="movie.director" placeholder="James Cameron" />
    <label>Producer:</label>
    <input v-model="movie.producer" placeholder="Rae Sanchini" />
    <label>Production Company:</label>
    <input v-model="movie.studio" placeholder="Twentieth Century Fox" />
    <br>
    <label>Streaming Provider:</label>
    <input v-model="movie.provider" placeholder="Vudu|Amazon Prime Video" />
    <button type='submit'>Submit</button>
  </form>
  <h2 v-if="submitted">Thank you!</h2>
</div>
</template>

<script>
export default {
  name: 'Submission',
  data() {
    return {
      movie: {
        contributor: "",
        title: "",
        date: null,
        genre: "",
        director: "",
        producer: "",
        studio: "",
        provider: "",
        watched: false,
      },
      submitted: false,
    }
  },
  methods: {
    addMovieToList() {
      if (!this.$root.$data.movies.includes(this.movie)) {
        this.$root.$data.movies.push(this.movie);
      }
      this.submitted = true;
    }
  }
}
</script>

<style scoped>
.wrapper {
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
