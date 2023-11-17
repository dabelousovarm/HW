const full_name = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_2 = document.getElementById("password_2");
const form = document.getElementById("form");
const error_name = document.getElementById("error-name");
const error_email = document.getElementById("error-email");
const error_password = document.getElementById("error-password");
const error_password_2 = document.getElementById("error-password-2");
// const reg = /^(?=.*?[^A-Z0-9_])(?=.*?[A-Z])/i;
// const regDigit = /^(?=.*?[\d])(?=.*?[A-Z])/i;
// const regSymbols = /^(?=.*?[\W])(?=.*?[A-Z])/i;
const re = /^((?=.*?[^A-Z0-9])|(?=.*?[\d]))(?=.*?[A-Z])/i;
const sp = /\s+/;
const remail = /^[a-zA-Z]{3}@{1}[a-zA-Z]{3}\.[a-zA-Z]{2}$/;

form.addEventListener("submit", (e) => {
  let cnt = 0;
  if (full_name.value.length == 0) {
    e.preventDefault();
    cnt++;
    error_name.innerText = "Поле обязательно для ввода";
    full_name.classList.add("registration__input-error");
  } else if (full_name.value.length > 150) {
    e.preventDefault();
    cnt++;
    error_name.innerText = "Максимальный размер строки 150 символов";
    full_name.classList.add("registration__input-error");
  } else if (full_name.classList.contains("registration__input-error")) {
    full_name.classList.remove("registration__input-error");
    error_name.innerText = "";
  }

  if (email.value.length == 0) {
    e.preventDefault();
    cnt++;
    error_email.innerText = "Поле обязательно для ввода";
    email.classList.add("registration__input-error");
  } else if (email.value.length > 100) {
    e.preventDefault();
    cnt++;
    error_email.innerText = "Максимальный размер строки 100 символов";
    email.classList.add("registration__input-error");
  } else if (!remail.test(email.value)) {
    error_email.innerText =
      "Введите email в формате xxx@xxx.xx (x - буква латинского алфавита)";
    email.classList.add("registration__input-error");
  } else if (email.classList.contains("registration__input-error")) {
    email.classList.remove("registration__input-error");
    error_email.innerText = "";
  }

  if (password.value.length == 0) {
    e.preventDefault();
    cnt++;
    error_password.innerText = "Поле обязательно для ввода";
    password.classList.add("registration__input-error");
  } else if (password.value.length > 30 || password.value.length < 8) {
    e.preventDefault();
    cnt++;
    error_password.innerText = "Пароль должен содержать от 8 до 30 символов";
    password.classList.add("registration__input-error");
  } else if (sp.test(password.value)) {
    error_password.innerText = "Пароль не должен содержать пробелов";
    password.classList.add("registration__input-error");
  } else if (!re.test(password.value)) {
    e.preventDefault();
    cnt++;
    error_password.innerText =
      "В пароле должен быть минимум 1 небуквенный символ (“@”, “-”, “:” и тп)";
    password.classList.add("registration__input-error");
  } else if (password.classList.contains("registration__input-error")) {
    password.classList.remove("registration__input-error");
    error_password.innerText = "";
  }

  if (password_2.value.length == 0) {
    e.preventDefault();
    cnt++;
    error_password_2.innerText = "Поле обязательно для ввода";
    password_2.classList.add("registration__input-error");
  } else if (password.value !== password_2.value) {
    e.preventDefault();
    cnt++;
    error_password_2.innerText = "Пароль должен совпадать с введенным выше";
    password_2.classList.add("registration__input-error");
  } else if (
    password.classList.contains("registration__input-error") &&
    password.value === password_2.value
  ) {
    error_password_2.innerText = error_password.innerText;
    password_2.classList.add("registration__input-error");
  } else if (password_2.classList.contains("registration__input-error")) {
    password_2.classList.remove("registration__input-error");
    error_password_2.innerText = "";
  }

  if (cnt === 0) {
    localStorage.setItem(full_name.value, password.value);
    localStorage.setItem(email.value, password.value);
  }

  // if (!re.test("dfg")) {
  //   error_password.innerText = "Нет цифр";
  // }
});

// password.addEventListener("keydown", function () {
//   if (event.keyCode === 8) {
//     if (password.classList.contains("registration__input-error")) {
//       password.classList.remove("registration__input-error");
//       error_password.innerText = "";
//     }
//   }
// });
