//Adding products to the cart
let cart = document.querySelectorAll("#addCart");

let products = [
    {
        name: 'watch',
        tag: 'watch1',
        price: '10',
        inCart: '0'
    },
    {
        name: 'dress',
        tag: 'dress1',
        price: '15',
        inCart: '0'
    },
    {
        name: 'shoe',
        tag: 'shoe1',
        price: '20',
        inCart: '0'
    },
]

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('#cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
   
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#cart span').textContent = 1;
    }

    setItems(product);
    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart = parseInt(cartItems[product.tag].inCart) + 1;
    } else {
        product.inCart = 1;
        cartItems = {
           [product.tag]: product
        }
    }
    

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log('my cartCost is', cartCost);

    if (cartCost !== null) {
        cartCost = parseInt(cartCost);
        let productPrice = parseInt(product.price);
        cartCost += productPrice;
        localStorage.setItem('totalCost', cartCost);
        document.getElementById('tp').textContent = cartCost;
    } else {
        localStorage.setItem('totalCost', product.price);
        document.getElementById('tp').textContent = product.price;
    }
}


//Removing products from the cart
function removeItemFromCart(productTag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    if (cartItems && cartItems[productTag]) {
        let product = cartItems[productTag];
        let productPrice = parseInt(product.price);
        let cartCost = parseInt(localStorage.getItem('totalCost'));
        let quantityInCart = parseInt(product.inCart);

        if (quantityInCart > 1) {
            //reduce the quantity if there is more than one item of this type in the cart 
            product.inCart = (quantityInCart - 1).toString();
            cartItems[productTag] = product;
            cartCost -= productPrice;
        } else {
            // else remove
            delete cartItems[productTag];
            cartCost -= productPrice * quantityInCart;
        }

        // Update cart numbers by subtracting the removed item's quantity
        let cartNumbers = parseInt(localStorage.getItem('cartNumbers'));
        cartNumbers -= 1;
        localStorage.setItem('cartNumbers', cartNumbers);

        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        localStorage.setItem('totalCost', cartCost);

        document.getElementById('tp').textContent = cartCost;

        updateCartCounter();
    }
}


function updateCartCounter() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let totalItems = 0;

    if (cartItems) {
        Object.values(cartItems).forEach(item => {
            totalItems += item.inCart;
        });
    }

    document.querySelector('#cart span').textContent = totalItems;
}


document.querySelectorAll('#rmCart').forEach(button => {
    button.addEventListener('click', function() {
        let productTagToRemove = this.getAttribute('data-product-tag');
        removeItemFromCart(productTagToRemove);
    });
});

onLoadCartNumbers();

//Like button 
let heartButtons = document.querySelectorAll('#like');

//button event listener
heartButtons.forEach(button => {
    button.addEventListener('click', function() {
        
        let currentColor = this.style.color;

        if (currentColor === 'red') {
            this.style.color = ''; 
        } else {
            this.style.color = 'red';
        }
    });
});



