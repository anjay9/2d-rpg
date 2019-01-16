function refreshUi(){

  // --------------- INVENTRORY ----------------------------

  if (inventory.opened === true){
    // INVENTORY BACKGROUND
    c.drawImage(inventory.img,325,225,6*gridSize,10*gridSize);

    // STORAGE TILES
    for (var x=0; x<inventory.storage.rows; x++){
      for (var y=0; y<inventory.storage.cols; y++){
        c.drawImage(img_ui_inv_tile, inventory.storage.tiles[x][y].imgX, inventory.storage.tiles[x][y].imgY, gridSize, gridSize);
      }
    }

    // STORAGE FRAME
    c.fillStyle = '#424242';
    for (var x=0; x<inventory.storage.cols*gridSize+2; x++){
      for (var y=0; y<inventory.storage.rows*gridSize+2; y++){
        c.fillRect(inventory.storage.imgX-1+x, inventory.storage.imgY-1, 1, 1);
        c.fillRect(inventory.storage.imgX+gridSize*inventory.storage.cols, inventory.storage.imgY-1+y, 1, 1);
        c.fillRect(inventory.storage.imgX-1+x, inventory.storage.imgY+gridSize*inventory.storage.rows, 1, 1);
        c.fillRect(inventory.storage.imgX-1, inventory.storage.imgY-1+y, 1, 1);
      }
    }

    // HIGHLIGHT
    c.fillStyle = 'rgba(255,255,0,0.3)';

    if (inventory.pos.row === -1){
      c.drawImage(img_ui_inv_highlight_2x2, inventory.armour.imgX, inventory.armour.imgY, inventory.armour.imgWidth, inventory.armour.imgHeight);
    }
    else if (inventory.pos.row === -2){
      c.drawImage(img_ui_inv_highlight_1x3, inventory.weapon.imgX, inventory.weapon.imgY, inventory.weapon.imgWidth, inventory.weapon.imgHeight);
    }
    else if (inventory.pos.row > -1 && inventory.pos.row < 10){
      var thisTile = inventory.storage.tiles[inventory.pos.row][inventory.pos.col];
      if (thisTile.parentTile === 'none') c.drawImage(img_ui_inv_highlight_1x1, thisTile.imgX, thisTile.imgY, gridSize, gridSize);
      else{
        var parentTile = inventory.storage.tiles[thisTile.parentTile.row][thisTile.parentTile.col];
        if (parentTile.item.width === 1 && parentTile.item.height === 1) c.drawImage(img_ui_inv_highlight_1x1, parentTile.imgX, parentTile.imgY, gridSize*1, gridSize*1);
        else if (parentTile.item.width === 1 && parentTile.item.height === 2) c.drawImage(img_ui_inv_highlight_1x2, parentTile.imgX, parentTile.imgY, gridSize*1, gridSize*2);
        else if (parentTile.item.width === 1 && parentTile.item.height === 3) c.drawImage(img_ui_inv_highlight_1x3, parentTile.imgX, parentTile.imgY, gridSize*1, gridSize*3);
        else if (parentTile.item.width === 2 && parentTile.item.height === 1) c.drawImage(img_ui_inv_highlight_2x1, parentTile.imgX, parentTile.imgY, gridSize*2, gridSize*1);
        else if (parentTile.item.width === 2 && parentTile.item.height === 2) c.drawImage(img_ui_inv_highlight_2x2, parentTile.imgX, parentTile.imgY, gridSize*2, gridSize*2);
        else if (parentTile.item.width === 2 && parentTile.item.height === 3) c.drawImage(img_ui_inv_highlight_2x3, parentTile.imgX, parentTile.imgY, gridSize*2, gridSize*3);
        else if (parentTile.item.width === 3 && parentTile.item.height === 1) c.drawImage(img_ui_inv_highlight_3x1, parentTile.imgX, parentTile.imgY, gridSize*3, gridSize*1);
        else if (parentTile.item.width === 3 && parentTile.item.height === 2) c.drawImage(img_ui_inv_highlight_3x2, parentTile.imgX, parentTile.imgY, gridSize*3, gridSize*2);
        else if (parentTile.item.width === 3 && parentTile.item.height === 3) c.drawImage(img_ui_inv_highlight_3x3, parentTile.imgX, parentTile.imgY, gridSize*3, gridSize*3);
      }
    }

    // ITEM CLICKED
    if (inventory.clicked !== 'none'){
      c.fillStyle = 'rgba(222,202,71,1)';
      if (inventory.clicked.row === -2) c.fillRect(inventory.weapon.imgX, inventory.weapon.imgY, gridSize*1, gridSize*3);
      else if (inventory.clicked.row === -1) c.fillRect(inventory.armour.imgX, inventory.armour.imgY, gridSize*2, gridSize*2);
      else if (inventory.clicked.row > -1 && inventory.clicked.row < 10){
        var clickedTile = inventory.storage.tiles[inventory.clicked.row][inventory.clicked.col];
        c.fillRect(clickedTile.imgX, clickedTile.imgY, clickedTile.item.imgWidth, clickedTile.item.imgHeight);
      }
    }

    // ITEMS
    if (inventory.weapon.item !== 'none'){
      c.drawImage(inventory.weapon.item.img, inventory.weapon.imgX, inventory.weapon.imgY, inventory.weapon.item.width*gridSize, inventory.weapon.item.height*gridSize);
    }
    if (inventory.armour.item !== 'none'){
      c.drawImage(inventory.armour.item.img, inventory.armour.imgX, inventory.armour.imgY, inventory.armour.item.width*gridSize, inventory.armour.item.height*gridSize);
    }
    for (var row=0; row<inventory.storage.tiles.length; row++){
      for (var tile=0; tile<inventory.storage.tiles[row].length; tile++){
        if (inventory.storage.tiles[row][tile].item !== 'none'){
          var img = inventory.storage.tiles[row][tile].item.img;
          var imgX = inventory.storage.tiles[row][tile].imgX;
          var imgY = inventory.storage.tiles[row][tile].imgY;
          var imgWidth = inventory.storage.tiles[row][tile].item.imgWidth;
          var imgHeight = inventory.storage.tiles[row][tile].item.imgHeight;
          c.drawImage(img,imgX,imgY,imgWidth,imgHeight);
        }
      }
    }

    // CURSOR
    if (inventory.pos.row === -1) c.drawImage(img_ui_inv_cursor, inventory.armour.imgX+gridSize, inventory.armour.imgY+gridSize, gridSize, gridSize);
    else if (inventory.pos.row > -1 && inventory.pos.row < 10){
      var thisTile = inventory.storage.tiles[inventory.pos.row][inventory.pos.col];
      c.drawImage(img_ui_inv_cursor, thisTile.imgX, thisTile.imgY, gridSize, gridSize);
    }

  }


  // --------------- REST -----------------------------

  // main info
  document.getElementById('mainInfo').innerHTML =
  '<h2>Main information:</h2>'+
  'move - "WASD"/Arrows</br>'+
  'inventory - "E"</br>'+
  'this info window - "I"</br>'+
  'additional info window - "O"';

  // other info
  document.getElementById('otherInfo').innerHTML =
  "<h2>Other Information:</h2>"+
  "character position: "+xPos+" / "+yPos+"</br>"+
  "moves done: "+moveCounter+"</br>"+
  "inventory position: "+inventory.pos.row+" (row) "+inventory.pos.col+" (col)</br>"+
  "inventory clicked: "+inventory.clicked+"</br>"+
  "inventory clicked: "+inventory.clicked.row+" (row) "+inventory.clicked.col+" (col)</br>";
}
