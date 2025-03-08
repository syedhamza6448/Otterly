const pCards = [
    {
        name: "Oversized Hoodie",
        pImg: "product-1.png",
        oldPrice: "60.00",
        newPrice: "39.99",
        id: "1",
        category: "Tops",
    },
    {
        name: "Streetwear Shoes",
        pImg: "product-2.png",
        oldPrice: "75.00",
        newPrice: "51.50",
        id: "2",
        category: "Shoes",
    },
    {
        name: "Silver Cross Pendant",
        pImg: "product-3.png",
        oldPrice: "20.00",
        newPrice: "12.99",
        id: "3",
        category: "Jewelry",
    },
    {
        name: "Varsity Jacket",
        pImg: "product-4.png",
        oldPrice: "80.00",
        newPrice: "54.99",
        id: "4",
        category: "Tops",
    },
    {
        name: "Tokyo Hoodie",
        pImg: "product-5.png",
        oldPrice: "60.00",
        newPrice: "39.99",
        id: "5",
        category: "Tops",
    },
    {
        name: "Cargo Pants",
        pImg: "product-6.png",
        oldPrice: "75.00",
        newPrice: "51.50",
        id: "6",
        category: "Bottoms",
    },
    {
        name: "Graphic Sweatshirt",
        pImg: "product-7.png",
        oldPrice: "46.00",
        newPrice: "27.99",
        id: "7",
        category: "Tops",
    },
    {
        name: "Nike Air Shoes",
        pImg: "product-8.png",
        oldPrice: "80.00",
        newPrice: "54.99",
        id: "8",
        category: "Shoes",
    },
    {
        name: "Otter Cream Plushie",
        pImg: "product-9.png",
        oldPrice: "15.00",
        newPrice: "7.79",
        id: "9",
        category: "Plushies",
    },
    {
        name: "Twisted Smiley Necklace",
        pImg: "product-10.png",
        oldPrice: "18.00",
        newPrice: "10.89",
        id: "10",
        category: "Jewelry",
    },
    {
        name: "Drop Shoulder Tee",
        pImg: "product-11.png",
        oldPrice: "34.50",
        newPrice: "24.99",
        id: "11",
        category: "Tops",
    },
    {
        name: "Otter Brown Plushie",
        pImg: "product-12.png",
        oldPrice: "20.79",
        newPrice: "12.99",
        id: "12",
        category: "Plushies",
    },
    {
        name: "Motion Tee",
        pImg: "product-13.png",
        oldPrice: "45.00",
        newPrice: "32.99",
        id: "13",
        category: "Top",
    },
    {
        name: "Urban Ambition",
        pImg: "product-14.png",
        oldPrice: "75.00",
        newPrice: "49.99",
        id: "14",
        category: "Top",
    },
    {
        name: "All Eyes Hoodie",
        pImg: "product-15.png",
        oldPrice: "60.00",
        newPrice: "45.89",
        id: "15",
        category: "Top",
    },
    {
        name: "Miami Curb Bracelet",
        pImg: "product-16.png",
        oldPrice: "30.00",
        newPrice: "14.99",
        id: "16",
        category: "Jewelry",
    },
]

// Save product data to localStorage for access by script.js
localStorage.setItem('productData', JSON.stringify(pCards));

