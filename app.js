const config = {
  isDrawing: false,
  hue: `hsl(0,100%,50%)`,
  lineJoin: 'round',
  lineCap: 'round',
  lineWidth: 10,
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
};

document.addEventListener('DOMContentLoaded', () => init());

function init() {
  const canvas = document.querySelector('.canvas');
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  const ctx = canvas.getContext('2d');

  canvas.addEventListener('mousemove', (e) => draw(e, ctx));
  //   canvas.addEventListener('mouseout', stopDrawing);
  canvas.addEventListener('mousedown', (e) => startPosition(e, ctx));
  canvas.addEventListener('mouseup', stopDrawing);
}

let lastX = 0;
let lastY = 0; //rysujemy kropeczki - problem z beginPath i X i Y

function draw(e, ctx) {
  if (!config.isDrawing) {
    return;
  } else {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    lastX = e.offsetX;
    lastY = e.offsetY; // tu problem
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.lineJoin = config.lineJoin;
    ctx.lineCap = config.lineCap;
    ctx.lineWidth = config.lineWidth;
  }
}

function startPosition(e, ctx) {
  config.isDrawing = true;
  // ctx.beginPath();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function stopDrawing() {
  config.isDrawing = false;
}
