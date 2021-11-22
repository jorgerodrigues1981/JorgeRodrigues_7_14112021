<template>
  <article class="delete_comment">
    <slot name="commentDelete"></slot>
    <div class="container_commentaire">
          <!-- Informations sur l'user -->
          <header>
            <div class="info_utilisateur">
              <p role="link" @click="goToProfile(idUser)">
                <slot name="userAvatar"></slot>
                <slot name="userName"></slot>
                <slot name="userPseudo"></slot>
              </p>
            </div>
          </header>
          <!-- Fin -->
          <!-- Corps du commentaire -->
          <div class="row text-center pt-3">
            <p class="container_comment">
              <slot name="commentBody"></slot>
            </p>
          </div>
          <!-- Fin -->
        </div>
    <!-- Reactions au commentaire et date -->
    <footer>
      <div class="container_footer">
        <div><i class="fas fa-thumbs-up" aria-hidden="true" title="Aimer le post" role="button" :class="reactionUp" v-on:click="sendReactionUp"></i>
            <slot name="commentUp"></slot>
        </div>
        <div>
          <i class="fas fa-thumbs-down" aria-hidden="true" title="Ne pas aimer le post" role="button" :class="reactionDown" v-on:click="sendReactionDown"></i>
            <slot name="commentDown"></slot>
        </div>
      </div>
      <div>
          <p><small class="text-muted"><slot name="commentDate"></slot></small></p>
        </div>
    </footer>
  </article>
</template>

<script>
export default {
  name: "Comment",
  props: ["idUser", "reaction"],
  data: () => {
    return {
      reactionUp: "", // Nombre de réactions positives
      reactionDown: "", // Nombre de réactions négatives
    };
  },
  methods: {
    sendReactionUp() {
      // Envois de la réaction positive au parent pour traiter l'envoi à l'api
      if (this.reaction === 1) {
        this.$emit("reaction-none");
      }
      this.$emit("reaction-up");
    },
    sendReactionDown() {
      // Envois de la réaction négative au parent pour traiter l'envoi à l'api
      if (this.reaction === -1) {
        this.$emit("reaction-none");
      }
      this.$emit("reaction-down");
    },
    updateReaction() {
      // Update de la réaction au niveau visuelle avec CSS
      if (this.reaction === 1) {
        this.reactionUp = "reactionActive";
        this.reactionDown = "reactionNone";
      } else if (this.reaction === -1) {
        this.reactionUp = "reactionNone";
        this.reactionDown = "reactionActive";
      } else {
        this.reactionUp = "reactionNone";
        this.reactionDown = "reactionNone";
      }
    },
    goToProfile(idUser) {
      // Route dynamique menant au profil de l'utilisateur ayant crée le commentaire
      this.$router.push({ name: "Profile", params: { id: idUser } });
    },
  },
  mounted() {
    // On update la réaction au niveau visuelle
    this.updateReaction();
  },
  updated() {
    // On update la réaction au niveau visuelle
    this.updateReaction();
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.container_footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

footer {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  border-radius: 0 0 20px 20px;
}

.info_utilisateur {
  background-color: tomato;
  border-radius: 20px;
}

header img{
  width: 50px;
}

.delete_comment {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.container_commentaire {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 20px 20px 0 0;
  min-width: 400px;
}

.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}
.container_comment {
  background-color: #B7ECF1;
  border-radius: 20px;
  width: 200px;
}

img {
  
  border-radius: 50%;
}

.fas {
  color: white;
  padding: 5px;
}
</style>