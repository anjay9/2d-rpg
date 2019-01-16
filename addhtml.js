function addHtml(){

  class htmlImage{
    constructor(type,file,width,height){
      this.type = type;
      this.file = file;
      this.width = width;
      this.height = height;
      document.getElementById('imgContainer').innerHTML += '<img id="img_'+type+'_'+file+'" width="'+width+'" height="'+height+'" src="./img/'+type+'/'+file+'.png" style="display:none">';
    }
  }

  // STRUCTURES
  new htmlImage('structure','home_town',1500,1500);
  new htmlImage('structure','home_town_castle_tower',1500,1500);

  // EVENT TILES
  new htmlImage('evblock','bed',25,25);
  new htmlImage('evblock','chest',25,25);
  new htmlImage('evblock','anvil',25,25);

  // TELEPORTS
  new htmlImage('tp','blue');

  // EVENT FLOORS
  new htmlImage('evfloor','stage_0',25,25);
  new htmlImage('evfloor','smith_buy_1',25,25);
  new htmlImage('evfloor','smith_buy_2',25,25);

  // CHARS
  new htmlImage('char','main',25,25);
  new htmlImage('char','smith',25,25);
  new htmlImage('char','lord',25,25);
  new htmlImage('char','oldfart',25,25);
  new htmlImage('char','armour_00',25,25);
  new htmlImage('char','armour_01',25,25);
  new htmlImage('char','armour_01_royal',25,25);

  // ITEMS
  new htmlImage('item','clothing_00',50,50);
  new htmlImage('item','armour_00',50,50);
  new htmlImage('item','armour_01',50,50);

  // UI
  new htmlImage('ui','inventory',150,250);
  new htmlImage('ui','inv_tile',25,25);
  new htmlImage('ui','inv_cursor',25,25);
  new htmlImage('ui','inv_highlight_1x1',25,25);
  new htmlImage('ui','inv_highlight_1x2',25,50);
  new htmlImage('ui','inv_highlight_1x3',25,75);
  new htmlImage('ui','inv_highlight_2x1',50,25);
  new htmlImage('ui','inv_highlight_2x2',50,50);
  new htmlImage('ui','inv_highlight_2x3',50,75);
  new htmlImage('ui','inv_highlight_3x1',75,25);
  new htmlImage('ui','inv_highlight_3x2',75,50);
  new htmlImage('ui','inv_highlight_3x3',75,75);
  new htmlImage('ui','ev_buy_icon',75,75);

}
