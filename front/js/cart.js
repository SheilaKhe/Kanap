/*
 * Récupérer le local storage de l'utilisateur
 */
const cartStorage = JSON.parse(localStorage.getItem("addToCart"));

async function productData(id) {
  return (await fetch(`http://localhost:3000/api/products/${id}`)).json();
}

const getProductData = async (id) => {
  try {
    return productData(id);
  } catch {
    console.error("Erreur lors de la récupération des données du produit");
  }
};

// Création de la page 
const createCart = async (data) => {
  const product = await productData(data.id);
  let cartItems = document.getElementById("cart__items");
  cartItems.innerHTML += 
  `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${data.color}</p>
              <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;

        // Suppression d'un élément du addToCart & localstorage
        let productDeleted = document.getElementsByClassName("deleteItem");
        console.log(productDeleted);
        for (let i = 0; i < productDeleted.length; i++) {
          productDeleted[i].addEventListener("click", (e) => {
            let articleDOM = productDeleted[i].closest("article");
            const productToClear = cartStorage.indexOf(cartStorage[i]);
            cartStorage.splice(productToClear, 1);
            articleDOM.remove();
            if (localStorage != undefined) {
              localStorage.setItem("addToCart", JSON.stringify(cartStorage));
            } else {
              localStorage.clear();
            }
            console.log("Produit supprimé du addToCart");
            location.reload()
          });
        }     

};

// Changement des quantités
addEventListener("input", function () {
  let quantitySelector = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantitySelector.length; i++) {
    quantitySelector[i].addEventListener("change", (e) => {
      let productQuantity = e.target.value;
      if (productQuantity == 0 || productQuantity >= 100) {
        console.error("La quantité doit être comprise entre 1 et 100");
        productQuantity = `${cartStorage[i].quantity}`;
      } else {
        cartStorage.map((obj) => {
          if (
            (obj.id == cartStorage[i].id, obj.color == cartStorage[i].color)
          ) {
            obj.quantity = parseInt(productQuantity);
          }
        });
        localStorage.setItem("addToCart", JSON.stringify(cartStorage));
        totalRefresh();
        console.log("Quantité mise à jour");
      }
    });
  }
});


// Rafraichissement des quantités et prix 
const totalRefresh = async () => {
  let totalCartPrice = 0;
  let totalCartQty = 0;
  if (localStorage.length != 0) {
    for (let i = 0; i < cartStorage.length; i++) {
      let itemStorage = cartStorage[i];
      const product = await getProductData(itemStorage.id);
      totalCartPrice +=
        parseInt(itemStorage.quantity) * parseInt(product.price);
      totalCartQty += parseInt(itemStorage.quantity);
    }
  }
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerText = totalCartQty;
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = totalCartPrice;
};

function showErrorMsg(errorId, nameField) {
  let errorContainer = document.getElementById(`${errorId}`);
  errorContainer.innerHTML = `${nameField} est invalide`;
}


// RegEx

const globalRegex = new RegExp("^[A-Za-zéèêëàâîïôöûü-]+$");

// Vérification du prénom
function verifyFirstName(prenom) {
  let fieldIsCorrect = false;
  if (globalRegex.test(prenom)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("firstNameErrorMsg", "Prénom");
  }
  return fieldIsCorrect;
}

// Vérification du nom
function verifyLastName(nom) {
  let fieldIsCorrect = false;
  if (globalRegex.test(nom)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("lastNameErrorMsg", "Nom");
  }
  return fieldIsCorrect;
}

// Vérification de l'adresse
function verifyAddress(adresse) {
  let fieldIsCorrect = false;
  const adresseRegex = new RegExp(
    "([0-9]*)?([a-zA-Z]*)"
  );
  if (adresseRegex.test(adresse)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("addressErrorMsg", "Adresse");
  }
  return fieldIsCorrect;
}

// Vérification de la ville
function verifyCity(ville) {
  let fieldIsCorrect = false;
  if (globalRegex.test(ville)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("cityErrorMsg", "Ville");
  }
  return fieldIsCorrect;
}

// Vérification de l'e-mail
function verifyEmail(email) {
  let fieldIsCorrect = false;
  if (
    email.match(
      /[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,24}/
    )
  ) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("emailErrorMsg", "Email");
  }
  return fieldIsCorrect;
}

// Envoi de la commande
function sendRequestToApi(body) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status == 201) {
        return response.json();
      } else {
        console.error("une erreur est survenue lors de la commande");
      }
    })
    .then((order) => {
      localStorage.clear();
      id = order.orderId;
      window.location.href = `confirmation.html?id=${id}`;
    });
}

// Envoi du formulaire et vérification des champs
addEventListener("submit", function (e) {
  e.preventDefault();
  let prenom = e.target.firstName.value;
  let nom = e.target.lastName.value;
  let adresse = e.target.address.value;
  let ville = e.target.city.value;
  let email = e.target.email.value;
  if (
    verifyFirstName(prenom) &&
    verifyLastName(nom) &&
    verifyAddress(adresse) &&
    verifyCity(ville) &&
    verifyEmail(email)
  ) {
    sendRequestToApi(createBodyRequest(prenom, nom, adresse, ville, email));
  } else {
    console.error("Tous les champs ne sont pas correctement remplis");
  }
});

/*
 * Create the send object in the body of the request
 */
function createBodyRequest(prenom, nom, adresse, ville, mail) {
  let idProducts = [];
  for (let i = 0; i < cartStorage.length; i++) {
    idProducts.push(cartStorage[i].id);
  }
  const bodyContent = {
    contact: {
      firstName: prenom,
      lastName: nom,
      address: adresse,
      city: ville,
      email: mail,
    },
    products: idProducts,
  };
  return bodyContent;
}

// Fonction pour afficher chaque élément du panier 
function displayProducts() {
  if (localStorage.length != 0) {
    for (let i = 0; i <= cartStorage.length - 1; i++) {
      createCart(cartStorage[i]);
    }
  }
  totalRefresh();
}

displayProducts();
