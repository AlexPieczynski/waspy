// handles building the sliders interface to control Tuna's 

function insertSliders(effectNode)
{
	debugger;
	var sliderDiv = document.getElementById("slider-div");
	while (sliderDiv.hasChildNodes()) {
		    sliderDiv.removeChild(sliderDiv.lastChild);
	}

	// we just changed the effect to "None"
	// hide the sliders
	if (effectNode) {
		sliderDiv.style.display = "";
	}
	else {
		sliderDiv.style.display = "none";
		return;
	}

	var params = effectNode.defaults;
	for (var paramName in params)
	{
		if(paramName == "bypass") continue; //ignore this, or turn it into a checkbox??
		var param = params[paramName];

		// create HTML5 slider
		var slider = document.createElement("input");
		slider.type = "range";
		slider.id = paramName;
		slider.defaultValue = param.value;
		slider.min = param.min;
		slider.max = param.max;
		slider.value = param.value;
		slider.step = 0.025;
		slider.addEventListener("input", sliderChange); // change to "change" listener if gets too laggy

		// create output text
		var out = document.createElement("output");
		out.name = paramName + "output";
		out.id = paramName + "Out";
		out.for = paramName;
		out.value = param.value;

		// insert HTML nodes
		var para = document.createElement("p");
		para.appendChild(document.createTextNode(paramName));
		para.appendChild(slider);
		para.appendChild(out);
		sliderDiv.appendChild(para);
	}
}

// update the output
function sliderChange(event)
{
	var newVal = event.srcElement.value;
	var paramName = event.srcElement.id;
	document.getElementById(paramName + "Out").value = newVal;
	vis.effectNode[paramName] = newVal;
}
