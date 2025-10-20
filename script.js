// Получение элементов формы
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');

// Функция для отображения ошибки
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
    input.classList.add('error');
}

// Функция для очистки ошибки
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove('error');
}

// Валидация имени пользователя
function validateUsername() {
    const value = username.value.trim();

    if (value === '') {
        showError(username, 'Имя пользователя обязательно');
        return false;
    }

    if (value.length < 3) {
        showError(username, 'Имя должно содержать минимум 3 символа');
        return false;
    }

    if (value.length > 20) {
        showError(username, 'Имя не должно превышать 20 символов');
        return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        showError(username, 'Только буквы, цифры и подчеркивание');
        return false;
    }

    clearError(username);
    return true;
}

// Валидация email
function validateEmail() {
    const value = email.value.trim();

    if (value === '') {
        showError(email, 'Email обязателен');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showError(email, 'Введите корректный email');
        return false;
    }

    clearError(email);
    return true;
}

// Валидация пароля
function validatePassword() {
    const value = password.value;

    if (value === '') {
        showError(password, 'Пароль обязателен');
        return false;
    }

    if (value.length < 8) {
        showError(password, 'Пароль должен содержать минимум 8 символов');
        return false;
    }

    if (!/[A-Z]/.test(value)) {
        showError(password, 'Пароль должен содержать хотя бы одну заглавную букву');
        return false;
    }

    if (!/[a-z]/.test(value)) {
        showError(password, 'Пароль должен содержать хотя бы одну строчную букву');
        return false;
    }

    if (!/[0-9]/.test(value)) {
        showError(password, 'Пароль должен содержать хотя бы одну цифру');
        return false;
    }

    clearError(password);
    return true;
}

// Валидация подтверждения пароля
function validateConfirmPassword() {
    const value = confirmPassword.value;

    if (value === '') {
        showError(confirmPassword, 'Подтвердите пароль');
        return false;
    }

    if (value !== password.value) {
        showError(confirmPassword, 'Пароли не совпадают');
        return false;
    }

    clearError(confirmPassword);
    return true;
}

// Валидация согласия с условиями
function validateTerms() {
    if (!terms.checked) {
        showError(terms, 'Необходимо согласиться с условиями');
        return false;
    }

    clearError(terms);
    return true;
}

// Валидация в реальном времени
username.addEventListener('blur', validateUsername);
username.addEventListener('input', () => {
    if (username.classList.contains('error')) {
        validateUsername();
    }
});

email.addEventListener('blur', validateEmail);
email.addEventListener('input', () => {
    if (email.classList.contains('error')) {
        validateEmail();
    }
});

password.addEventListener('blur', validatePassword);
password.addEventListener('input', () => {
    if (password.classList.contains('error')) {
        validatePassword();
    }
    // Проверяем совпадение паролей при изменении пароля
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener('blur', validateConfirmPassword);
confirmPassword.addEventListener('input', () => {
    if (confirmPassword.classList.contains('error')) {
        validateConfirmPassword();
    }
});

terms.addEventListener('change', validateTerms);

// Обработка отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Валидация всех полей
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();

    // Если все поля валидны
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
        // Здесь можно добавить отправку данных на сервер
        alert('Регистрация успешна!\n\n' +
              `Имя пользователя: ${username.value}\n` +
              `Email: ${email.value}`);

        // Очистка формы
        form.reset();
    }
});
