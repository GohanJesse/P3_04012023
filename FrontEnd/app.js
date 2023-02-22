// const apiUrl = "http://localhost:5678/api/works";

// ********************** Load Works
let loadedData = [];

// Fonction pour charger les données
async function loadWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  loadedData = data;
  displayWork(loadedData);
  getWorks(loadedData);
}

// ********************** Display Works

function displayWork(data) {
  const galleryEl = document.querySelector(".gallery");
  galleryEl.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    // Création d'un élément pour le départ
    const figure = document.createElement("figure");
    // Affichage des travaux récupérés
    figure.innerHTML = `
      <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
      <figcaption>${data[i].title}</figcaption>
    `;
    // Rattachement au block parent
    galleryEl.appendChild(figure);
  }
}

// ********************** Filter Works

// initialisation des listeners pour les filtres
const btnFiltersAll = document.getElementById("btn_filters_all");
const btnFiltersObject = document.getElementById("btn_filters_object");
const btnFiltersAppartment = document.getElementById("btn_filters_appartement");
const btnFiltersHostel = document.getElementById("btn_filters_hostel");

// Fonction est appelées pour filtrer
btnFiltersAll.addEventListener("click", (e) => {
  e.preventDefault();
  filterWorks("all");
});
btnFiltersObject.addEventListener("click", (e) => {
  e.preventDefault();
  filterWorks("Objets");
});
btnFiltersAppartment.addEventListener("click", (e) => {
  e.preventDefault();
  filterWorks("Appartements");
});
btnFiltersHostel.addEventListener("click", (e) => {
  e.preventDefault();
  filterWorks("Hotels & restaurants");
});

// reset boutons
function resetBtn() {
  btnFiltersObject.style.background = "#ffffff";
  btnFiltersObject.style.color = "#1D6154";
  btnFiltersAppartment.style.background = "#ffffff";
  btnFiltersAppartment.style.color = "#1D6154";
  btnFiltersAll.style.background = "#ffffff";
  btnFiltersAll.style.color = "#1D6154";
  btnFiltersHostel.style.background = "#ffffff";
  btnFiltersHostel.style.color = "#1D6154";
}

function filterWorks(key) {
  // en fonction du paramètre key, filtre les travaux ciblés et change la couleur du bouton
  switch (key) {
    case "all":
      resetBtn();
      btnFiltersAll.style.color = "#ffffff";
      btnFiltersAll.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      displayWork(loadedData);
      break;
    case "Objets":
      // TODO
      resetBtn();
      btnFiltersObject.style.color = "#ffffff";
      btnFiltersObject.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      displayWork(
        loadedData.filter((work) => work.category.name.includes("Objets"))
      );
      break;
    case "Appartements":
      // TODO
      resetBtn();
      btnFiltersAppartment.style.color = "#ffffff";
      btnFiltersAppartment.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      displayWork(
        loadedData.filter((work) => work.category.name.includes("Appartements"))
      );
      break;
    case "Hotels & restaurants":
      // TODO
      resetBtn();
      btnFiltersHostel.style.color = "#ffffff";
      btnFiltersHostel.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      displayWork(
        loadedData.filter((work) =>
          work.category.name.includes("Hotels & restaurants")
        )
      );
      break;
    default:
      break;
  }
}

loadWorks();

// ********************** Display login & Display Admin

// Récupération du token et variables des éléments pour le mode admin
const token = window.localStorage.getItem("token");
let log = document.querySelector(".login");
let modal = null;
let adminBar = null;
let modificationBtn = null;

// Fonction pour la déconnection admin
function logOut(e) {
  localStorage.clear();
}

//Apparition de la barre d'admin et du bouton de modification en cas de token correct
if (token !== null) {
  log.innerHTML = " ";
  log.innerHTML = "logout";
  log.addEventListener("click", logOut);

  //Appartion de la barre d'admin
  const adminBar = document.querySelector(".admin_bar");
  adminBar.style.display = null;
  adminBar.removeAttribute("aria-hidden");
  const body = document.querySelector("body");
  body.prepend("adminBar");
  body.style.marginTop = "38px";

  //Appparition des boutons modifier
  const modificationImage = document.querySelector("#modification_image");
  modificationImage.style.display = null;
  modificationImage.removeAttribute("aria-hidden");
  const modificationArticle = document.querySelector("#modification_article");
  modificationArticle.style.display = null;
  modificationArticle.removeAttribute("aria-hidden");
  const modificationProject = document.querySelector("#modification_project");
  modificationProject.style.display = null;
  modificationProject.removeAttribute("aria-hidden");
} else if (token == null) {
  log.innerHTML = "login";
}

