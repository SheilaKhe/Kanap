// Variables

const url = "http://localhost:3000/api/products";
const section = document.getElementById("items");

// Function pour récupérer les infos produits
const getArticles = () => {
    fetch(url)
    .then(function (res) {
        return res.json()
    })
    // Affichage des produits
    .then(function(data){
        console.log(data);
        for(product in data){
            section.innerHTML += `<a href="./product.html?id=${data[product]._id}">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>
          </a>`
        }
    })
}

getArticles();