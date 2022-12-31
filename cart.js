let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
// to update the if reloaded
calculation();
let generateCartItems = () => {
  // to check cart is not empty

  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search =
          shopItemsData.find((y) => {
            return y.id == id;
          }) || [];
        return `
      <div class="cart-item">
         <img  src= ${search.image} /> 
         <div class ="details-cart" > 
           <div  class = "title-price-x">
             <h4 class="title-price">
              <p>${search.title}</p> 
              <p class="cart-item-price">$${search.price}</p> 
             </h4>
             <i onclick="removeitem(${id})" class ="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
            <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
            <div id=${x.id} class="quantity">${item}</div>
            <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
          </div>
           <h3 class="total-cart-price">$ ${item * search.price}</h3> 
         </div>
      </div>
      `;
      })
      .join(""));
  }
  //if cart is zero
  else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
     <h2> Cart is Empty</h2>
     <a href="index.html">
     <button class="HomeBtn">Back to Home</button> </a>
     `;
  }
};
generateCartItems();

let increment = (id) => {
  let search = basket.find((x) => x.id == id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id == id);
  if (search.item === 0) {
    return;
  } else if (search.item == undefined) {
    return;
  } else {
    search.item -= 1;
  }
  update(id);
  //to remove items of zeros from localstorage
  basket = basket.filter((x) => {
    return x.item !== 0;
  });
  //to delete items if they hit zero
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id == id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totolamount();
};

let removeitem = (id) => {
  // console.log(id);
  basket = basket.filter((x) => {
    return x.id !== id;
  });
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totolamount();
  calculation();
};

let totolamount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;

        let search =
          shopItemsData.find((y) => {
            return y.id == id;
          }) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount.toFixed(2)}</h2>
    <button class="checkout">Checkout</button>
    <button  onclick="clearCart()" class="clearcart"> Clear cart</button>
    `;
  }
};

totolamount();

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};
