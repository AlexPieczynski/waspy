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
	document.getElementById("vid").play();
}

function fileUpload()
{
	var file = document.getElementById("fileUpload").value;
	var audio = new Audio('test.mp3');
	audio.play();
}