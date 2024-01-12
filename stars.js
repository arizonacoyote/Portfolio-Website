
//loop through the area lengthwise by 2% divisions and .25% divisions on the height.  
//Use a fine enough grid and it should look entirely random.

let starPositions = [];

for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        let probabilityOfStar = .009 - (.0089 / (101 - x));  //a star becomes less probable towards the right
        if (Math.random() < probabilityOfStar) {
            starPositions.push([x, y]);
        }
    }
}

//loop through the array and make a div for each x,y coordinate representing a star.

let returnHtml = "";

for (let i = 0; i < starPositions.length; i++) {

    let whereToStart = Math.random();

    returnHtml += `<div class="stars" style="
    display: block;
    position:absolute;
    width: 2px;
    height: 2px; 
    left:${starPositions[i][0]}%; 
    top:${starPositions[i][1]}%;
    background: white;
    opacity: ${whereToStart > .5 ? .2 : 1};
    animation-name: starSparkle;
    animation-duration: ${2 + Math.random()}s;
    animation-iteration-count: infinite;
    animation-direction: ${whereToStart > .5 ? 'alternate-reverse' : 'alternate'};
    animation-delay:${3 * Math.random()}s;"></div>`
}



document.getElementById('starArea').innerHTML = returnHtml;


//a random shooting star with a random starting position and trajectory

setInterval(function () {
    let starRef = document.getElementById("shootingStar");
    if ((Math.random() > .9) && (starRef.style.display != 'block')) {

        let startPctX = Math.floor(100 * Math.random());
        let startPctY = Math.floor(100 * Math.random());
        let moveX = Math.floor(100 * Math.random());
        let moveY = Math.floor(100 * Math.random());
        starRef.style.display = 'block';
        starRef.style.top = `${moveX}%`;
        starRef.style.left = `${moveY}%`;

        //seems a delay is needed to trigger the transition effect with CSS
        setTimeout(function () {
            starRef.style.top = `${startPctY}%`;
            starRef.style.left = `${startPctX}%`;
        }, 10);



        setTimeout(function () {
            starRef.style.display = 'none';
        }, 2900);



    }

}, 140);

