<template>
  <div id="app">
    <div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss"> 

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: black;
  a {
    color: inherit;
  }
  nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }

    &.router-link-exact-active {
      color: #161a29;
    }
  }
}
}
.text-muted {
    color: white;
}
.text-danger {
    color: #A93226;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
    padding: 5px;
}
</style>
