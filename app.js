const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context 는 canvas 안에서 픽셀을 다루는 것
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //선의 초기 색상
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 픽셀 크기

let painting = false;
let filling = false;

function stopPainting() {
  //마우스가 캔버스 밖으로 나갔을 때
  painting = false;
}

function startPainting() {
  //마우스를 클릭했을 때
  painting = true;
}

function onMouseMove(event) {
  //마우스 움직이는 것을 감지했을 때
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //클릭하지 않고 canvas위에만 있을 때(painting 하지 않을 때)
    ctx.beginPath(); //path 시작
    ctx.moveTo(x, y);
  } else {
    //클릭하고 움직일 때(painting  할 때)
    ctx.lineTo(x, y); //line 만들기 시작
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  //마우스를 클릭 후 땠을 때
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs[😎]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직이는 것을 감지
  canvas.addEventListener("mousedown", startPainting); //마우스를 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", onMouseUp); //마우스를 클릭 후 땠을 때 발생하는 이벤트
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
