const canvas = document.querySelector("#canvas");
const counter = document.querySelector("p");
const ctx = canvas.getContext("2d");

//======================
//       Wartosci
//======================
const szerokoscBoiska = 800;
const wysokoscBoiska = 500;
const kolorPilki = "white";
const wielkoscPilki = 20;

var temp = [];

var pilkaX = szerokoscBoiska / 2;
var pilkaY = Math.floor(Math.random() * ((wysokoscBoiska - wielkoscPilki) - 20)) + 10;
var predkoscX = pilkaPredkosc(2);
var predkoscY = pilkaPredkosc(2);

temp[0] = pilkaX;
temp[1] = pilkaY;
temp[2] = predkoscX;
temp[3] = predkoscY;

const graczSzerokosc = 20;
const graczWysokosc = 100;
const gracz1X = 100;
const gracz2X = szerokoscBoiska - (graczSzerokosc + 100);
var gracz1Y = (wysokoscBoiska - graczWysokosc) / 2;
var gracz2Y = (wysokoscBoiska - graczWysokosc) / 2;
var graczPredkosc = 5;

temp[4] = gracz1Y;
ctx.canvas.width  = szerokoscBoiska;
ctx.canvas.height = wysokoscBoiska;
ctx.fillStyle = kolorPilki;

var keyDetection_w = false;
var keyDetection_s = false;
var keyDetection_arrowUp = false;
var keyDetection_arrowDown = false;

var liczbaOdbic = 0;
//======================
//       Funkcje
//======================
function pilkaPredkosc(p) {
    var random = Math.floor(Math.random() * 2);
    if(random == 1) p = -p;
    return p;
}
function graczUstawienia() {
    gracz1Y = temp[4];
    gracz2Y = temp[4];
}
function pilkaUstawienia() {
    pilkaX = temp[0];
    pilkaY = Math.floor(Math.random() * ((wysokoscBoiska - wielkoscPilki) - 20)) + 10;;
    predkoscX = temp[2];
    predkoscY = temp[3];
}
function boisko() {
    ctx.fillStyle = "rgb(80, 80, 80)";
    ctx.fillRect(0, 0, szerokoscBoiska, wysokoscBoiska);
}
function rysujPilke() {
    pilkaX = pilkaX + predkoscX;
    pilkaY = pilkaY + predkoscY;
    ctx.fillStyle = "white";
    ctx.fillRect(pilkaX, pilkaY, wielkoscPilki, wielkoscPilki);
    
    if(pilkaY >= wysokoscBoiska - wielkoscPilki || pilkaY <= 0) predkoscY = -predkoscY;
    if(pilkaX <= 0 || pilkaX >= szerokoscBoiska - wielkoscPilki) {
        ctx.clearRect(pilkaX, pilkaY, wielkoscPilki, wielkoscPilki);
        pilkaUstawienia();
        graczUstawienia()
        liczbaOdbic = 0;
        counter.innerHTML = "";
    }

    if((pilkaX <= gracz1X + wielkoscPilki &&
        pilkaX > gracz1X &&
        pilkaY < gracz1Y + graczWysokosc &&
        pilkaY > gracz1Y - wielkoscPilki) ||
        (pilkaX >= gracz2X - wielkoscPilki &&
        pilkaX < gracz2X &&
        pilkaY < gracz2Y + graczWysokosc &&
        pilkaY > gracz2Y - wielkoscPilki))
        {
        if(predkoscX > 0) predkoscX++;
        else if(predkoscX < 0) predkoscX--;
        predkoscX = -predkoscX;
        liczbaOdbic++;
        counter.innerHTML = liczbaOdbic;
    }
}
function gumuj() {
    ctx.clearRect(pilkaX, pilkaY, wielkoscPilki, wielkoscPilki);
}
function graczRysuj() {
    ctx.fillRect(gracz1X, gracz1Y, graczSzerokosc, graczWysokosc);
    ctx.fillRect(gracz2X, gracz2Y, graczSzerokosc, graczWysokosc);
}
function keyDownDetection(e) {
    if(e.key === "w") keyDetection_w = true;
    if(e.key === "s") keyDetection_s = true;
    if(e.key === "ArrowUp") keyDetection_arrowUp = true;
    if(e.key === "ArrowDown") keyDetection_arrowDown = true;
}

function keyUpDetection(e) {
    if(e.key === "w") keyDetection_w = false;
    if(e.key === "s") keyDetection_s = false;
    if(e.key === "ArrowUp") keyDetection_arrowUp = false;
    if(e.key === "ArrowDown") keyDetection_arrowDown = false;
}
function graczRuch() {
    if(keyDetection_w && !(gracz1Y <= 0)) gracz1Y = gracz1Y - graczPredkosc;
    if(keyDetection_s && !(gracz1Y >= wysokoscBoiska - graczWysokosc)) gracz1Y = gracz1Y + graczPredkosc;
    if(keyDetection_arrowUp && !(gracz2Y <= 0)) gracz2Y = gracz2Y - graczPredkosc;
    if(keyDetection_arrowDown && !(gracz2Y >= wysokoscBoiska - graczWysokosc)) gracz2Y = gracz2Y + graczPredkosc;
}

function main() {
    gumuj();
    boisko();
    rysujPilke();
    graczRysuj()
    graczRuch()
}
setInterval(main, 1000/60);
window.addEventListener("keydown", keyDownDetection);
window.addEventListener("keyup", keyUpDetection);