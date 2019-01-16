function refreshMap(){

  function drawTile(imgId,xTile,yTile){
    c.drawImage(imgId, (xTile+xCS)*gridSize, (yTile+yCS)*gridSize, gridSize, gridSize);
  }

  function drawStructure(imgId,xFirstTile,yFirstTile,widthInTiles,heightInTiles){
    c.drawImage(imgId, (xFirstTile+xCS)*gridSize, (yFirstTile+yCS)*gridSize, widthInTiles*gridSize, heightInTiles*gridSize);
  }
    
  checkTeleports();

  // canvas
  c.fillStyle = 'lightgrey';
  c.fillRect(0,0,canvas.width,canvas.height);

  // terrain
  drawStructure(img_structure_home_town,-1,-10,60,60);
  drawTile(img_evblock_bed,8,8);
  drawTile(img_evblock_chest,8,9);
  drawTile(img_evblock_anvil,10,14);

  // npcs etc.
  for (prop in npcs){
    if (npcs[prop].buyAvail === true) drawTile(npcs[prop].buyImg,npcs[prop].x,npcs[prop].y);
    drawTile(npcs[prop].img,npcs[prop].x,npcs[prop].y);
  }

  // main char
  if (inventory.armour.item === items.armour_00) drawTile(img_char_armour_00,xPos,yPos);
  else if (inventory.armour.item === items.armour_01) drawTile(img_char_armour_01,xPos,yPos);
  else drawTile(img_char_main,xPos,yPos);

  // structures that cover chars
  drawStructure(img_structure_home_town_castle_tower,14,-3,5,5);
    
  // teleports
  for (prop in teleports){
      drawTile(teleports[prop].img,teleports[prop].xFirstEnter,teleports[prop].yFirstEnter);
      drawTile(teleports[prop].img,teleports[prop].xSecondEnter,teleports[prop].ySecondEnter);
  }

  // event icons
  for (var tile=0; tile<eventPoses.length; tile++){
    if (xPos === eventPoses[tile].x && yPos === eventPoses[tile].y){
      if (eventPoses[tile].type === 'buy'){
        c.drawImage(img_ui_ev_buy_icon,0,16*gridSize,75,75);
      }
    }
  }

}
