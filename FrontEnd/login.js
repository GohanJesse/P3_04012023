// Cibler le formulaire d'inscritpion
const formLog = document.querySelector(".login_form");
formLog.addEventListener("submit", login);
formLog.addEventListener("submit", checkMail);
formLog.addEventListener("submit", checkPass);

// Fonction de validité d'Email
const inputMail = document.getElementById("email");
const inputPass = document.getElementById("password");

// Fonctions de redirection
function redirectionHome() {
  document.location.href = "index.html";
};

// Fonction message d'erreur
function errorCreat() {
  document.querySelector(".error").innerHTML = "";
  const errorMess = document.createElement("p");
  errorMess.style.color = "red";
  errorMess.innerHTML =
    "Oups, authentification impossible <br> Email ou mot de passe incorrect";
  const error = document.querySelector(".error");
  error.appendChild(errorMess);
};

// Validation de l'email
function checkMail(e) {
  e.preventDefault();
  // Cibler les messages
  const messMail = document.querySelector("#error-mail");

  //Cibler la valeur des inputs
  const inputMailValue = document.getElementById("email").value;

  // Définir la regex d'email
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;

  //Condition de validité
  if (inputMailValue == "") {
    messMail.innerHTML = "";
    messMail.innerHTML = "adresse mail obligatoire";
  } else if (!emailRegex.test(inputMailValue)) {
    messMail.innerHTML = "";
    messMail.innerHTML = "adresse mail non valide";
  } else {
    messMail.innerHTML = "";
  };
};

// Validation du mot de passe
function checkPass(e) {
  e.preventDefault();
  // Cibler les messages
  const messPass = document.querySelector("#error-pass");

  //Cibler la valeur des inputs
  const inputPassValue = document.getElementById("password").value;
  
  //Condition de validité
  if (inputPassValue == "") {
    messPass.innerHTML = "";
    messPass.innerHTML = "mot de passe obligatoire";
  } else if (inputPassValue.length < 6 || inputPassValue.length > 12) {
    messPass.innerHTML = "";
    messPass.innerHTML = "Le mot de passe doit contenir entre 6 et 12 caractères.";
  } else if (inputPassValue.length > 6 || inputPassValue.length < 12) {
    messPass.innerHTML = "";
  } else {
    messPass.innerHTML = "";
  };
};


// Récupération et analyse de la saisie des inputs
async function login(e) {
  e.preventDefault();

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
    redirectionHome();
  } else if (response.status === 401 || 404) {
    errorCreat();
  };
};

