if ( use_touch_controls === true ) {
    document.getElementById("touch-control-left").addEventListener("click", impress().prev, true);
    document.getElementById("touch-control-right").addEventListener("click", impress().next, true);
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener("click", function (evt) {evt.stopImmediatePropagation();}, true);
}

// from http://stackoverflow.com/a/23230280

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 30 ) {
            impress().next();
        } else if (xDiff < -30 ) {
            impress().prev();
        }                       
    } else {
        if ( yDiff > 30 ) {
            /* up swipe */ 
        } else if ( yDiff < -30 ) { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
