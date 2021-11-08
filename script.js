const sliderWrapper = document.querySelector('.image-slider');
const dragHandle = document.querySelector('.drag-handle');
const leftImgWrapper = document.querySelector('.image-left');

let isActive = false;

function changeHandlePosition(newPosition) {
  newPosition = newPosition - dragHandle.clientWidth / 2;
  dragHandle.style.transform = `translate(${newPosition}px, -50%)`;
}

function changeLeftImageWidth(newWidth) {
  leftImgWrapper.style.width = `${newWidth}px`;
}

function resize(x) {
  changeHandlePosition(x - dragHandle.clientWidth);
  changeLeftImageWidth(x);
}

function handleDragStart(event) {
  event.preventDefault();
  if (event.target === dragHandle) isActive = true;
}

function handleDrag(event) {
  event.preventDefault();
  if (!isActive) {
    return;
  }
  resize(event.clientX - sliderWrapper.offsetLeft);
}

function handleDragEnd(event) {
  isActive = false;
}

function init() {
  sliderWrapper.addEventListener('mousedown', handleDragStart);
  sliderWrapper.addEventListener('mousemove', handleDrag);
  sliderWrapper.addEventListener('mouseup', handleDragEnd);

  leftImgWrapper.style.width =
    dragHandle.offsetLeft + dragHandle.clientWidth + 'px';
}

init();
