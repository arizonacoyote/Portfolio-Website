
/*document.getElementById('wave1').innerHTML =`<polygon id="wave1" points="${waveGenerator(0,20,1,50,100,300,200)}"
        style="fill:#FAFAFA;stroke:grey;stroke-width:3;fill-rule:evenodd;" />
        Sorry, your browser does not support inline SVG. ;`
*/
document.getElementById('waveTriggerArea').addEventListener('mouseover', () => {
    if (impulseCount > 120 || impulseCount == 0) {
        impulseTrigger = true;
        impulseCount = 0;
    }
});

window.addEventListener('resize', function () {
    //"use strict";

    defaultPeriod = Math.round(window.innerWidth/1920);  //reduce period of impulse wave on resize
    
    window.location.reload();
    console.log('resize function triggered');
    let icons = document.querySelectorAll('.topLogo');

    for(let i = 0; i<icons.length; i++){
        console.log('icon ref: ', icons[i].style.left);
        icons[i].style.left = `${20+(60*Math.random())}%`;
        
    }

    
});

var previousMousePositionsX = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];  //need an array of some length greater than 1.
var previousMousePositionsY = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
var currentVelocityValueY = 0.1;
var currentVelocityValueX = 0.1;
var currentMousePositionX = 1;
var currentMousePositionY = 1;
var phaseX = 0;
var phaseY = 0;
var defaultDivisions = 140;       //needs to be an even number
var defaultPeriod = 4;           //also, frequency
var impulseTrigger = false;
var impulseCount = 0;
var impulseArray = [];

var impulseTriggerLeft = false;
var impulseArrayLeft = [];
var impulseCountLeft = 0;

var impulseTriggerRight = false;
var impulseArrayRight = [];
var impulseCountRight = 0;

var compositeWaveformCopy = [];

//create a decaying sinusoid for convolving to generate impulse effects
var decayingSinusoid = [];
for (let i = 0; i <= (2 * defaultDivisions); i++) {  //281 divisions
    let value = (-1 * (Math.sin((2 * i * defaultPeriod * (Math.PI) / defaultDivisions))));
    if (i != defaultDivisions) {
        value = (300 * value) / ((i + 15) * (i + 15));        //decay with the square, but not the steepest part of the 1/x^2 curve
        decayingSinusoid.push(value);
    }

}


//another decaying sinusoid, but not as pronounced
var decayingSinusoidGentle = [];
for (let i = 0; i <= (2 * defaultDivisions); i++) {  //281 divisions
    let value = (-1 * (Math.sin((2 * i * defaultPeriod * (Math.PI) / defaultDivisions))));
    if (i != defaultDivisions) {
        value = (400 * value) / ((i + 35) * (i + 35));        //decay with the square, but not the steepest part of the 1/x^2 curve
        decayingSinusoidGentle.push(value);
    }

}


function waveGenerator(phase, amplitude, frequency, divisions, yOffset, areaWidth, areaHeight) {
    let waveArray = [];
    for (let i = 0; i <= divisions + 1; i++) {
        let value = (amplitude * (Math.sin((2 * i * frequency * (Math.PI) / (divisions + 1)) + phase))) + yOffset;
        if (i < (divisions)) {
            waveArray.push([(i * areaWidth / (divisions)), value]);

        }
        else if (i == divisions){
            waveArray.push([areaWidth, value]); //last entry extends the full length
        }
        else {
            waveArray.push([((i - 1) * areaWidth) / (divisions), areaHeight]);  //go to the bottom right
        }
    }
    waveArray.push([0, areaHeight]);  //go to the bottom left
    return waveArray;

}

//8888888888888888888888888888888888888888888888888888888888888888888 Track Mouse Velocity 888888888888888888888888888888888888888888888888888888888888888888 */

//Track the current position of the cursor.  Everytime it moves, the coordinates are updated.  Might be inefficient.

document.querySelector('body').addEventListener('mousemove', (e) => {
    currentMousePositionY = e.clientY;
    currentMousePositionX = e.clientX;
})



