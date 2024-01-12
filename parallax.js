/*
let parallaxTrigger = false;

window.addEventListener('scroll', () => { parallaxTrigger = true; });

setInterval(function () {
    if (parallaxTrigger == true) {
        window.requestAnimationFrame(parallax);
    }
}, 5)
*/

window.requestAnimationFrame(parallax);


function parallax() {

    parallaxTrigger = false;  //don't trigger this if there hasn't been a scroll event.
    var scrolled = window.pageYOffset;


    //This parallax effect was too janky.  Especially in Chrome.

    //make the mountain-like shapes move on a scroll down. Different rates.
    var rate1 = 0;// -scrolled * 4;
    var rate2 = 0;//-scrolled * .75;
    //  document.querySelector('#waveContainer').style.transform=`translate3d(0px,${scrolled}px,0px)`;
    // document.getElementById('diagonalBack').style.transform = `translate3d(${rate1}px,${.8 * scrolled}px,0px)`;
    // document.getElementById('diagonalBack2').style.transform = `translate3d(${rate2}px,${.8 * scrolled}px,0px)`;
    // document.getElementById('starArea').style.transform = `translate3d(${rate2}px,${scrolled}px,0px)`;
    // document.getElementById('cloud1').style.transform = `translate3d(${rate1}px,${scrolled}px,0px)`;
    // document.getElementById('cloud3').style.transform = `translate3d(${2 * rate1}px,${scrolled}px,0px)`;
    // document.getElementById('cloud4').style.transform = `translate3d(${rate1}px,${scrolled}px,0px)`;
    // document.getElementById('cloud5').style.transform = `translate3d(${.6 * rate1}px,${scrolled}px,0px)`;

    //make the headline text move after scrolling 100px
    var waitup = 25;
    var rate3 = 0;
    if (scrolled >= waitup) {
        rate3 = scrolled - waitup;
    }

    //  document.getElementById('headlineText').style.transform = `translate3d(${rate1}px,${scrolled}px,0px)`;
    let icons = document.querySelectorAll('.fab');
    let topLevelIcons = document.querySelectorAll('.topLogo');



    //when the scrolling offset passes the 300px position going down, turn off the icons.
    //when the offset passes 300 in the other direction, turn the icons on, and position them.
    if ((scrolled > 300) && (icons[1].style.visibility != 'hidden')) {
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.visibility = 'hidden';
            icons[i].style.opacity = '0';

        }
    }
    else if ((scrolled < 300) && (icons[1].style.visibility != 'visible')) {
        //make sure the project modal is closed if one scrolls towards the top (removed this altogether and put it into a dedicated html page)
        //  document.getElementById('patientManagementModal').style.display = 'none';
        //  document.getElementById("darkOverlay").style.display = "none";

        for (let i = 0; i < icons.length; i++) {
            icons[i].style.visibility = 'visible';
            icons[i].style.opacity = '1';

        }

    }

    //show the text and extendable project cards after scrolling more than 300px
    if (scrolled > 300) {
        document.getElementById('summaryText').style.visibility = 'visible';
        document.getElementById('summaryText').style.opacity = '1';

    }
    else {
        document.getElementById('summaryText').style.visibility = 'hidden';
        document.getElementById('summaryText').style.opacity = '0';
    }

    window.requestAnimationFrame(parallax);   //Using scroll events isn't performant.  This appears to improve smoothness.  
    //Call the requestAnimationFrame() once to start, then everytime the called function's work is completed. 



}