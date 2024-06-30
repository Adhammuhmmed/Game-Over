// ? =============> Global ===============>
const mode = document.getElementById("mode");
const inputs = document.querySelectorAll("input");
const loginForm = document.getElementById("loginForm");
const btnLogin = document.getElementById("btnLogin");
let isValid = false;

// ! =============> When Start ===============>

// * =============> Events ===============>

mode.addEventListener("click",function(){
  if(mode.classList.contains('fa-sun')){
    document.querySelector('html').setAttribute('data-theme','light')
    mode.classList.replace('fa-sun','fa-moon')
  } else {
    document.querySelector('html').setAttribute('data-theme','dark')
    mode.classList.replace('fa-moon','fa-sun')
  }
})

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});

loginForm.addEventListener("input", function () {
  if (validEmail() && validPassword()) {
    isValid = true;
  } else {
    isValid = false;
  }
});
// ! =============> Functions ===============>
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  register(user);
}

async function register(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const respons = await api.json();
  if (respons.message == "success") {
    location.href = "./home.html";
    localStorage.setItem("userToken", respons.token);
  } else {
    document.getElementById("msg").innerHTML = respons.message;
  }
}

//  =============> Validation ===============>

function validEmail() {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  } else {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    return false;
  }
}

function validPassword() {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputs[1].value)) {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true;
  } else {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    return false;
  }
}
