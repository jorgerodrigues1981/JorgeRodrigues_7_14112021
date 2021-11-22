<template>
  <header>
    <h1>
      <img class="logo" alt="Groupomania" src="../assets/icon-above-font.png" />
    </h1>
    
    <nav>
      <a><router-link to="/">Se connecter</router-link></a> |
      <router-link to="/Signup">S'inscrire</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavLogin",
};
</script>

<style scoped lang="scss">
img {
  width: 200px;
  border-radius: 20px;
}

header {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
nav {
  background-color: #FF5722;
  height: 20px;
  width: 300px;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: white;
}
</style>