// ********************** Display Modal

function clearGallery() {
  const modalGall = document.querySelector(".modal_gallery");
  const gallery = document.querySelector(".gallery");
  modalGall.innerHTML = "";
  gallery.innerHTML = "";
}

function refreshGallery() {
  clearGallery();
  loadWorks();
}

function getWorks(data) {
  const gallery = document.querySelector(".gallery");

  // Boucle pour ramener chaque travaux
  for (let i = 0; i < data.length; i++) {
    // Création d' éléments pour l'affichage des travaux
    const figure = document.createElement("figure");
    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("delete_icon");
    deleteIcon.value = data[i].id;
    // Affichage des travaux récupérés
    figure.innerHTML = `
                <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
                <figcaption>éditer</figcaption>
            `;
    // Affichage icon poubelle pour bouton de suppression
    deleteIcon.innerHTML = `
                <i class="fa-regular fa-trash-can fa-2xs"></i>
            `;
    // Rattachement au block parent
    const galleryEl = document.querySelector(".modal_gallery");
    galleryEl.appendChild(figure);
    figure.appendChild(deleteIcon);

    // const id = data[i].id;
    // console.log(deleteIcon.value);

    // ******************    Suppression d'un éléments
    async function deleteElement(e) {
      // Cibler l' élément à supprimer
      let id = deleteIcon.value;
      console.log(id);

      // Appel de la fonction fetch DELETE
      let response = await fetch("http://localhost:5678/api/works" + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/Json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.status);

      // Conditions: Authentification, redirection et erreurs
      if (response.status === 200 || 204) {
        refreshGallery();
      } else if (response.status === 401 || 400) {
        console.log("erreur");
      }
    }
    // ******************   Suppression de tout les éléments
    async function deleteAll(e) {
      // Cibler les élément à supprimer
      for (let i = 0; i < data.length; i++) {
        // Création de la charge utile
        const id = data[i].id;
        // console.log(id);

        // Appel de la fonction fetch DELETE
        let response = await fetch(
          "http://localhost:5678/api/works" + "/" + id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/Json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        // Conditions: Authentification, redirection et erreurs
        if (response.status === 200 || 204) {
          clearGallery();
          // getWorks(loadedData);
        } else if (response.status === 401 || 400) {
          console.log(err);
        }
      }
    }

    // Fonctionnailtée de suppression
    document.querySelector(".delete_all").addEventListener("click", deleteAll);
    deleteIcon.addEventListener("click", deleteElement);
  }

  //Création d'élément pour la fonctionnalitée de déplacement
  const moveIcon = document.createElement("div");
  moveIcon.classList.add("move_icon");
  moveIcon.style.marginRight = "24px";
  //Affichage
  moveIcon.innerHTML = `
                <i class="fa-sharp fa-solid fa-arrows-up-down-left-right fa-2xs"></i>
            `;
  //Rattachement au block parent
  const figure = document.querySelector(".modal_gallery figure");
  figure.appendChild(moveIcon);
}

// Ouverture modale de suppression
function openModalSupp() {
  // Cibler l'élémént modal
  const target = document.querySelector(".modal_supp");
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  modal = target;

  // Fonctionnailté, ouverture, fermeture
  modal.addEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal
    .querySelector(".js_modal_stop")
    .addEventListener("click", stopPropagation);
  modal
    .querySelector(".open_modal_add")
    .addEventListener("click", openModalAdd);
}

// Ouverture de la modale de D'ajout
function openModalAdd (e) {
  if (modal === null) return;
  e.preventDefault();

  // Mise à niveau 1ere modale
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
  modal
    .querySelector(".js_modal_stop")
    .removeEventListener("click", stopPropagation);

  // Cible modale de suppression
  const modalAdd = document.querySelector(".modal_add");
  modalAdd.style.display = null;
  modalAdd.removeAttribute("aria-hidden");
  modal = modalAdd;

  // Fonctionnalité, retour, fermeture
  modalAdd.addEventListener("click", closeModal);
  modal
    .querySelector(".js_modal_stop")
    .addEventListener("click", stopPropagation);
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").addEventListener("click", resetForm);
  modal.querySelector(".fa-arrow-left").addEventListener("click", previewArrow);
  modal.querySelector(".fa-arrow-left").addEventListener("click", resetForm);
  modal.querySelector(".submit_Work").addEventListener("click", addWork);
  // modal.querySelector(".submit_Work").addEventListener("click", resetForm);
}

//Retour modale de suppression
function previewArrow(e) {
  if (modal === null) return;
  // e.preventDefault();
  //Fermeture de la modal d'ajout
  const modalSupp = document.querySelector(".modal_add");
  modalSupp.style.display = "none";
  modalSupp.setAttribute("aria-hidden", "true");
  modal = modalSupp;
  //Ouverture de la modal de suppression
  const target = document.querySelector(".modal_supp");
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal
    .querySelector(".js_modal_stop")
    .addEventListener("click", stopPropagation);
}

// Fermeture des modales
function closeModal (e) {
  if (modal === null) return;
  e.preventDefault();

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
  modal
    .querySelector(".js_modal_stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
}

const stopPropagation = function (e) {
  e.stopPropagation();
};

// Fonction d'ouverture au clic du bouton modifier les travaux
document.querySelectorAll(".open_modal").forEach((a) => {
  a.addEventListener("click", openModalSupp);
});

// Ajout d'un élément
function addWork() {
  //Cibler le formulaire d'ajout
  const formAddWork = document.querySelector(".form_addWork");

  formAddWork.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log(event.type);
    console.log(event.currentTarget);
    // Récupération des saisies pour la création du nouvel élément
    const inputPicture = document.getElementById("image").files[0];
    console.log(inputPicture);
    const inputTitle = document.getElementById("title").value;
    console.log(inputTitle);
    const inputCategorie = document.getElementById("category").value;
    console.log(inputCategorie);

    // Construction du formData à envoyer
    const formData = new FormData();
    formData.append("image", inputPicture);
    formData.append("title", inputTitle);
    formData.append("category", inputCategorie);
    console.log(formData);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    let response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });
    // .then(response => response.json())
    // console.log(response.status);

    // Récupération de la reponse de fetch "POST"
    let result = await response.json();
    console.log(result);

    // Conditions: Authentification, redirection et erreurs
    if (response.status === 200 || 204) {
      refreshGallery();
      previewArrow();

      // alert("Ajout D'élément");
    } else if (response.status === 401 || 400) {
      // errorCreat();
      // alert("Action impossible");
      console.log("error");
    }
  });
}

