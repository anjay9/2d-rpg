function createNpcs(){

  function createNpc(name,img,x,y){
    npcs[name] = new npc(img,x,y);
    busyPoses[name] = {x:x,y:y};
  }

  createNpc('smith','img_char_smith',9,14);
  npcs.smith.addBuyImg();
  createNpc('lord','img_char_lord',19,0);
  createNpc('bodyguard0','img_char_armour_01_royal',18,0);
  createNpc('bodyguard1','img_char_armour_01_royal',18,7);
  createNpc('bodyguard2','img_char_armour_01_royal',20,7);
  createNpc('bodyguard3','img_char_armour_01_royal',20,10);
  npcs.bodyguard3.circularPatrol('bodyguard3',9,15,14,20,1.5,60);
}
