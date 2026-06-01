let level = localStorage.getItem("level") || 1;

function updateMap(){

let nodes = document.querySelectorAll(".node");
let fill = document.getElementById("routeFill");
let player = document.getElementById("player");

let percent = (level - 1) / 7 * 100;
fill.style.width = percent + "%";

/* move player */
player.style.left = (7.5 + percent * 0.85) + "%";

nodes.forEach((n,i)=>{

let index = i + 1;

n.classList.remove("done","current","locked");

if(index < level){
n.classList.add("done");
}

else if(index == level){
n.classList.add("current");
}

else{
n.classList.add("locked");
}

});

}

function play(lvl){
localStorage.setItem("level",lvl);
window.location.href="game.html";
}

updateMap();

function play(level){
localStorage.setItem("level", level);
window.location.href = "game.html";
let level = localStorage.getItem("level");
}