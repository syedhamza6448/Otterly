document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu")
    const mobileNavLinks = document.querySelector(".mobile-nav .nav-links")
    const header = document.querySelector("header")
    const shopDropdown = document.querySelector(".mobile-nav .shop-dropdown")
    const shopArrow = document.querySelector(".mobile-nav .shop-arrow")
  
    hamburgerMenu.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("active")
      mobileNavLinks.classList.toggle("active")
    })
  
    shopArrow.addEventListener("click", (e) => {
      e.preventDefault()
      shopDropdown.classList.toggle("active")
    })
  
    let lastScrollTop = 0
  
    window.addEventListener("scroll", () => {
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
      } else {
        header.classList.remove("scrolled")
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    })
  })
  
  