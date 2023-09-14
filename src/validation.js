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

function isValid(inputElement) {
  if (inputElement.name === 'email') {
    return isValidEmail(inputElement.value);
  }
  if (inputElement.name === 'country') {
    return isValidCountry(inputElement.value);
  }
  if (inputElement.name === 'zip-code') {
    return isValidZIPCode(inputElement.value);
  }
  return false;
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

function displayFeedbackMsg(inputElement) {
  const feedbackMsg = inputElement.nextElementSibling;
  if (inputElement.name === 'email') {
    feedbackMsg.innerHTML = getEmailFeedbackMsg(inputElement);
  }
  if (inputElement.name === 'country') {
    feedbackMsg.innerHTML = getCountryFeedbackMsg(inputElement);
  }
  if (inputElement.name === 'zip-code') {
    feedbackMsg.innerHTML = getZipCodeFeedbackMsg(inputElement);
  }
}

export { displayFeedbackBorder, displayFeedbackMsg };
