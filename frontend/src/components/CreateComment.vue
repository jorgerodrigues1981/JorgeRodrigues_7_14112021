<template>
<div class="container_champ_commentaire">
  <form name="formComment">
    <!-- Textarea du commentaire -->
    <textarea
      name="comment"
      class="form_commentaire"
      cols="130"
      rows="2"
      required
      placeholder="Créer un commentaire"
      aria-label="Ecrire un commentaire"
      v-model="body"
      v-on:input="sendComment"
    ></textarea>
    <!-- Fin -->
    <!-- Bouton pour le publier -->
    <slot></slot>
    <!-- fin -->
  </form>
</div>
</template>

<script>
export default {
  name: "CreateComment",
  data: () => {
    return {
      body: "",
    };
  },
  methods: {
    sendComment() { // Envois du corps du commentaire au parent pour traiter l'envoi à l'api
      this.$emit("comment-sent", this.$data);
    },
  },
};
</script>

<style scoped>
.container_champ_commentaire {
  background-color: blueviolet;
}

.form_commentaire {
  border: 1px solid black;
  width: 70%;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
}
</style>