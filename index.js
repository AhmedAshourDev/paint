<html>
    <head>
        <style>
            #canvas {
                position: absolute;
                top: 0px;
                left: 0px;
            }
            input[type="range"] {
                width: 300px;
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                cursor: pointer;
                z-index: 999999999;
            }
            input[type="color"] {
                position: absolute;
                top: 20px;
                left: 20px;
                cursor: pointer;
                z-index: 999999999;
            }
            #random {
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
                z-index: 999999999;
            }
        </style>
    </head>
    <body>
        <input type="range" id="range" value="1" min="0" max="200" step="1">
        <input type="color" id="color">
        <input type="button" value="random: Off" id="random">
        <canvas id="canvas"></canvas>
        <script>
            let range = document.getElementById('range');
            let color = document.getElementById('color');
            let random = document.getElementById('random');
            let canvas = document.getElementById('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let context = canvas.getContext("2d");
            let startDrawing = false;
            context.lineWidth = 1;
            context.lineCap = 'round';
            context.lineJoin = "round";
            context.strokeStyle = "red";
            range.onchange = () => context.lineWidth = range.value;
            color.onchange = () => context.strokeStyle = color.value;

            const TIME_CHANGE_COLOR = 1 * 1000;
            random.onclick = () => {
                let changerColor = null;
                function resetTimer() {
                    if (changerColor != null) {
                        clearInterval(changerColor);
                        changerColor = null;
                    }
                }
                function randomColorInteger() {
                    return Math.floor(Math.random() * 255);
                }
                if (random.value.toLowerCase().endsWith('on')) {
                    random.value = "random: Off";
                    resetTimer();
                } else if (random.value.toLowerCase().endsWith('off')) {
                    random.value = "random: On";
                    resetTimer();
                    changerColor = setInterval(function() {
                        let r = randomColorInteger();
                        let g = randomColorInteger();
                        let b = randomColorInteger();
                        let c = `rgb(${r},${g},${b})`;
                        context.strokeStyle = c;
                    }, TIME_CHANGE_COLOR);
                }
            };

            canvas.onmousedown = function(event) {
                context.beginPath();
                context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
                startDrawing = true;
            };
            canvas.onmouseup = function(event) {
                context.closePath();
                startDrawing = false;
            };
            canvas.onmousemove = function(event) {
                if (startDrawing) {
                    context.lineTo(event.clientX, event.clientY);
                    context.stroke();
                }
            };
        </script>
    </body>
</html>
