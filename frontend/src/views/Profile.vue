<template>
  <div class="container-fluid">
    <!-- Alert si l'user est non connecté -->
    <Alert v-if="!connected" :alertType="alert.type" :alertMessage="alert.message" />
    <div v-else>
      <!-- Navigation -->
      <NavFeed />
      <!-- Profil de l'utilsateur -->
      <div class="container_user_profil">
          <section class="user_info">
            <div>
              <h2>Mon Profil</h2>
            </div>
          <div>
              <img :src="user.avatarUrl" alt="Avatar de l'utilisateur"/>
              <h2>{{ fullName }}</h2>
              <p class="user_aditional_info" aria-label="Pseudo" v-if="user.pseudo != null">@{{ user.pseudo }}</p>
              <p class="user_aditional_info">{{ user.dateCreation }}</p>
            <div v-if="user.bio != null">
              <div class="">
                <p class="user_bio" aria-label="Bio">{{ user.bio }}</p>
              </div>
            </div>
            <p class="user_aditional_info">Contact : <a :href="`mailto:${user.email}`" class="font-weight-bold">{{ user.email }}</a></p>
          </div>
          </section>
          <div class="container_modifier_profil">
            <!-- Form pour update le profil si c'est notre profil -->
            <section class="container_profil" v-if="user.yourProfile === 1">
              <h2 data-toggle="collapse" href="#collapseUpdateProfile" role="button" aria-expanded="false" aria-controls="collapseUpdateProfile"
              >Modifier votre profil</h2>
              <form class="collapse" id="collapseUpdateProfile">
                <div>
                  <label class="label_form" for="image">Choisir un avatar : </label>
                  <input name="image" type="file" class="input_form" accept="image/*" v-on:change="updateAvatar($event)"/>
                </div>
                <div>
                  <span class="label_form" id="pseudoInput">Pseudo : </span>
                  <input class="input_form" type="text" v-model="user.pseudo" name="pseudo" aria-label="Modifiez pseudo" aria-describedby="pseudoInput" />
                </div>
                <div>
                  <span class="label_form" id="emailInput">Email : </span>
                  <input class="input_form" type="email" v-model="user.email" name="email" aria-label="Modifiez email" aria-describedby="emailInput" />
                  <div class="input-group-append"></div>
                </div>
                <div>
                  <label for="label_form">Bio : </label><br>
                  <textarea class="input_bio" id="bio" name="bio" cols="130" rows="3" maxlength="256" v-model="user.bio"></textarea>
                </div>
                <div class="input-group">
                  <label for="label_form">Votre mot de passe : </label><br>
                  <input class="input_form" type="password" placeholder="Mot de passe" id="password" aria-label="Mot de passe pour confirmer"/>
                </div>
                <div>
                  <label for="label_form">Nouveau mot de passe : </label><br>
                  <input class="input_form" type="password" placeholder="Changer de mot de passe" id="newPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" aria-label="Nouveau mot de passe"/><br>
                </div>
                <div>
                    <button type="submit" class="btn btn-light" v-on:click.prevent="updateProfile">Confirmer</button>
                  </div>
                
                <p class="text-danger">{{ messageError }}</p>
              </form>
            </section>
            <!-- Form pour supprimer son compte -->
            <section v-if="user.yourProfile === 1">
              <div class="container_delete_profile">
              <h2 data-toggle="collapse" href="#collapseDeleteProfile" role="button" aria-expanded="false" aria-controls="collapseDeleteProfile"
              >Supprimer votre compte</h2>
              <form id="collapseDeleteProfile">
                <div>
                  <input class="input_form" type="password" placeholder="Mot de passe" id="passwordDelete" aria-label="Mot de passe pour confirmer"/>
                  <div>
                    <button type="submit" class="btn btn-light" v-on:click="deleteProfile">Supprimer</button>
                  </div>
                  <p class="text-danger">{{ messageError }}</p>
                </div>
              </form>
              </div>
            </section>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavFeed from "@/components/NavFeed.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "Profile",
  components: {
    NavFeed,
    Alert,
  },
  data: () => {
    return {
      connected: true, // Défini si l'user est connecté
      messageError: null,
      alert: {
        type: "",
        message: "",
      },
      user: {}, // Stock les infos de l'utilisateur
    };
  },
  computed: {
    fullName() {
      // Retourne le nom complet
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    alertConstant(type, message) {
      // Crée une alerte
      const dataAlert = this.$data.alert;
      this.connected = false;
      dataAlert.type = type;
      dataAlert.message = message;
    },
    getUser() {
      // Récupère les infos de l'utilisateur
      this.$axios
        .get(`user/${this.$route.params.id}/profile`)
        .then((data) => {
          this.user = data.data[0];
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.alertConstant("alert-danger mt-5", "Veuillez vous connecter");
          }
          if (e.response.status === 400) {
            this.alertConstant("alert-warning mt-5", "Utilisateur non trouvé");
          }
          if (e.response.status === 500) {
            this.alertConstant("alert-warning mt-5", "Erreur serveur");
          }
        });
    },
    updateAvatar(event) {
      // Update son avatar
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      this.$axios
        .put("user/modify", formData)
        .then(() => {
          this.getUser();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateProfile() {
      // Update les autres infos
      const email = this.user.email;
      const pseudo = this.user.pseudo;
      const bio = this.user.bio;
      const password = document.getElementById("password").value;
      const newPassword = document.getElementById("newPassword").value;
      let data;

      if (newPassword === "") {
        data = {
          email: email,
          pseudo: pseudo,
          bio: bio,
          password: password,
        };
      } else {
        data = {
          email: email,
          pseudo: pseudo,
          bio: bio,
          password: password,
          newPassword: newPassword,
        };
      }
      this.$axios
        .put("user/modify", data)
        .then(() => {
          this.$router.go();
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.messageError = "Mot de passe invalide";
          }
        });
    },
    deleteProfile() {
      // Supprime l'utilisateur
      const password = document.getElementById("passwordDelete").value;
      this.$axios
        .delete("user/delete", { data: { password: password } })
        .then(() => {
          sessionStorage.removeItem("token");
          delete this.$axios.defaults.headers.common["Authorization"];
          this.$router.push({ name: "Login" });
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.messageError = "Mot de passe invalide";
          }
        });
    },
  },
  mounted() {
    // Récupère les posts et défini le titre
    this.getUser();
    if (this.$route.params.id === "yourProfile") {
      document.title = "Mon profil | Groupomania";
    } else {
      document.title = "Profil d'utilisateur | Groupomania";
    }
  },
  watch: {
    // Permet d'actualiser l'utilisateur si l'on clic sur "Mon profil" pendant qu'on est déja sur une page d'utilisateur
    "$route.params.id": function () {
      this.getUser();
    },
  },
};
</script>

<style scoped lang="scss">

.container_user_profil {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background-color: #ABEBC6;
  border-radius: 20px;
  margin: 20px;
}

.container_profil {
  display: flex;
  flex-flow: column wrap;
  background-color: #0B5345;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: white;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px;
  margin: 20px;
}

.container_modifier_profil {
  display: flex;
  flex-flow: row wrap;
}

.label_form {
  margin: 10px 3px;
}

.input_form {
  margin: 10px 3px;
  border-radius: 5px;
  padding: 5px;
}

.input_bio {
  width: 300px;
}


.user_info {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-color: #1E8449;
  border-radius: 20px;
  margin: 20px;
  padding: 20px;
}

.user_bio {
  font-family: Arial, Helvetica, sans-serif;
  color: #75c7bf;
  font-size: 1em;
}

.user_aditional_info {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8em;
}

p {
  font-family: arial;
}

img {
  height: 200px;
  border-radius: 20px;
}

.container_delete_profile {
  background-color: #A93226;
  padding: 20px;
  border-radius: 20px;
  margin: 20px;
}
</style>
