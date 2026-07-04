"use strict";


// create list of products
const products = [
    {
        id: 0,
        price: 5.99,
        stock: 20,
        img: "assets/croissant.webp",
        description: "Plain Croissant"
    },
    {
        id: 1,
        price: 5.99,
        stock: 20,
        img: "assets/painau_chocolat.webp",
        description: "Pain au Chocolat"
    },
    {
        id: 2,
        price: 5.99,
        stock: 20,
        img: "assets/cinnamon_roll.jpg",
        description: "Cinnamon Roll"
    },
    {
        id: 3,
        price: 5.99,
        stock: 20,
        img: "assets/raisin_girella.jpeg",
        description: "Raisin Girella"
    },
    {
        id: 4,
        price: 5.99,
        stock: 20,
        img: "assets/cheese_danish.jpg",
        description: "Cheese Danish"
    },
    {
        id: 5,
        price: 6.99,
        stock: 10,
        img: "assets/maritozzi.jpg",
        description: "Maritozzo"
    },
    {
        id: 6,
        price: 4.99,
        stock: 10,
        img: "assets/blondies.jpg",
        description: "Blondie"
    },
    {
        id: 7,
        price: 3.99,
        stock: 5,
        img: "assets/salted_macaron.jpg",
        description: "Salted Caramel Macaron"
    },
    {
        id: 8,
        price: 3.99,
        stock: 5,
        img: "assets/redvelvet_macaron.jpg",
        description: "Red Velvet Macaron"
    },
    {
        id: 9,
        price: 3.99,
        stock: 5,
        img: "assets/rose_macaron.webp",
        description: "Rose Macaron"
    },
    {
        id: 10,
        price: 3.99,
        stock: 5,
        img: "assets/pistachio_macaron.jpg",
        description: "Pistachio Macaron"
    },
    {
        id: 11,
        price: 7.99,
        stock: 20,
        img: "assets/matcha_tiramisu.png",
        description: "Matcha Tiramisu"
    },
    {
        id: 12,
        price: 7.99,
        stock: 20,
        img: "assets/thaitea_tiramisu.jpg",
        description: "Thai Tea Tiramisu"
    },
    {
        id: 13,
        price: 6.99,
        stock: 5,
        img: "assets/vegan_cake.jpg",
        description: "Vegan Marble Cake"
    }

]



// grab the section where products are going to be added
const productSection = document.getElementsByClassName("all_items")[0];


function displayProduct(){
    console.log("displayProduct function is running!");
    products.forEach( (product)=> {
        productSection.innerHTML += `
            <div class="product" id="${product.id}">
                <div class="product-img">
                    <img src="${product.img}" alt="${product.description}">
                </div>
                <div class="desc">
                    <p>${product.description}, $${product.price}</p>
                    <button onclick="addToCart(${product.id})"><img src="assets/add-to-cart.png" class="bag-icon"></button>
                </div>
            </div>
        `
    })
}

displayProduct();

// empty array for items to be added to the cart
let cart = [];

// function for the onclick event on the button
function addToCart(id){
    // check if item is already in cart
    if(cart.some( (item) => item.id === id)){
        //find item in array and make sure the product.id matches the id of clicked button
        changeUnits("plus", id)
    } else{
        const item = products.find( (product) => product.id === id);    
        cart.push({ // push item into cart array
            ...item,
            numberOfUnits: 1});  // add new object key-value
    }
    updateCart();
}

function updateCart(){
    console.log("updateCart function is running!");
    displayCart();
}

const cartItems = document.getElementsByClassName("cart-items")[0];

function displayCart(){
    console.log("displayCart function is running!");

    cartItems.innerHTML = ""; //clear cart items
    cart.forEach( (item) => {
        cartItems.innerHTML += `
            <div class="product-cart">
                <div class="item-info">
                    <img src="${item.img}" alt="${item.description}">
                    <p>${item.description}</p>
                </div>
                <div class="item-price">
                    <p>$${item.price}</p>
                </div>
                <div class="units">
                    <button class="minus" onclick="changeUnits('minus', ${item.id})">-</button>
                    <p class="amount">${item.numberOfUnits}</p>
                    <button class="plus" onclick="changeUnits('plus', ${item.id})">+</button>
                </div>
            </div>
        `;
    });
}

displayCart();

function changeUnits(action, id){
    cart = cart.map( (item) => { 
        let numberOfUnits = item.numberOfUnits; //get the current number of units in cart
        if(item.id === id){ //if minus or plus is clicked, update units
            if(action === "minus" && numberOfUnits > 1){ 
                numberOfUnits--;
            } else if(action === "plus" && numberOfUnits < item.stock){
                numberOfUnits++;
            }

        }
        return {
            ...item,
            numberOfUnits
        };
    });

    updateCart();
}

changeUnits();