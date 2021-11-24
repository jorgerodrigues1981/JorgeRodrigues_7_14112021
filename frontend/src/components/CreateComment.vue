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
    ></textarea><br>
    <!-- Bouton pour le publier -->
    <slot></slot>
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
  display: flex;
  flex-flow: column;
  background-color: #D0D3D4;
  padding: 20px;
}

.form_commentaire {
  border: 1px solid black;
  max-width: 500px;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
}
</style>