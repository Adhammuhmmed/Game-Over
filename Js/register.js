// ? =============> Global ===============>
  const mode = document.getElementById("mode");
const inputs = document.querySelectorAll("input");
const registerForm = document.getElementById("registerForm");
const btnRegister = document.getElementById("btnRegister");
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

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});

registerForm.addEventListener("input", function () {
  if (
    validName(inputs[0]) &&
    validName(inputs[1]) &&
    validEmail() &&
    validPassword() &&
    validAge()
  ) {
    isValid = true;
  } else {
    isValid = false;
  }
});
// ! =============> Functions ===============>
function setForm() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };
  register(user);
}

async function register(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signup`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const respons = await api.json();
  if (respons.message == "success") {
    location.href = "./index.html";
  } else {
    document.getElementById("msg").innerHTML = respons.errors.email.message;
  }
}

//  =============> Validation ===============>

function validName(input) {
  const regex =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validEmail() {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(inputs[2].value)) {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}

function validPassword() {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputs[3].value)) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function validAge() {
  const regex = /^([1-7][0-9]|80)$/;
  if (regex.test(inputs[4].value)) {
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}
