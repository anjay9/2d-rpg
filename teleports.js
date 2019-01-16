function createTeleports(){
    function teleport(imgType,xFirstEnter,yFirstEnter,xFirstLeave,yFirstLeave,xSecondEnter,ySecondEnter,xSecondLeave,ySecondLeave){
        this.img = document.getElementById('img_tp_'+imgType);
        this.xFirstEnter = xFirstEnter;
        this.yFirstEnter = yFirstEnter;
        this.xFirstLeave = xFirstLeave;
        this.yFirstLeave = yFirstLeave;
        this.xSecondEnter = xSecondEnter;
        this.ySecondEnter = ySecondEnter;
        this.xSecondLeave = xSecondLeave;
        this.ySecondLeave = ySecondLeave;
    }
    teleports.testport = new teleport('blue',16,11,15,11,24,19,24,18);
}

function checkTeleports(){
    for (prop in teleports){
        if (xPos === teleports[prop].xFirstEnter && yPos === teleports[prop].yFirstEnter){
            xPos = teleports[prop].xSecondLeave;
            yPos = teleports[prop].ySecondLeave;
            // at the moment, works only for all positive xs and ys 
            var xDifference = teleports[prop].xFirstEnter - teleports[prop].xSecondLeave
            var yDifference = teleports[prop].yFirstEnter - teleports[prop].ySecondLeave
            xCS += xDifference;
            yCS += yDifference;
        }
        else if (xPos === teleports[prop].xSecondEnter && yPos === teleports[prop].ySecondEnter){
            xPos = teleports[prop].xFirstLeave;
            yPos = teleports[prop].yFirstLeave;
            // at the moment, works only for all positive xs and ys
            var xDifference = teleports[prop].xSecondEnter - teleports[prop].xFirstLeave
            var yDifference = teleports[prop].ySecondEnter - teleports[prop].yFirstLeave
            xCS += xDifference;
            yCS += yDifference;
        }
    }
}