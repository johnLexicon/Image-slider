const sliderWrapper = document.querySelector('.image-slider');
const dragHandle = document.querySelector('.drag-handle');
const leftImgWrapper = document.querySelector('.image-left');
const svgLeft = document.querySelector('.drag-handle svg:first-child');
const svgRight = document.querySelector('.drag-handle svg:last-child');

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
  if (
    event.target === dragHandle ||
    event.target === svgLeft ||
    event.target === svgRight
  )
    isActive = true;
}

function handleDrag(event) {
  event.preventDefault();
  if (!isActive) {
    return;
  }
  let newPosition = null;
  if (event.type === 'touchmove') {
    newPosition = event.touches[0].clientX;
  } else {
    newPosition = event.clientX;
  }
  resize(newPosition - sliderWrapper.offsetLeft);
}

function handleDragEnd(event) {
  isActive = false;
}

function init() {
  sliderWrapper.addEventListener('mousedown', handleDragStart);
  sliderWrapper.addEventListener('mousemove', handleDrag);
  sliderWrapper.addEventListener('mouseup', handleDragEnd);

  sliderWrapper.addEventListener('touchstart', handleDragStart);
  sliderWrapper.addEventListener('touchmove', handleDrag);
  sliderWrapper.addEventListener('touchend', handleDragEnd);

  leftImgWrapper.style.width =
    dragHandle.offsetLeft + dragHandle.clientWidth + 'px';
}

init();
