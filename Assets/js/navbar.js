document.addEventListener("DOMContentLoaded", () => {
  // Navigation elements
  const hamburgerMenu = document.querySelector(".hamburger-menu")
  const mobileNavLinks = document.querySelector(".mobile-nav .nav-links")
  const header = document.querySelector("header")
  const shopDropdown = document.querySelector(".mobile-nav .shop-dropdown")
  const shopArrow = document.querySelector(".mobile-nav .shop-arrow")
  const quickCart = document.querySelector(".quick-cart")
  const cartIcons = document.querySelectorAll(".cart-icon-popup")
  const closeCart = document.querySelector(".close-cart")

  // Load saved navigation states from localStorage
  const navStates = JSON.parse(localStorage.getItem("navStates") || "{}")

  // Initialize navigation states
  function initializeNavStates() {
    // Apply saved mobile menu state
    if (navStates.mobileMenuActive && hamburgerMenu && mobileNavLinks) {
      hamburgerMenu.classList.toggle("active", navStates.mobileMenuActive)
      mobileNavLinks.classList.toggle("active", navStates.mobileMenuActive)
    }

    // Apply saved shop dropdown state
    if (navStates.shopDropdownActive && shopDropdown) {
      shopDropdown.classList.toggle("active", navStates.shopDropdownActive)
    }

    // Apply saved cart state
    if (navStates.cartOpen && quickCart) {
      quickCart.style.transform = navStates.cartOpen ? "translateX(0%)" : "translateX(110%)"
    }

    // Apply saved header scroll state
    if (navStates.headerScrolled && header) {
      header.classList.toggle("scrolled", navStates.headerScrolled)
    }
  }

  // Save navigation states to localStorage
  function saveNavStates() {
    const states = {
      mobileMenuActive: hamburgerMenu?.classList.contains("active") || false,
      shopDropdownActive: shopDropdown?.classList.contains("active") || false,
      cartOpen: quickCart?.style.transform === "translateX(0%)" || false,
      headerScrolled: header?.classList.contains("scrolled") || false,
    }
    localStorage.setItem("navStates", JSON.stringify(states))
  }

  // Hamburger menu toggle
  if (hamburgerMenu && mobileNavLinks) {
    hamburgerMenu.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("active")
      mobileNavLinks.classList.toggle("active")
      saveNavStates()
    })
  }

  // Shop dropdown toggle
  if (shopArrow && shopDropdown) {
    shopArrow.addEventListener("click", (e) => {
      e.preventDefault()
      shopDropdown.classList.toggle("active")
      saveNavStates()
    })
  }

  // Header scroll behavior
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    if (!header) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (window.innerWidth > 1000) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add("scrolled")
      } else {
        // Scrolling up
        if (scrollTop === 0) {
          header.classList.remove("scrolled")
        }
      }
      saveNavStates()
    } else {
      header.classList.remove("scrolled")
      saveNavStates()
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  })

  // Quick cart functionality
  if (cartIcons.length && quickCart) {
    // Add click event to all cart icons
    cartIcons.forEach((cartIcon) => {
      cartIcon.addEventListener("click", () => {
        quickCart.style.transform = "translateX(0%)"
        saveNavStates()

        // Sync with cart display from other JS files
        updateCartFromLocalStorage()
      })
    })
  }

  if (closeCart && quickCart) {
    // Close cart when close button is clicked
    closeCart.addEventListener("click", () => {
      quickCart.style.transform = "translateX(110%)"
      saveNavStates()
    })
  }

  // Function to update cart display from localStorage
  function updateCartFromLocalStorage() {
    const cartItemsContainer = document.querySelector(".cart-items-container")
    const totalPriceElement = document.querySelector(".total-price")
    const emptyCartMessage = document.querySelector(".empty-cart-message")

    if (!cartItemsContainer) return

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")

    // Clear existing cart items
    const existingItems = cartItemsContainer.querySelectorAll(".cart-items")
    existingItems.forEach((item) => item.remove())

    // Show/hide empty cart message
    if (emptyCartMessage) {
      emptyCartMessage.style.display = cartItems.length === 0 ? "block" : "none"
    }

    // Add cart items to display
    cartItems.forEach((item, index) => {
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
      `

      cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML)
    })

    // Add event listeners to cart items
    addCartItemEventListeners()

    // Update total price
    if (totalPriceElement) {
      const total = cartItems.reduce((sum, item) => {
        return sum + Number.parseFloat(item.newPrice) * item.quantity
      }, 0)

      totalPriceElement.textContent = `$${total.toFixed(2)}`
    }
  }

  // Function to add event listeners to cart items
  function addCartItemEventListeners() {
    // Remove item buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-items")
        const productId = cartItem.dataset.productId
        removeFromCart(productId)
      })
    })

    // Increment buttons
    document.querySelectorAll(".increment-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-items")
        const productId = cartItem.dataset.productId
        updateCartItemQuantity(productId, 1)
      })
    })

    // Decrement buttons
    document.querySelectorAll(".decrement-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-items")
        const productId = cartItem.dataset.productId
        updateCartItemQuantity(productId, -1)
      })
    })
  }

  // Function to remove item from cart
  function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    cartItems = cartItems.filter((item) => item.id !== productId)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    updateCartFromLocalStorage()
    updateCartCount()
  }

  // Function to update cart item quantity
  function updateCartItemQuantity(productId, change) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    const itemIndex = cartItems.findIndex((item) => item.id === productId)

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = Math.max(1, cartItems[itemIndex].quantity + change)
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      updateCartFromLocalStorage()
      updateCartCount()
    }
  }

  // Function to update cart count
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const cartCounts = document.querySelectorAll(".cart-count")

    cartCounts.forEach((count) => {
      if (count) {
        count.textContent = totalItems
        count.style.display = totalItems > 0 ? "inline-block" : "none"
      }
    })
  }

  // Initialize navigation states from localStorage
  initializeNavStates()

  // Update cart display on page load
  updateCartFromLocalStorage()
  updateCartCount()

  // Listen for storage events to sync across tabs
  window.addEventListener("storage", (event) => {
    if (event.key === "cartItems") {
      updateCartFromLocalStorage()
      updateCartCount()
    }
  })
})

