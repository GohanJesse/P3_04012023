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
            const article = document.createElement("div");
            article.setAttribute("display", "flex");
            article.setAttribute("flex-direction","column");
            const newArticle = document.querySelector(".gallery");
            newArticle.appendChild(article);

            const imageElement = document.createElement("img");
            imageElement.setAttribute("crossorigin", "anonymous");
            imageElement.src = data[i].imageUrl;

            const titreElement = document.createElement("h3");
            titreElement.innerText = data[i].title;
            
            const sectionArticle = document.querySelector("div");
            sectionArticle.appendChild(imageElement);
            sectionArticle.appendChild(titreElement);
            }
        })
    })
    .catch((err) => console.log(err));

