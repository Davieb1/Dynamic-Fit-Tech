document.addEventListener("DOMContentLoaded", function () {
    ScrollReveal().reveal(".hero, .about, .services, .portfolio, .portfolio-carousel, .testimonials, .contact, .faq", {
        delay: 500,
        distance: "50px",
        origin: "bottom",
        duration: 1000,
    });
});

// Business Audit Modal
function openAuditTool() {
    document.getElementById("auditModal").style.display = "flex";
}
function closeAuditTool() {
    document.getElementById("auditModal").style.display = "none";
}

// Business Audit Tool Modal Functions
function openAuditTool() {
    document.getElementById("auditModal").style.display = "flex";
}

function closeAuditTool() {
    document.getElementById("auditModal").style.display = "none";
}

// Calculate Business Audit Score
document.getElementById("auditForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let totalScore = 0;
    let answers = document.querySelectorAll("#auditForm select");

    answers.forEach(answer => {
        totalScore += parseInt(answer.value);
    });

    let scoreOutOf5 = totalScore / answers.length;
    let resultContainer = document.getElementById("auditResult");

    if (scoreOutOf5 === 5) {
        resultContainer.innerHTML = `<h3>Your Score: ${scoreOutOf5}/5</h3>
<p>How can you improve?</p>`;
    } else {
        let emailSubject = "My business needs help";
        let emailBody = `Hello, my business scored ${scoreOutOf5}/5 on the Business Audit Tool. I need assistance improving my online presence.`;
        let emailLink = `mailto:daviebirrell28@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        resultContainer.innerHTML = `<h3>Your Score: ${scoreOutOf5}/5</h3>
<p>Please contact us for help improving your business.</p>
<a href="${emailLink}" class="green-btn">Contact Us</a>`;
    }
});


// Contact Form - EmailJS Integration
function sendEmail(event) {
    event.preventDefault();
    emailjs.sendForm("service_5f04hcr", "template_8s7nkje", event.target, "_PSlmVL5WjMgyj3zX")
        .then(response => {
            alert("✅ Your message has been sent successfully!");
            event.target.reset();
        })
        .catch(error => {
            alert("❌ Failed to send message. Please try again.");
        });
}
document.getElementById("contactForm").addEventListener("submit", sendEmail);


// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});

