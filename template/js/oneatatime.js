/**
 * When entering a "oneatatime" step, add the keyboard event listener
 */
function oneatatime_enter(event)
{
    // check if current slide has the class
    if(!event.target.classList.contains("oneatatime"))
        return;
    oneatatime_step = event.target;
    document.addEventListener("keyup", oneatatime_press, true);
}

/**
 * When leaving a "oneatatime" step, remove the keyboard event listener
 */
function oneatatime_leave(event)
{
    // check if current slide has the class
    if(!event.target.classList.contains("oneatatime"))
        return;
    document.removeEventListener("keyup", oneatatime_press, true);
}

/**
 * Handler for keyboard events on a "oneatatime" step
 */
function oneatatime_press(event)
{
    // check keycode (use default action if it doesn't match)
    // if key is tab, pagedown, left arrow or down arrow
    if(event.keyCode == 9 || event.keyCode == 34 || event.keyCode == 39 || event.keyCode == 40)
    {
        // get all list items on the current step
        var elements = oneatatime_step.querySelectorAll("div.step > *:not(.notes) li");
        console.log(elements);
        // show next element
        for(var i = 0; i < elements.length; i++)
        {
            var element = elements[i];
            // check if this element is already shown
            if(element.classList.contains("show"))
            {
                continue;
            }
            else
            {
                // show the element and inhibit the impress.js keyboard event handler
                element.classList.add("show");
                event.stopImmediatePropagation();
                return;
            }
        }
        // if all elements are shown, let impress.js advance to the next step
        // if the step has the class "hide-past", then hide the items again
        // if not, just leave them visible so it's easier to navigate backwards e.g. when answering questions
        if(oneatatime_step.classList.contains("hide-past"))
        {
            for(var i = 0; i < elements.length; i++)
            {
                elements[i].classList.remove("show");
            }
        }
    }
}

// variable holding the currently active div.step element
var oneatatime_step;
// add event listeners
document.getElementById("impress").addEventListener("impress:stepenter", oneatatime_enter, false);
document.getElementById("impress").addEventListener("impress:stepleave", oneatatime_leave, false);

// if loaded in an iframe (e.g. the speaker console), add a CSS class to the body so we can show all list items by default
if (window.top != window.self || window.top.document.documentElement.id == "impressconsole")
{
    document.body.classList.add("in-iframe");
    console.log("Loaded in iFrame!");
}