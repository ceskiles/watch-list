<template>
<div class="wrapper">
  <div id="empty" v-if="empty">
    <h1>You have no items in your watch list</h1>
    <p>Add a movie to your list to remind yourself to watch it!</p>
  </div>
  <div v-else class="movies">
    <MovieList :movies="movies" />
  </div>
</div>
</template>

<script>
import MovieList from "../components/MovieList.vue"
export default {
  name: 'WatchList',
  components: {
    MovieList
  },
  computed: {
    movies() {
      return [...new Set(this.$root.$data.watchlist)];
    },
    empty() {
      if (this.$root.$data.watchlist.length == 0) return true;
      else return false;
    }
  }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#empty {
  color: var(--secondary-color);
  text-align: center;
}

#empty * {
  margin-top: 10px;
}
</style>
