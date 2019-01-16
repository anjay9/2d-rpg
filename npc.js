function npc(img,x,y){
  this.img = document.getElementById(img);
  this.x = x;
  this.y = y;
  this.buyImg = 'none';
  this.buyAvail = false;
}

npc.prototype.addBuyImg = function(){
  function stageEmpty(){
    this.buyImg = document.getElementById('img_evfloor_stage_0');
  }
  function stageLight(){
    this.buyImg = document.getElementById('img_evfloor_smith_buy_1');
  }
  function stageFull(){
    this.buyImg = document.getElementById('img_evfloor_smith_buy_2');
  }
  function activeEmpty(){
    stageEmpty.bind(this)();
    setInterval(stageEmpty.bind(this),2000);
  }
  function activeLight(){
    stageLight.bind(this)();
    setInterval(stageLight.bind(this),2000);
  }
  function activeFull(){
    stageFull.bind(this)();
    setInterval(stageFull.bind(this),2000);
  }
  this.buyAvail = true;
  activeEmpty.bind(this)();
  setTimeout(activeLight.bind(this),500);
  setTimeout(activeFull.bind(this),1000);
  setTimeout(activeLight.bind(this),1500);
}

npc.prototype.tryPushChar = function(name,pusherDirection){
  var availDirs = [];
  if (isBlockedOrBusy(this.x,this.y-1) === false && pusherDirection !== 'south') availDirs.push('north');
  if (isBlockedOrBusy(this.x,this.y+1) === false && pusherDirection !== 'north') availDirs.push('south');
  if (isBlockedOrBusy(this.x-1,this.y) === false && pusherDirection !== 'east') availDirs.push('west');
  if (isBlockedOrBusy(this.x+1,this.y) === false && pusherDirection !== 'west') availDirs.push('east');
  if (availDirs.length > 0){
    var direction = availDirs[Math.floor(Math.random() * availDirs.length)];
    if (direction === 'north'){
      busyPoses[name].y += -1;
      this.y += -1;
    }
    else if (direction === 'south'){
      busyPoses[name].y += 1;
      this.y += 1;
    }
    else if (direction === 'west'){
      busyPoses[name].x += -1;
      this.x += -1;
    }
    else if (direction === 'east'){
      busyPoses[name].x += 1;
      this.x += 1;
    }
  }
}

npc.prototype.circularPatrol = function(name,north,south,west,east,walkSpeed,stayTime){
  function pushChars(npcDirection,x,y){
    if (xPos === x && yPos === y){
      tryPushMain(npcDirection);
    }
    for (prop in npcs){
      if (npcs[prop] !== npcs[name] && npcs[prop].x === x && npcs[prop].y === y){
        npcs[prop].tryPushChar(prop,npcDirection);
      }
    }
  }
  function action(){
    if (stay === false){
      if (this.x < east && this.y === north){
        busyPoses[name].x += 1;
        pushChars('east',this.x+1,this.y);
        this.x += 1;
      }
      else if (this.x === east && this.y < south){
        busyPoses[name].y += 1;
        pushChars('south',this.x,this.y+1);
        this.y += 1;
      }
      else if (this.x > west && this.y === south){
        busyPoses[name].x += -1;
        pushChars('west',this.x-1,this.y);
        this.x += -1;
      }
      else if (this.x === west && this.y > north){
        busyPoses[name].y += -1;
        pushChars('north',this.x,this.y-1);
        this.y += -1;
      }
      if (this.x === east && this.y === north){
        stay = true;
        setTimeout(function(){stay = false}, 1000*stayTime);
      }
      if (this.x === east && this.y === south){
        stay = true;
        setTimeout(function(){stay = false}, 1000*stayTime);
      }
      if (this.x === west && this.y === north){
        stay = true;
        setTimeout(function(){stay = false}, 1000*stayTime);
      };
      if (this.x === west && this.y === south){
        stay = true;
        setTimeout(function(){stay = false}, 1000*stayTime);
      }
    }
  }
  var stay = false;
  setInterval(action.bind(this),1000/walkSpeed);
}
