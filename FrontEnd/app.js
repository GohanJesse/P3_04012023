// *********************  Page d'accueil


// Récupération des données depuis le fichier JSON grâce a fetch Et filtre des travaux
fetch("http://localhost:5678/api/works").then((response) => {
  const data = response.json();

  // test du renvoi des résponses dans la console
  data.then((data) => {
    // console.log(data);

    // Création d'une boucle pour l'affichage de chaque élément dans le length

    function ringCreation(data) {
      for (let i = 0; i < data.length; i++) {
        // Création d'un élément pour le départ
        const figure = document.createElement("figure");
        // Affichage des travaux récupérés
        figure.innerHTML = `
                            <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
                            <figcaption>${data[i].title}</figcaption>
                        `;
        // Rattachement au block parent
        const galleryEl = document.querySelector(".gallery");
        galleryEl.appendChild(figure);
      }
    }
    ringCreation(data);

    
    // Programmation pour filtrer et afficher les travaux ciblés

    // Afficher tous les travaux
    const allWorks = document.querySelector(".all_filter");
    allWorks.addEventListener("click", function (e) {
      e.preventDefault();

      // Bouton actif
      activeBtn();
      allWorks.style.background = "#1D6154";
      allWorks.style.color = "#ffffff";

      // Repartir de zero pour réafficher
      document.querySelector(".gallery").innerHTML = "";
      const allWorksActive = data.filter(function (data) {
        return data;
      });
      for (let i = 0; i < data.length; i++) {
        // Création d'un élément pour le départ
        const figure = document.createElement("figure");

        // Affichage des travaux récupérés
        figure.innerHTML = `
                        <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
                        <figcaption>${data[i].title}</figcaption>
                    `;
        // Rattachement au block parent
        const galleryEl = document.querySelector(".gallery");
        galleryEl.appendChild(figure);
      }
      // console.log(allWorksActive);
    });

    // Afficher seulement les objets
    const objectsWorks = document.querySelector(".object_filter");
    objectsWorks.addEventListener("click", function (e) {
      e.preventDefault();

      // Bouton actif
      activeBtn();
      objectsWorks.style.background = "#1D6154";
      objectsWorks.style.color = "#ffffff";

      // Repartir de zero pour réafficher
      document.querySelector(".gallery").innerHTML = "";
      const objectsWorksActive = data.filter(function (data) {
        return data.category.name.includes("Objets");
      });
      for (let i = 0; i < data.length; i++) {
        // Création d'un élément pour le départ
        const figure = document.createElement("figure");
        // Affichage des travaux récupérés
        figure.innerHTML = `
                        <img src="${objectsWorksActive[i].imageUrl}" alt="${objectsWorksActive[i].title}" crossorigin="anonymous">
                        <figcaption>${objectsWorksActive[i].title}</figcaption>
                    `;
        // Rattachement au block parent
        const galleryEl = document.querySelector(".gallery");
        galleryEl.appendChild(figure);
      }
      // console.log(objectsWorksActive);
    });

    // Filtrer par Appartements
    const apartmentsWorks = document.querySelector(".apartment_filter");
    apartmentsWorks.addEventListener("click", function (e) {
      e.preventDefault();

      // Bouton actif
      activeBtn();
      apartmentsWorks.style.background = "#1D6154";
      apartmentsWorks.style.color = "#ffffff";

      // Repartir de zero pour réafficher
      document.querySelector(".gallery").innerHTML = "";
      const apartmentsWorksActive = data.filter(function (data) {
        return data.category.name.includes("Appartements");
      });
      for (let i = 0; i < data.length; i++) {
        // Création d'un élément pour le départ
        const figure = document.createElement("figure");
        // Affichage des travaux récupérés
        figure.innerHTML = `
                        <img src="${apartmentsWorksActive[i].imageUrl}" alt="${apartmentsWorksActive[i].title}" crossorigin="anonymous">
                        <figcaption>${apartmentsWorksActive[i].title}</figcaption>
                    `;
        // Rattachement au block parent
        const galleryEl = document.querySelector(".gallery");
        galleryEl.appendChild(figure);
      }
      // console.log(apartmentsWorksActive);
    });

    //Filtrer par Hotels & restaurants
    const hotelRestaurantsWorks = document.querySelector(".hotel_restaurant_filter");
    hotelRestaurantsWorks.addEventListener("click", function (e) {
      e.preventDefault();

      // Bouton actif
      activeBtn();
      hotelRestaurantsWorks.style.background = "#1D6154";
      hotelRestaurantsWorks.style.color = "#ffffff";

      // Repartir de zero pour réafficher
      document.querySelector(".gallery").innerHTML = "";
      const hotelRestaurantsWorksActive = data.filter(function (data) {
        return data.category.name.includes("Hotels & restaurants");
      });
      for (let i = 0; i < data.length; i++) {
        // Création d'un élément pour le départ
        const figure = document.createElement("figure");
        // Affichage des travaux récupérés
        figure.innerHTML = `
                        <img src="${hotelRestaurantsWorksActive[i].imageUrl}" alt="${hotelRestaurantsWorksActive[i].title}" crossorigin="anonymous">
                        <figcaption>${hotelRestaurantsWorksActive[i].title}</figcaption>
                    `;
        // Rattachement au block parent
        const galleryEl = document.querySelector(".gallery");
        galleryEl.appendChild(figure);
      }
      // console.log(hotelRestaurantsWorksActive);
    });

    // Fonction active bouton
    function activeBtn() {
      objectsWorks.style.background = "#ffffff";
      objectsWorks.style.color = "#1D6154";
      apartmentsWorks.style.background = "#ffffff";
      apartmentsWorks.style.color = "#1D6154";
      allWorks.style.background = "#ffffff";
      allWorks.style.color = "#1D6154";
      hotelRestaurantsWorks.style.background = "#ffffff";
      hotelRestaurantsWorks.style.color = "#1D6154";
    };
  });
});



