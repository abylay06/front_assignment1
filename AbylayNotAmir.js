
const form = document.getElementById("services-form");

if (form){
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        const contact = document.querySelector('input[name="contact"]:checked');

        let errors = [];

        if (name === "") {
            errors.push("Name is required.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Enter a valid email address.");
        }

        if (service === "") {
            errors.push("Please select a service.");
        }

        if (!contact) {
            errors.push("Please choose a contact method.");
        }

        if (message === "") {
            errors.push("Message is required.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Form validated successfully!");
        }
    });
}


const button = document.getElementById("sponsors-btn");
const sponsors = document.getElementById("sponsors");

if (button && sponsors){
    button.addEventListener("click", () => {
        sponsors.classList.toggle("open");
    });
}

const subscribeBtn = document.getElementById("subscribe-btn");
const closeBtn = document.getElementById("close-btn");
const popup = document.getElementById("popup");

if (subscribeBtn && closeBtn && popup) {
    subscribeBtn.addEventListener("click", () => {
        popup.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("open");
    });

    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.remove("open");
        }
    });
}

const colorBtn = document.getElementById("color-btn");

if (colorBtn) {
    colorBtn.addEventListener("click", () => {
        const colors = ["lightblue", "lightgreen", "lightyellow", "pink", "lavender"];

        const random = Math.floor(Math.random() * colors.length);

        document.body.style.backgroundColor = colors[random];
    });
}


const datetime = document.getElementById("datetime");

if (datetime) {
    function updateTime() {
        const now = new Date();

        datetime.textContent = now.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });
    }

    updateTime();
    setInterval(updateTime, 1000);
}
