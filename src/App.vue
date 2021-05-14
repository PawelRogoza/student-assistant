<template>
  <div id="nav">
    <span class="navSpan"><router-link to="/">Przedmioty</router-link></span>
    <span class="navSpan"><router-link to="/notatki">Notatki</router-link></span>
    <span class="navSpan"><router-link to="/kalkulator">Kalkulator</router-link></span>
  </div>
  <router-view/>
</template>

<style>
#app {
  width: 100vw;
  height: 98vh;
  display: block;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(235,235,235);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: 600;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: white;
  background: lightseagreen;
  border-radius: 7px;
}
.navSpan {
  padding: 0 35px 0 35px;
}
</style>
