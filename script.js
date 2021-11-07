const sliderWrapper = document.querySelector('.image-slider');
const dragHandle = document.querySelector('.drag-handle');
const leftImgWrapper = document.querySelector('.image-left');

let isMousedown = false;

function sliderBetweenConstraints(newPosition) {
  newPosition += dragHandle.clientWidth; // Add draghandle element width to the newPosition.
  const maxLeft = sliderWrapper.clientLeft + dragHandle.clientWidth;
  const maxRight =
    sliderWrapper.clientLeft +
    sliderWrapper.clientWidth -
    dragHandle.clientWidth;
  console.log(newPosition, maxLeft, maxRight);
  if (newPosition <= maxLeft || newPosition >= maxRight) {
    return false;
  }
  return true;
}

function resize(x) {
  const newPosition = x - dragHandle.clientWidth;
  if (!sliderBetweenConstraints(newPosition)) {
    return;
  }
  // Move draghandle (x position)
  dragHandle.style.left = x - dragHandle.clientWidth + 'px';

  //Resize image (width)
  leftImgWrapper.style.width =
    dragHandle.offsetLeft + dragHandle.clientWidth + 'px';
}

function handleDragStart(event) {
  event.target.classList.add('dragging');
  isMousedown = true;
}

function handleDrag(event) {
  if (!isMousedown) {
    return;
  }
  resize(event.clientX - sliderWrapper.offsetLeft);
}

function handleDragEnd(event) {
  event.target.classList.remove('dragging');
  isMousedown = false;
}

dragHandle.addEventListener('mousedown', handleDragStart);
dragHandle.addEventListener('mousemove', handleDrag);
document.addEventListener('mouseup', handleDragEnd);

leftImgWrapper.style.width =
  dragHandle.offsetLeft + dragHandle.clientWidth + 'px';