document.addEventListener("DOMContentLoaded", () => {
    const productsContainerNew = document.querySelector('.new .products');
    const productsContainerPopular = document.querySelector('.popular .products');
    const productsContainerBest = document.querySelector('.best .products');

    // Load saved view preferences from localStorage
    const savedViewPreferences = JSON.parse(localStorage.getItem('viewPreferences') || '{}');

    pCards.forEach((product, index) => {
        let productHTML = `
        <div data-aos="zoom-out-down" data-aos-duration="2000" data-aos-offset="200" 
             class="product-card" data-category="${product.category}">
            <div class="img-container">
                <img src="Assets/images/products/${product.pImg}" alt="${product.name}">
                <div class="wishlist-icon">
                    <i class="bi bi-suit-heart ${isInWishlist(product.id) ? 'active-wishlist' : ''}" 
                       data-tooltip="${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}" 
                       data-product-id="${product.id}"></i>
                </div>
                <div class="overlay">
                    <div class="quick-buttons">
                        <i class="bi bi-eye" data-tooltip="Quick View"></i>
                        <i class="bi bi-suit-heart ${isInWishlist(product.id) ? 'active-wishlist' : ''}" 
                           data-tooltip="${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}" 
                           data-product-id="${product.id}"></i>
                        <i class="bi bi-bag" data-tooltip="Add to Cart" data-product-id="${product.id}"></i>
                    </div>
                    <a href="productlink"><button>View Product</button></a>
                </div>
            </div>
            <h3>${product.name}</h3>
            <div class="product-price">
                <p class="n-price">$${product.newPrice}</p>
                <p class="o-price">$${product.oldPrice}</p>
            </div>
        </div>
    `;

        if (index < 4) {
            productsContainerNew?.insertAdjacentHTML('beforeend', productHTML);
        } else if (index < 12) {
            productsContainerPopular?.insertAdjacentHTML('beforeend', productHTML);
        }
        else {
            productsContainerBest?.insertAdjacentHTML('beforeend', productHTML);
        }
    });

    // Apply saved category filter if available
    const savedCategory = localStorage.getItem('filterCategory');
    if (savedCategory && productsContainerPopular) {
        const filterButtons = document.querySelectorAll('.popular-filter ul li');
        const popularProducts = Array.from(productsContainerPopular.querySelectorAll('.product-card'));
        
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === savedCategory) {
                btn.classList.add('active');
                
                // Apply filter
                popularProducts.forEach(product => {
                    const productCategory = product.getAttribute('data-category');
                    if (savedCategory === 'All' || savedCategory === productCategory) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });
            }
        });
    }

    // Function to check if a product is in the wishlist
    function isInWishlist(productId) {
        const wishlist = new Set(JSON.parse(localStorage.getItem('wishlist') || '[]'));
        return wishlist.has(productId);
    }
});

// Cart functionality
let cartItems = [];

