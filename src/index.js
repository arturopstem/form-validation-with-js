import './index.css';
import {
  clearFeedback,
  displayFeedbackBorder,
  displayFeedbackMsg,
} from './validation';

const form = document.querySelector('.form');

form.addEventListener('input', (e) => {
  displayFeedbackBorder(e.target);
  displayFeedbackMsg(e.target);
  if (e.target.name === 'password') {
    const passwordConfirm = document.querySelector(
      'input[name="password-confirm"]',
    );
    clearFeedback(passwordConfirm);
  }
});

form.addEventListener('focusout', (e) => {
  if (e.target.nodeName === 'INPUT') {
    displayFeedbackBorder(e.target);
    displayFeedbackMsg(e.target);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputFields = form.querySelectorAll('.input-field');
  inputFields.forEach((inputField) => {
    displayFeedbackBorder(inputField);
    displayFeedbackMsg(inputField);
  });
});
