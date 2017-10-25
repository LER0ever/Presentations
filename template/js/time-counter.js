var TimerRunning = 0;
var TimerStart = function()
{
    if (TimerRunning == 0){
        StartTimeCounter(0);
        TimerRunning = 1;
    }
}
var StartTimeCounter = function(count)
{
    document.getElementById('time-counter').innerText=count
    t=setTimeout("StartTimeCounter("+(count + 1).toString()+")",1000)
}
