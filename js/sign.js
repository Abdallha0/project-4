const passVisableBtn = document.querySelector(".visable")
const passUnvisableBtn = document.querySelector(".unvisable")
const passInput = document.querySelector(".password-input")
const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")
const emailLabel = document.querySelector(".email-label")
const passwordLabel = document.querySelector(".password-label")
const fnameLabel = document.querySelector(".fname-label")
const lnameLabel = document.querySelector(".lname-label")
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!#$%&?]{8,20}$/;
const nameRegex = /^[a-zA-Z]{3,}$/;
const domain = "https://abdallha0.github.io/project-4"
// const domain = `${location.origin}`

passUnvisableBtn.addEventListener("click", () => {
    passInput.type = "text"
    passUnvisableBtn.classList.add("hidden");
    passVisableBtn.classList.remove("hidden")
})

passVisableBtn.addEventListener("click", () => {
    passInput.type = "password"
    passVisableBtn.classList.add("hidden");
    passUnvisableBtn.classList.remove("hidden")
});

function handleFormErrors(feildType, msg, e) {

    if (feildType === "email") {
        emailLabel.innerHTML = msg || "wrong in email";
        emailLabel.style.color = "red";

        e.target.email.addEventListener("input", () => {
            emailLabel.innerHTML = "Email";
            emailLabel.style.color = "#6a3e2d"
        })
    }
    if (feildType === "password") {
        passwordLabel.innerHTML = msg || "wrong in password";
        passwordLabel.style.color = "red";

        e.target.password.addEventListener("input", () => {
            passwordLabel.innerHTML = "Password";
            passwordLabel.style.color = "#6a3e2d"
        });
    }
    if (feildType === "fname" && fnameLabel) {
        fnameLabel.innerHTML = msg || "wrong in firstname";
        fnameLabel.style.color = "red";

        e.target.firstname.addEventListener("input", () => {
            fnameLabel.innerHTML = "FirstName";
            fnameLabel.style.color = "#6a3e2d"
        });
    }
    if (feildType === "lname" && lnameLabel) {
        lnameLabel.innerHTML = msg || "wrong in lastname";
        lnameLabel.style.color = "red";

        e.target.lastname.addEventListener("input", () => {
            lnameLabel.innerHTML = "LastName";
            lnameLabel.style.color = "#6a3e2d"
        });
    }
}

function formValidate(e, mode, email, password, fname, lname) {

    if (mode === "register") {
        if (fname) {
            if (!nameRegex.test(fname)) {
                handleFormErrors("fname", "firstname is invalid", e)
                return;
            }
        } else {
            handleFormErrors("fname", "firstname required", e)
            return;
        }

        if (lname) {
            if (!nameRegex.test(fname)) {
                handleFormErrors("lname", "lastname is invalid", e)
                return;
            }
        } else {
            handleFormErrors("lname", "lastname required", e)
            return;
        }

    }

    if (email) {
        if (!emailRegex.test(email)) {
            handleFormErrors("email", "Email is invalid", e)
            return;
        }
    } else {
        handleFormErrors("email", "Email required", e)
        return;
    }

    if (password) {
        if (password.length < 8 || password.length > 20) {
            handleFormErrors("password", "password length should be between 8 to 20", e)
            return;
        }

        if (!passwordRegex.test(password)) {
            handleFormErrors("password", "password must be contain number & letters", e)
            return;
        }
    } else {
        handleFormErrors("password", "password required", e)
        return;
    }

    return true;
}

function onRegister(e) {
    e.preventDefault();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value.trim();
    const firstName = e.target.firstname.value.trim();
    const lastName = e.target.lastname.value.trim();

    let validateRes = formValidate(e, "register", email, password, firstName, lastName)
    if (!validateRes) return;
    let newUser = {
        firstName,
        lastName,
        email,
        password,
    }
    const users = JSON.parse(localStorage.getItem("users"));

    if (!users) {
        localStorage.setItem("users", JSON.stringify([newUser]));
        localStorage.setItem("active-user", email)
        location.replace(domain + "/home/page.html")
        return;
    }

    const checkUser = users.find(i => i.email === email);
    if (checkUser) {
        handleFormErrors('email', "this email is already been used", e)
        return;
    }

    localStorage.setItem("users", JSON.stringify([newUser, ...users]))
    localStorage.setItem("active-user", email)
    location.replace(domain + "/home/page.html")

}

function onLogin(e) {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;
    let validateRes = formValidate(e, "login", email, password)

    if (!validateRes) return;
    const users = JSON.parse(localStorage.getItem("users"))

    if (!users) {
        location.assign(domain + "/registeration/page.html")
    }

    const checkUser = users.find(i => i.email === email && i.password === password);
    if (!checkUser) {
        handleFormErrors("email", "wrong email or passwrod", e)
        return;
    }

    localStorage.setItem("active-user", email)
    location.replace(domain + "/home/page.html")
}

if (loginForm) loginForm.onsubmit = (e) => onLogin(e)

if (registerForm) registerForm.onsubmit = (e) => onRegister(e)
