const sliderWrapper = document.querySelector('.image-slider');
const dragHandle = document.querySelector('.drag-handle');
const leftImgWrapper = document.querySelector('.image-left');

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
}

function handleDrag(event) {
  if (event.x === 0) {
    return;
  }
  resize(event.clientX - sliderWrapper.offsetLeft);
}

function handleDragEnd(event) {
  event.target.classList.remove('dragging');
}

dragHandle.addEventListener('dragstart', handleDragStart);
dragHandle.addEventListener('drag', handleDrag);
dragHandle.addEventListener('dragend', handleDragEnd);

leftImgWrapper.style.width =
  dragHandle.offsetLeft + dragHandle.clientWidth + 'px';
