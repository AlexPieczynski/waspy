//the requests are made with google chrome
//API to work with the page scope
function sendAction(event) {
    var idx = document.getElementById("selectEffect").selectedIndex;
    event.data.data = idx;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: event.data.action,
            data: event.data.data
        }, function(response) {
            console.log("Response: " + response);
        });
    });
}

//setup the buttons to send actions
//via events
// once the document has loaded
// does the document mean the popup document? if so, this is almost certainly not necessary
$(document).ready(function(){
    // document.getElementById("selectEffect").onchange = function(){
    //     var idx = document.getElementById("selectEffect").selectedIndex;
    //     sendAction({action: "effectChange", data: idx});
    // }
    // $("#next-visualizer-button").click({action: "nextScene", data: null}, sendAction);
    // $("#previous-visualizer-button").click({action: "previousScene", data: null}, sendAction);
    $("#selectEffect").change({action: "effectChange", data: null}, sendAction);
});


// // TODO: expose effect parameters to the users?
// // called when the apply button is pressed
// // creates an tuna effect node and connects to video's sound
// // TODO: put these into an object or something instead of globals
// var context = new AudioContext();
// var tuna = new Tuna(context);
// window.src = null;

// function applyEffect()
// {
//     debugger;
//     var effectNode;
//     var idx = document.getElementById("selectEffect").selectedIndex;
//     if (window.src == null)
//     {
//         window.src = context.createMediaElementSource(document.getElementById("vid"));
//     }
    
//     switch(idx)
//     {
//         case 0:
//             effectNode = new tuna.Overdrive({
//                 outputGain: 0,         //0 to 1+
//                 drive: 0.4,              //0 to 1
//                 curveAmount: 0.5,          //0 to 1
//                 algorithmIndex: 2,       //0 to 5, selects one of our drive algorithms
//                 bypass: 0
//             });
//             break;
//         case 1:
//             effectNode = new tuna.Chorus({
//                 rate: 3.5,         //0.01 to 8+
//                 feedback: 0.8,     //0 to 1+
//                 delay: 0.0666,     //0 to 1
//                 bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
//             });
//             break;
//         case 2:
//             effectNode = new tuna.Delay({
//                 feedback: 0.45,    //0 to 1+
//                 delayTime: 150,    //1 to 10000 milliseconds
//                 wetLevel: 0.85,    //0 to 1+
//                 dryLevel: 1,       //0 to 1+
//                 cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
//                 bypass: 0
//             });
//             break;
//         case 3:
//             effectNode = new tuna.Tremolo({
//                 intensity: 0.7,    //0 to 1
//                 rate: 8,         //0.001 to 8
//                 stereoPhase: 0,    //0 to 180
//                 bypass: 0
//             });
//             break;
//         case 4:
//             effectNode = new tuna.Bitcrusher({
//                 bits: 4,          //1 to 16
//                 normfreq: 0.1,    //0 to 1
//                 bufferSize: 4096  //256 to 16384
//             });
//             break;
//         case 5:
//             effectNode = new tuna.Compressor({
//                 threshold: -25,    //-100 to 0
//                 makeupGain: 1,     //0 and up (in decibels)
//                 attack: 100,         //0 to 1000
//                 release: 0,        //0 to 3000
//                 ratio: 12,          //1 to 20
//                 knee: 40,           //0 to 40
//                 automakeup: false,  //true/false
//                 bypass: 0
//             });
//             break;
//         case 6:
//             //TODO: set up covolution reverb (put files into place)
//             break;
//         case 7:
//             effectNode = new tuna.WahWah({
//                 automode: true,                //true/false
//                 baseFrequency: 0.4,            //0 to 1
//                 excursionOctaves: 2,           //1 to 6
//                 sweep: 0.4,                    //0 to 1
//                 resonance: 40,                 //1 to 100
//                 sensitivity: 0.7,              //-1 to 1
//                 bypass: 0
//             });
//             break;
//         case 8:
//             window.src.disconnect();
//             window.src.connect(context.destination);
//             return;
//     }

//     window.src.disconnect();
//     window.src.connect(effectNode);
//     if (idx == 0){
//         debugger;
//         var lowerVolume = context.createGain();
//         lowerVolume.gain.value = 0.19;
//         effectNode.connect(lowerVolume);
//         lowerVolume.connect(context.destination);
//         return
//     }
//     effectNode.connect(context.destination);
// }

// // connect the functions to events
// debugger;
// document.addEventListener('DOMContentLoaded', function() {
//     console.log("you are adding the listener");
//     document.getElementById("selectEffect").onchange = applyEffect;
// });