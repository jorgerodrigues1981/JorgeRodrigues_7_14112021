<template>
<div class="container_createPost">
  <div class="form_createPost">
    <form name="createPost">
      <!-- Textarea du post -->
      <textarea name="legend" class="form-text" cols="130" rows="3" maxlength="180" required placeholder="Créer un post" aria-label="Ecrire un post" v-model="legend"
      ></textarea>
      <!-- Sélection d'une image-->
      <div class="custom-file">
        <label class="custom-file-label" for="image"><strong>Choisir une image</strong></label>:
        <input name="image" type="file" class="custom-file-input" required v-on:change="sendFile($event)" />
      </div>
      <!-- Bouton pour le publier -->
      <button class="btn_submit" type="submit" v-on:click.prevent="sendPost()">Publier</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "CreatePost",
  data: () => {
    return {
      legend: "", // Corps du post
      image: "", // Gif du post
    };
  },
  methods: {
    sendPost() { // Envois du corps au parent pour traiter l'envois à l'API
      const formValid = document
        .getElementsByName("createPost")[0]
        .checkValidity();
      if (formValid) {
        this.$emit("post-sent", this.$data);
        document
        .getElementsByName("legend")[0].value = null;
        document
        .getElementsByName("image")[0].value = null;
      }
    },
    sendFile(event) { // Envois du Gif au parent pour traiter l'envois à l'API
      this.$data.image = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.container_createPost {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.form_createPost {
  background-color: #E5E8E8;
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid white;
}

.form-text {
  border-radius: 10px;
  padding: 10px;
  width: 70%;
  height: 50px;
}

.custom-file {
  padding: 10px;
}

.btn_submit {
  background-color: #D35400;
  border: 1px solid white;
  border-radius: 3px;
  color: white;
  width: 200px;
  height: 30px;
  margin: 10px 0;
}

.btn_submit:hover {
  background-color: #EDBB99;
}
</style>