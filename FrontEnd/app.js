// Récupération des données depuis le fichier JSON grâce a fetch

const appelApi = fetch("http://localhost:5678/api/works");

// Demande de réponse en .json
appelApi
    .then((response) => {
        const data = response.json();

        // test du renvoi des résponses dans la console
        data
        .then((data) => {
            console.log(data);
            console.log(data[0].title);
            console.log(data[0].imageUrl);

            // Création d'une boucle pour l'affichage de chaque élément dans le length   
            for (let i=0; i<data.length; i++) {
                // Création d'un élément pour le départ
                const figure = document.createElement("figure")
                // Affichage des travaux récupérés
                figure.innerHTML = `
                    <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
                    <figcaption>${data[i].title}</figcaption>
                `
                // Rattachement au block parent
                const galleryEl = document.querySelector(".gallery")
                galleryEl.appendChild(figure)
            }


            // Programmation pour filtrer et afficher les travaux ciblés
            
            // Afficher tous les travaux
            const allWorks = document.querySelector(".all_filter");
            allWorks.addEventListener("click", function () {
            const allWorksActive = data.filter(function (data) {
                return data;
            });
            console.log(allWorksActive)
            });

            // Filtrer par objets
            const objectsWorks = document.querySelector(".object_filter");
            objectsWorks.addEventListener("click", function () {
            const objectsWorksActive = data.filter(function (data) {
                return data.category.name.includes("Objets");
            });
            console.log(objectsWorksActive)
            });

            // Afficher seulement les objets
            const categorieWorks = data.map(data => data.category.name);
            console.log(categorieWorks)
            for(let i = data.length -1; i >= 0; i--) {
                if(data[i].category.name.includes("Appartements" || "Hotels & restaurants")){
                    categorieWorks.splice(i,1);
                }
            }


            // Filtrer par Appartements
            const apartmentsWorks = document.querySelector(".apartment_filter");
            apartmentsWorks.addEventListener("click", function () {
            const apartmentsWorksActive = data.filter(function (data) {
                return data.category.name.includes("Appartements");
            });
            console.log(apartmentsWorksActive)
            });
            // Afficher seulement les appartements


            // Filtrer par Hotels & restaurants
            const hotelRestaurantsWorks = document.querySelector(".hotel_restaurant_filter");
            hotelRestaurantsWorks.addEventListener("click", function () {
            const hotelRestaurantsWorksActive = data.filter(function (data) {
                return data.category.name.includes("Hotels & restaurants");
            });
            console.log(hotelRestaurantsWorksActive)
            });
            // Afficher seulement les Hotels & restaurants


        })
    })
    .catch((err) => console.log(err));



