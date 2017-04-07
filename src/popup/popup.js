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
$(document).ready(function(){
    $("#selectEffect").change({action: "effectChange", data: null}, sendAction);
});
