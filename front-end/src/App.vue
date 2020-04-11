<template>
<div id="app">
  <div id="menu">
    <div id="logo">
      <h1>The List</h1>
    </div>
    <div id="nav">
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
    </div>
  </div>
  <router-view />
  <div id="footer">
    <a href="https://github.com/ceskiles/watch-list">
      <img src="./assets/GitHub-Mark-120px-plus.png" />
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'App'
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

body {
  width: 100%;
  background-color: white;
}

#menu {
  display: flex;
  width: 100%;
  height: 3em;
  padding: 0 10px 0 20px;
  margin-bottom: 1cm;
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
  width: 50%;
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

.menu-item:hover {
  margin: 10px;
  color: #ddd;
  text-decoration: none;
}

#footer {
  height: 100px;
}

#footer img {
  float: right;
  width: 50px;
  margin: 30px;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
