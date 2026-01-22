
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Функция для отображения ошибок
  function showError(inputName, message) {
    const errorElement = form.querySelector(`[data-error="${inputName}"]`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }

    // Добавляем красную рамку к инпуту
    const input = form.elements[inputName];
    if (input) {
      input.classList.add("border-red-500");
      input.classList.remove("border-gray-300");
    }
  }

  // Функция для скрытия ошибок
  function hideError(inputName) {
    const errorElement = form.querySelector(`[data-error="${inputName}"]`);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }

    // Убираем красную рамку
    const input = form.elements[inputName];
    if (input) {
      input.classList.remove("border-red-500");
      input.classList.add("border-gray-300");
    }
  }

  // Функция для сброса всех ошибок
  function resetErrors() {
    const allErrors = form.querySelectorAll('[data-error]');
    allErrors.forEach(errorElement => {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    });

    // Сбрасываем все красные рамки
    const allInputs = form.querySelectorAll('input, textarea');
    allInputs.forEach(input => {
      input.classList.remove("border-red-500");
      input.classList.add("border-gray-300");
    });
  }

  // Слушатели для скрытия ошибок при вводе
  form.addEventListener("input", (e) => {
    if (e.target.name) {
      hideError(e.target.name);
    }
  });

  // Основная обработка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Сбрасываем предыдущие ошибки
    resetErrors();

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const subject = form.elements["subject"].value.trim();
    const message = form.elements["message"].value.trim();

    let isValid = true;

    // --- ВАЛИДАЦИЯ ---
    if (!name) {
      showError("name", "Please enter your name");
      isValid = false;
    }

    if (!email) {
      showError("email", "Please enter your email address");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    if (!message) {
      showError("message", "Message cannot be empty");
      isValid = false;
    }

    if (!isValid) return;

    // Если все валидно - отправляем форму
    const data = { name, email, subject, message, company: form.elements["company"]?.value || "" };

    fetch("https://script.google.com/macros/s/AKfycbw-ktgeqzhDPYZQVufE5GZ_7ZdSojqxkzf-mV0walkXY02rplQvnox4v5kYjmkbXOLOGQ/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data)
    })
    .then(() => {
      form.reset();
      resetErrors();

      // Показываем сообщение об успехе
      const successMessage = document.getElementById("success-message") || createSuccessMessage();
      successMessage.classList.remove("hidden");
      successMessage.textContent = "Thank you! Your message has been sent.";

      // Скрываем сообщение через 5 секунд
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
    })
    .catch(error => {
      showError("message", "Failed to send message. Please try again later.");
    });
  });

  // Создаем элемент для сообщения об успехе, если его нет
  function createSuccessMessage() {
    const messageDiv = document.createElement("div");
    messageDiv.id = "success-message";
    messageDiv.className = "mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded hidden";
    form.appendChild(messageDiv);
    return messageDiv;
  }
});
