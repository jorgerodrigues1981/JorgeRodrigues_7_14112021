<template>
  <div>
    <div class="row">
      <!-- Input pour le prénom -->
      <div class="col-lg-2 col-md-4 offset-lg-4 offset-md-2 mb-2">
        <input
          class="champ_form_login"
          type="text"
          placeholder="Votre prénom"
          id="firstName"
          required
          maxlength="30"
          aria-label="Entrez votre prénom"
          v-model="firstName"
          v-on:input="sendData"
        />
      </div>
      
      <!-- Input pour le nom -->
      <div class="col-lg-2 col-md-4 mb-2">
        <input
          class="champ_form_login"
          type="text"
          placeholder="Votre nom"
          id="lastName"
          required
          maxlength="30"
          aria-label="Entrez votre nom"
          v-model="lastName"
          v-on:input="sendData"
        />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "InfoSignup",
  data: () => {
    return {
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    sendData() { // Envois des données au parent pour traiter l'envois à l'API
      const firstNameValid = document
        .getElementById("firstName")
        .checkValidity();
      const lastNameValid = document.getElementById("lastName").checkValidity();
      if (firstNameValid && lastNameValid) {
        this.$emit("data-sent", this.$data);
      }
    },
  },
};
</script>

<style scoped>

.champ_form_login {
  height: 25px;
  width: 300px;
  padding: 3px;
  margin: 5px;
  border: 1px solid black;
  border-radius: 3px;
  text-align: center;
}
</style>