// *********************  Login Admin


// Récupération du token
const token = window.localStorage.getItem("token");
// console.log(token)

// Fonction pour la déconnection admin
function redirectionHome() {
  document.location.href = "index.html";
}

function logOut(e) {
  localStorage.clear();
  redirectionHome();
}

if (token !== null) {
  let log = document.querySelector(".login");
  log.innerHTML = " "
  log.innerHTML = "logout";
  log.addEventListener('click', logOut);
  
}
else if (token == null) {
  let log = document.querySelector(".login"); 
  log.innerHTML = "login"
}



// *********************  Admin mode


//Apparition de la barre d'admin et du bouton de modification en cas de token correct
let modal = null;
let adminBar = null
let modificationBtn = null;

if (token !== null) {
  //Appartion de la barre d'admin
  const adminBar = document.querySelector(".admin_bar");
  adminBar.style.display = null;
  adminBar.removeAttribute("aria-hidden");
  const body = document.querySelector('body');
  body.prepend('adminBar');
  body.style.marginTop = "38px";

  //Appparition des boutons modifier
  const modificationImage = document.querySelector(".modification_image");
  modificationImage.style.display = null;
  modificationImage.removeAttribute("aria-hidden");
  const modificationArticle = document.querySelector(".modification_article");
  modificationArticle.style.display = null;
  modificationArticle.removeAttribute("aria-hidden");
  const modificationProject = document.querySelector(".modification_project");
  modificationProject.style.display = null;
  modificationProject.removeAttribute("aria-hidden");

} else if (token == null) {};




// *********************  Modal mode


// Ouverture modale de suppression
const openModalSupp = function (e) {
  e.preventDefault();

  // Cibler l'élémént modal
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  modal = target;

  // Fonctionnailté, ouverture, fermeture
  modal.addEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal.querySelector(".js_modal_stop").addEventListener("click", stopPropagation);
  modal.querySelector(".open_modal_add").addEventListener("click", openModalAdd);
};

// Ouverture de la modale de D'ajout
const openModalAdd = function (e) {
  if (modal === null) return;
  e.preventDefault();

  // Mise à niveau 1ere modale
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
  modal.querySelector(".js_modal_stop").removeEventListener("click", stopPropagation);

  // Cible modale de suppression
  const modalAdd = document.querySelector(".modal_add");
  modalAdd.style.display = null;
  modalAdd.removeAttribute("aria-hidden");
  modal = modalAdd;

  // Fonctionnalité, retour, fermeture
  modalAdd.addEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal.querySelector(".js_modal_stop").addEventListener("click", stopPropagation);
  modal.querySelector(".fa-arrow-left").addEventListener("click", previewArrow);
  modal.querySelector(".submit_Work").addEventListener("click", addWork);
};

