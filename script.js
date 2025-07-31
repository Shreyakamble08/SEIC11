// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")

      // Toggle hamburger icon
      const icon = mobileMenuBtn.querySelector("svg")
      if (mobileMenu.classList.contains("hidden")) {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>'
      } else {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
      }
    })
  }

  // Contact form functionality
  const contactForm = document.getElementById("contact-form")
  const successMessage = document.getElementById("success-message")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const firstName = formData.get("firstName")
      const lastName = formData.get("lastName")
      const email = formData.get("email")
      const message = formData.get("message")
      const privacy = formData.get("privacy")

      // Basic validation
      if (!firstName || !lastName || !email || !message || !privacy) {
        alert("Please fill in all required fields and accept the privacy policy.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = "none"
        if (successMessage) {
          successMessage.classList.remove("hidden")
        }

        // Reset form after showing success
        setTimeout(() => {
          contactForm.reset()
          contactForm.style.display = "block"
          if (successMessage) {
            successMessage.classList.add("hidden")
          }
          submitButton.textContent = originalText
          submitButton.disabled = false
        }, 3000)
      }, 1500)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add("hidden")
        const icon = mobileMenuBtn.querySelector("svg")
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>'
      }
    }
  })
})

// Mobile dropdown toggle function
function toggleMobileDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId)
  if (dropdown) {
    dropdown.classList.toggle("hidden")

    // Toggle arrow icon
    const button = dropdown.previousElementSibling
    const arrow = button.querySelector("svg")
    if (dropdown.classList.contains("hidden")) {
      arrow.style.transform = "rotate(0deg)"
    } else {
      arrow.style.transform = "rotate(180deg)"
    }
  }
}

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("shadow-lg")
    } else {
      header.classList.remove("shadow-lg")
    }
  }
})

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ""))
}

// Add loading animation for buttons
function addLoadingState(button, originalText = "Submit") {
  button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
    `
  button.disabled = true
}

function removeLoadingState(button, originalText = "Submit") {
  button.textContent = originalText
  button.disabled = false
}

// Initialize tooltips and other interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".hover\\:shadow-lg")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Add fade-in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })
})

//banner slider
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const dots = document.querySelectorAll('.dot');
  const slidesCount = document.querySelectorAll('#slider > div').length;
  let currentIndex = 0;
  let autoSlideInterval;

  // Initialize slider
  function initSlider() {
    if (!slider || dots.length === 0) {
      console.error('Slider elements not found!');
      return;
    }

    // Set initial state
    updateSlider(0);
    startAutoSlide();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
  }

  // Update slider position and dot states
  function updateSlider(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dot states
    dots.forEach((dot, i) => {
      dot.classList.toggle('opacity-100', i === currentIndex);
      dot.classList.toggle('opacity-50', i !== currentIndex);
    });
  }

  // Auto slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slidesCount;
      updateSlider(currentIndex);
    }, 5000); // Increased to 5s for better UX
  }

  // Reset auto slide timer on interaction
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Handle window resize
  function handleResize() {
    // Immediately update slider position on resize
    updateSlider(currentIndex);
  }

  // Dot click event handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const newIndex = parseInt(dot.dataset.index);
      if (newIndex !== currentIndex) {
        updateSlider(newIndex);
        resetAutoSlide();
      }
    });
  });

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      updateSlider((currentIndex + 1) % slidesCount);
      resetAutoSlide();
    } else if (e.key === 'ArrowLeft') {
      updateSlider((currentIndex - 1 + slidesCount) % slidesCount);
      resetAutoSlide();
    }
  });

  // Initialize the slider
  initSlider();
});

 AOS.init();