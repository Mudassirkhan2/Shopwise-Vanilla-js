const shop = document.querySelector(".shop");
const cartAmount = document.getElementById("cartAmount");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let search =
        basket.find((y) => {
          return y.id == x.id;
        }) || [];
      return `<div class="item">
      <img src="${x.image}" alt="img-1" />
      <div class="details">
        <h3>${x.title}</h3>
        <div class="price-quantity">
          <h2>$${x.price}</h2>
          <div class="buttons">
            <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
            <div id=${x.id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join(""));

  // console.log(shopItemsData);
};
generateShop();

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
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id == id);
  if (search.item == "0") {
    return;
  } else if (search.item == undefined) {
    return;
  } else {
    search.item -= 1;
  }
  update(id);
  //to remove items of zeros
  basket = basket.filter((x) => {
    return x.item !== 0;
  });
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id == id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};
let calculation = () => {
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// to update the if reloaded
calculation();
