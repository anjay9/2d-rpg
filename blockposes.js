function blockPoses(){

  function block(x,y){
    blockedPoses.push({x:x,y:y});
  }


  // home north and south walls
  for (var i=7; i<=11; i++){
    block(i,7);
    block(i,11);
  }
  // home sides
  for (var i=8; i<=10; i++){
    block(7,i);
    if (i !=9){
      block(11,i);
    }
  }
  // home chest
  block(8,9);

  // smith north and south walls
  for (var i=8; i<=12; i++){
    block(i,12)
    block(i,16)
  }
  // smith west wall
  for (var i=13; i<=15; i++) block(8,i);
  // smith anvil
  block(10,14);
  // castle
  for (var x=16; x<=22; x++){
    if (x !== 19) block(x,6);
    block(x,-1);
  }
  for (var y=0; y<=5; y++){
    block(16,y);
    block(22,y);
  }
  // tp
  blockedPoses.push({x:16,y:10},{x:17,y:10},{x:17,y:11},{x:17,y:12},{x:16,y:12});

}

function isBlockedOrBusy(x,y){
  for (var i=0; i<blockedPoses.length; i++){
    if (blockedPoses[i].x === x && blockedPoses[i].y === y){
      return true;
    }
  }
  for (var prop in busyPoses){
    if (busyPoses[prop].x === x && busyPoses[prop].y === y){
      return true;
    }
  }
  return false;
}