// Afficher la prévisualisation de l'image à télécharger
const inputFile = document.querySelector(".file_upload");

inputFile.addEventListener("change", readFile);

function readFile(e) {
  e.preventDefault();

  // Constante et fonction pour la lecture de l'image
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    preview.src = reader.result;
  });
  // Lecture de l'image
  reader.readAsDataURL(inputFile.files[0]);

  // Appararition et apparence attendue
  const picture = document.querySelector(".picture");
  const label = document.querySelector(".picture > label");
  const preview = document.createElement("img");
  picture.appendChild(preview);

  label.style.opacity = "0";
  preview.style.position = "absolute";
  preview.style.opacity = "1";
  preview.style.padding = "0";
  preview.style.height = "140px";
}

// Changement de la couleur du bouton submit si le formulaire est entièrement rempli
const inputElement = document.querySelector("#title");
const selectElement = document.querySelector("#category");
const fileInputElement = document.querySelector("#image");
const submitButton = document.querySelector("#submit_work");

// Ajoutez un événement "input" à chaque élément requis du formulaire
inputElement.addEventListener("input", checkForm);
selectElement.addEventListener("input", checkForm);
fileInputElement.addEventListener("change", checkForm);

// Fonction pour vérifier si tous les éléments requis ont une valeur
function checkForm() {
  if (
    inputElement.value !== "" &&
    selectElement.value !== "" &&
    fileInputElement.value !== ""
  ) {
    submitButton.style.backgroundColor = "#1D6154";
    submitButton.style.color = "#ffffff";
  } else {
    submitButton.style.backgroundColor = "";
    submitButton.style.color = "";
  }
}

// Reset du formulaire après fermeture ou retour modal
const formAddWork = document.querySelector(".form_addWork");

function resetForm() {
  formAddWork.reset();
  const picture = document.querySelector(".picture");
  const preview = picture.querySelector("img");
  const label = document.querySelector(".picture > label");
  if (preview) {
    picture.removeChild(preview);
    label.style.opacity = "1";
    preview.style.position = "";
    preview.style.opacity = "";
    preview.style.padding = "";
    preview.style.height = "";
  }
}