// import des photos du DOM dans la gallery de la modal et fonction de suppression des travaux
fetch("http://localhost:5678/api/works").then((response) => {
  const data = response.json();
  data.then((data) => {
    // console.log(data);
      

    // Suppression de tout les éléments
    const deleteAll = async function (e) {
      // Cibler les élément à supprimer
      for (let i = 0; i < data.length; i++) {
        // Création de la charge utile
        const id = data[i].id;
        console.log(id)

        // Appel de la fonction fetch DELETE
        let response = await fetch("http://localhost:5678/api/works"+ "/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/Json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });
      };
      // console.log(response.status);

      // Conditions: Authentification, redirection et erreurs
      if (response.status === 200) {
        // window.localStorage.setItem("token", token);
        // alert("Suppression des élément");
      } else if (response.status === 401 || 400) {
        // errorCreat();
        // alert("Action non-autorisée");
        console.log(err)
      };
    };

    function getWorks(data) {
      // Boucle pour ramener chaque travaux du DOM
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

        // Fonctionnailtée de suppression
        document
          .querySelector(".delete_all")
          .addEventListener("click", deleteAll);


        // ******************    Suppression d'un éléments
        const deleteElement = async function (e) {
          // Cibler l' élément à supprimer
          let id = deleteIcon.value;
          console.log(id)
      
          // Appel de la fonction fetch DELETE
          let response = await fetch("http://localhost:5678/api/works"+"/"+id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/Json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          console.log(response.status);

          // Conditions: Authentification, redirection et erreurs
          if (response.status === 200) {
            // window.localStorage.setItem("token", token);
            // alert("Suppression d'un élément");
          } else if (response.status === 401 || 400) {
            // errorCreat();
            // alert("Action non-autorisée");
          }
        };
        deleteIcon.addEventListener("click", deleteElement);
      };

      //Fonctionnalitée de déplacement

      //Création d'élément pour l'affichage
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

    };

    getWorks(data);
  });
});

//Retour modale de suppression
const previewArrow = function (e) {
  if (modal === null) return;
  e.preventDefault();

  const modalSupp = document.querySelector(".modal_add");
  modalSupp.style.display = "none";
  modalSupp.setAttribute("aria-hidden", "true");
  modal = modalSupp;

  const target = document.querySelector(".modal_supp");
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal.querySelector(".js_modal_stop").addEventListener("click", stopPropagation);
};

// Fermeture des modales
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
  modal.querySelector(".js_modal_stop").removeEventListener("click", stopPropagation);
  modal = null;
  
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

// lancement de la fonction d'ouverture
document.querySelectorAll(".open_modal").forEach((a) => {
  a.addEventListener("click", openModalSupp);
});


// Ajout d'un élément
function addWork() {
  //Cibler le formulaire d'ajout
  const formAddWork = document.querySelector(".form_addWork");

  formAddWork.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Récupération des saisies pour la création du nouvel élément
    const inputPicture = document.getElementById("image").files[0];
    console.log(inputPicture);
    const inputTitle = document.getElementById("title").value;
    console.log(inputTitle);
    const inputCategorie = document.getElementById("category").value;
    console.log(inputCategorie);

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
    })
    // .then(response => response.json())
    // console.log(response.status);

    // Récupération de la reponse de fetch "POST"
    let result = await response.json();
    console.log(result);

    // Conditions: Authentification, redirection et erreurs
    if (response.status === 200 || 204) {
      // alert("Ajout D'élément");
      return openModalSupp();
    } else if (response.status === 401 || 400) {
      // errorCreat();
      alert("Action non-autorisée");
    }
  });
}

// Afficher la prévisualisation de l'image à télécharger
const input = document.querySelector(".file_upload");

input.addEventListener("change", function (e) {
  e.preventDefault();

  // Constante et fonction pour la lecture de l'image
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    preview.src = reader.result;
  });
  // Lecture de l'image
  reader.readAsDataURL(input.files[0]);

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
});

