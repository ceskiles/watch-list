<template>
<div class="wrapper">
  <div id="empty" v-if="empty">
    <h1>There are no movies on The List!</h1>
    <br>
    <p>
      <router-link to='/submit'>Submit a suggestion of your own</router-link>
    </p>
  </div>
  <MovieList v-else :movies="movies" />
</div>
</template>

<script scoped>
import MovieList from "../components/MovieList.vue";
export default {
  name: 'Home',
  components: {
    MovieList
  },
  computed: {
    movies() {
      return this.$root.$data.movies;
    },
    empty() {
      return this.$root.$data.movies.length == 0;
    }
  },
}
</script>

<style scoped>
.wrapper {
  padding-top: .5cm;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

#empty {
  margin-top: 100px;
  color: var(--secondary-color);
  text-align: center;
}
</style>
