document.addEventListener("DOMContentLoaded", () => {
  const colorOptions = document.querySelectorAll(".color-option")
  const sizeOptions = document.querySelectorAll(".size-option")
  const productImages = document.querySelectorAll(".product-image img")
  const productImageContainer = document.querySelector(".product-image")

  // Loading indicator elements
  const loaderContainer = document.createElement("div")
  loaderContainer.className = "loader-container"
  const loader = document.createElement("svg")
  loader.className = "loader"
  loader.innerHTML = '<circle cx="20" cy="20" r="15"></circle>'
  loaderContainer.appendChild(loader)
  document.querySelector(".product-image").appendChild(loaderContainer)

  let currentIndex = 0
  let intervalId
  const autoChangeInterval = 5000 // 5 seconds

  function updateActiveState(options, clickedOption) {
    options.forEach((option) => option.classList.remove("active"))
    clickedOption.classList.add("active")
  }

  function changeImage(index, direction = "right") {
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
  }

  function startAutoChange() {
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
    loader.style.animation = "none"
    void loader.offsetWidth // Trigger reflow
    loader.style.animation = `fill ${autoChangeInterval / 1000}s linear forwards`
  }

  colorOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
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
      updateActiveState(sizeOptions, option)
    })
  })

  // Start the auto-changing and loader after initial animations
  setTimeout(() => {
    startAutoChange()
    resetLoader()
  }, 3000) // Wait for 3 seconds after page load to allow all animations to complete
})

document.addEventListener("DOMContentLoaded", () => {
  const wishlistButtons = document.querySelectorAll(".wishlist-icon i, .quick-buttons .bi-suit-heart")
  const cartButtons = document.querySelectorAll(".quick-buttons .bi-bag")
  const wishlistCounts = document.querySelectorAll(".wishlist-count")
  const cartCounts = document.querySelectorAll(".cart-count")

  let wishlistItems = 0
  let cartItems = 0
  const wishlist = new Set()
  const cart = new Set()

  function updateButtonState(button, isActive, addText, removeText) {
    button.classList.toggle("active-wishlist", isActive)
    button.setAttribute("data-tooltip", isActive ? removeText : addText)
  }

  function updateCounts(countElements, count) {
    countElements.forEach((element) => {
      element.textContent = count
      element.style.display = count > 0 ? "inline-block" : "none"
    })
  }

  function updateWishlistIcon(productId, isActive) {
    const icons = document.querySelectorAll(
      `.wishlist-icon i[data-product-id="${productId}"], .quick-buttons .bi-suit-heart[data-product-id="${productId}"]`,
    )
    icons.forEach((icon) => {
      icon.classList.toggle("active-wishlist", isActive)
    })
  }

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

      updateButtonState(button, isActive, "Add to Wishlist", "Remove from Wishlist")
      updateWishlistIcon(productId, isActive)
      updateCounts(wishlistCounts, wishlistItems)
    })
  })

  cartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const productId = button.getAttribute("data-product-id")
      const isActive = !cart.has(productId)

      if (isActive) {
        cart.add(productId)
        cartItems++
      } else {
        cart.delete(productId)
        cartItems--
      }

      updateButtonState(button, isActive, "Add to Cart", "Remove from Cart")
      updateCounts(cartCounts, cartItems)
    })
  })

  // Initialize counts
  updateCounts(wishlistCounts, wishlistItems)
  updateCounts(cartCounts, cartItems)
})



