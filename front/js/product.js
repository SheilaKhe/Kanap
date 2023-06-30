// Récupération id produit
const params = new URL(document.location).searchParams;
const id = params.get("id");
const url = `http://localhost:3000/api/products/${id}`;

// Récupération des éléments HTML
const titlePdt = document.getElementById("title");
const pricePdt = document.getElementById("price");
const descPdt = document.getElementById("description");
const colorPdt = document.getElementById("colors");
const qtyPdt = document.getElementById("quantity");

const imgPdt = document.createElement("img");
document.querySelector(".item__img").appendChild(imgPdt);


// Affichage produit sélectionné
const getArticle = () => {
    fetch(url)
    .then((res) => res.json())
    .then((data)=> {
        // console.log(data);
        titlePdt.innerHTML = data.name;
        pricePdt.innerHTML = data.price;
        descPdt.innerHTML = data.description;
        imgPdt.setAttribute("src", `${data.imageUrl}`)
        imgPdt.setAttribute("alt", `${data.altTxt}`)
        // Récupération des options couleurs
        for (color in data.colors) {
            colorPdt.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`
        }
    })  
}
getArticle();


// Ajouté un article au panier

// Bouton
const cartBtn = document.querySelector("#addToCart");

// Event au click du bouton
cartBtn.addEventListener('click', () => {
    // Infos produit
    const product = {
             quantity : parseInt(document.getElementById("quantity").value),
             color : document.getElementById("colors").value,
             id : id
         }

         console.log(product);

    // Infos du panier en localstorage
    function getCart() {
        let cart = localStorage.getItem('addToCart');
        console.log(cart);
        if(cart == null) {
            return [];
        } else {
            return JSON.parse(cart);
        }
    }

    // Ajout du produit dans le panier
    function addCart(product) {

        let cart = getCart();

        // Recherche si le produit existe ou pas
        let pdtFound = cart.find(p => p.id == product.id && p.color == product.color);
        console.log(pdtFound);
        // Si il existe addition des quantités
        if (pdtFound != undefined) {
            console.log(product.quantity);
            pdtFound.quantity = parseInt(pdtFound.quantity) + parseInt(product.quantity);
        } else {
            cart.push(product);  
        }
        alert("Vos produits ont bien été ajouté au panier"); 
        localStorage.setItem('addToCart', JSON.stringify(cart));
    }

    if (product.quantity > 0 && product.quantity <= 100 && product.color != "") {
        addCart(product);
        window.reload();
    } else {
        alert("Il manque quelques informations...") 
    }
})