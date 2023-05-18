// Récupération du panier dans le localstorage
let cartStorage = JSON.parse(localStorage.getItem("addToCart"));
console.log(cartStorage);
// Fonction pour afficher le panier
function showCart() {
  let totalQty = 0;
  let totalPrice = 0;

// Si le local storage n'est pas vide 
if (cartStorage != "") {
  // Récupération des produits dans le panier
  for (let i = 0; i < cartStorage.length; i++) {

    let id = cartStorage[i].id;
    let color = cartStorage[i].color;
    let quantity = cartStorage[i].quantity;
    let url = `http://localhost:3000/api/products/${id}`;

      fetch(url)
      .then((reponse) => reponse.json())
      .then((data) => {
       // console.log(data);

        // Création du HTML
        let article = document.createElement("article");
        document.getElementById("cart__items").appendChild(article);
        article.className = "cart__item";
        article.setAttribute("data-id", id);
        article.setAttribute("data-color", color);

        let divImgProduct = document.createElement("div");
        article.appendChild(divImgProduct);
        divImgProduct.className = "cart__item__img";

        let imgProduct = document.createElement("img");
        divImgProduct.appendChild(imgProduct);
        imgProduct.src = data.imageUrl;
        imgProduct.setAttribute("alt", data.altTxt);

        let cartItemContent = document.createElement("div");
        article.appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";

        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.className =
          "cart__item__content__description";

        let itemTitle = document.createElement("h2");
        cartItemContentDescription.appendChild(itemTitle);
        itemTitle.innerHTML = data.name;

        let itemColor = document.createElement("p");
        cartItemContentDescription.appendChild(itemColor);
        itemColor.innerHTML = color;

        let itemPrice = document.createElement("p");
        cartItemContentDescription.appendChild(itemPrice);
        itemPrice.innerHTML = data.price + "&ensp;&euro;";

        let cartItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.className = "cart__item__content__settings";

        let cartItemContentSettingsQty = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsQty);
        cartItemContentSettingsQty.className =
          "cart__item__content__settings__quantity";

        let qty = document.createElement("p");
        cartItemContentSettingsQty.appendChild(qty);
        qty.innerHTML = "Qté : ";

        let itemQuantity = document.createElement("input");
        cartItemContentSettingsQty.appendChild(itemQuantity);
        itemQuantity.value = quantity;
        itemQuantity.className = "itemQuantity";
        itemQuantity.setAttribute("type", "number");
        itemQuantity.setAttribute("min", "1");
        itemQuantity.setAttribute("max", "100");
        itemQuantity.setAttribute("name", "itemQuantity");
        itemQuantity.setAttribute("oninput", "validity.valid||(value='');");
        itemQuantity.addEventListener("change", (e) => {
          e.preventDefault;
          quantitySelection (
            id,
            color,
            itemQuantity.value,
            data.price
          );
        });

        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        let itemDelete = document.createElement("p");
        cartItemContentSettingsDelete.appendChild(itemDelete);
        itemDelete.className = "deleteItem";
        itemDelete.innerHTML = "<br>Supprimer";
        itemDelete.style.cursor = "pointer";

        itemDelete.addEventListener("mouseover", (event) => {
          event.preventDefault;
          itemDelete.style.textDecoration = "underline";
        });
        itemDelete.addEventListener("mouseout", (event) => {
          event.preventDefault;
          itemDelete.style.textDecoration = "";
        });


        // Suppression de l'article au click du btn
        itemDelete.addEventListener("click", (e) => {
          e.preventDefault;
          console.log(i);
          let cart = cartStorage.filter(p => p.color != color && p.id != id);
          console.log(cart);
          localStorage.setItem('addToCart', JSON.stringify(cart));
          //window.location.reload();

        });



        // Total des articles
        totalQty += parseFloat(quantity);
        document.getElementById("totalQuantity").innerHTML = totalQty;

        totalPrice += parseFloat(data.price) * quantity;
        document.getElementById("totalPrice").innerHTML = totalPrice;
      });
  }
} else {

}
}
showCart();   


// Formulaire
const firstName = document.getElementsByName("firstName").value;
const lastName = document.getElementsByName("lastName").value;
const adress = document.getElementsByName("address").value;
const city = document.getElementsByName("city").value;
const mail = document.getElementsByName("email").value;
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

// regEx
const regexName = /^[A-Z][A-Za-z\é\è\ê\-]+$/;
const regexCity = /^[A-Z][A-Za-z\é\è\ê\-\s]+$/;
const regexAddress = /^.{1,128}$/;
const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/;

// Fonctions de vérification des valeurs regEx pour chaque entrée dans le formulaire si le formulaire est affichée.

//Vérification du prénom
function firstNameValidation(firstName) {
  if (firstName) {
    if (regexName.test(firstName) == false) {
      return false;
    } else {
      firstNameErrorMsg.innerHTML = "";
      return true;
    }
  }
}
//Vérification du nom
function lastNameValidation(lastName) {
  if (lastName) {
    if (regexName.test(lastName) == false) {
      return false;
    } else {
      lastNameErrorMsg.innerHTML = "";
      return true;
    }
  }
}
//vérification de l'adresse
function addressValidation(address) {
  if (address) {
    if (regexAddress.test(address) == false) {
      return false;
    } else {
      addressErrorMsg.innerHTML = "";
      return true;
    }
  }
}
//vérification de la ville
function cityValidation(city) {
  if (city) {
    if (regexCity.test(city) == false) {
      return false;
    } else {
      cityErrorMsg.innerHTML = "";
      return true;
    }
  }
}
//vérification de l'adresse e-mail
function emailValidation(email) {
  if (email) {
    if (regexEmail.test(email) == false) {
      return false;
    } else {
      emailErrorMsg.innerHTML = "";
      return true;
    }
  }
}