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
        let cartItems = document.getElementById("cart__items");
        cartItems.innerHTML += 
        `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${color}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;


        // Changement quantité
        let itemQuantity = document.querySelector(".itemQuantity");
        itemQuantity.addEventListener("change", updateValue);

        function updateValue(e) {
          
          quantity = e.target.value;
          console.log(e.target.value);
          localStorage.setItem('addToCart', JSON.stringify(cartStorage));
        }
        
        // Suppression de l'article au click du btn
        const btnDelete = Array.from(document.querySelectorAll('.deleteItem'));
        for(let btn of btnDelete){
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(i);
            cartStorage.splice(i, 1);
            localStorage.setItem('addToCart', JSON.stringify(cartStorage));
            window.location.reload();
          });

        }

        // Total des articles
        totalQty += parseFloat(quantity);
        document.getElementById("totalQuantity").innerHTML = totalQty;

        totalPrice += parseFloat(data.price) * quantity;
        document.getElementById("totalPrice").innerHTML = totalPrice;

       });
  }
    } else {

      let cart = document.getElementById("cart__items");
      cart.innerHTML = 
      '<div style="text-align:center;margin:10% 0;height:300px; font-size:large;font-style:italic"><p>Votre panier est vide</p><a href="index.html" style="color:white">Retourner à la page d\'accueil</a></div>';
    
    }
}
showCart();   


// Formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const orderBtn = document.getElementById("order");
const formUser = document.querySelectorAll("form input");
// Input messages erreurs
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
// regEx
const regexName = /^[A-Z][A-Za-z\é\è\ê\-]+$/;
const regexCity = /^[A-Z][A-Za-z\é\è\ê\-\s]+$/;
const regexAddress = /^.{1,128}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/;

function firstNameValidation() {
  if (regexName.test(firstName)) {
    firstNameErrorMsg.textContent = "ok";
    return true;
  } else {
    firstNameErrorMsg.textContent = "Le champ du formulaire est invalide" ;
    return false;
  }
}
// Vérification du nom
function lastNameValidation() {
  if (regexName.test(lastName)) {
    lastNameErrorMsg.textContent = "ok";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Le champ du formulaire est invalide" ;
    return false;
  }
}
// Vérification de l'adresse
function addressValidation() {
  if (regexAddress.test(address)) {
    addressErrorMsg.textContent = "ok";
    return true;
  } else {
    addressErrorMsg.textContent = "Le champ du formulaire est invalide" ;
    return false;
  }
}
// Vérification de la ville
function cityValidation() {
  if (regexCity.test(city)) {
    cityErrorMsg.textContent = "ok";
    return true;
  } else {
    cityErrorMsg.textContent = "Le champ du formulaire est invalide" ;
    return false;
  }
}
// Vérification de l'adresse e-mail
function emailValidation() {
  if (regexEmail.test(email)) {
    emailErrorMsg.textContent = "ok";
    return true;
  } else {
    emailErrorMsg.textContent = "Votre adresse mail n'est pas valide" ;
    return false;
  }
}

orderBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let fName = firstNameValidation(firstName.value);
  let lName = lastNameValidation(lastName.value);
  let adr = addressValidation(address.value);
  let cit = cityValidation(city.value);
  let mail = emailValidation(email.value);

  console.log(firstName.value);
  if (fName !== false && firstName.value !== "" && lName !== false && lastName.value !== "" && adr !== false && address.value !== "" &&
    cit !== false && city.value !== "" && mail !== false && email.value != "" ) {

      let productsInfos = [];
      for (let i = 0; i < cartStorage.length; i++) {
        products.push(cartStorage[i].id);
      }
console.log(fName);
      const orderInfo = {
        contact : {
          firstName: firstName.value,
          lastName: lastName.value,
          adress: adress.value,
          city: city.value,
          email: email.value,
        },
        products: productsInfos,
        }

        const options = {
          method: "POST",
          body: JSON.stringify(orderInfo),
          headers: {
            "Content-Type": "application/json",
          }
        }
  
    fetch("http://localhost:3000/api/products/order", options)
      .then((reponse) => reponse.json())
      .then((server) => {
      localStorage.clear();
      alert("Votre commande a bien été prise en compte");
      //location.href = `confirmation.html?id=${server.orderId}`;
    })
  } else {
      /* Si les entrées du formulaire ne correspondent pas, alors l'utilisateur verra les messages d'erreurs suivants sur les champs concernés */
      if (fName == false || firstName.value === "") {
        firstNameErrorMsg.innerHTML =
          "Entrez un prénom valide sans chiffre, ni symbole ou espace, en commençant par une majuscule.";
          console.log(fName);
      }
      if (lName == false || lastName.value === "") {
        lastNameErrorMsg.innerHTML =
          "Entrez un nom valide sans chiffre, ni symbole ou espace, en commençant par une majuscule.";
      }
      if (adr == false || address.value === "") {
        addressErrorMsg.innerHTML = "Entrez une adresse valide.";
      }
      if (cit == false || city.value === "") {
        cityErrorMsg.innerHTML =
          "Nous ne connaissons pas cette ville";
      }
      if (mail == false || email.value === "") {
        emailErrorMsg.innerHTML =
          "Entrez une adresse e-mail valide (xyz@exemple.com).";
      }
      return;
    }
  }


  // // Données du formulaire
  // Fonctions de vérification des valeurs regEx pour chaque entrée dans le formulaire
  // Vérification du prénom
)

