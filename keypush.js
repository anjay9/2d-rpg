// for displaying info boxes
function blockNone(elemId){
  var e = document.getElementById(elemId);
  if (e.style.display != "none") e.style.display = "none";
  else e.style.display = "block";
}
function tryMoveMain(direction){
  if (direction === 'north'){
    yPP = yPos -1;
    if (isBlockedOrBusy(xPos,yPP) === false){
      busyPoses.main.y += -1;
      yPos = yPP;
      yCS += 1;
      moveCounter += 1;
    }
  }
  else if (direction === 'south'){
    yPP = yPos + 1;
    if (isBlockedOrBusy(xPos,yPP) === false){
      busyPoses.main.y += 1;
      yPos = yPP;
      yCS += -1;
      moveCounter += 1;
    }
  }
  else if (direction === 'west'){
    xPP = xPos - 1;
    if (isBlockedOrBusy(xPP,yPos) === false){
      busyPoses.main.x += -1;
      xPos = xPP;
      xCS += 1;
      moveCounter += 1;
    }
  }
  else if (direction === 'east'){
    xPP = xPos + 1;
    if (isBlockedOrBusy(xPP,yPos) === false){
      busyPoses.main.x += 1;
      xPos = xPP;
      xCS += -1;
      moveCounter += 1;
    }
  }
}
function tryPushMain(pusherDirection){
  var availDirs = [];
  if (isBlockedOrBusy(xPos,yPos-1) === false && pusherDirection !== 'south') availDirs.push('north');
  if (isBlockedOrBusy(xPos,yPos+1) === false && pusherDirection !== 'north') availDirs.push('south');
  if (isBlockedOrBusy(xPos-1,yPos) === false && pusherDirection !== 'east') availDirs.push('west');
  if (isBlockedOrBusy(xPos+1,yPos) === false && pusherDirection !== 'west') availDirs.push('east');
  if (availDirs.length > 0){
    var direction = availDirs[Math.floor(Math.random() * availDirs.length)];
    if (direction === 'north'){
      busyPoses.main.y += -1;
      yCS += 1;
      yPos += -1;
    }
    else if (direction === 'south'){
      busyPoses.main.y += 1;
      yCS += -1;
      yPos += 1;
    }
    else if (direction === 'west'){
      busyPoses.main.x += -1;
      xCS += 1;
      xPos += -1;
    }
    else if (direction === 'east'){
      busyPoses.main.x += 1;
      xCS += -1;
      xPos += 1;
    }
  }
}



// --------------------------- MAIN FUNCTION --------------------------------------

function keyPush(event){
  if (canAct === true){
      switch(event.keyCode){

        // UP
        case 38: // Upper Arrow
        case 87: // W
          if (inventory.opened === false){
            tryMoveMain('north');
          }
          else if (inventory.opened === true){
            // from storage
            if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.pos.row === 0 && inventory.pos.col === 0) inventory.pos = {row:-1, col:-1};
            else if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.pos.row === 0 && inventory.pos.col === 1) inventory.pos = {row:-2, col:-2};
            else if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.pos.row > 0) inventory.pos.row += -1;
          }
          break;

        // DOWN
        case 40: // Lower Arrow
        case 83: // S
          if (inventory.opened === false){
            tryMoveMain('south');
          }
          else if (inventory.opened === true){
            // from armour/weapon
            if (inventory.pos.row === -1) inventory.pos = {row:0, col:0};
            else if (inventory.pos.row === -2) inventory.pos = {row:0, col:1};
            // from storage
            else if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.pos.row !== inventory.storage.rows-1) inventory.pos.row += 1;
          }
          break;

        // LEFT
        case 37: // Left Arrow
        case 65: // A
          if (inventory.opened === false){
            tryMoveMain('west');
          }
          else if (inventory.opened === true){
            // from weapon
            if (inventory.pos.row === -2) inventory.pos = {row:-1, col:-1};
            // from storage
            else if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.pos.col !== 0) inventory.pos.col += -1;
          }
          break;

        // RIGHT
        case 39: // Right Arrow
        case 68: // D
          if (inventory.opened === false){
            tryMoveMain('east');
          }
          else if (inventory.opened === true){
            // from armour
            if (inventory.pos.col === -1) inventory.pos = {row:-2, col:-2};
            // from storage
            else if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.pos.col !== inventory.storage.cols-1) inventory.pos.col += 1;
          }
          break;

        // OPEN INVENTORY
        case 69: // E
          if (inventory.opened === true){
            inventory.pos = {row:0, col:0};
            inventory.clicked = 'none';
            inventory.opened = false;
          }
          else if (inventory.opened === false) inventory.opened = true;
          break;

        // ACTION
        case 81: // Q
          if (inventory.opened === false){
            for (prop in eventPoses){
              if (xPos === prop.x && yPos === prop.y){

              }
            }
          }
          else if (inventory.opened === true) invClick();
          break;

        // MAIN INFO
        case 73: // I
          blockNone("mainInfo");
          break;

        // OTHER INFO
        case 79: // O
          blockNone("otherInfo");
          break;

        // ADD CLOTHING 00
        case 90: // Z
          autoAddItemToInv(items.clothing_00);
          break;
        // ADD ARMOUR 00
        case 88: // X
          autoAddItemToInv(items.armour_00);
          break;
        // ADD ARMOUR 01
        case 67: // C
          autoAddItemToInv(items.armour_01);
          break;
      }
      canAct = false;
      setTimeout(function(){
        canAct = true;
      },1000/12);
    //}
  }
}
