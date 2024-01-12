
//first card
document.getElementById('work-content1').addEventListener('mouseenter',()=>{
    document.getElementById("waveTriggerArea").style['pointer-events']='none'  //hovering on this area will cause the menu to retract on small screens when the menu and trigger area overlap.  This removes the trigger.
    let elemHeightStart = document.getElementById('work-content1').getBoundingClientRect().height;  //get current height of element
    document.getElementById('work-content1').style.height=`${elemHeightStart}px`;  //the start value is auto.  Need to set it to a number for a smooth transition.
    document.getElementById('work-content-text1').style.opacity='0';
    document.getElementById('work-content-text1').style.display='block'
    let textElementHeight = document.getElementById('work-content-text1').getBoundingClientRect().height;  //get height of block containing text after displaying
    let newHeight = `${elemHeightStart+textElementHeight}px`;
    document.getElementById('work-content1').style.height = newHeight;  //change the height value in order to trigger the CSS transistion.
    
    let displayText1 = setTimeout(()=>{  //give the display area time to transition in size
        document.getElementById('work-content-text1').style.opacity='1';
    },900);

    document.getElementById('work-content1').addEventListener('mouseleave',()=>{
        clearTimeout(displayText1);  //prevent the text from displaying if the mouse pointer leaves too quickly.  Otherwise the text may display, and not be removed.
        document.getElementById("waveTriggerArea").style['pointer-events']='auto';  //restart the wave event trigger.
        document.getElementById('work-content-text1').style.display='none';
        document.getElementById('work-content1').style.height = `${elemHeightStart}px`;  //set the height to the starting height
        setTimeout(()=>{
            document.getElementById('work-content1').style.height='auto';   //set the height back to auto because problems occur on re-sizing
        },1000);
        });


})



//second card
document.getElementById('work-content2').addEventListener('mouseenter',()=>{
    document.getElementById("waveTriggerArea").style['pointer-events']='none'  //hovering on this area will cause the menu to retract on small screens when the menu and trigger area overlap.  This removes the trigger.
    let elemHeightStart = document.getElementById('work-content2').getBoundingClientRect().height;  //get current height of element
    document.getElementById('work-content2').style.height=`${elemHeightStart}px`;  //the start value is auto.  Need to set it to a number for a smooth transition.
    document.getElementById('work-content-text2').style.opacity='0';
    document.getElementById('work-content-text2').style.display='block'
    let textElementHeight = document.getElementById('work-content-text2').getBoundingClientRect().height;  //get height of block containing text after displaying
    let newHeight = `${elemHeightStart+textElementHeight}px`;
    document.getElementById('work-content2').style.height = newHeight;  //change the height value in order to trigger the CSS transistion.

    let displayText2 = setTimeout(()=>{
        document.getElementById('work-content-text2').style.opacity='1';
    },900);

    document.getElementById('work-content2').addEventListener('mouseleave',()=>{
        clearTimeout(displayText2);  //prevent the text from displaying if the mouse pointer leaves too quickly.  Otherwise the text may display, and not be removed.
        document.getElementById("waveTriggerArea").style['pointer-events']='auto';
        document.getElementById('work-content-text2').style.display='none';
        document.getElementById('work-content2').style.height = `${elemHeightStart}px`;  //set the height to the starting height
        setTimeout(()=>{
            document.getElementById('work-content2').style.height='auto';   //set the height back to auto because problems occur on re-sizing
        },1000);
        });
})






//third card
document.getElementById('work-content3').addEventListener('mouseenter',()=>{
    document.getElementById("waveTriggerArea").style['pointer-events']='none'  //hovering on this area will cause the menu to retract on small screens when the menu and trigger area overlap.  This removes the trigger.
    let elemHeightStart = document.getElementById('work-content3').getBoundingClientRect().height;  //get current height of element
    document.getElementById('work-content3').style.height=`${elemHeightStart}px`;  //the start value is auto.  Need to set it to a number for a smooth transition.
    document.getElementById('work-content-text3').style.opacity='0';
    document.getElementById('work-content-text3').style.display='block';
    let textElementHeight = document.getElementById('work-content-text3').getBoundingClientRect().height;  //get height of block containing text after displaying
    let newHeight = `${elemHeightStart+textElementHeight}px`;
    document.getElementById('work-content3').style.height = newHeight;  //change the height value in order to trigger the CSS transistion.

   let displayText3 =  setTimeout(()=>{
        document.getElementById('work-content-text3').style.opacity='1';
        
    },900);

    document.getElementById('work-content3').addEventListener('mouseleave',()=>{
        clearTimeout(displayText3);  //prevent the text from displaying if the mouse pointer leaves too quickly.  Otherwise the text may display, and not be removed.
        document.getElementById("waveTriggerArea").style['pointer-events']='auto'
        document.getElementById('work-content-text3').style.display='none';
        document.getElementById('work-content3').style.height = `${elemHeightStart}px`;  //set the height to the starting height
        setTimeout(()=>{
            document.getElementById('work-content3').style.height='auto';   //set the height back to auto because problems occur on re-sizing
        },1000);

        });

})

