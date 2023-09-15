import goodBoy from './assets/whos-a-good-boy.gif';
import catMeme from './assets/yelling-at-cat.jpg';

function modalExist() {
  const targetModal = document.querySelector('.result-modal');
  return targetModal;
}

function createModal() {
  const markup = `
  <dialog class="result-modal">
    <form class="result-form" method="dialog">
      <h2 class="result-message"></h2>
      <input type="image" class="result-image">
    </form>
  </dialog>
  `;

  const modal = new DOMParser()
    .parseFromString(markup, 'text/html')
    .querySelector('.result-modal');

  return modal;
}

function fillResultMsg(result) {
  const resultMsg = document.querySelector('.result-message');
  if (result === 'success') {
    resultMsg.textContent = 'All is well and the form is submitted';
    resultMsg.classList.add('success');
    resultMsg.classList.remove('error');
  } else if (result === 'error') {
    resultMsg.textContent =
      'Cannot submit form due to errors or missing values';
    resultMsg.classList.remove('success');
    resultMsg.classList.add('error');
  }
}

function fillResultImg(result) {
  const resultImg = document.querySelector('.result-image');
  if (result === 'success') {
    resultImg.src = goodBoy;
  } else if (result === 'error') {
    resultImg.src = catMeme;
  }
}

function initModalEventListeners(modal) {
  modal.addEventListener('click', (e) => {
    if (e.target.nodeName === 'DIALOG') {
      modal.close();
    }
  });
  return modal;
}

function showModal(result) {
  let resultModal;
  if (modalExist()) {
    resultModal = document.querySelector('.result-modal');
  } else {
    resultModal = createModal();
    initModalEventListeners(resultModal);
    document.body.appendChild(resultModal);
  }
  fillResultMsg(result);
  fillResultImg(result);
  resultModal.showModal();
}

export default showModal;