setInterval(function movingAverageMouseVelocityInArea() {

    //get a value for the average velocity of the cursor in the vertical direction over a period of velocity samples. 
    // Sum all the 'recent' movement velocity readings.  But in summing the movements, give less weight to readings
    //that were taken further in the past, so that there aren't abrupt transitions when a large velocity value exits the array of sampled velocities.

    let iterations = 50;

    let currentX = [1, currentMousePositionX];
    let currentY = [1, currentMousePositionY];




    if (previousMousePositionsX.length >= iterations) {
        previousMousePositionsX.push(currentX);  //if the array is 'full' take one entry off the 'front' (at the zero-index) for every entry pushed to the 'back'.
        previousMousePositionsX.shift();
        previousMousePositionsY.push(currentY);
        previousMousePositionsY.shift();
    }
    else {
        previousMousePositionsX.push(currentX);
        previousMousePositionsY.push(currentY);
    }



    //windowed velocity y   
    let sumOfIncrementalVelocityY = 0;
    for (let i = previousMousePositionsY.length - 1; i > 0; i--) {
        let j = i - 1;
        let deltaPosition = Math.abs(previousMousePositionsY[i][1] - previousMousePositionsY[j][1]);
        let deltaTime = 1;
        let incrementalVelocity = deltaPosition / deltaTime;
        sumOfIncrementalVelocityY = sumOfIncrementalVelocityY + (.1 * Math.pow(i, 1.0) * incrementalVelocity);   //a weighted sum decreasing in weight with time
    }

    currentVelocityValueY = sumOfIncrementalVelocityY;


    //windowed velocity x
    let sumOfIncrementalVelocityX = 0;
    for (let k = previousMousePositionsX.length - 1; k > 0; k--) {
        let j = k - 1;
        let deltaPosition = Math.abs(previousMousePositionsX[k][1] - previousMousePositionsX[j][1]);
        let deltaTime = 1;                     // use 'previousMousePositionsY[i][0]-previousMousePositionsY[j][0];' if actual velocity is desired.
        let incrementalVelocity = deltaPosition / deltaTime;
        sumOfIncrementalVelocityX = sumOfIncrementalVelocityX + (.1 * Math.pow(k, 1.1) * incrementalVelocity);   //a weighted sum decreasing in weight with time
    }
    currentVelocityValueX = sumOfIncrementalVelocityX;

}, 50
)


//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

//Trigger redraws of the waves every 50ms.
setInterval(function () {
    let passVar = {
        offsetY: currentMousePositionY,
        offsetX: currentMousePositionX
    };

    phaseX = phaseX + ((2 * 3.1416) / 70);  //increment these global variables every time the function is run
    phaseY = phaseY + ((2 * 3.1416) / 40);
    changeWave(passVar);

    // trigger and control the central impulse wave redrawings, or 'convolutions' 
    if (impulseTrigger) {
        if (impulseCount < defaultDivisions) {              //the impulse trigger variable 'impulseTrigger' is set on a mouseover event.  The eventListener is at the top of the pg.
            impulseWaveGenerator();
        }
        else {
            impulseCount = 0;
            impulseTrigger = false;
            impulseArray = [];                               //clear out the impulse array
            for (let i = 0; i < defaultDivisions + 2; i++) {      //reset the impulse array
                impulseArray.push(0);
            };

        }
    }



    //continuously generate waves from the left and the right, with small random pauses between each cycle
    if (impulseTriggerLeft == false) {
        let randomLeft = Math.random();
        if (randomLeft > .95) {
            impulseTriggerLeft = true;
        }
    }
    if (impulseTriggerRight == false) {
        let randomRight = Math.random();
        if (randomRight > .90) {
            impulseTriggerRight = true;
        }
    }

    // trigger and control the left-side impulse wave redrawings, or 'convolutions' 
    if (impulseTriggerLeft) {
        if (impulseCountLeft < (2 * defaultDivisions)) {
            impulseWaveGeneratorLeft();
        }
        else {
            impulseCountLeft = 0;
            impulseTriggerLeft = false;
            impulseArrayLeft = [];                               //clear out the impulse array
            for (let i = 0; i < defaultDivisions + 2; i++) {      //reset the impulse array
                impulseArrayLeft.push(0);
            };

        }
    }

    // Right side
    if (impulseTriggerRight) {
        if (impulseCountRight < (2 * defaultDivisions)) {
            impulseWaveGeneratorRight();
        }
        else {
            impulseCountRight = 0;
            impulseTriggerRight = false;
            impulseArrayRight = [];                               //clear out the impulse array
            for (let i = 0; i < defaultDivisions + 2; i++) {      //reset the impulse array
                impulseArrayRight.push(0);
            };

        }
    }

    //update the positions of icons
    triggerLogoUpdate();

}, 40);

//888888888888888888888888888888888888888888888888888888888888888888  make an impulse wave in the middle of the screen   888888888888888888888888888888888888888888888888888

//start with a flat impulse array on loading.  Make sure it has as many entries as the other arrays with which it is added to generate the output. 
for (let i = 0; i < defaultDivisions + 2; i++) {
    impulseArray.push(0);

};


//A function to generate an array of points to add to the combination of waves used to draw the topside of the svg for each animation frame.
//convolve the 'decayingSinusoid' array onto the 'Impulse Array'. Both global variables.  Shift the entire decaying sinusoid over one each iteration, or animation frame.
function impulseWaveGenerator() {
    let positionOnImpulseArray = 0;
    if (impulseCount <= 140) {
        positionOnImpulseArray = 70 + impulseCount;  //where to start drawing each animation frame.
    }
    else {
        positionOnImpulseArray = 140;              //don't add extra entries to the array.  After reaching the last entry in the array, start from that entry.
        //The 'impulseCount' will be used to change which entries on the 'decayingSinusoid' array are 'copied'.
    }

    //start with an array with an appropriate number of entries, all equal to zero.  Each iteration, increase the number of entries altered with the values from the 
    //decaying sinusoid waveform.
    for (let i = positionOnImpulseArray; i >= 70; i--) {
        impulseArray[i] = (40 / (impulseCount + 20)) * decayingSinusoid[(impulseCount - i + 70)]; //The (40/(impulseCount+20)) reduces the amplitude as it moves from the origin.
        impulseArray[(i - 1 - (2 * (i - 70)))] = (40 / (impulseCount + 20)) * decayingSinusoid[(impulseCount - i + 70)]; // mirror the value along the y-axis.
    }

    impulseCount++;  //increment the positon 

}

