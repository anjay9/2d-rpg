function createPossibleItems(){
  class item{
    constructor(imgId,width,height,type,stats){
      this.img = document.getElementById(imgId);
      this.width = width;
      this.height = height;
      this.imgWidth = width*gridSize;
      this.imgHeight = height*gridSize;
      this.type = type;
      this.stats = stats;
    }
  }
  items.clothing_00 = new item('img_item_clothing_00',2,2,'armour');
  items.armour_00 = new item('img_item_armour_00',2,2,'armour');
  items.armour_01 = new item('img_item_armour_01',2,2,'armour');
}

function createInventory(){
  inventory = {
    img: document.getElementById('img_ui_inventory'),
    imgX: 325,
    imgY: 225,
    imgWidth: 6*gridSize,
    imgHeight: 10*gridSize,
    opened: false,
    storage: {
      imgX: 350,
      imgY: 350,
      cols: 4,
      rows: 4,
      tiles: []
    },
    armour: {
      imgX: 350,
      imgY: 250,
      imgWidth: 2*gridSize,
      imgHeight: 2*gridSize,
      item: 'none'
    },
    weapon: {
      imgX: 425,
      imgY: 250,
      imgWidth: 1*gridSize,
      imgHeight: 3*gridSize,
      item: 'none'
    },
    pos: {row:0, col:0},
    clicked: 'none'
  }
  function createStorageTiles(){
    for (var i=0; i<inventory.storage.rows; i++){
      var row = [];
      for (var j=0; j<inventory.storage.cols; j++){
        var object = {
          imgX: inventory.storage.imgX+(gridSize*j),
          imgY: inventory.storage.imgY+(gridSize*i),
          parentTile: 'none',
          item: 'none'
        };
        row.push(object);
      }
      inventory.storage.tiles.push(row);
    }
  }
  createStorageTiles();
}

function checkNbrTilesOfThisTile(checkSameParentTile,item,row,col,acceptedParentRow,acceptedParentCol){
  if (checkSameParentTile === 'undefined' || item === 'undefined'
  || row === 'undefined' || col === 'undefined') alert("checkNbrTilesOfThisTile() undefined arguments");
  var array = [];
  if (checkSameParentTile === false){
    for (var rightShift=0; rightShift<item.width; rightShift++){
      for (var downShift=0; downShift<item.height; downShift++){
        if (inventory.storage.tiles[row + downShift] !== undefined){
          if (inventory.storage.tiles[row + downShift][col + rightShift] !== undefined){
            if (inventory.storage.tiles[row + downShift][col + rightShift].parentTile === 'none'){
              array.push(0);
            }
          }
        }
      }
    }
  }
  else if (checkSameParentTile === true){
    if (acceptedParentRow === 'undefined' || acceptedParentCol === 'undefined') alert("checkNbrTilesOfThisTile() undefined optional arguments");
    for (var rightShift=0; rightShift<item.width; rightShift++){
      for (var downShift=0; downShift<item.height; downShift++){
        if (inventory.storage.tiles[row + downShift] !== undefined){
          if (inventory.storage.tiles[row + downShift][col + rightShift] !== undefined){
            if (inventory.storage.tiles[row + downShift][col + rightShift].parentTile === 'none') array.push(0);
            else if (inventory.storage.tiles[row + downShift][col + rightShift].parentTile.row === acceptedParentRow
            && inventory.storage.tiles[row + downShift][col + rightShift].parentTile.col === acceptedParentCol){
              array.push(1);
            }
          }
        }
      }
    }
  }
  if (array.length === item.width*item.height) return true;
  else return false;
}

function autoAddItemToInv(choosenItem){
  for (prop in items){
    for (var row=0; row<inventory.storage.tiles.length; row++){
      for (var tile=0; tile<inventory.storage.tiles[row].length; tile++){
        if (checkNbrTilesOfThisTile(false,choosenItem,row,tile) === true){
          inventory.storage.tiles[row][tile].item = choosenItem;
          for (var rightShift=0; rightShift<choosenItem.width; rightShift++){
            for (var downShift=0; downShift<choosenItem.height; downShift++){
              inventory.storage.tiles[row + downShift][tile + rightShift].parentTile = {row:row, col:tile};
            }
          }
          return;
        }
      }
    }
  }
  return alert("Not enough space!");
}

