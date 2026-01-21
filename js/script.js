// ==== BURGER MENU (Animated) ====
const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".nav ul");

if (burger && navMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  // OPTIONAL: close menu when clicking a link
  document.querySelectorAll(".nav a").forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      burger.classList.remove("active");
    }),
  );
}

// ==== HEADER BACKGROUND CHANGE ====
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ==== SCROLL TO TOP ====
const scrollBtn = document.getElementById("scrollTop");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==== COOKIES ====
const cookieBar = document.querySelector(".cookie");
const acceptBtn = document.getElementById("acceptCookies");

if (acceptBtn) {
  acceptBtn.addEventListener("click", () => {
    cookieBar.style.display = "none";
    localStorage.setItem("cookiesAccepted", "yes");
  });
}

window.addEventListener("load", () => {
  if (localStorage.getItem("cookiesAccepted")) {
    if (cookieBar) cookieBar.style.display = "none";
  }
});

// ==== FETCH MENU ITEMS ====
const menuContainer = document.getElementById("menu-container");
if (menuContainer) {
  fetch("data/products.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">${item.price}</span>
        `;
        menuContainer.appendChild(div);
      });
    })
    .catch((err) => console.error("Error loading menu:", err));
}

// ==== FORM VALIDATION ====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageInput = document.getElementById("message");
  const showPass = document.getElementById("showPass");

  showPass.addEventListener("change", () => {
    passwordInput.type = showPass.checked ? "text" : "password";
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      nameInput.value.trim() === "" ||
      !emailRegex.test(emailInput.value) ||
      passwordInput.value.length < 6 ||
      messageInput.value.trim() === ""
    ) {
      alert("Please fill all fields correctly!");
      return;
    }

    alert("Message sent successfully!");
    contactForm.reset();
  });
}

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "👁️";
  }
});

const loginForm = document.getElementById("loginForm");

window.addEventListener("load", () => {
  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");

  if (savedUsername && savedPassword) {
    document.getElementById("username").value = savedUsername;
    document.getElementById("password").value = savedPassword;
    document.getElementById("rememberMe").checked = true;
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("rememberMe").checked;

  // Simple hardcoded credentials
  const correctUsername = "admin";
  const correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {
    if (remember) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    alert("Login successful!");
    // აქ შეგიძლია გვერდი გადამისამართო, ან უბრალოდ dashboard content აჩვენო
  } else {
    alert("Invalid username or password");
  }
});
