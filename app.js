const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  //context 는 canvas 안에서 픽셀을 다루는 것

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; //선의 초기 색상
ctx.linewidth = 2.5;    //선의 픽셀 크기

let painting = false;


function stopPainting(){ //마우스가 캔버스 밖으로 나갔을 때
    painting = false;
}

function startPainting(){ //마우스를 클릭했을 때
    painting = true;
}

function onMouseMove(event){ //마우스 움직이는 것을 감지했을 때
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //클릭하지 않고 canvas위에만 있을 때(painting 하지 않을 때)
        ctx.beginPath();   //path 시작
        ctx.moveTo(x, y);   
    }else{        //클릭하고 움직일 때(painting  할 때)
        ctx.lineTo(x, y);  //line 만들기 시작
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){ //마우스를 클릭 후 땠을 때
     stopPainting();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직이는 것을 감지
    canvas.addEventListener("mousedown", startPainting); //마우스를 클릭했을 때 발생하는 이벤트
    canvas.addEventListener("mouseup", onMouseUp);       //마우스를 클릭 후 땠을 때 발생하는 이벤트
    canvas.addEventListener("mouseleave", stopPainting); 
}