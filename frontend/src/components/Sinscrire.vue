<template>
  <form class="form_login">
    <label for="username">Utilisateur :</label><br>
    <input type="text" id="username" name="username"><br>
    <label for="password">Password :</label><br>
    <input type="password" id="password" name="password">
</form>
</template>

<script>
export default {
  name: 'Sinscrire',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.form_login {
    display: flex;
    flex-flow: row;
    background: teal;
    margin: 0;
    padding: 20px;
}
label {
    color: white;
}

</style>