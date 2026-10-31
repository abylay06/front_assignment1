
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

        if (!/^[A-Za-z ]+$/.test(name)) {errors.push("Enter a name using letters and spaces.");}
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
        if (service === "") errors.push("Please select a service.");
        if (!contact) errors.push("Please choose a contact method.");
        if (message === "") errors.push("Message is required.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            finwiseSubmit(servicesForm, "Contact form submitted successfully!");
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
            finwiseSubmit(validationForm, "Testimonial submitted successfully!");
        }
    });
}

const sponsorsBtn = document.getElementById("sponsors-btn");
const sponsors = document.getElementById("sponsors");
if (sponsorsBtn && sponsors) {
    sponsorsBtn.addEventListener("click", () => sponsors.classList.toggle("open"));
}

const timeBtn = document.getElementById("time-btn");
const timeSection = document.getElementById("time-section");

if (timeBtn && timeSection){
    timeBtn.addEventListener("click", ()=>{
        if (timeSection.classList.contains("show")){
            timeSection.classList.remove("show");
            timeBtn.textContent = "Show time";
        }
        else {
            timeSection.classList.add("show");
            timeBtn.textContent = "Hide time";
        }
    })
}

const optimusPrime = document.getElementById("optimus-prime")

if (optimusPrime){
    optimusPrime.addEventListener("click", ()=>{
        optimusPrime.classList.toggle("upper");
    })
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
            if(icon) icon.textContent = '-';
        }
    });
}

const toggleAll = document.getElementById("toggle-all")
const answers = document.getElementsByClassName("faq-answer")

if (toggleAll && answers)
    toggleAll.addEventListener("click", function(){

        for (let i = 0; i < answers.length; i++){
            if(answers[i].classList.contains("open")){
                answers[i].classList.remove("open");
                toggleAll.textContent = "+";
            }
            else {
                answers[i].classList.add("open");
                toggleAll.textContent = "-";
            }
        }
})

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
        finwiseToast('Thank you for subscribing!');
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

const links = document.querySelectorAll("#links a")

if (links){
    for (let i = 0; i < links.length; i++){
        links[i].addEventListener("keydown", (event)=>{
            if (event.key==="ArrowRight"){
                links[(i+1) % links.length].focus();
            }
            else if (event.key==="ArrowLeft"){
                links[(i-1 + links.length) % links.length].focus();
            }
        })
    }
}

const formSteps = Array.from(document.getElementsByClassName("form-step"))
const fromStepBack = document.getElementById("form-step-back")
const fromStepNext = document.getElementById("form-step-next")

if (formSteps && fromStepBack && fromStepNext){
    let currentActive = 0;
    
    function showCurrent(){
        formSteps.forEach((form, i) => {
            form.hidden = currentActive != i;
        })
    }
    fromStepBack.addEventListener("click", (event)=>{
        event.preventDefault();
        if (currentActive > 0){
            currentActive--;
            showCurrent();
        }
    })
    fromStepNext.addEventListener("click", (event)=>{
        event.preventDefault();
        if (currentActive < formSteps.length - 1){
            currentActive++;
            showCurrent();
        }
    })

}

const extraServices = Array.from(document.getElementsByClassName("extra-service"))
const extraServiceSelect = document.getElementById("extra-service-select")

if (extraServices && extraServiceSelect){
    function showService(targetIndex){
        extraServices.forEach((service, i )=> {
            service.hidden = i != targetIndex
        })
    }
    extraServiceSelect.addEventListener("change", ()=>{
        switch (extraServiceSelect.value){
        case ("Manners"):
            showService(0);
            break;
        case ("Literature"):
            showService(1);
            break;
        case ("Golf"):
            showService(2);
            break;
        default:
            extraServices.forEach(service => service.hidden = false)
        }
    })
    
}

const financeTips = {
    tips: ["Track your spending.", "Save regularly.", "Plan before buying."],

    show() {
        const index = Math.floor(Math.random() * this.tips.length)
        document.getElementById("finance-tip").textContent = this.tips[index]
    }
}

const tipBtn = document.getElementById("tip-btn")

if (tipBtn) {
    tipBtn.addEventListener("click", () => {
        financeTips.show()

        const audio = new AudioContext()
        const tone = audio.createOscillator()
        const volume = audio.createGain()

        volume.gain.value = 0.05
        tone.connect(volume)
        volume.connect(audio.destination)

        tone.start();
        tone.stop(audio.currentTime + 0.5)
        tone.onended = () => audio.close()
    })
}