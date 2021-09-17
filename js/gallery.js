import galleryItems from './app.js'

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const imageToShowRef = modalRef.querySelector('.lightbox__image');
const overlayRef = modalRef.querySelector('.lightbox__overlay');

const imgArray = [];

galleryRef.insertAdjacentHTML('beforeend', getGalleryMarkup(galleryItems));

galleryRef.addEventListener('click', onGalleryClick);






function getElementMarkup({preview, original, description}) {
   return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}
function getGalleryMarkup(elements) {
    return elements.map(element => {
        imgArray.push(element.original);
        return getElementMarkup(element);
    }).join('');
}
console.log(imgArray);
function onGalleryClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    openModal();
    openCurrentImage(e.target.dataset.source);
}
function openModal() {
    modalRef.classList.add('is-open');
    closeBtnRef.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', onOverlayClick);
    window.addEventListener('keydown', onKeyPush);
}
function closeModal() {
    modalRef.classList.remove('is-open');
    imageToShowRef.src = '';
    closeBtnRef.removeEventListener('click', closeModal);
    overlayRef.removeEventListener('click', onOverlayClick);
    window.removeEventListener('keydown', onKeyPush);
}
function openCurrentImage(currentSrc) {
    imageToShowRef.src = currentSrc;
}
function onOverlayClick() {
    closeModal();
}
function onKeyPush(e) {
    if (e.code === 'Escape') {
        closeModal();
    }
    if (e.code === 'ArrowLeft') {
        pressLeft();
    }else if (e.code === 'ArrowRight') {
        pressRight();   
    }
}
function pressLeft() {
    let currentImgIndex = imgArray.indexOf(imageToShowRef.src);   
    let nextImgIndex = --currentImgIndex;
    if (nextImgIndex === -1) {
        nextImgIndex = imgArray.length - 1;
    } 
    imageToShowRef.src = imgArray[nextImgIndex];
}
function pressRight() {
    let currentImgIndex = imgArray.indexOf(imageToShowRef.src);      
    let nextImgIndex = ++currentImgIndex;
    if (nextImgIndex === imgArray.length) {
        nextImgIndex = 0;
    } 
    imageToShowRef.src = imgArray[nextImgIndex];
}