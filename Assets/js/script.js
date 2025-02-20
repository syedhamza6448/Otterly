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
  
  