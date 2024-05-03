function updateIconColors() {
    const icons = document.querySelectorAll('.cart-icon-in-button');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    icons.forEach(icon => {
        const gameId = icon.getAttribute('data-game-id');
        const isInCart = cartItems.some(item => item.id === gameId);
        if (isInCart) {
            icon.classList.add('cart-icon-added');
        } else {
            icon.classList.remove('cart-icon-added');
        }
    });
}



document.addEventListener("DOMContentLoaded", function () {
        displayCart();
        updateCartItemCount();
        updateIconColors();
        updateButtonText();
});



function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = document.getElementById('cartItemCount');
    const allIcons = document.querySelectorAll('.cart-icon-in-button');

    allIcons.forEach(icon => {
        const gameId = icon.getAttribute('data-game-id');
        if (cartItems.some(item => item.id === gameId)) {
            icon.classList.add('cart-icon-added');
        } else {
            icon.classList.remove('cart-icon-added');
        }
    });

    if (cartItemCount) {
        if (cartItems.length > 0) {
            cartItemCount.textContent = cartItems.length;
            cartItemCount.style.display = 'inline';
        } else {
            cartItemCount.textContent = '';
            cartItemCount.style.display = 'none';
        }
    }
}


function addToCart(productId, buttonElement) {
    const games = JSON.parse(sessionStorage.getItem('games')) || [];
    const product = games.find(game => game.id === productId);
    if (!product) {
        console.error('Product not found!', productId);
        return;
    }

    function addToCart(productId, buttonElement) {
        const games = JSON.parse(sessionStorage.getItem('games')) || [];
        const product = games.find(game => game.id === productId);
        if (!product) {
            console.error('Product not found!', productId);
            return;
        }

        
    
        const isInCart = isInShoppingCart(productId);
    
        if (isInCart) {
            removeGameFromCart(productId);
        } else {
            addGameToCart(product);
        }
    
    }

    function updateButtonIcon(isInCart, buttonElement) {
        if (isInCart) {
            buttonElement.classList.add('cart-icon-added');
        } else {
            buttonElement.classList.remove('cart-icon-added');
        }
    }
    

    
    function isInShoppingCart(gameId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.some(item => item.id === gameId);
    }
    
    function addGameToCart(game) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(game);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function removeGameFromCart(gameId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== gameId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        cart.splice(existingProductIndex, 1);
        buttonElement.classList.remove('cart-icon-added');
    } else {
        cart.push(product);
        buttonElement.classList.add('cart-icon-added');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    displayCart();

    if (document.body.classList.contains('games-page')) {
        updateIconColors();
    }
}




function displayCart() {
    const overlayCartList = document.getElementById('cart-list');
    const checkoutCartList = document.getElementById('checkout-cart-list');

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (overlayCartList) {
        overlayCartList.innerHTML = '';
        cartItems.forEach((product, index) => {
            overlayCartList.appendChild(createCartItem(product, index));
        });
    }

    if (checkoutCartList) {
        checkoutCartList.innerHTML = '';
        cartItems.forEach((product, index) => {
            checkoutCartList.appendChild(createCartItem(product, index));
        });
    }

    updateCartTotal();
}



function createCartItem(product, index) {
    // Building HTML for each cart item
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const cartItemLeft = document.createElement('div');
    cartItemLeft.className = 'cart-item-left';
    const cartItemImage = document.createElement('img');
    cartItemImage.src = product.image;
    cartItemImage.alt = product.title;
    cartItemLeft.appendChild(cartItemImage);

    const cartItemMiddle = document.createElement('div');
    cartItemMiddle.className = 'cart-item-middle';
    const cartItemTitle = document.createElement('p');
    cartItemTitle.textContent = product.title;
    cartItemMiddle.appendChild(cartItemTitle);

    const cartItemRight = document.createElement('div');
    cartItemRight.className = 'cart-item-right';
    const cartItemPrice = document.createElement('p');
    cartItemPrice.textContent = getCartItemPrice(product);
    cartItemRight.appendChild(cartItemPrice);

    const removeButton = document.createElement('button');
    removeButton.textContent = '×';
    removeButton.className = 'remove-item-button';
    removeButton.onclick = () => removeFromCart(index);
    cartItemRight.appendChild(removeButton);

    cartItem.appendChild(cartItemLeft);
    cartItem.appendChild(cartItemMiddle);
    cartItem.appendChild(cartItemRight);

    return cartItem;
}

// Function to get the correct price for a cart item
function getCartItemPrice(product) {
    return product.onSale ? `€${product.discountedPrice.toFixed(2)}` : `€${product.price.toFixed(2)}`;
}

// Simplified removal based on updated script context
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
    updateCartItemCount();
    updateIconColors();  // Update icons after removing item from cart

}

function updateCartTotal() {
    const total = calculateTotal();
    const overlayTotal = document.getElementById('cart-total');
    const checkoutTotal = document.getElementById('checkout-cart-total');

    if (overlayTotal) {
        overlayTotal.textContent = `Total: €${total.toFixed(2)}`;
    }

    if (checkoutTotal) {
        checkoutTotal.textContent = `Total: €${total.toFixed(2)}`;
    }
}

function calculateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    return cartItems.reduce((sum, item) => sum + (item.onSale ? item.discountedPrice : item.price), 0);
}


document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    updateCartItemCount();

        // Conditional icon updates based on the presence of a certain class in the body
        if (document.body.classList.contains('games-page')) {
            setTimeout(() => {
                updateIconColors();
            }, 500);
        }

    const cartIcon = document.getElementById("cart-icon");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const goToCheckoutBtn = document.getElementById("go-to-checkout-btn");
    const cartContainer = document.getElementById("cart-container");

    cartIcon?.addEventListener("click", () => {
        cartOverlay.classList.toggle("visible");
        cartContainer.classList.toggle("show-cart-container");
    });

    closeCartBtn?.addEventListener("click", () => {
        cartOverlay.classList.remove("visible");
        cartContainer.classList.remove("show-cart-container");
    });

    goToCheckoutBtn?.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

    document.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (!cartContainer.contains(clickedElement) && !cartIcon.contains(clickedElement) && !clickedElement.classList.contains('remove-item-button')) {
            cartOverlay.classList.remove("visible");
            cartContainer.classList.remove("show-cart-container");
        }
    });
});



// Set onclick attribute to call addToCart function
button.onclick = function() {
    addToCart('${game.id}', this);
};

// Create the button element
const button = document.createElement("button");
button.classList.add("add-to-cart-icon-in-button");







// Append the button to the desired location in the DOM
const container = document.querySelector(".button.action-buttons");
container.appendChild(button);

    // Conditional icon color update
    if (document.body.classList.contains('games-page')) {
        updateIconColors();
    }