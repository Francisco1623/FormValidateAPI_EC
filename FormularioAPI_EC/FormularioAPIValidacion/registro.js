
  //Coger todos los inputs
  const usernameEl = document.querySelector('#username');
  const emailEl = document.querySelector('#email');
  const passwordEl = document.querySelector('#password');
  const confirmPasswordEl = document.querySelector('#confirm-password');
  const form = document.querySelector('#signup');

  //validar que es requerido
  const isRequired = value => value === '' ? false : true;

  //validar longitud de campos
  const isBetween = (length, min, max) => length < min || length > max ? false : true;

  //es email válido?
  const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

//es seguro la contraseña?
  const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&*])(?=.{8,})");
    return re.test(password);
  };

  //ver mensaje de confirmacion
  const showSuccess = (input) => {
    // Obtener el elemento form-field
    const formField = input.parentElement;
    // Eliminar la clase de error
    formField.classList.remove('error');
    formField.classList.add('success');
    // Ocultar el mensaje de error
    const error = formField.querySelector('small');
    error.textContent = '';
  };

  //ver mensaje error
  const showError = (input, message) => {
    // Obtener el elemento form-field
    const formField = input.parentElement;
    // Agregar la clase de error
    formField.classList.remove('success');
    formField.classList.add('error');
    // Mostrar el mensaje de error
    const error = formField.querySelector('small');
    error.textContent = message;
  };






  //Validar usuario
  const checkUsername = () => {
    let valid = false;
    const min = 3, max = 25;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
      showError(usernameEl, 'El nombre de usuario no puede estar en blanco.');
    } else if (!isBetween(username.length, min, max)) {
      showError(usernameEl, `El nombre de usuario debe tener entre ${min} y ${max} caracteres.`);
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };
  
    //Validar email
  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, 'El correo electrónico no puede estar en blanco.');
    } else if (!isEmailValid(email)) {
      showError(emailEl, 'El correo electrónico no es válido.');
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };
  
    //Validar contraseña
  const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
      showError(passwordEl, 'La contraseña no puede estar en blanco.');
    } else if (!isPasswordSecure(password)) {
      showError(passwordEl, 'La contraseña debe tener al menos 8 caracteres que incluyan al menos 1 carácter en minúsculas, 1 carácter en mayúsculas, 1 número y 1 carácter especial en (!@#\$%\^&*).');
    } else {
      showSuccess(passwordEl);
      valid = true;
    }
    return valid;
  };
  
    //Validar confirmar contraseña
  const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if (!isRequired(confirmPassword)) {
      showError(confirmPasswordEl, 'Por favor, ingrese la contraseña nuevamente.');
    } else if (password !== confirmPassword) {
      showError(confirmPasswordEl, 'La contraseña de confirmación no coincide.');
    } else {
      showSuccess(confirmPasswordEl);
      valid = true;
    }
    return valid;
  };

  const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      // Cancelar el temporizador anterior si existe
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Configurar un nuevo temporizador
      timeoutId = setTimeout(() => {
        fn.apply(null, args)
      }, delay);
    };
  };
  
  form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
      case 'username':
        checkUsername();
        break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
      case 'confirm-password':
        checkConfirmPassword();
        break;
    }
  }));
  
  //Envío formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPasswordValid = checkPassword(),
      isConfirmPasswordValid = checkConfirmPassword();
  
    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  
    if (isFormValid) {
      fetch('http://localhost:3000/usuarios',{
        method:'POST',
        body:JSON.stringify({
            "NombreDeUsuario": usernameEl.value,
            "CorreoElectronico": emailEl.value,
            "Contrasena": passwordEl.value,
        }),
        headers:{
          'Content-type':'application/server',
        }
    })
    .then(()=>{
      alert('Formulario enviado correctamente.');
      form.reset();
    })
    .catch(error=>alert("El formulario no se ha enviado por el siguiente error = "+ error));
    }
  });
    }
  });