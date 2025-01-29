const canvas = document.getElementById("pllCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 300;

let gain = localStorage.getItem("gain") || 10;
let divider = localStorage.getItem("divider") || 10;
let noiseLevel = localStorage.getItem("noise") || 0;

document.getElementById("gain").value = gain;
document.getElementById("divider").value = divider;
document.getElementById("noise").value = noiseLevel;

document.getElementById("gainValue").innerText = gain;
document.getElementById("dividerValue").innerText = divider;
document.getElementById("noiseValue").innerText = noiseLevel;

document.getElementById("gain").addEventListener("input", function(event) {
    gain = event.target.value;
    document.getElementById("gainValue").innerText = gain;
    localStorage.setItem("gain", gain);
    drawPLLResponse();
});

document.getElementById("divider").addEventListener("input", function(event) {
    divider = event.target.value;
    document.getElementById("dividerValue").innerText = divider;
    localStorage.setItem("divider", divider);
    drawPLLResponse();
});

document.getElementById("noise").addEventListener("input", function(event) {
    noiseLevel = event.target.value;
    document.getElementById("noiseValue").innerText = noiseLevel;
    localStorage.setItem("noise", noiseLevel);
    drawPLLResponse();
});

function resetSettings() {
    localStorage.clear();
    location.reload();
}

function drawPLLResponse() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    for (let t = 0; t < canvas.width; t++) {
        let noise = (Math.random() * noiseLevel - noiseLevel / 2) * 5;
        let response = 150 + 50 * Math.sin((t / (50 / divider)) * gain * 0.1) + noise;
        ctx.lineTo(t, response);
    }
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

drawPLLResponse();
