<template>
<div id="app">
  <div id="menu">
    <div id="logo">
      <h1>The List</h1>
    </div>
    <div v-if="loggedIn" id="nav">
      <router-link to="/">
        <div class="menu-item home">
          <p>The List</p>
        </div>
      </router-link>
      <router-link to="/my-list">
        <div class="menu-item my-list">
          <p>My List</p>
        </div>
      </router-link>
      <router-link to="/submit">
        <div class="menu-item submit">
          <p>Add to The List</p>
        </div>
      </router-link>
      <div id="logout">
        <span>{{this.$root.$data.user.displayName}} |</span>
        <button v-on:click="logout()" class='menu-item'>
          <p>Logout</p>
        </button>
      </div>
    </div>
  </div>
  <router-view />
  <div class="footer">
    <a href="https://github.com/ceskiles/watch-list">
      <img src="./assets/GitHub-Mark-120px-plus.png" />
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (!this.loggedIn) this.$router.push('/sign-in');
  },
  computed: {
    loggedIn() {
      return this.$root.$data.loggedIn;
    }
  },
  methods: {
    logout() {
      this.$root.$data.user = null;
      this.$root.$data.loggedIn = false;
      this.$router.push('/sign-in');
    }
  }
}
</script>

<style>
:root {
  --primary-color: #007bc4;
  --secondary-color: #0b5282;
  --secondary-hover: #0a4171;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Helvetica;
}

#menu {
  display: flex;
  width: 100%;
  height: 3em;
  padding: 0 10px 0 20px;
  background-color: var(--primary-color);
  color: white;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
}

#logo {
  width: 20%;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

#nav {
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.menu-item,
#nav a {
  margin: 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

#nav>#logout {
  position: absolute;
  top: 5px;
  right: 0px;
  border: none;
  background: none;
  font-size: 16px;
}

#nav>#logout>button {
  border: none;
  background: none;
  font-size: 16px;
}

.menu-item:hover {
  margin: 10px;
  color: #ddd;
  text-decoration: none;
}

.footer {
  height: 100px;
}

.footer img {
  float: right;
  width: 50px;
  margin: 30px;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
