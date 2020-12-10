const config = {
  isDrawing: false,
  hue: 0,
  lineJoin: 'round',
  lineCap: 'round',
  lineWidth: 50,
  canvasWidth: document.body.clientWidth,
  canvasHeight: document.body.clientHeight - 100,
  direction: true,
  lastX: 0,
  lastY: 0,
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
  btn.addEventListener('click', () => clearCanvas(ctx, canvas));
}

function draw(e, ctx) {
  if (!config.isDrawing) {
    return;
  } else {
    ctx.strokeStyle = `hsl(${config.hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(config.lastX, config.lastY);
    config.lastX = e.offsetX;
    config.lastY = e.offsetY;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.lineJoin = config.lineJoin;
    ctx.lineCap = config.lineCap;
    ctx.lineWidth = config.lineWidth;
    ++config.hue;
    if (config.hue === 360) {
      config.hue = 0;
    }

    if (config.lineWidth >= 50 || config.lineWidth <= 1) {
      config.direction = !config.direction;
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
  config.lastX = e.offsetX;
  config.lastY = e.offsetY;
}

function stopDrawing() {
  config.isDrawing = false;
}

function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
