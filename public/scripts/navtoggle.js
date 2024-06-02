const mobileToggle = document.querySelector(".mobile-toggle");
        const navLinks = document.querySelector(".nav-links");

        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