document.addEventListener("DOMContentLoaded", () => {
    // Get cart elements
    const quickCart = document.querySelector(".quick-cart");
    const cartItemsContainer = document.querySelector(".cart-items-container");
    const totalPriceElement = document.querySelector(".total-price");
    const emptyCartMessage = document.querySelector(".empty-cart-message") || 
        document.createElement("div");
    
    if (!emptyCartMessage.classList.contains("empty-cart-message")) {
        emptyCartMessage.classList.add("empty-cart-message");
        emptyCartMessage.textContent = "Your cart is empty";
        cartItemsContainer?.appendChild(emptyCartMessage);
    }

    // Load cart from localStorage
    loadCartFromLocalStorage();

    // Function to add item to cart
    function addToCart(product, quantity = 1) {
        // Check if product already exists in cart
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                ...product,
                quantity: quantity
            });
        }

        updateCartDisplay();
        updateCartCount();
        saveCartToLocalStorage();
    }

    // Function to remove item from cart
    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        updateCartDisplay();
        updateCartCount();
        saveCartToLocalStorage();
    }

    // Function to update item quantity
    function updateItemQuantity(productId, newQuantity) {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
            updateCartDisplay();
            updateCartCount();
            saveCartToLocalStorage();
        }
    }

    // Function to update cart display
    function updateCartDisplay() {
        if (!cartItemsContainer) return;
        
        // Clear current cart items
        const existingItems = cartItemsContainer.querySelectorAll('.cart-items');
        existingItems.forEach(item => item.remove());

        // Add each item to cart display
        cartItems.forEach(item => {
            const itemTotal = (parseFloat(item.newPrice) * item.quantity).toFixed(2);

            const cartItemHTML = `
        <div class="cart-items" data-product-id="${item.id}">
          <img src="Assets/images/products/${item.pImg}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <span><p>$${item.newPrice}</p>&Cross;<p class="item-quantity">${item.quantity}</p></span>
          </div>
          <div class="quantity-controls">
            <button class="decrement-quantity">-</button>
            <button class="increment-quantity">+</button>
          </div>
          <i class="bi bi-x-lg remove-item"></i>
        </div>
      `;

            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        // Add event listeners to new elements
        addCartItemEventListeners();

        // Update total price
        updateTotalPrice();

        // Update empty cart message visibility
        updateEmptyCartMessage();
    }

    // Function to add event listeners to cart items
    function addCartItemEventListeners() {
        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-items');
                const productId = cartItem.dataset.productId;
                removeFromCart(productId);
            });
        });

        // Increment buttons
        document.querySelectorAll('.increment-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-items');
                const productId = cartItem.dataset.productId;
                const item = cartItems.find(item => item.id === productId);
                if (item) {
                    updateItemQuantity(productId, item.quantity + 1);
                }
            });
        });

        // Decrement buttons
        document.querySelectorAll('.decrement-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-items');
                const productId = cartItem.dataset.productId;
                const item = cartItems.find(item => item.id === productId);
                if (item && item.quantity > 1) {
                    updateItemQuantity(productId, item.quantity - 1);
                }
            });
        });
    }

    // Function to update total price
    function updateTotalPrice() {
        if (!totalPriceElement) return;
        
        const total = cartItems.reduce((sum, item) => {
            return sum + (parseFloat(item.newPrice) * item.quantity);
        }, 0);

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    // Function to update cart count
    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartCounts = document.querySelectorAll(".cart-count");

        cartCounts.forEach(count => {
            count.textContent = totalItems;
            count.style.display = totalItems > 0 ? "inline-block" : "none";
        });
    }
    
    // Function to save cart to localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Function to load cart from localStorage
    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
            updateCartDisplay();
            updateCartCount();
        }
    }

    // Function to update empty cart message visibility
    function updateEmptyCartMessage() {
        if (!emptyCartMessage) return;
        
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = "block";
        } else {
            emptyCartMessage.style.display = "none";
        }
    }

    // Listen for add to cart clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('bi-bag')) {
            const productId = e.target.dataset.productId;
            if (productId) {
                const product = pCards.find(p => p.id === productId);
                if (product) {
                    addToCart(product);
                }
            }
        }
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll(".wishlist-icon i, .quick-buttons .bi-suit-heart");
    const wishlistCounts = document.querySelectorAll(".wishlist-count");

    // Initialize wishlist from localStorage
    let wishlistItems = parseInt(localStorage.getItem('wishlistItemsCount') || '0');
    const wishlist = new Set(JSON.parse(localStorage.getItem('wishlist') || '[]'));

    function updateButtonState(button, isActive, addText, removeText) {
        button.classList.toggle("active-wishlist", isActive);
        button.setAttribute("data-tooltip", isActive ? removeText : addText);
    }

    function updateWishlistCounts(count) {
        wishlistCounts.forEach((element) => {
            if (element) {
                element.textContent = count;
                element.style.display = count > 0 ? "inline-block" : "none";
            }
        });
        
        // Save wishlist count to localStorage
        localStorage.setItem('wishlistItemsCount', count.toString());
    }

    function updateWishlistIcon(productId, isActive) {
        const icons = document.querySelectorAll(
            `.wishlist-icon i[data-product-id="${productId}"], .quick-buttons .bi-suit-heart[data-product-id="${productId}"]`
        );
        icons.forEach((icon) => {
            icon.classList.toggle("active-wishlist", isActive);
        });
    }

    // Apply saved wishlist state
    wishlist.forEach(productId => {
        updateWishlistIcon(productId, true);
    });

    wishlistButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = button.getAttribute("data-product-id");
            const isActive = !wishlist.has(productId);

            if (isActive) {
                wishlist.add(productId);
                wishlistItems++;
            } else {
                wishlist.delete(productId);
                wishlistItems--;
            }

            // Save wishlist to localStorage
            localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
            
            updateButtonState(button, isActive, "Add to Wishlist", "Remove from Wishlist");
            updateWishlistIcon(productId, isActive);
            updateWishlistCounts(wishlistItems);
        });
    });

    // Initialize wishlist counts
    updateWishlistCounts(wishlistItems);

    // Popular products filter
    const popularProductsContainer = document.querySelector('.popular .products');
    const filterButtons = document.querySelectorAll('.popular-filter ul li');
    
    if (popularProductsContainer && filterButtons.length) {
        const popularProducts = Array.from(popularProductsContainer.children);

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Save filter category to localStorage
                localStorage.setItem('filterCategory', category);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                popularProducts.forEach(product => {
                    const productCategory = product.getAttribute('data-category');
                    if (category === 'All' || category === productCategory) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize cart display
    updateCartDisplay();

    const enhancedProductData = pCards.map(product => {
        return {
            ...product,
            rating: generateRating(),
            description: generateDescription(product)
        };
    });
    
    // Helper function to generate random ratings between 3 and 5
    function generateRating() {
        return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
    }
    
    // Helper function to generate descriptions based on product category
    function generateDescription(product) {
        const descriptions = {
            Tops: "This premium quality top brings both style and comfort to your wardrobe. Crafted from soft, breathable fabric that feels great against your skin, with a modern fit that flatters your silhouette.",
            Bottoms: "Elevate your style with these trendy bottoms, designed for both comfort and fashion. The perfect balance of casual and statement-making, with quality construction for lasting wear.",
            Shoes: "Step up your footwear game with these stylish shoes that combine modern design with all-day comfort. Features cushioned insoles and durable materials for the perfect balance of fashion and function.",
            Jewelry: "Add a touch of elegance to any outfit with this beautifully crafted piece. The perfect accessory to express your personal style, made with attention to detail and quality materials.",
            Plushies: "This adorable plushie is super soft and huggable, perfect for snuggling or displaying. Made with premium materials that are both durable and gentle to the touch."
        };
    
        // Default description if category doesn't match or isn't specified
        return descriptions[product.category] || 
            "Elevate your style with this premium Otterly product. Our signature quality and design ensures you'll stand out while staying comfortable.";
    }
        // Get modal elements
        const modal = document.getElementById("quickViewModal");
        const closeBtn = document.querySelector(".close-modal");
        const modalProductImage = document.getElementById("modalProductImage");
        const modalProductName = document.getElementById("modalProductName");
        const modalProductRating = document.getElementById("modalProductRating");
        const modalProductDescription = document.getElementById("modalProductDescription");
        const modalProductPrice = document.getElementById("modalProductPrice");
        const modalProductOldPrice = document.getElementById("modalProductOldPrice");
        const decrementBtn = document.getElementById("decrementQuantity");
        const incrementBtn = document.getElementById("incrementQuantity");
        const quantityDisplay = document.getElementById("productQuantity");
        const addToCartBtn = document.getElementById("modalAddToCart");
        
        let currentProductId = null;
        let currentQuantity = 1;
    
        // Add event listeners to "Quick View" buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('bi-eye')) {
                // Find the product card
                const productCard = e.target.closest('.product-card');
                if (!productCard) return;
                
                // Get product ID from the wishlist or cart icon in the same card
                const wishlistIcon = productCard.querySelector('.bi-suit-heart');
                if (!wishlistIcon) return;
                
                const productId = wishlistIcon.dataset.productId;
                if (!productId) return;
                
                // Find product data
                const product = enhancedProductData.find(p => p.id === productId);
                if (!product) return;
                
                // Open modal with product details
                openModal(product);
            }
        });
    
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Handle quantity increment/decrement
        decrementBtn.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityDisplay.textContent = currentQuantity;
            }
        });
        
        incrementBtn.addEventListener('click', () => {
            currentQuantity++;
            quantityDisplay.textContent = currentQuantity;
        });
        
        // Add to cart button
        addToCartBtn.addEventListener('click', () => {
            if (currentProductId) {
                const product = enhancedProductData.find(p => p.id === currentProductId);
                if (product) {
                    // Add to cart using existing cart functionality
                    // This uses the cart functionality from your script.js
                    addToCartFromModal(product, currentQuantity);
                    closeModal();
                }
            }
        });
    
        // Function to open modal with product details
        function openModal(product) {
            currentProductId = product.id;
            currentQuantity = 1;
            quantityDisplay.textContent = currentQuantity;
            
            // Set product details in modal
            modalProductImage.src = `Assets/images/products/${product.pImg}`;
            modalProductImage.alt = product.name;
            modalProductName.textContent = product.name;
            
            // Generate star rating
            const ratingValue = parseFloat(product.rating);
            let starsHTML = '';
            
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(ratingValue)) {
                    starsHTML += '<i class="bi bi-star-fill star"></i>';
                } else if (i === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
                    starsHTML += '<i class="bi bi-star-half star"></i>';
                } else {
                    starsHTML += '<i class="bi bi-star star"></i>';
                }
            }
            
            starsHTML += `<span style="margin-left: 5px; color: #666;">(${ratingValue})</span>`;
            modalProductRating.innerHTML = starsHTML;
            
            // Set description and prices
            modalProductDescription.textContent = product.description;
            modalProductPrice.textContent = `$${product.newPrice}`;
            modalProductOldPrice.textContent = `$${product.oldPrice}`;
            
            // Display modal
            modal.style.display = "block";
            
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = "hidden";
        }
        
        // Function to close modal
        function closeModal() {
            modal.style.display = "none";
            
            // Restore scrolling on body
            document.body.style.overflow = "auto";
        }
        
        // Function to add product to cart from modal
        function addToCartFromModal(product, quantity) {
            // Check if the cart functionality is available
            if (typeof cartItems !== 'undefined') {
                // Check if product already exists in cart
                const existingItem = cartItems.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cartItems.push({
                        ...product,
                        quantity: quantity
                    });
                }
                
                // Update cart UI
                if (typeof updateCartDisplay === 'function') {
                    updateCartDisplay();
                    updateCartCount();
                    saveCartToLocalStorage();
                } else {
                    // Fallback if the functions aren't directly accessible
                    const event = new CustomEvent('addToCart', { 
                        detail: { product, quantity } 
                    });
                    document.dispatchEvent(event);
                    
                    // Update localStorage manually
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    
                    // Reload the page to refresh the cart display
                    window.location.reload();
                }
            } else {
                console.error('Cart functionality not available');
            }
        }
    });
