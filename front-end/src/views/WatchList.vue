<template>
<div class="wrapper">
  <div id="empty" v-if="empty">
    <h1>You have no items on your watch list!</h1>
    <br>
    <p>Add a movie to your list to remind yourself to watch it!</p>
  </div>
  <MovieList v-else :movies="movies" />
</div>
</template>

<script scoped>
import MovieList from "../components/MovieList.vue";
export default {
  name: 'WatchList',
  components: {
    MovieList
  },
  computed: {
    movies() {
      return this.$root.$data.watchList;
    },
    empty() {
      return this.$root.$data.watchList.length == 0;
    }
  },
  methods: {

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
