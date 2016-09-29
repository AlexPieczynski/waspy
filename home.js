function submitButton()
{
	var videoURL = document.getElementById("videoURL").value;
	videoURL = videoURL.replace("watch?v=","embed/");
	document.getElementById("youtubeDiv").setAttribute("style", "");
	document.getElementById("youtubeVid").setAttribute("src", videoURL);
}

function playLocal()
{
	document.getElementById("vidPlayer").setAttribute("style", "");
	var localVid = document.getElementById("vid");
	localVid.play();
	
	var context = new webkitAudioContext();
	var gainNode = context.createGain();
	gainNode.gain.value = 100;                   // Change Gain Value for more distortion
	filter = context.createBiquadFilter();
	filter.type = 1;                          // Change Filter type to test
	filter.frequency.value = 5040;            // Change frequency to test 5040
	
	var source = context.createMediaElementSource(localVid);
	source.connect(gainNode);
	gainNode.connect(filter);
	filter.connect(context.destination);
}

function fileUpload()
{
	var file = document.getElementById("fileUpload").value;
	var audio = new Audio('test.mp3');
	audio.play();
}