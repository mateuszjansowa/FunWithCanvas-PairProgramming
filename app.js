const config = {
  isDrawing: false,
  hue: 0,
  lineJoin: 'round',
  lineCap: 'round',
  lineWidth: 1,
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
  direction: true,
};

document.addEventListener('DOMContentLoaded', () => init());

function init() {
  const canvas = document.querySelector('.canvas');
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  const ctx = canvas.getContext('2d');

  const btn = document.querySelector('.btn');

  canvas.addEventListener('mousemove', (e) => draw(e, ctx));
  canvas.addEventListener('mouseout', stopDrawing);
  canvas.addEventListener('mousedown', (e) => startPosition(e));
  canvas.addEventListener('mouseup', stopDrawing);
  btn.addEventListener('click', (ctx, canvas) => clearCanvas(ctx, canvas));
}

let lastX = 0;
let lastY = 0; //rysujemy kropeczki - problem z beginPath i X i Y

function draw(e, ctx) {
  if (!config.isDrawing) {
    return;
  } else {
    ctx.strokeStyle = `hsl(${config.hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    lastX = e.offsetX;
    lastY = e.offsetY;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.lineJoin = config.lineJoin;
    ctx.lineCap = config.lineCap;
    ctx.lineWidth = config.lineWidth;
    ++config.hue;
    if (config.hue === 360) {
      config.hue = 0;
    }
    if (config.lineWidth === 50) {
      config.direction = false;
    } else if (config.lineWidth === 1) {
      config.direction = true;
    }

    if (config.direction) {
      ++config.lineWidth;
    } else {
      --config.lineWidth;
    }
  }
}

function startPosition(e) {
  config.isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function stopDrawing() {
  config.isDrawing = false;
}

function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
