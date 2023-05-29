//On récupère le panier dans le local storage et on le transforme en objet
let cartStorage = JSON.parse(localStorage.getItem("addToCart"));
console.log(cartStorage);

async function showItems() {
    // Récupération éléments HTML
    const cartItems = document.getElementById('cart__items');
    const cartTotalQty = document.getElementById('totalQuantity');
    const cartTotalPrice = document.getElementById('totalPrice');

    // Initialisation quantité total et prix total
    let totalPrice = 0;
    let totalQty = 0;

    // Affichage des produits dans le panier 
    for(let item of cartStorage) {
      console.log(item);
      for( let i= 0; i < cartStorage.length; i++) {

        fetch( `http://localhost:3000/api/products/${item.id}`)
        .then(reponse => reponse.json())
        .then((data) => {
            console.log(data);
            cartItems.innerHTML = 
            `<article class="cart__item" data-id="${data.id}" data-color="${data.colors}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${data.colors}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
            // Prix total et quantités
            // On doit multiplier à la quantité
            let itemTotal = item.quantity * data.price

            // On transforme en objet
            totalQty += JSON.parse(item.quantity);
            
            // On affiche dans la console
            console.log(itemTotal)
            console.log(item.quantity)

            // On additionne
            totalPrice += itemTotal
            // On affiche dans la console
            console.log(totalPrice)
                        
            // ça affiche en HTML
            cartTotalPrice.innerHTML = prixTotal;
            cartTotalQty.innerHTML = totalQuantity;
                            
            modifQuantity();
        })
    }
}}


// Suppression de l'article au click du btn
function deleteItem() {
    for( let i= 0; i < cartStorage.length; i++) {
      const btnDelete = document.querySelector('.deleteItem');
      btnDelete.addEventListener("click", (e) => {
        e.preventDefault();
        cartStorage.splice(i, 1);
        localStorage.setItem('addToCart', JSON.stringify(cartsStorage));
        window.location.reload();
       })
    }
}
    

// Initialisation
async function init() {
  await showItems();
  deleteItem();
}

init();