/*
	handles building the sliders interface to control Tuna's effect parameters
*/


// insert sliders to control a new Tuna effect
function insertSliders(effectNode)
{
	var sliderDiv = document.getElementById("slider-div");
	while (sliderDiv.hasChildNodes()) {
		    sliderDiv.removeChild(sliderDiv.lastChild);
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
		slider.min = param.min;
		slider.max = param.max;
		slider.step = 0.025; // scale this according to min/max/**/
		slider.defaultValue = param.value;
		slider.value = param.value;
		slider.addEventListener("input", sliderChange);

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

// update Tuna param and <output>
// runs whenever a slider's value changes
function sliderChange(event)
{
	var newVal = event.srcElement.value;
	var paramName = event.srcElement.id;
	document.getElementById(paramName + "Out").value = newVal;
	vis.effectNode[paramName] = newVal;
}
