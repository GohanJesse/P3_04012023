// Récupération des données depuis le fichier JSON

const appelApi = fetch("http://localhost:5678/api/works");

appelApi
    .then((response) => {
        const data = response.json();

        data
        .then((data) => {
            console.log(data);
            console.log(data[0].title);
            console.log(data[0].imageUrl);

            for (let i = 0; i < data.length; i++) {
            const imageElement = document.createElement("img");
            imageElement.src = data[i].imageUrl;
            const titreElement = document.createElement("p");
            titreElement.innerText = data[i].title;

            const sectionArticle = document.querySelector(".gallery");
            sectionArticle.appendChild(imageElement);
            sectionArticle.appendChild(titreElement);
            }
        })
    })
    .catch((err) => console.log(err));

