function isValidEmail(rawEmail) {
  const emailRegExp =
    /^[a-z0-9](\.?[a-z0-9])*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  const email = rawEmail.trim();
  return emailRegExp.test(email);
}

function isValidCountry(rawCountry) {
  const countryRegExp = /^[a-zA-Z](( ?| {2,})[a-zA-Z])+$/;
  const country = rawCountry.trim();
  return countryRegExp.test(country);
}

function isValidZIPCode(rawZIPCode) {
  const zipRegExp = /^\d( *\d){2,4}$/;
  const zipCode = rawZIPCode.trim();
  return zipRegExp.test(zipCode);
}

function isValidPassword(password) {
  const number = /[0-9]/.test(password);
  const upperCase = /[A-Z]/.test(password);
  const lowerCase = /[a-z]/.test(password);
  const symbol = /[!-/:-@[-`{-~]/.test(password);
  const containsAtLeastOne = number && lowerCase && upperCase && symbol;
  const passwordRegExp = /^[ -~]{8,}$/;
  return passwordRegExp.test(password) && containsAtLeastOne;
}

function isValidPasswordConfirm(passwordConfirm) {
  const password = document.querySelector('input[name="password"]').value;
  const passwordValid = isValidPassword(password);
  const passwordConfirmValid = isValidPassword(passwordConfirm);
  return passwordConfirm === password && passwordConfirmValid && passwordValid;
}

function isValid(inputElement) {
  let validFunction;
  switch (inputElement.name) {
    case 'email':
      validFunction = isValidEmail;
      break;
    case 'country':
      validFunction = isValidCountry;
      break;
    case 'zip-code':
      validFunction = isValidZIPCode;
      break;
    case 'password':
      validFunction = isValidPassword;
      break;
    case 'password-confirm':
      validFunction = isValidPasswordConfirm;
      break;
    default:
  }
  return validFunction(inputElement.value);
}

function displayFeedbackBorder(inputElement) {
  if (isValid(inputElement)) {
    inputElement.classList.add('success');
    inputElement.classList.remove('error');
  } else {
    inputElement.classList.remove('success');
    inputElement.classList.add('error');
  }
}

function getEmailFeedbackMsg(inputElement) {
  const value = inputElement.value.trim();
  let msg = '';
  if (isValid(inputElement)) {
    msg = '✓ Valid e-mail address';
  } else {
    if (value.length === 0) {
      msg += '⨯ Input field is empty<br>';
    } else {
      msg += '⨯ Invalid e-mail address<br>';
    }
    msg += '⨯ Provide a valid address like mymail@server.com<br>';
    if (value.includes('@') && value.endsWith('.')) {
      msg += '⨯ Cannot end in a dot(.)<br>';
    }
    if (/\.{2,}/.test(value)) {
      msg += '⨯ Cannot contain consecutive dots(.., ...)<br>';
    }
  }
  return msg;
}

function getCountryFeedbackMsg(inputElement) {
  const value = inputElement.value.trim();
  let msg = '';
  if (isValid(inputElement)) {
    msg = '✓ Valid country name';
  } else {
    if (value.length === 0) {
      msg += '⨯ Input field is empty<br>';
    } else {
      msg += '⨯ Invalid country name<br>';
    }
    if (/[^a-zA-Z ]$/.test(value)) {
      msg += '⨯ Should contain only alphabet characters<br>';
    }
  }

  return msg;
}

function getZipCodeFeedbackMsg(inputElement) {
  const value = inputElement.value.trim();
  let msg = '';
  if (isValid(inputElement)) {
    msg = '✓ Valid ZIP code';
  } else {
    if (value.length === 0) {
      msg += '⨯ Input field is empty<br>';
    } else {
      msg += '⨯ Invalid ZIP code<br>';
    }
    msg += '⨯ Provide a valid ZIP code like 534, 6543 or 53899<br>';
    const number = value.replaceAll(' ', '');
    if ((number.length < 3 || number.length > 5) && number.length !== 0) {
      msg += '⨯ Should only contain 3 to 5 digits<br>';
    }
    if (value.startsWith('-')) {
      msg += '⨯ Cannot be a negative number<br>';
    }
  }
  return msg;
}

function getPasswordFeedbackMsg(inputElement) {
  const { value } = inputElement;
  let msg = '';
  if (isValid(inputElement)) {
    msg = '✓ Valid password';
  } else {
    if (value.length === 0) {
      msg += '⨯ Input field is empty<br>';
    } else {
      msg += '⨯ Invalid password<br>';
    }
    msg += '⨯ Provide a valid password, use standard ASCII characters only<br>';
    if (value.length < 8) {
      msg += '⨯ It should be at least 8 characters long<br>';
    } else {
      if (!/[0-9]/.test(value)) {
        msg += '⨯ It should contain at least one digit<br>';
      }
      if (!/[A-Z]/.test(value)) {
        msg += '⨯ It should contain at least one upper case letter<br>';
      }
      if (!/[a-z]/.test(value)) {
        msg += '⨯ It should contain at least one lower case letter<br>';
      }
      if (!/[!-/:-@[-`{-~]/.test(value)) {
        msg += '⨯ It should contain at least one symbol<br>';
      }
    }
  }
  return msg;
}

function getPasswordConfirmFeedbackMsg(inputElement) {
  const password = document.querySelector('input[name="password"]');
  const { value } = inputElement;
  let msg = '';
  if (!isValid(password)) {
    msg = '⨯ Enter a valid password first<br>';
  } else if (isValid(inputElement)) {
    msg = '✓ Password matches<br>';
  } else if (value.length === 0) {
    msg = '⨯ Input field is empty<br>';
  } else {
    msg = '⨯ It does not match the password<br>';
  }
  return msg;
}

function displayFeedbackMsg(inputElement) {
  const feedbackMsg = inputElement.nextElementSibling;
  let feedbackFunction;
  switch (inputElement.name) {
    case 'email':
      feedbackFunction = getEmailFeedbackMsg;
      break;
    case 'country':
      feedbackFunction = getCountryFeedbackMsg;
      break;
    case 'zip-code':
      feedbackFunction = getZipCodeFeedbackMsg;
      break;
    case 'password':
      feedbackFunction = getPasswordFeedbackMsg;
      break;
    case 'password-confirm':
      feedbackFunction = getPasswordConfirmFeedbackMsg;
      break;
    default:
  }
  feedbackMsg.innerHTML = feedbackFunction(inputElement);
}

function clearFeedback(inputElement) {
  const element = inputElement;
  element.value = '';
  element.classList.remove('success', 'error');
  const feedbackMsg = element.nextElementSibling;
  feedbackMsg.textContent = '';
}
export { displayFeedbackBorder, displayFeedbackMsg, clearFeedback };