//888888888888888888888888888888888888888888888888888888888888888888888  Make an impulse wave off-screen.  Left and right  8888888888888888888888888888888888888888888
//start with a flat impulse array on loading.  Make sure it has as many entries as the other arrays with which it is added to generate the output. 
for (let i = 0; i < defaultDivisions + 2; i++) {      //an extra two entries to equal the length of the final array, set to zero to not affect these svg point coordinates.
    impulseArrayLeft.push(0);

};

function impulseWaveGeneratorLeft() {

    let positionOnImpulseArrayLeft = 0;
    if (impulseCountLeft <= (defaultDivisions)) {
        positionOnImpulseArrayLeft = impulseCountLeft;  //where to start drawing each animation frame.
    }
    else {
        positionOnImpulseArrayLeft = defaultDivisions;
    }

    for (let j = 0; j < positionOnImpulseArrayLeft; j++) {
        impulseArrayLeft[j] = decayingSinusoidGentle[(impulseCountLeft - j)];
    }
    impulseCountLeft++;
}


for (let i = 0; i < defaultDivisions + 2; i++) {      //an extra two entries to equal the length of the final array, set to zero to not affect these svg point coordinates.
    impulseArrayRight.push(0);
};

function impulseWaveGeneratorRight() {
    let positionOnImpulseArrayRight = 0;
    if (impulseCountRight <= (2 * defaultDivisions)) {
        positionOnImpulseArrayRight = impulseCountRight;  //where to start drawing each animation frame.
    }
    else {
        positionOnImpulseArrayLeft = defaultDivisions;
    }

    for (let j = 0; j <= impulseCountRight; j++) {
        impulseArrayRight[(defaultDivisions - j)] = decayingSinusoidGentle[(impulseCountRight - j)];
    }
    impulseCountRight++;
}


//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

//set the width of the screen intially.  Check every half sec for a screen re-size.
var widthOfRoot = document.querySelector(':root').clientWidth;
setInterval(function () {
    widthOfRoot = document.querySelector(':root').clientWidth;
    console.log('widthOfRoot: ', widthOfRoot);
    document.getElementById('wave1').style.width = `${widthOfRoot}px`;
}, 500)


function changeWave(e) {
    let velocityY = 2 + (.0005 * currentVelocityValueY)
    let periodRight = Math.round(widthOfRoot*15/1920);  //reduce the period for smaller screen widths.
    let periodLeft = 1;


    // 139 divisions required to fill the whole screen. 
    // Corrects an earlier error which left an empty space on the right side.
    // waveGenerator(phase, amplitude, frequency, divisions, yOffset, areaWidth, areaHeight) 
    let waveRightward = waveGenerator(phaseX, velocityY, periodRight, 139, 0, widthOfRoot, window.innerHeight);  //ensure the length, or 'divisions' variables are the same or all waves
    let waveLeftward = waveGenerator(phaseX, velocityY, periodLeft, 139, 0, widthOfRoot, window.innerHeight);   //only one wave should have the y-offset of half the screen.

    //remove the impulse and rightward and leftward components on small screens, as it doesn't look natural.
    let smallScreenRemove;
    widthOfRoot < 1200? smallScreenRemove = 0: smallScreenRemove = 1;

    let combinedWaveStr = "";
    compositeWaveformCopy = [];
    for (i = 0; i < waveRightward.length; i++) {

        let combinedEntryValue = (             //add the different waves together
            (2 * waveRightward[i][1]) +
            (2 * waveLeftward[i][1]) +
            (70 * smallScreenRemove * impulseArray[i]) +
            (velocityY * 20 * smallScreenRemove * impulseArrayLeft[i]) +
            (velocityY * 20 * smallScreenRemove * impulseArrayRight[i])) +
            ((1 / 3) * (window.innerHeight));

        compositeWaveformCopy.push(2 * waveLeftward[i][1]);  //used to provide a vertical motion to the horizontally moving logos in logos.js
        let combinedEntry = `${waveRightward[i][0]},${combinedEntryValue} `;  //waveRightward is only used for the x value it contains
        combinedWaveStr += combinedEntry;
    }




    document.getElementById('wave1').innerHTML = ` 
    <svg id="wave2" style="margin-left:0; margin-right:0" width="${widthOfRoot}" height="${(.76) * (window.innerHeight)}">    
        <polygon id="wave1" points="${combinedWaveStr}"
        style="fill:#002C47;stroke:#002C47;stroke-width:1;fill-rule:evenodd;" />
        Sorry, your browser does not support inline SVG. ; 
    </svg>`
}


