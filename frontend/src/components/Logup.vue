<template>
<h1>La page de acceuil va demander de créer un compte</h1>
    <div class="login">
        <h1>Page pour le login</h1>
          <div class="container_form">
            <form class="form_login">
            <label for="nom">Nom :</label><br>
            <input type="text" id="nom" name="nom" class="champ_formulaire"><br>
            <label for="prenom">Prènom :</label><br>
            <input type="text" id="prenom" name="prenom" class="champ_formulaire"><br>
            <label for="email">E-mail :</label><br>
            <input type="text" id="email" name="email" class="champ_formulaire"><br>
            <label for="password">Password :</label><br>
            <input type="password" id="password" name="password" class="champ_formulaire">
            <button id="bt_signup" v-on:click="signUp">Sign up</button>
            </form>
          </div>
      </div>
</template>

<script>
export default {
  name: 'Logup',
  props: {
    msg: String
  }
};

//Accéder aux champs du formulaire
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#mail");
const password = document.querySelector("#email");

function logUp() {

  const userData = {
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    password: password.value
    }
        const promisse01 = fetch('http://localhost:3000/api/users/signup', {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {'Content-Type': 'application/json'},
                mode: 'cors'
                })
                promisse01.then(async(res) => {
                    try {
                        const contenu = await res.json();
                        console.log(contenu);
                        if(res.ok) {
                            console.log(`contenu de la response: ${res.ok}`);
                      
                        } else {
                            console.log(`response du server: ${res.status}`);
                        } 
                    } catch(e) {
                        console.log("Erreur!!");
                    }
                });  
    }

logUp();



</script>


<style scoped>
.champ_formulaire {
  height: 25px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1em;
  text-align: center;
  border: 2px solid rgb(126, 34, 11);
  border-radius: 2px;
  padding: 5px;
}

#bt_signup {
  width: 100px;
  height: 50px;
  background-color: brown;
  border: 2px solid rgb(255, 255, 255);
  margin: 20px 0 20px 0;
  border-radius: 2px;
  padding: 5px;
}

#bt_signup:hover {
  background-color: rgb(196, 65, 65);
}

.container_form {
  display: flex;
  flex-flow: row;
  align-content: center;
  justify-content: center;
}

.form_login {
    display: flex;
    flex-flow: column;
    align-content: center;
    justify-content: center;
    width: 400px;
    background: rgb(170, 49, 18);
    margin: 0;
    padding: 20px;
    border-radius: 20px;
}
label {
    color: white;
}

</style>