document.addEventListener("DOMContentLoaded", () => {
  const colorOptions = document.querySelectorAll(".color-option")
  const sizeOptions = document.querySelectorAll(".size-option")
  const productImages = document.querySelectorAll(".product-image img")
  const productImageContainer = document.querySelector(".product-image")
  const cartItemsContainer = document.querySelector(".cart-items-container")
  const emptyCartMessage = document.querySelector(".empty-cart-message") || document.createElement("div")

  if (!emptyCartMessage.classList.contains("empty-cart-message")) {
    emptyCartMessage.classList.add("empty-cart-message")
    emptyCartMessage.textContent = "Your cart is empty"
    cartItemsContainer.appendChild(emptyCartMessage)
  }

  // Loading indicator elements
  const loaderContainer = document.createElement("div")
  loaderContainer.className = "loader-container"
  const loader = document.createElement("svg")
  loader.className = "loader"
  loader.innerHTML = '<circle cx="20" cy="20" r="15"></circle>'
  loaderContainer.appendChild(loader)
  if (productImageContainer) {
    productImageContainer.appendChild(loaderContainer)
  }

  // Initialize state from localStorage or use defaults
  let currentIndex = Number.parseInt(localStorage.getItem("currentImageIndex") || "0")
  let intervalId
  const autoChangeInterval = 5000 // 5 seconds

  // Initialize cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")

  // Initialize wishlist from localStorage
  let wishlistItems = Number.parseInt(localStorage.getItem("wishlistItemsCount") || "0")
  const wishlist = new Set(JSON.parse(localStorage.getItem("wishlist") || "[]"))

  // Initialize selected color and size from localStorage
  const savedColor = localStorage.getItem("selectedColor")
  const savedSize = localStorage.getItem("selectedSize")

  function updateActiveState(options, clickedOption) {
    options.forEach((option) => option.classList.remove("active"))
    clickedOption.classList.add("active")
  }

  // Apply saved color if available
  if (savedColor) {
    colorOptions.forEach((option) => {
      if (option.getAttribute("data-color") === savedColor) {
        updateActiveState(colorOptions, option)
      }
    })
  }

  // Apply saved size if available
  if (savedSize) {
    sizeOptions.forEach((option) => {
      if (option.getAttribute("data-size") === savedSize) {
        updateActiveState(sizeOptions, option)
      }
    })
  }

  function changeImage(index, direction = "right") {
    if (!productImages.length) return

    const currentImage = productImages[currentIndex]
    const nextImage = productImages[index]

    // Set initial positions
    currentImage.style.transition = "none"
    nextImage.style.transition = "none"

    if (direction === "right") {
      currentImage.style.transform = "translateX(0)"
      nextImage.style.transform = "translateX(100%)"
    } else {
      currentImage.style.transform = "translateX(0)"
      nextImage.style.transform = "translateX(-100%)"
    }

    nextImage.style.opacity = "1"

    // Force reflow
    void nextImage.offsetWidth

    // Animate
    currentImage.style.transition = "transform 0.5s ease-in-out"
    nextImage.style.transition = "transform 0.5s ease-in-out"

    if (direction === "right") {
      currentImage.style.transform = "translateX(-100%)"
      nextImage.style.transform = "translateX(0)"
    } else {
      currentImage.style.transform = "translateX(100%)"
      nextImage.style.transform = "translateX(0)"
    }

    // Update active states
    currentImage.classList.remove("active")
    nextImage.classList.add("active")
    updateActiveState(colorOptions, colorOptions[index])

    currentIndex = index

    // Save current image index to localStorage
    localStorage.setItem("currentImageIndex", index.toString())
  }

  function startAutoChange() {
    if (!productImages.length) return

    intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % productImages.length
      changeImage(nextIndex, "right")
      resetLoader()
    }, autoChangeInterval)
  }

  function stopAutoChange() {
    clearInterval(intervalId)
  }

  function resetLoader() {
    if (!loader) return

    loader.style.animation = "none"
    void loader.offsetWidth // Trigger reflow
    loader.style.animation = `fill ${autoChangeInterval / 1000}s linear forwards`
  }

  colorOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      // Save selected color to localStorage
      localStorage.setItem("selectedColor", option.getAttribute("data-color"))

      if (index !== currentIndex) {
        stopAutoChange()
        const direction = index > currentIndex ? "right" : "left"
        changeImage(index, direction)
        startAutoChange()
        resetLoader()
      }
    })
  })

  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Save selected size to localStorage
      localStorage.setItem("selectedSize", option.getAttribute("data-size"))

      updateActiveState(sizeOptions, option)
    })
  })

  // Start the auto-changing and loader after initial animations
  if (productImages.length) {
    setTimeout(() => {
      // Apply saved image index
      if (currentIndex > 0 && currentIndex < productImages.length) {
        changeImage(currentIndex, "right")
      }

      startAutoChange()
      resetLoader()
    }, 3000) // Wait for 3 seconds after page load to allow all animations to complete
  }

  // Cart and wishlist functionality
  const wishlistButtons = document.querySelectorAll(".wishlist-icon i, .quick-buttons .bi-suit-heart")
  const cartButtons = document.querySelectorAll(".quick-buttons .bi-bag, .add-to-cart")
  const wishlistCounts = document.querySelectorAll(".wishlist-count")
  const cartCounts = document.querySelectorAll(".cart-count")

  function updateButtonState(button, isActive, addText, removeText) {
    button.classList.toggle("active-wishlist", isActive)
    button.setAttribute("data-tooltip", isActive ? removeText : addText)
  }

  function updateWishlistCounts(count) {
    wishlistCounts.forEach((element) => {
      element.textContent = count
      element.style.display = count > 0 ? "inline-block" : "none"
    })

    // Save wishlist count to localStorage
    localStorage.setItem("wishlistItemsCount", count.toString())
  }

  function updateWishlistIcon(productId, isActive) {
    const icons = document.querySelectorAll(
      `.wishlist-icon i[data-product-id="${productId}"], .quick-buttons .bi-suit-heart[data-product-id="${productId}"]`,
    )
    icons.forEach((icon) => {
      icon.classList.toggle("active-wishlist", isActive)
    })
  }

  // Apply saved wishlist state
  wishlist.forEach((productId) => {
    updateWishlistIcon(productId, true)
  })

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const productId = button.getAttribute("data-product-id")
      const isActive = !wishlist.has(productId)

      if (isActive) {
        wishlist.add(productId)
        wishlistItems++
      } else {
        wishlist.delete(productId)
        wishlistItems--
      }

      // Save wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify([...wishlist]))

      updateButtonState(button, isActive, "Add to Wishlist", "Remove from Wishlist")
      updateWishlistIcon(productId, isActive)
      updateWishlistCounts(wishlistItems)
    })
  })

  // Initialize wishlist counts
  updateWishlistCounts(wishlistItems)

  // Cart functionality
  function addToCart(productId, productName, price, color, size) {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === productId && item.color === color && item.size === size,
    )

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1
    } else {
      cartItems.push({
        productId,
        productName: productName || "Product",
        price: price || "$99.99",
        color: color || "Default",
        size: size || "M",
        quantity: 1,
      })
    }

    // Save cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    updateCartDisplay()
    updateCartCounts()
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1)

    // Save cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    updateCartDisplay()
    updateCartCounts()
  }

  function updateCartCounts() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

    cartCounts.forEach((element) => {
      if (element) {
        element.textContent = totalItems
        element.style.display = totalItems > 0 ? "inline-block" : "none"
      }
    })
  }

  function updateCartDisplay() {
    if (!cartItemsContainer) return

    // Clear existing cart items except the empty message
    const existingItems = cartItemsContainer.querySelectorAll(".cart-item")
    existingItems.forEach((item) => item.remove())

    if (cartItems.length === 0) {
      emptyCartMessage.style.display = "block"
      return
    }

    emptyCartMessage.style.display = "none"

    // Add cart items
    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement("div")
      cartItemElement.className = "cart-item flex justify-between items-center p-2 border-b"

      cartItemElement.innerHTML = `
        <div>
          <p class="font-medium">${item.productName}</p>
          <p class="text-sm text-gray-600">${item.price} | ${item.color} | ${item.size} | Qty: ${item.quantity}</p>
        </div>
        <button class="remove-item text-red-500 text-sm" data-index="${index}">Remove</button>
      `

      cartItemsContainer.appendChild(cartItemElement)
    })

    // Add event listeners to remove buttons
    const removeButtons = cartItemsContainer.querySelectorAll(".remove-item")
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number.parseInt(button.getAttribute("data-index"))
        removeFromCart(index)
      })
    })
  }

  // Initialize cart display
  updateCartDisplay()
  updateCartCounts()

  // Add to cart button event listeners
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id") || "main-product"
      const productElement = button.closest(".product-card, .product-details")

      let productName = "Product"
      let price = "$99.99"

      if (productElement) {
        const nameElement = productElement.querySelector("h2, h3")
        const priceElement = productElement.querySelector("p")

        if (nameElement) productName = nameElement.textContent || "Product"
        if (priceElement) price = priceElement.textContent || "$99.99"
      }

      // Get selected color and size
      const selectedColor = localStorage.getItem("selectedColor") || "Default"
      const selectedSize = localStorage.getItem("selectedSize") || "M"

      addToCart(productId, productName, price, selectedColor, selectedSize)
    })
  })

  // Popular products filter
  const popularProductsContainer = document.querySelector(".popular .products")
  const filterButtons = document.querySelectorAll(".popular-filter ul li")

  // Get saved filter category
  const savedCategory = localStorage.getItem("filterCategory") || "All"

  if (popularProductsContainer && filterButtons.length) {
    const popularProducts = Array.from(popularProductsContainer.children)

    // Apply saved filter
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-category") === savedCategory) {
        btn.classList.add("active")

        // Apply filter
        popularProducts.forEach((product) => {
          const productCategory = product.getAttribute("data-category")
          if (savedCategory === "All" || savedCategory === productCategory) {
            product.style.display = "flex"
          } else {
            product.style.display = "none"
          }
        })
      } else {
        btn.classList.remove("active")
      }
    })

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category")

        // Save filter category to localStorage
        localStorage.setItem("filterCategory", category)

        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        popularProducts.forEach((product) => {
          const productCategory = product.getAttribute("data-category")
          if (category === "All" || category === productCategory) {
            product.style.display = "flex"
          } else {
            product.style.display = "none"
          }
        })
      })
    })
  }

  // Update empty cart message visibility
  function updateEmptyCartMessage() {
    if (cartItems.length === 0) {
      emptyCartMessage.style.display = "block"
    } else {
      emptyCartMessage.style.display = "none"
    }
  }

  // Call this initially
  updateEmptyCartMessage()
})

