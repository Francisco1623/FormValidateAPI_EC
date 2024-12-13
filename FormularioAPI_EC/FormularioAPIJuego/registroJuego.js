
  // Seleccionar todos los inputs necesarios
const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirmPassword');
const fullNameEl = document.querySelector('#fullName');
const countryEl = document.querySelector('#country');
const termsEl = document.querySelector('[name="terms"]');
const dobEl = document.querySelector('#dob');
const genderEl = document.querySelector('#gender');
const preferencesEl = document.querySelector('#preferences');
const form = document.querySelector('#form_register');

// Validar si un campo es requerido
const isRequired = value => value.trim()=== '' ? false : true;

// Validar longitud de los campos
const isBetween = (length, min, max) => length < min || length > max ? false : true;
// Validar si el correo es válido
const isEmailValid = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validar si la contraseña es segura
const isPasswordSecure = password => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return re.test(password);
};

// Validar si la fecha de nacimiento es válida (mayor de 18 años)
const isAdult = dob => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
};

// Validar que al menos una preferencia esté seleccionada
const hasSelectedPreferences = options => {
  return Array.from(options.selectedOptions).length > 0;
};

// Mostrar mensaje de éxito
const showSuccess = input => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');
  const error = formField.querySelector('small');
  error.textContent = '';
  
};

// Mostrar mensaje de error
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');
  const error = formField.querySelector('small');
  error.textContent = message;
};

// Validar nombre completo
const checkFullName = () => {
  let valid = false;
  const min = 10, max = 70;
  const fullName = fullNameEl.value.trim();
  if (!isRequired(fullName)) {
    showError(fullNameEl, 'El nombre completo no puede estar en blanco.');
  }else if (!isBetween(fullName.length, min, max)) {
    showError(fullNameEl, `El nombre completo debe tener entre ${min} y ${max} caracteres.`);
  }else {
    showSuccess(fullNameEl);
    valid = true;
  }
  return valid;
};

// Validar nombre de usuario
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

// Validar correo electrónico
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

// Validar contraseña
const checkPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, 'La contraseña no puede estar en blanco.');
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, 'La contraseña debe tener al menos 8 caracteres que incluyan al menos 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial (!@#$%^&*).');
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
};

// Validar confirmación de contraseña
const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();
  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, 'Por favor, confirme su contraseña.');
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, 'Las contraseñas no coinciden.');
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};

// Validar país
const checkCountry = () => {
  let valid = false;
  const min = 3, max = 25;
  const country = countryEl.value.trim();
  if (!isRequired(country)) {
    showError(countryEl, 'El país de residencia no puede estar en blanco.');
  }else if (!isBetween(country.length, min, max)) {
    showError(countryEl, `El país debe tener entre ${min} y ${max} caracteres.`);
  } else {
    showSuccess(countryEl);
    valid = true;
  }
  return valid;
};

// Validar términos y condiciones
const checkTerms = () => {
  let valid = false;
  if (!termsEl.checked) {
    showError(termsEl, 'Debe aceptar los términos y condiciones.');
  } else {
    showSuccess(termsEl);
    valid = true;
  }
  return valid;
};

// Validar fecha de nacimiento
const checkDob = () => {
  let valid = false;
  const dob = dobEl.value.trim();
  if (!isRequired(dob)) {
    showError(dobEl, 'La fecha de nacimiento no puede estar en blanco.');
  } else if (!isAdult(dob)) {
    showError(dobEl, 'Debe ser mayor de 18 años.');
  } else {
    showSuccess(dobEl);
    valid = true;
  }
  return valid;
};

// Validar género
const checkGender = () => {
  let valid = false;
  const gender = genderEl.value;
  if (!isRequired(gender)) {
    showError(genderEl, 'Debe seleccionar un género.');
  } else {
    showSuccess(genderEl);
    valid = true;
  }
  return valid;
};

// Validar preferencias
const checkPreferences = () => {
  let valid = false;
  const preferences = preferencesEl.value;
  if (!hasSelectedPreferences(preferencesEl)) {
    showSuccess(preferencesEl, 'Debe seleccionar al menos una preferencia.');
  }else if(preferences === 'action'){
    showError(preferencesEl, 'No hay stock.');
  } else {
    showSuccess(preferencesEl);
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


// Manejar eventos del formulario
form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'fullName':
      checkFullName();
      break;
    case 'username':
      checkUsername();
      break;
    case 'email':
      checkEmail();
      break;
    case 'password':
      checkPassword();
      break;
    case 'confirmPassword':
      checkConfirmPassword();
      break;
    case 'country':
      checkCountry();
      break;
    case 'dob':
      checkDob();
      break;
    case 'gender':
      checkGender();
      break;
    case 'preferences':
      checkPreferences();
      break;
  }
}, 500));

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isFullNameValid = checkFullName(),
    isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword(),
    isCountryValid = checkCountry(),
    isTermsValid = checkTerms(),
    isDobValid = checkDob(),
    isGenderValid = checkGender(),
    isPreferencesValid = checkPreferences();

  let isFormValid = isFullNameValid && isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isCountryValid && isTermsValid && isDobValid && isGenderValid && isPreferencesValid;

  if (isFormValid) {
    fetch('http://localhost:3000/usuarios',{
      method:'POST',
      body:JSON.stringify({
          "fullName": fullNameEl.value,
          "username": usernameEl.value,
          "email": emailEl.value,
          "password": passwordEl.value,
          "preferences": preferencesEl.value,
          "dob": dobEl.value,
          "gender": genderEl.value,
          "country": countryEl.value,
          "terms": isTermsValid,
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