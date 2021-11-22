<template>
  <header>
    <nav>
        <router-link to="/Feed">
            <img class="img-fluid" alt="Groupomania" src="../assets/logo-feed.svg" role="link" />
        </router-link>
        <div class="items_menu">
            <div class="items">
                <router-link :to="{ name: 'Profile', params: {id: 'yourProfile' } }">Mon profil</router-link>
            </div>
            <div class="items_menu">
                <router-link to="/">Se déconnecter</router-link>
            </div>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavFeed",
};
</script>

<style scoped>
nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background-color: #FF5722;
  margin-bottom: 20px;
}

nav img {
  width: 300px;
}

.items_menu {
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-self: center;
  align-items: center;
}

.items {
  padding: 0 20px;
}

.items {
  color: white;
}

a {
  color: white;
}

</style>