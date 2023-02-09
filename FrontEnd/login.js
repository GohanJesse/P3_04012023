// Fonctions de redirection
function redirectionHome() {
  document.location.href = "index.html";
}

// Fonction message d'erreur
function errorCreat() {
  document.querySelector(".error").innerHTML = "";
  const errorMess = document.createElement("p");
  errorMess.innerHTML =
    "Oups, authentification impossible <br> Email ou mot de passe incorrect";
  const error = document.querySelector(".error");
  error.appendChild(errorMess);
}

// Récupération et analyse de la saisie des inputs
function addListenerUser() {
  const formLog = document.querySelector(".login_form");

  formLog.addEventListener("submit", async function (event) {
    event.preventDefault();

    /* Envoi données utilisateur */

    const inputMail = document.getElementById("email").value;
    const inputPass = document.getElementById("password").value;

    const userInput = {
      email: inputMail,
      password: inputPass,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(userInput);
    // console.log(chargeUtile);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    let response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
    // console.log(response.status);

    // Récupération du token lors de la reponse de fetch "POST"
    let result = await response.json();
    let token = result.token;
    // console.log(token);

    // Conditions: Authentification, redirection et erreurs
    if (response.status === 200) {
      window.localStorage.setItem("token", token);
      // alert("Bonjour Sophie !");
      redirectionHome();
    } else if (response.status === 401 || 404) {
      errorCreat();
      // alert(
      //   "Oups, authentification impossible, Email ou mot de passe incorrect"
      // );
    }
  });
}
addListenerUser();

