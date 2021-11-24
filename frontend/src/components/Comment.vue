<template>
  <div class="container_commentaire">
    <div class="delete_commentaire">
      <slot name="commentDelete"></slot>
    </div>
        <div class="header_commentaire" role="link" @click="goToProfile(idUser)">
            <slot name="userAvatar"></slot><br>
            <div class="username_commentaire"><slot name="userName"></slot></div>
            <slot name="userPseudo"></slot>
        </div>
    <div class="commentaire">
      <slot name="commentBody"></slot>
    </div>
    <div class="like_dislike">
      <div class="like_dislike_row">
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
    </div>
  </div>
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
.container_commentaire {
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;
  margin-bottom: 20px;
}

.delete_commentaire {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  background-color: #E74C3C;
  width: 80%;
  height: 40px;
}

.header_commentaire {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-content: center;
  background-color: #273746;
  width: 80%;
  padding: 10px 0 10px 0;
  color: white;
  font-size: 0.8em;
}

.header_commentaire img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid white;
  margin-right: 10px;
  cursor: pointer;
}

.header_commentaire img:hover {
  border: 1px solid #E74C3C;
}

.commentaire {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  background-color: #EAECEE;
  width: 80%;
  height: 100px;
}

.like_dislike {
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;
  background-color: #808B96;
  width: 80%;
  padding-top: 20px;
  font-size: 0.9em;
}

.like_dislike_row {
  display: flex;
  flex-flow: row;
  justify-items: center;
  align-items: center;
}

.fas {
  color: white;
  margin: 10px;
  font-size: 1em;
}

.fas:hover {
  color: #F1C40F;
  cursor: pointer;
}

.username_commentaire {
  cursor: pointer;
}

.username_commentaire:hover {
  text-decoration: underline;
}

</style>