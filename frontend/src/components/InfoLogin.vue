<template>
  <div class="container_formLogin">
    <!-- Input pour l'email -->
    <div class="formLogin">
      <div class="col-lg-4 col-md-8 offset-lg-4 offset-md-2">
        <input
          class="champ_form_login"
          type="email"
          placeholder="Votre email"
          id="email"
          required
          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
          maxlength="60"
          aria-label="Entrez votre email"
          v-model="email"
          v-on:input="sendData"
        />
      </div>
    </div>
    <!-- Input pour le mot de passe -->
    <div class="formLogin">
      <div class="col-lg-4 col-md-8 offset-lg-4 offset-md-2">
        <input
          class="champ_form_login"
          type="password"
          placeholder="Votre mot de passe"
          id="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          aria-label="Entrez votre mot de passe"
          aria-describedby="passwordInfo"
          v-model="password"
          v-on:input="sendData"
        />
      </div>
    </div>

    <!-- Bouton de connexion -->
    <div>
      <div class="col-lg-4 col-md-8 offset-lg-4 offset-md-2">
        <button
          class="button_connexion"
          type="submit"
          v-on:click="sendRequest"
        >{{ validateText }}</button>
        <p class="text-muted" id="passwordInfo">
          <slot name="messagePassword"></slot>
        </p>
        <p class="text-danger">
          <slot name="messageError"></slot>
        </p>
      </div>
    </div>
    <!-- Fin -->
  </div>
</template>

<script>
export default {
  name: "InfoLogin",
  props: ["validateText"],
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    sendData() { // Envois des données au parent
      this.$emit("data-sent", this.$data);
    },
    sendRequest() { // Envois de la requête d'envois au parent pour traiter l'envois à l'API
      const emailValid = document.getElementById("email").checkValidity();
      const passwordValid = document.getElementById("password").checkValidity();
      if (emailValid && passwordValid) {
        this.$emit("request-sent");
      }
    },
  },
};
</script>

<style scoped>
.container_formLogin {
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
}
.champ_form_login {
  height: 25px;
  width: 300px;
  padding: 3px;
  margin: 5px;
  border: 1px solid black;
  border-radius: 3px;
  text-align: center;
}

.button_connexion {
  background-color: #FF5722;
  border: 1px solid white;
  border-radius: 3px;
  color: white;
  width: 200px;
  height: 30px;
  margin: 10px 0;
}

.button_connexion:hover {
  background-color: #fa7c56;
}
</style>