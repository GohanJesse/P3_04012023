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
        })
    })
    .catch((err) => console.log(err));