function invClick(){
  // FIRST CLICK
  if (inventory.clicked === 'none'){
    // weapon
    if (inventory.pos.row === -2 && inventory.weapon !== 'none' && inventory.weapon.item !== 'none'){
      inventory.clicked = {row:-2, col:-2};
    }
    // armour
    else if (inventory.pos.row === -1 && inventory.armour !== 'none' && inventory.armour.item !== 'none'){
      inventory.clicked = {row:-1, col:-1};
    }
    // storage
    else if (inventory.pos.row > -1 && inventory.pos.row < 10 && inventory.storage.tiles[inventory.pos.row][inventory.pos.col].parentTile !== 'none'){
      inventory.clicked = {
        row:inventory.storage.tiles[inventory.pos.row][inventory.pos.col].parentTile.row,
        col:inventory.storage.tiles[inventory.pos.row][inventory.pos.col].parentTile.col
      };
    }
  }
  // SECOND CLICK
  else if (inventory.clicked !== 'none'){
    var newRow = inventory.pos.row;
    var newCol = inventory.pos.col;
    var oldRow = inventory.clicked.row;
    var oldCol = inventory.clicked.col;
    function tryMoveItem(from,to){
      if (from === 'weapon'){
        if (to === 'armour') alert("Its not an armour!");
        else if (to === 'storage') toStorage(from);
      }
      else if (from === 'armour'){
        if (to === 'weapon') alert("Its not a weapon!");
        else if (to === 'storage') toStorage(from);
      }
      else if (from === 'storage'){
        if (to === 'weapon') leaveStorage(to);
        else if (to === 'armour') leaveStorage(to);
        else if (to === 'storage') toStorage(from);
      }
    }
    function toStorage(from){
      var newMainTile = inventory.storage.tiles[newRow][newCol];
      if (from === 'weapon'){
        var copiedItem = inventory.weapon.item;
        if (checkNbrTilesOfThisTile(false,copiedItem,newRow,newCol) === true){
          removeItem(from);
          setItem(copiedItem,'storage');
        }
        else alert("Not enough space!");
      }
      else if (from === 'armour'){
        var copiedItem = inventory.armour.item;
        if (checkNbrTilesOfThisTile(false,copiedItem,newRow,newCol) === true){
          removeItem(from);
          setItem(copiedItem,'storage');
        }
        else alert("Not enough space!");
      }
      else if (from === 'storage'){
        var copiedItem = inventory.storage.tiles[oldRow][oldCol].item;
        if (checkNbrTilesOfThisTile(true,copiedItem,newRow,newCol,oldRow,oldCol) === true){
          removeItem(from);
          setItem(copiedItem,'storage');
        }
        else alert("Not enough space!");
      }
    }
    function leaveStorage(to){
      if (inventory.storage.tiles[oldRow][oldCol].item.type === to){
        var copiedItem = inventory.storage.tiles[oldRow][oldCol].item;
        var invWeaponOrArmour;
        if (to === 'weapon') invWeaponOrArmour = inventory.weapon;
        else if (to === 'armour') invWeaponOrArmour = inventory.armour;
        if (invWeaponOrArmour.item === 'none'){
          removeItem('storage');
          setItem(copiedItem,to);
        }
      }
      else alert("Its not a "+to+"!");
    }
    function removeItem(area){
      if (area === 'weapon'){
        inventory.weapon.item = 'none';
      }
      else if (area === 'armour'){
        inventory.armour.item = 'none';
      }
      else if (area === 'storage'){
        var oldMainTile = inventory.storage.tiles[oldRow][oldCol]
        // for each item tile remove parentTile property
        for (var x=0; x<oldMainTile.item.width; x++){
          for (var y=0; y<oldMainTile.item.height; y++){
            inventory.storage.tiles[oldRow + x][oldCol + y].parentTile = 'none';
          }
        }
        // remove item property
        oldMainTile.item = 'none';
      }
    }
    function setItem(item,area){
      if (area === 'weapon'){
        inventory.weapon.item = item;
      }
      else if (area === 'armour'){
        inventory.armour.item = item;
      }
      else if (area === 'storage'){
        var newMainTile = inventory.storage.tiles[newRow][newCol];
        // set item property
        newMainTile.item = item;
        // for each item tile set parentTile property
        for (var i=0; i<newMainTile.item.width; i++){
          for (var j=0; j<newMainTile.item.height; j++){
            inventory.storage.tiles[newRow + i][newCol + j].parentTile = {row:newRow, col:newCol};
          }
        }
      }
    }
    var from;
    var to;
    // set "from"
    if (oldRow === -2) from = 'weapon';
    else if (oldRow === -1) from = 'armour';
    else if (oldRow > -1 && oldRow < 10) from = 'storage';
    // set "to"
    if (newRow === -2) to = 'weapon';
    else if (newRow === -1) to = 'armour';
    else if (newRow > -1 && newRow < 10) to = 'storage';
    tryMoveItem(from,to);
    inventory.clicked = 'none';
  }
}
