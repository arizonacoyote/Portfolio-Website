
var directionObject = {             //a way to keep track of the current logo movement direction
    htmlLogoDir: "right",
    jsLogoDir: "right",
    reactLogoDir: "right",
    cssLogoDir: "right",
    nodeLogoDir: "right",
    bootstrapLogoDir: "right",
    sassLogoDir: "right"
}






function triggerLogoUpdate() {
    //updateLogoPositon(logoId, startingPositionY,speed,waveCoefficient,wave,directionKey){
    //starting position in the x direction is set in the .css file ('left' property).


    let offset10 = .05;   //offset is a percentage of the waveContainer height.  Offset is in the y-direction.
    let offsetneg10 = -.05;

    updateLogoPositon('htmlLogo', offset10, 1.5, .1, compositeWaveformCopy, "htmlLogoDir");
    updateLogoPositon('jsLogo', offsetneg10, 1, .3, compositeWaveformCopy, "jsLogoDir");
    updateLogoPositon('reactLogo', 0, 1.5, .2, compositeWaveformCopy, "reactLogoDir");
    updateLogoPositon('cssLogo', 0, 3, .4, compositeWaveformCopy, "cssLogoDir");
    updateLogoPositon('nodeLogo', 0, 2.25, .1, compositeWaveformCopy, "nodeLogoDir");
    updateLogoPositon('bootstrapLogo', offset10, 3, .6, compositeWaveformCopy, "bootstrapLogoDir");
    updateLogoPositon('sassLogo', offset10, 3.75, .4, compositeWaveformCopy, "sassLogoDir");

}

function updateLogoPositon(logoId, startingPositionY, speed, waveCoefficient, wave, directionKey) {
    let rectLeft = window.scrollX + document.getElementById(logoId).getBoundingClientRect().left;
    let rect = document.getElementById(logoId).getBoundingClientRect();
    let container = document.getElementById('waveContainer').getBoundingClientRect();

    let waveArr = wave;
    waveArr.pop();
    waveArr.pop();     //remove the last two entries in the array used for the wave SVG coordinates

    let increment = (widthOfRoot) / (waveArr.length);  //widthOfRoot defined in index.js. The position on the array that corresponds to the position of the logo.

    if (!(rectLeft < 10000)) {                     //if the initial position isn't a number, set it to zero.

        currentLeftOffset = 0;
    };


    //set the direction of the moving logo
    if (rectLeft >= ((widthOfRoot) - (3 * (rect.width)))) {
        directionObject[directionKey] = "left";
    }

    if (rectLeft <= (.2 * (rect.width))) {
        directionObject[directionKey] = "right";
    }



    let newLeftOffset = 0;
    if (directionObject[directionKey] == 'left') {
        newLeftOffset = (parseInt(rectLeft)) - speed;

    }
    else if (directionObject[directionKey] == 'right') {
        newLeftOffset = (parseInt(rectLeft)) + speed;

    }
    else {
        console.log('an error occurred determining the direction of the logo for id: ', logoId)
    }


    let bottomOfWaveContainer = document.getElementById('ledge').getBoundingClientRect().bottom;
    let logoOffset = bottomOfWaveContainer - ((startingPositionY) * container.height);     //offset below the 'ledge'


    let waveArrEntry = Math.round((newLeftOffset) / (increment));
    let newBottomOffset = logoOffset + window.scrollY + (waveCoefficient * (waveArr[waveArrEntry]));         // alter the y position according to the 'surface' waveform. Dampen the effect of the wave by 'waveCoefficient'       


    let output = `${newLeftOffset}px`;
    let topOutput = `${newBottomOffset}px`;
    document.getElementById(logoId).style.left = output;
    document.getElementById(logoId).style.top = topOutput;

}