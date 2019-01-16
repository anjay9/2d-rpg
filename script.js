var xPos = yPos = 9; // player position
var xPP = yPP = 0; // planned position
var xCS = yCS = 0; // camera shift
var gridSize = 25;
var moveCounter = 0;
var canAct = true;
var blocks = {};
var blockedPoses = [];
var busyPoses = {};
busyPoses.main = {x:9,y:9};
var eventPoses = [];
var inventory = {};
var items = {};
var npcs = {};
var teleports = {};

window.onload = function(){
  canvas = document.querySelector('canvas');
  canvas.width = 475;
  canvas.height = 475;
  c = canvas.getContext('2d');
  game();
}

function game(){
  addHtml();
  blockPoses();
  createTeleports();
  createEventPoses();
  createNpcs();
  createPossibleItems();
  createInventory();
  document.addEventListener('keydown', keyPush);
  setInterval(function(){refreshMap();refreshUi();}, 1000/30);
}
