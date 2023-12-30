// Sign Up Page Logic
let uName = document.querySelector("#sign-name");
let uNameRegEx = /^[a-zA-Z0-9_\- ]{3,15}$/;
let uEmailSU = document.querySelector("#sign-email");
let uEmailRegEx = /^[a-zA-Z0-9_]{3,18}@[a-z]{2,5}\.[a-zA-Z]{2,3}$/;
let uPassSU = document.querySelector("#sign-pass");
let uPassRegEx = /^(?=.*[a-z])(?=.*[0-9])(?=.*[@#!\$&?])[a-zA-Z0-9@#!\$&?]{6,15}$/;
let existMess = document.querySelector("#exist");
let notExist = document.querySelector("#notExist")
let usersData = [];
if (localStorage.getItem("users") !== null) {
    usersData = JSON.parse(localStorage.getItem("users"));
}
function signUpData() {
    let usersObj = {
        userName: uName.value,
        userEmail: uEmailSU.value,
        userPass: uPassSU.value,
    };

    if (!uNameRegEx.test(uName.value) || uName.value.length == 0) {
        document.querySelector("#SUname").classList.remove('d-none');
        document.querySelector("#SUemail").classList.add('d-none');
        document.querySelector("#SUpass").classList.add('d-none');
    } else if (!uEmailRegEx.test(uEmailSU.value) || uEmailSU.value.length == 0) {
        document.querySelector("#SUemail").classList.remove('d-none');
        document.querySelector("#SUname").classList.add('d-none');
        document.querySelector("#SUpass").classList.add('d-none');
    } else if (!uPassRegEx.test(uPassSU.value) || uPassSU.value.length == 0) {
        document.querySelector("#SUpass").classList.remove('d-none');
        document.querySelector("#SUemail").classList.add('d-none');
        document.querySelector("#SUname").classList.add('d-none');
    } else {
        let emailExists = usersData.some(
            (user) => user.userEmail === uEmailSU.value
        );

        if (emailExists) {
            existMess.classList.remove('d-none');
        } else {
            existMess.classList.add('d-none');
            usersData.push(usersObj);
            localStorage.setItem("users", JSON.stringify(usersData));
            clr();
            location.href = "index.html";
        }
    }
}

document.querySelector("#signUpBtn")?.addEventListener("click", signUpData)
function clr() {
    uName.value = "";
    uEmailSU.value = "";
    uPassSU.value = "";
}
// End Of Sign Up Page Logic
//====================================
//====================================
//====================================
//Log In / Home Page Logic
let uEmailLI = document.querySelector("#log-email");
let uPassLI = document.querySelector("#log-pass");


document.querySelector("#logInBtn")?.addEventListener("click", () => {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].userEmail == uEmailLI.value && usersData[i].userPass == uPassLI.value) {
            let newUser = usersData[i].userName;
            localStorage.setItem("New_user", newUser);
            localStorage.setItem("cache_site", "true")
            notExist.classList.add("d-none")
            location.href = "../home.html";
        } else {
            notExist.classList.remove("d-none")
        }
    }
})
if (localStorage.getItem("cache_site") == "true") {
    location.href = "../home.html";
}


uEmailLI?.addEventListener("change", () => {
    if (!uEmailRegEx.test(uEmailLI.value)) {
        document.querySelector("#keyUpValidateEmail").classList.remove("d-none")
        document.querySelector("#keyUpValidatePass").classList.add("d-none")
    }
})
uPassLI?.addEventListener("change", () => {
    if (!uPassRegEx.test(uPassLI.value)) {
        document.querySelector("#keyUpValidateEmail").classList.add("d-none")
        document.querySelector("#keyUpValidatePass").classList.remove("d-none")
    }
})
