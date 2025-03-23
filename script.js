// Initialize EmailJS (ensure this is done before using EmailJS)
emailjs.init("_PSlmVL5WjMgyj3zX");

// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function () {
    // ScrollReveal Animations
    ScrollReveal().reveal(".hero, .about, .services, .portfolio, .testimonials, .contact", {
        delay: 500,
        distance: "50px",
        origin: "bottom",
        duration: 1000,
        easing: "ease-in-out",
        reset: false // Prevents re-triggering on scroll
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", navLinks.classList.contains("active"));
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Business Audit Modal Functions
    const auditModal = document.getElementById("auditModal");
    const auditForm = document.getElementById("auditForm");
    const auditResult = document.getElementById("auditResult");

    function openAuditTool() {
        if (auditModal) {
            auditModal.style.display = "flex";
        }
    }

    function closeAuditTool() {
        if (auditModal) {
            auditModal.style.display = "none";
            auditForm.reset(); // Reset form on close
            auditResult.innerHTML = ""; // Clear previous results
        }
    }
    
    function closeAuditTool() {
        document.getElementById('auditModal').style.display = 'none';
    }

    // Optional: Open the modal (if triggered by a button)
    function openAuditTool() {
        document.getElementById('auditModal').style.display = 'flex';
    }


    // Expose functions to global scope for HTML onclick events
    window.openAuditTool = openAuditTool;
    window.closeAuditTool = closeAuditTool;

    // Calculate Business Audit Score
    if (auditForm) {
        auditForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let totalScore = 0;
            const answers = document.querySelectorAll("#auditForm select");

            answers.forEach(answer => {
                totalScore += parseInt(answer.value);
            });

            const scoreOutOf5 = totalScore / answers.length;

            if (scoreOutOf5 === 5) {
                auditResult.innerHTML = `
                    <h3>Your Score: ${scoreOutOf5.toFixed(1)}/5</h3>
                    <p>Congratulations! Your business is performing exceptionally well.</p>
                `;
            } else {
                const emailSubject = "My business needs help";
                const emailBody = `Hello, my business scored ${scoreOutOf5.toFixed(1)}/5 on the Business Audit Tool. I need assistance improving my online presence.`;
                const emailLink = `mailto:daviebirrell28@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                auditResult.innerHTML = `
                    <h3>Your Score: ${scoreOutOf5.toFixed(1)}/5</h3>
                    <p>We can help you improve your business's online presence.</p>
                    <a href="${emailLink}" class="green-btn">Contact Us</a>
                `;
            }
        });
    }

    // Contact Form - EmailJS Integration
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            emailjs.sendForm("service_5f04hcr", "template_m7hkszj", this, "_PSlmVL5WjMgyj3zX")
                .then(response => {
                    alert("✅ Your message has been sent successfully!");
                    this.reset();
                })
                .catch(error => {
                    alert("❌ Failed to send message. Please try again.");
                });
        });
    });

    // Portfolio Carousel Navigation
    const carousel = document.querySelector(".portfolio-carousel");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const scrollAmount = 320; // Matches image width (300px) + gap (20px)

    if (carousel && leftArrow && rightArrow) {
        // Reset animation for infinite loop
        carousel.addEventListener("animationiteration", () => {
            carousel.style.animation = "none";
            void carousel.offsetWidth; // Trigger reflow
            carousel.style.animation = "scroll 20s linear infinite";
        });

        // Arrow navigation
        leftArrow.addEventListener("click", () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        rightArrow.addEventListener("click", () => {
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        // Keyboard navigation for accessibility
        leftArrow.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            }
        });

        rightArrow.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".portfolio-carousel");
    carousel.innerHTML += carousel.innerHTML; // Duplicate items for seamless loop
});