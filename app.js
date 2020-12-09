document.addEventListener('DOMContentLoaded', init);

function init() {
  const canvas = document.querySelector('.canvas');
  canvas.width = config.width;
  canvas.height = config.height;
  const ctx = canvas.getContext('2d');

  canvas.addEventListener('mousemove', (e) => draw(e, ctx));
  //   canvas.addEventListener('mouseout', stopDrawing);
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', stopDrawing);
}

const config = {
  isDrawing: false,
  hue: `hsl(0,100%,50%)`,
  lastX: 'offsetX',
  lastY: 'offsetY',
  lineJoin: 'round',
  lineCap: 'round',
  lineWidth: 10,
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
};

function draw(e, ctx) {
  if (!config.isDrawing) return;

  ctx.beginPath(e.config.lastX, e.config.lastY);
  ctx.stroke();
  ctx.lineTo(e.config.lastX, e.config.lastY);
  ctx.lineJoin = config.lineJoin;
  ctx.lineCap = config.lineCap;
  ctx.lineWidth = config.lineWidth;
}

function startPosition() {
  config.isDrawing = true;
}

function stopDrawing() {
  config.isDrawing = false;
}
