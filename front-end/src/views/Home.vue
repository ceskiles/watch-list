<template>
<div>
  <div class="wrapper">
    <div class="search">
      <form>
        <i>Search</i><input v-model="searchText" placeholder="Movie Title" />
      </form>
    </div>
  </div>
  <MovieList :movies="movies" />
</div>
</template>

<script>
import MovieList from "../components/MovieList.vue"
export default {
  name: 'Home',
  components: {
    MovieList
  },
  data() {
    return {
      searchText: "",
    }
  },
  computed: {
    movies() {
      return this.$root.$data.movies.filter(movie =>
        movie.title.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
