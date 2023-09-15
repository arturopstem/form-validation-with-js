import eye from './assets/eye.svg';
import eyeSlash from './assets/eye-slash.svg';

function getIcon(source) {
  const icon = new DOMParser().parseFromString(source, 'image/svg+xml');
  return icon.querySelector('svg');
}

function toggleIcon(btn) {
  const input = btn.parentElement.querySelector('input');
  btn.replaceChildren();
  if (input.type === 'password') {
    btn.appendChild(getIcon(eye));
  } else if (input.type === 'text') {
    btn.appendChild(getIcon(eyeSlash));
  }
}

function toggleInputType(btn) {
  const input = btn.parentElement.querySelector('input');
  if (input.type === 'password') {
    input.type = 'text';
  } else if (input.type === 'text') {
    input.type = 'password';
  }
}

function initBtnEvents(btn) {
  btn.addEventListener('click', (e) => {
    toggleIcon(e.target);
    toggleInputType(e.target);
  });
}

function initViewPasswordBtn(btn) {
  btn.appendChild(getIcon(eyeSlash));
  btn.setAttribute('data-icon', 'eye-slash');
  initBtnEvents(btn);
}

export default initViewPasswordBtn;
