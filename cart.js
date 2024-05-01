// Function to update the cart item count badge
function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = document.getElementById('cartItemCount');
    if (cartItemCount) {
        cartItemCount.textContent = cartItems.length;
    }
}



function addToCart(productId) {
    const games = JSON.parse(sessionStorage.getItem('games')) || [];
    const product = games.find(game => game.id === productId);
    if (!product) {
        console.error('Product not found!');
        return;
    }

    updateCartItemCount();


    // Check if the product is already in the cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        console.log('Product is already in the cart.');
        return;
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    displayCart();
}

// Function to display the shopping cart
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    cartItems.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Left section: Game image
        const cartItemLeft = document.createElement('div');
        cartItemLeft.className = 'cart-item-left';
        const cartItemImage = document.createElement('img');
        cartItemImage.src = product.image;
        cartItemImage.alt = product.title;
        cartItemLeft.appendChild(cartItemImage);
        cartItem.appendChild(cartItemLeft);

        // Middle section: Game name
        const cartItemMiddle = document.createElement('div');
        cartItemMiddle.className = 'cart-item-middle';
        const cartItemTitle = document.createElement('p');
        cartItemTitle.textContent = product.title;
        cartItemMiddle.appendChild(cartItemTitle);
        cartItem.appendChild(cartItemMiddle);

        // Right section: Game price and remove button
        const cartItemRight = document.createElement('div');
        cartItemRight.className = 'cart-item-right';
        const cartItemPrice = document.createElement('p');
        cartItemPrice.className = 'cart-item-price';
        cartItemPrice.textContent = getCartItemPrice(product);
        cartItemRight.appendChild(cartItemPrice);
        
        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '&times;'; // X symbol for remove
        removeButton.className = 'remove-item-button';
        removeButton.addEventListener('click', function() {
            removeFromCart(index);
        });
        cartItemRight.appendChild(removeButton);
        
        cartItem.appendChild(cartItemRight);

        cartList.appendChild(cartItem);
    });

    updateCartTotal();
}

// Function to get the correct price for a cart item
function getCartItemPrice(product) {
    return product.onSale ? `€${product.discountedPrice.toFixed(2)}` : `€${product.price.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
    updateCartItemCount();
}

// Function to update the total price of the cart
function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((sum, item) => {
        return sum + (item.onSale ? item.discountedPrice : item.price);
    }, 0);
    document.getElementById('cart-total').textContent = `Total: €${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function () {
    displayCart();
  
    // Event listener for cart icon click
    const cartIcon = document.getElementById("cart-icon");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const goToCheckoutBtn = document.getElementById("go-to-checkout-btn");
    const cartContainer = document.getElementById("cart-container");

    // Event listener to add an item to the cart when the "Add to Cart" button is clicked
    const addToCartButton = document.querySelector('.button--add_to_cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function(event) {
            const gameId = new URLSearchParams(window.location.search).get("id");
            addToCart(gameId);
        });
    } else {
        console.error("Add to cart button not found.");
    }

    cartIcon.addEventListener("click", function () {
        // Toggle visibility of cart overlay and container
        cartOverlay.classList.toggle("visible");
        cartContainer.classList.toggle("show-cart-container");
    });
  
// Event listener to close cart overlay when clicking outside of the cart container, except on remove button
document.addEventListener("click", function (event) {
    const clickedElement = event.target;
    const isRemoveButton = clickedElement.classList.contains('remove-item-button');
    if (!cartContainer.contains(clickedElement) && !cartIcon.contains(clickedElement) && !isRemoveButton) {
        cartOverlay.classList.remove("visible");
        cartContainer.classList.remove("show-cart-container");
    }
});

  
    // Event listener for close button click
    closeCartBtn.addEventListener("click", function () {
        cartOverlay.classList.remove("visible");
        cartContainer.classList.remove("show-cart-container");
    });
  
    // Event listener for checkout button click
    goToCheckoutBtn.addEventListener("click", function () {
        window.location.href = "checkout.html";
    });
    // Update the cart item count badge
    updateCartItemCount();
});

// Function to update the cart item count badge
function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = document.getElementById('cartItemCount');
    if (cartItemCount) {
        cartItemCount.textContent = cartItems.length;
    }
}



