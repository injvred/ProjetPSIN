// =========================
// QUESTIONS
// =========================

const questions = [

{
q:"HTML sert à ?",
a:["Créer la structure","Créer une base de données","Compiler du code"],
c:0
},

{
q:"CSS permet de ?",
a:["Créer un serveur","Styliser une page","Stocker des fichiers"],
c:1
},

{
q:"JavaScript sert à ?",
a:["Ajouter de la logique","Créer des images","Dessiner du CSS"],
c:0
},

{
q:"Quelle balise crée un lien ?",
a:["<div>","<a>","<link>"],
c:1
},

{
q:"Quelle propriété CSS change la couleur du texte ?",
a:["font-color","color","text-style"],
c:1
},

{
q:"Quelle méthode affiche un message JS ?",
a:["console.log()","print()","echo()"],
c:0
},

{
q:"Que signifie API ?",
a:["Application Programming Interface","Advanced Program Internet","Automatic Page Index"],
c:0
},

{
q:"Quel symbole sert aux IDs CSS ?",
a:[".","#","@"],
c:1
},

{
q:"Quelle boucle répète du code ?",
a:["if","for","style"],
c:1
},

{
q:"Quel mot-clé déclare une variable moderne ?",
a:["var","float","let"],
c:2
},

{
q:"Quel framework est basé sur composants ?",
a:["React","PHP","MySQL"],
c:0
},

{
q:"Quel attribut charge une image ?",
a:["src","href","link"],
c:0
}

];

// =========================
// GAME VARIABLES
// =========================

let q = 0;
let heroHP = 100;

let waves = [

{
count:2,
enemies:[
{
name:"HTML TITAN",
img:"https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
},
{
name:"CSS PHANTOM",
img:"https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
}
]
},

{
count:3,
enemies:[
{
name:"JAVASCRIPT CORE",
img:"https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
},
{
name:"CSS PHANTOM",
img:"https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
},
{
name:"HTML TITAN",
img:"https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
}
]
},

{
count:4,
enemies:[
{
name:"REACT BOT",
img:"https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
},
{
name:"NODE BEAST",
img:"https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
},
{
name:"JAVASCRIPT CORE",
img:"https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
},
{
name:"CSS PHANTOM",
img:"https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
}
]
}

];

let wave = 0;
let enemies = [];

// =========================
// WAVE TEXT
// =========================

const waveText = document.createElement("div");

waveText.style.position = "absolute";
waveText.style.top = "50%";
waveText.style.left = "50%";
waveText.style.transform = "translate(-50%,-50%)";
waveText.style.fontSize = "64px";
waveText.style.fontWeight = "800";
waveText.style.letterSpacing = "6px";
waveText.style.color = "#00e5ff";
waveText.style.textShadow = "0 0 30px rgba(0,229,255,.9)";
waveText.style.opacity = "0";
waveText.style.pointerEvents = "none";
waveText.style.transition = ".4s";
waveText.style.zIndex = "999";

document.querySelector(".left").appendChild(waveText);

// =========================
// SHOW WAVE TEXT
// =========================

function showWaveText(text){

waveText.innerText = text;

waveText.style.opacity = "1";
waveText.style.transform = "translate(-50%,-50%) scale(1.1)";

setTimeout(()=>{

waveText.style.opacity = "0";
waveText.style.transform = "translate(-50%,-50%) scale(.9)";

},1800);

}

// =========================
// START WAVE
// =========================

function startWave(){

document.getElementById("enemyBox").innerHTML = "";

enemies = [];

let w = waves[wave];

showWaveText("⚔ VAGUE " + (wave + 1));

for(let i = 0; i < w.count; i++){

let e = {
hp:100,
img:w.enemies[i].img,
name:w.enemies[i].name,
id:Math.random()
};

enemies.push(e);

let div = document.createElement("div");

div.className = "enemy";
div.id = "enemy" + e.id;

div.innerHTML = `
<img src="${e.img}">
<div class="enemy-title">${e.name}</div>

<div class="hpbar">
<div class="hp" id="hp${e.id}"></div>
</div>
`;

document.getElementById("enemyBox").appendChild(div);

}

}

// =========================
// LOAD QUESTION
// =========================

function loadQ(){

let data = questions[q];

document.getElementById("question").innerText = data.q;

let box = document.getElementById("answers");

box.innerHTML = "";

data.a.forEach((a,i)=>{

let b = document.createElement("button");

b.innerText = a;

b.onclick = ()=>{

if(i === data.c){
hitEnemy();
}else{
heroHit();
}

flash();
next();

};

box.appendChild(b);

});

}

// =========================
// NEXT QUESTION
// =========================

function next(){

q++;

if(q >= questions.length){
q = 0;
}

loadQ();

}

// =========================
// HIT ENEMY
// =========================

function hitEnemy(){

if(enemies.length === 0) return;

let e = enemies[0];

e.hp -= 50;

document.getElementById("hp" + e.id).style.width = e.hp + "%";

if(e.hp <= 0){

let dom = document.getElementById("enemy" + e.id);

dom.classList.add("dead");

setTimeout(()=>{

enemies.shift();

if(enemies.length === 0){

wave++;

if(wave >= waves.length){

showWaveText("🏆 VICTOIRE");

setTimeout(()=>{
alert("CODEQUEST TERMINÉ");
},1500);

return;

}

showWaveText("🔥 VAGUE SUIVANTE");

setTimeout(()=>{
startWave();
},1800);

}

},300);

}

}

// =========================
// HERO HIT
// =========================

function heroHit(){

let h = document.getElementById("hero");

h.classList.add("hit");

setTimeout(()=>{
h.classList.remove("hit");
},200);

heroHP -= 10;

if(heroHP < 0){
heroHP = 0;
}

document.getElementById("heroHp").style.width = heroHP + "%";

}

// =========================
// FLASH EFFECT
// =========================

function flash(){

let f = document.getElementById("flash");

f.classList.add("active");

setTimeout(()=>{
f.classList.remove("active");
},200);

}

// =========================
// INIT
// =========================

startWave();
loadQ();