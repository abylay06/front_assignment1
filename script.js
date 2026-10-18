
const servicesForm = document.getElementById("services-form");
if (servicesForm) {
    servicesForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const contact = document.querySelector('input[name="contact"]:checked');
        const message = document.getElementById("message").value.trim();
        
        let errors = [];

        if (name === "") errors.push("Name is required.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
        if (service === "") errors.push("Please select a service.");
        if (!contact) errors.push("Please choose a contact method.");
        if (message === "") errors.push("Message is required.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Form validated successfully!");
            servicesForm.reset();
        }
    });
}

const validationForm = document.getElementById('validationForm');
if (validationForm) {
    validationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        let errors = [];

        if (name === "") errors.push("Name is required.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
        if (password.length < 8) errors.push("Password must be at least 8 characters.");
        if (password !== confirmPassword || confirmPassword === '') errors.push("Passwords do not match.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Testimonial submitted successfully!");
            validationForm.reset();
        }
    });
}

const sponsorsBtn = document.getElementById("sponsors-btn");
const sponsors = document.getElementById("sponsors");
if (sponsorsBtn && sponsors) {
    sponsorsBtn.addEventListener("click", () => sponsors.classList.toggle("open"));
}

const faqQuestions = document.querySelectorAll('.faq-question');
for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        if (answer.classList.contains('open')) {
            answer.classList.remove('open');
            if(icon) icon.textContent = '+';
        } else {
            answer.classList.add('open');
            if(icon) icon.textContent = '−';
        }
    });
}

const subscribeBtn = document.getElementById("subscribe-btn");
const closeBtn = document.getElementById("close-btn");
const popup = document.getElementById("popup");

if (subscribeBtn && closeBtn && popup) {
    subscribeBtn.addEventListener("click", () => popup.classList.add("open"));
    closeBtn.addEventListener("click", () => popup.classList.remove("open"));
    popup.addEventListener("click", (event) => {
        if (event.target === popup) popup.classList.remove("open");
    });
}

const popupForm = document.querySelector('#popup form');
if (popupForm) {
    popupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for subscribing!');
        popupForm.reset();
        if (popup) popup.classList.remove("open");
    });
}

const colorBtn = document.getElementById("color-btn");
if (colorBtn) {
    colorBtn.addEventListener("click", () => {
        const colors = ["lightblue", "lightgreen", "lightyellow", "pink", "lavender"];
        const random = Math.floor(Math.random() * colors.length);
        document.body.classList.remove('bg-light'); 
        document.body.style.backgroundColor = colors[random];
    });
}

const datetime = document.getElementById("datetime");
if (datetime) {
    function updateTime() {
        const now = new Date();
        datetime.textContent = now.toLocaleString("en-US", {
            month: "long", day: "numeric", year: "numeric",
            hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true
        });
    }
    updateTime();
    setInterval(updateTime, 1000);
}
