const full_name = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_2 = document.getElementById("password_2"); // Название не самое удачно. Это passwordConfirmation. Не стоит использовать числа в названиях переменных (user, user_2 и тп). В переменной надо описать то, что из себя представляет переменная
const form = document.getElementById("form");
const error_name = document.getElementById("error-name"); // В JS принято использовать camelCase нотацию, вместо snake_case
const error_email = document.getElementById("error-email");
const error_password = document.getElementById("error-password");
const error_password_2 = document.getElementById("error-password-2");
const check_input = document.getElementById("check__input");
const error_checkbox = document.getElementById("error-checkbox");
const re = /^((?=.*?[^A-Z0-9])|(?=.*?[\d]))(?=.*?[A-Z])/i; // Над названиями стоит поработать
const sp = /\s+/;
const remail = /^[a-zA-Z]{3}@{1}[a-zA-Z]{3}\.[a-zA-Z]{2}$/; // Не совсем корректная регулярка. До @ не обязательно должно быть 3 символа (как и после). https://regexr.com/3e48o

form.addEventListener("submit", (e) => {
    let cnt = 0;
    // Функция обработчик слишком большая и делает слишком много, такого лучше не допускать поскольку это будет тяжело читать и тестировать.
    // Плюс очень миного копипасты, например .classList.add("registration__input-error") используется 12 раз, и отличается только тем, к какому элементу применяется. Если у тебя поменяется registration__input-error класс, тебе придется во всех 12 местах менять
    // Именно для этого и придумали функции. Создай функцию, вынеси туда всю копипасту и используй вместо копипасты.
    // Так же очень хорошей идей было бы вынести всяческие проверки в отдельные функции. Например, full_name.value.length == 0 можно вынести в функцию isFieldFilled,  .value.length > 150 - isValidMaxLength и тп.

    if (full_name.value.length == 0) { // Я говорил как работать со срваниванием в JS https://learn.javascript.ru/comparison#strogoe-sravnenie
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
        e.preventDefault();
        cnt++;
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
        e.preventDefault();
        cnt++;
        error_password.innerText = "Пароль не должен содержать пробелов";
        password.classList.add("registration__input-error");
    } else if (!re.test(password.value)) {
        e.preventDefault();
        cnt++;
        error_password.innerText =
            "В пароле должен быть минимум 1 небуквенный символ (цифра или “@”, “-”, “:” и тп) и минимум 1 буква";
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
        e.preventDefault();
        cnt++;
        error_password_2.innerText = error_password.innerText;
        password_2.classList.add("registration__input-error");
    } else if (password_2.classList.contains("registration__input-error")) {
        password_2.classList.remove("registration__input-error");
        error_password_2.innerText = "";
    }

    if (!check_input.checked) {
        e.preventDefault();
        cnt++;
        error_checkbox.innerText =
            "Вы обязаны подтвердить, что хотите зарегистрироваться";
    } else if (error_checkbox.value !== "") {
        error_checkbox.innerText = "";
    }

    if (cnt === 0) { // Я так понимаю это нужно для того, чтобы определить если ли как минимум одна ошибка в форме. Идея правильная. Но для этого можно использовать boolean переменную (isFormValid например). Если где-то будет ошибка, то она станет false
        localStorage.setItem(full_name.value, password.value);
        localStorage.setItem(email.value, password.value);
        const message = document.createElement("p");
        message.className = "wrapper__message";
        message.textContent = "Вы успешно зарегистрированы!";
        document.body.appendChild(message);
        form.style.display = "none";
        e.preventDefault();
    }
});
