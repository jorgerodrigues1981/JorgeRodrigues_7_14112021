<template>
  <article :id="idPost">
    <div class="supression"><slot name="postDelete"></slot></div>
    <div class="container_posts">
      <div>
        <div>
          <!-- Informations sur l'user -->
          <header>
            <div class="info_user">
                <div class="info_user_avatar" role="link" @click="goToProfile(idUser)"><slot name="userAvatar"></slot></div>
                <div class="info_user_text" role="link" @click="goToProfile(idUser)"><slot name="userName"></slot></div>
                <div class="info_user_text" role="link" @click="goToProfile(idUser)"><slot name="userPseudo"></slot></div>
            </div>
          </header>
         
          <!-- Corps du post -->
          <div class="post" :class="cursor" role="link" @click="goToFeedID(idPost)">
            <p><slot name="postLegend"></slot></p>
          </div>
       
        </div>
      </div>
      <!-- Gif du post -->
      <div class="col-md-4" :class="cursor" role="link" @click="goToFeedID(idPost)">
        <slot name="postGif"></slot>
      </div>
      <!-- Fin -->
    </div>
    <!-- Création d'un commentaire -->
    <div class="commentaire">
      <div>
        <slot name="createComment"></slot>
      </div>
    </div>
    <!-- Fin -->
    <!-- Reactions au commentaire et date -->
    <footer>
      <div class="commentaires_items">
        <i
          class="fas fa-thumbs-up"
          aria-hidden="true"
          title="Aimer le post"
          role="button"
          :class="reactionUp"
          v-on:click="sendReactionUp"
        ></i>
        <slot name="postUp"></slot>
      </div>
      <div class="commentaires_items">
        <i
          class="fas fa-thumbs-down"
          aria-hidden="true"
          title="Ne pas aimer le post"
          role="button"
          :class="reactionDown"
          v-on:click="sendReactionDown"
        ></i>
          <slot name="postDown"></slot>
      </div>
      <div class="commentaires_items">
        <p>
          <a class="d-md-none">
            <i
              class="fas fa-comments"
              aria-hidden="true"
              title="Commmenter le post"
              role="button"
              v-on:click="displayCommentInput"
            ></i>
          </a>
          <a class="d-none d-md-block pointer" v-on:click="displayCommentInput">Commenter</a>
        </p>
      </div>
      <div class="commentaires_items">
        <p>
          <small class="text-muted">
            <slot name="postDate"></slot>
          </small>
        </p>
      </div>
    </footer>
    <!-- Fin -->
  </article>
</template>

<script>
export default {
  name: "Post",
  props: ["idPost", "idUser", "reaction"],
  data: () => {
    return {
      reactionUp: "", // Nombre de réactions positives
      reactionDown: "", // Nombre de réactions négatives
      cursor: "pointer" // Défini le pointeur que doit avoir le corps et gif du post
    };
  },
  methods: {
    displayCommentInput() {
      // Envois de la requête pour dévoiler l'input pour créer un commentaire
      this.$emit("d-comment-input");
    },
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
    goToFeedID(idPost) {
      // Route dynamique menant au post spécifique et ses commentaires
      if (idPost != undefined) {
        this.$router.push({ name: "FeedID", params: { id: idPost } });
      }
    },
    goToProfile(idUser) {
      // Route dynamique menant au profil de l'utilisateur ayant crée le commentaire
      this.$router.push({ name: "Profile", params: { id: idUser } });
    },
  },
  mounted() {
    // On update la réaction au niveau visuelle ainsi que le pointeur
    this.updateReaction();
    if (this.$route.name === "Feed") {
      this.cursor = "pointer";
    } else {
      this.cursor = "default";
    }
  },
  updated() {
    // On update la réaction au niveau visuelle
    this.updateReaction();
  },
};
</script>

<style scoped>

footer {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: #13CCDE;
  border-radius: 0 0 20px 20px;
  margin-bottom: 20px;
  margin: 0 40px 20px 40px;
}

.supression {
  background-color: tomato;
  border-radius: 20px 20px 0 0;
  margin: 0 40px 0 40px;
}

.fas {
  color: #ffffff;
  padding: 10px;
}
.commentaires_items {
  margin-right: 20px;
}

.info_user {
  display: flex;
  flex-flow: row wrap;
  height: 50px;
  justify-content: left;
  align-items: center;
  background-color: #4899A2;
  border-radius: 10px;
  font-size: 0.8em;
  padding: 5px 20px;
}
p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
}

.post {
    border-radius: 10px;
    padding: 20px;
}
.commentaire {
  display: flex;
  flex-flow: column nowrap;
  background-color: #4899A2;
}

.container_posts {
  background-color: #B7ECF1;
  padding: 20px;
  margin: 0 40px;
}

img {
  max-height: 300px;
}

.info_user_text {
  padding: 5px;
}

.info_user_avatar img {
  height: 40px;
  width: 40px;
  border-radius: 50px;
  border: 1px solid white;
}
</style>
