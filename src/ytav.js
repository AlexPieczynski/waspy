//the visualization var, global
var vis;

function barsScene(barsColor, backgroundColor, backgroundOpacity) {
    //the instance
    var inst = this;

    //the scene name
    inst.name = "Bars";

    //the bars color
    inst.barsColor = barsColor || 0xfc3030;

    //background color
    inst.backgroundColor = backgroundColor || 0x000000;

    //background opacity
    inst.backgroundOpacity = backgroundOpacity || 0;

    //exclude some "dead bars"
    inst.excludeRatio = 33;

    //renders the scene, using the container, graphics, renderer & freqDataArray
    inst.render = function(c, g, r, d) {
        //the animation

        //a constant to calculate the bar width responsively
        inst.widthConstant = (100 / (vis.freqDataArray.length - inst.excludeRatio));

        //clears the graphics
        g.clear();

        if (inst.backgroundOpacity) {
            //draw the background
            g.beginFill(inst.backgroundColor, inst.backgroundOpacity);
            g.drawRect(-10, -10, r.width + 10, r.height + 10);

            //ends the fill for background
            g.endFill();
        }

        //draw the bars
        g.beginFill(inst.barsColor, 1);

        //generate the bars based on i dataArray audio percentage
        for (i = 0; i < d.length - inst.excludeRatio; i++) {
            //the bar width based on the widthConstant
            barWidth = inst.widthConstant * (r.width / 100);

            //draw the rectangle
            g.drawRect(barWidth * i, r.height - (r.height * d[i]), barWidth, r.height * d[i]);
        }

        //finally, add the generated stuff to the container (aka scene)
        c.addChild(g);

        //render the scene
        r.render(c);
    };

}

function ocilloscopeScene(lineColor, lineWidth, backgroundColor, backgroundOpacity) {
    //the instance
    var inst = this;

    //the scene name
    inst.name = "Oscilloscope";

    //the line style
    inst.lineColor = lineColor || 0xfc3030;
    inst.lineWidth = lineWidth || 2;

    //background color
    inst.backgroundColor = backgroundColor || 0x000000;

    //background opacity
    inst.backgroundOpacity = backgroundOpacity || 0;

    //renders the scene, using container, graphics, renderer & timeData
    inst.render = function(c, g, r, d) {
        //the animation

        //a constant to calculate the line width responsively
        inst.widthConstant = (100 / vis.freqDataArray.length);

        //clears the graphics
        g.clear();

        if (inst.backgroundOpacity) {
            //draw the background
            g.beginFill(inst.backgroundColor, inst.backgroundOpacity);
            g.drawRect(-10, -10, r.width + 10, r.height + 10);

            //ends the fill for background
            g.endFill();
        }

        //move the drawer to start point
        g.moveTo(0, (r.height / 2) + (r.height * d[0] / 1.5));

        //the line style
        g.lineStyle(inst.lineWidth, inst.lineColor);

        //start drawing with a color & oppacity
        g.beginFill(inst.lineColor, 0);

        for (i = 1; i < d.length; i++) {
            //the line width based on the widthConstant
            lineWidth = inst.widthConstant * (r.width / 100);

            //draw the line, in the next loop, the drawer will be at the given coord
            g.lineTo(lineWidth * i, (r.height / 2) + (r.height * d[i] / 1.5));
        }

        //finally, add the generated stuff to the container (aka scene)
        c.addChild(g);

        //render the scene
        r.render(c);
    };
}

function monsterYTAVScene(barsColor) {
    //the instance
    var inst = this;

    //the scene name
    inst.name = "MonsterYTAV";

    //the bars area
    inst.barArea = new PIXI.Point(0, 0);

    //the bars position
    inst.barPos = new PIXI.Point(0, 0);

    //the bars between distance in px
    inst.barDist = 1;

    //the bars color
    inst.barsColor = barsColor || 0xfc3030;

    //the frequency index used to set the
    //custom freqData
    inst.low = new PIXI.Point(5, 40);
    inst.mid = new PIXI.Point(50, 85);
    inst.high = new PIXI.Point(2030, 2050);

    //custom freqdata
    inst.freqData = [];

    //renders the scene using container, graphics, renderer, freqDataArray
    inst.render = function(c, g, r, d) {
        //set the custom freqData
        //if the scene isn't paused
        if (!vis.paused) {
            inst.setData(d);
        }

        //set the bars area 80% of the view width and 40%
        //from the view heigth
        inst.barArea.set(r.width * 0.9, r.height * 0.4);

        //used to make the bars centered
        //a 20% up
        inst.barPos.set((r.width - inst.barArea.x) / 2, ((r.height - inst.barArea.y) / 2) - r.height * 0.2);

        //clears the graphics
        g.clear();

        //draw the bars
        g.beginFill(inst.barsColor, 1);

        //a width constant
        inst.widthConstant = (100 / inst.freqData.length);

        //the bar width, discouting the barDist
        barWidth = inst.widthConstant * ((inst.barArea.x - (inst.barDist * inst.freqData.length)) / 100);

        for (i in inst.freqData) {
            g.drawRect(inst.barPos.x + (barWidth * i) + (inst.barDist * i), ((r.height / 2) + (r.height * 0.2)) - (inst.barArea.y * inst.freqData[i]), barWidth, (inst.barArea.y * inst.freqData[i]) + (inst.barArea.y / 100));
        }

        //add the graphics to container
        c.addChild(g);

        //render it
        r.render(c);
    };

    //used to set the custom frequency data
    inst.setData = function(d) {
        //the low frequency data
        for (i = inst.low.x, j = 0; i < inst.low.y; i++, j++) {
            inst.freqData[j] = d[i];
        }

        //the medium frequency data
        for (i = inst.mid.x, j; i < inst.mid.y; i++, j++) {
            inst.freqData[j] = d[i];
        }

        //the high frequency data
        for (i = inst.high.x, j; i < inst.high.y; i++, j++) {
            inst.freqData[j] = d[i];

            //increses the data a little
            inst.freqData[j] *= 1.2;
        }

        //adjusts some values, incresing the difference
        for (i = 0; i < inst.freqData.length; i++) {
            inst.freqData[i] *= (inst.freqData[i] / 0.12) * (inst.freqData[i]);
            inst.freqData[i] *= 0.12;
        }

        //used to remove "dead falls" on the bars
        //make the frequency data more dynamic
        for (i = 1, j = inst.freqData.length - 1; i < inst.freqData.length; i++, j--) {
            inst.freqData[i] += 0.57 * inst.freqData[i - 1];
            inst.freqData[j] += 0.57 * inst.freqData[j - 1];
        }

    };
}

function audioVisualizer(width, height, containerSelector, sourceSelector, playerSelector, analyserData) {
    //the instance
    var inst = this;

    //the type of scenes, using an index to control it
    //private
    var sceneTypes = [
        "bars",
        "ocilloscope",
        "monster"
    ];
    //private
    var sceneIndex = 2;

    //the video dom used to find the size
    inst.$player = $(playerSelector);

    //view size
    inst.width = inst.$player.width();
    inst.height = inst.$player.height();

    //the container
    inst.$container = $(containerSelector);

    //the sound source
    inst.$source = $(sourceSelector);

    //the options for fft analysis
    inst.analyserData = analyserData || {
        fftSize: 256,
        minDecibels: -50,
        maxDecibels: 0,
        smoothingTimeConstant: 0.8
    };

    //monster visualizer custom fft, private
    var monsterVisData = {
        fftSize: 8192,
        smoothingTimeConstant: 0.75
    }

    //the scenes instances
    var scenes = [];

    //is paused or not
    inst.paused = false;

    // effectNode
    inst.effectNode = null;

    inst.init = function() {
        //the renderer
        inst.renderer = new PIXI.autoDetectRenderer(inst.width, inst.height, {
            transparent: true
        });

        //the scene
        inst.container = new PIXI.Container(0x66ff99);

        //the view
        inst.$view = $(inst.renderer.view);

        //pauses the animation when the canvas is clicked
        //but you can see color changes since the scenes
        //are rendered the same way
        inst.$view.click(function() {
            vis.pp();
        });

        //attach the renderer to the DOM element
        inst.$container.prepend(inst.$view);

        // make container for the sliders
        var sliderDiv = document.createElement("div");
        sliderDiv.id = "slider-div";
        inst.$player.prepend(sliderDiv);

        //generate the PIXI graphics for draw
        inst.g = new PIXI.Graphics();

        //create the audio context
        inst.audioCtx = new AudioContext();

        //add the analyser node
        inst.analyser = inst.audioCtx.createAnalyser();

        //create the audio media source
        inst.source = inst.audioCtx.createMediaElementSource(inst.$source[0]);

        //connect the source to analyser & speakers
        inst.source.connect(inst.analyser);
        inst.analyser.connect(inst.audioCtx.destination);

        // init Tuna object
        inst.tuna = new Tuna(inst.audioCtx);

        //initialize the freq data array with the size of the buffer
        inst.freqDataArray = new Float32Array(inst.analyser.frequencyBinCount);
        inst.analyser.getFloatFrequencyData(inst.freqDataArray);
        inst.cleanUpFreqDataArray();

        //initialize the time domain data array with the size of the buffer
        inst.timeDataArray = new Float32Array(inst.analyser.frequencyBinCount);
        inst.analyser.getFloatTimeDomainData(inst.timeDataArray);

        //the instance of the scenes
        bars = new barsScene();

        ocillo = new ocilloscopeScene();

        monster = new monsterYTAVScene();

        scenes.push(bars);
        scenes.push(ocillo);
        scenes.push(monster);

        //update the analyser config
        inst.updateAnalyserConfig();
    };

    inst.render = function() {
        if (!inst.paused) {
            //get the audio dada & clean it
            inst.analyser.getFloatFrequencyData(inst.freqDataArray);
            inst.cleanUpFreqDataArray();

            //get the wave data
            inst.analyser.getFloatTimeDomainData(inst.timeDataArray);
        }

        //renders the current scene
        switch (sceneTypes[sceneIndex]) {
            case "monster":
                scenes[sceneIndex].render(inst.container, inst.g, inst.renderer, inst.freqDataArray);
                break;
            case "ocilloscope":
                scenes[sceneIndex].render(inst.container, inst.g, inst.renderer, inst.timeDataArray);
                break;
            case "bars":
            default:
                scenes[sceneIndex].render(inst.container, inst.g, inst.renderer, inst.freqDataArray);
                break;
        }

        requestAnimationFrame(inst.render);
    };

    //transform freqData to percentages
    inst.cleanUpFreqDataArray = function() {
        for (i in inst.freqDataArray) {
            if (inst.freqDataArray[i] <= -100 || inst.freqDataArray[i] == -80 || inst.freqDataArray[i] == -50) {
                inst.freqDataArray[i] = 0;
                continue;
            }
            inst.freqDataArray[i] = (inst.freqDataArray[i] + 100) / 100;
        }
    };

    //go to the next scene
    inst.nextScene = function() {
        sceneIndex += sceneIndex == sceneTypes.length - 1 ? -sceneIndex : 1;
        inst.updateAnalyserConfig();
    };

    //go to the previous scene
    inst.previousScene = function() {
        sceneIndex -= sceneIndex == 0 ? -(sceneTypes.length - 1) : 1;
        inst.updateAnalyserConfig();
    };

    //Pause/Play the scene
    inst.pp = function() {
        inst.paused = inst.paused ? false : true;
    };

    //set the fftSize
    inst.setFFT = function(size) {
        inst.analyser.fftSize = size;
        inst.freqDataArray = new Float32Array(inst.analyser.frequencyBinCount);
        inst.timeDataArray = new Float32Array(inst.analyser.frequencyBinCount);
    };


    //update the analyser config
    inst.updateAnalyserConfig = function(config) {
        if (scenes[sceneIndex].name == "MonsterYTAV")
            config = monsterVisData;

        if (!config) {
            inst.setFFT(inst.analyserData.fftSize);
            inst.analyser.minDecibels = inst.analyserData.minDecibels;
            inst.analyser.maxDecibels = inst.analyserData.maxDecibels;
            inst.analyser.smoothingTimeConstant = inst.analyserData.smoothingTimeConstant;
        } else {
            inst.setFFT(config.fftSize || inst.analyserData.fftSize);
            inst.analyser.minDecibels = config.minDecibels || inst.analyserData.minDecibels;
            inst.analyser.maxDecibels = config.maxDecibels || inst.analyserData.maxDecibels;
            inst.analyser.smoothingTimeConstant = config.smoothingTimeConstant || inst.analyserData.smoothingTimeConstant;
        }
    };

    inst.getSceneByName = function(name) {
        for (i in scenes) {
            if (scenes[i].name.toLowerCase() == name.toLowerCase()) {
                return scenes[i];
            }
        }
        return undefined;
    }

    inst.changeEffect = function(idx) { 
        var newEffect;    
        switch(idx)
        {
            case 0:
                newEffect = new inst.tuna.Overdrive({
                    outputGain: 0,         //0 to 1+
                    drive: 0.4,              //0 to 1
                    curveAmount: 0.5,          //0 to 1
                    algorithmIndex: 2,       //0 to 5, selects one of our drive algorithms
                    bypass: 0
                });
                break;
            case 1:
                newEffect = new inst.tuna.Chorus({
                    rate: 3.5,         //0.01 to 8+
                    feedback: 0.8,     //0 to 1+
                    delay: 0.0666,     //0 to 1
                    bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
                });
                break;
            case 2:
                newEffect = new inst.tuna.Delay({
                    feedback: 0.45,    //0 to 1+
                    delayTime: 150,    //1 to 10000 milliseconds
                    wetLevel: 0.85,    //0 to 1+
                    dryLevel: 1,       //0 to 1+
                    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
                    bypass: 0
                });
                break;
            case 3:
                newEffect = new inst.tuna.Tremolo({
                    intensity: 0.7,    //0 to 1
                    rate: 8,         //0.001 to 8
                    stereoPhase: 0,    //0 to 180
                    bypass: 0
                });
                break;
            case 4:
                newEffect = new inst.tuna.Bitcrusher({
                    bits: 4,          //1 to 16
                    normfreq: 0.1,    //0 to 1
                    bufferSize: 4096  //256 to 16384
                });
                break;
            case 5:
                newEffect = new inst.tuna.Compressor({
                    threshold: -25,    //-100 to 0
                    makeupGain: 1,     //0 and up (in decibels)
                    attack: 100,         //0 to 1000
                    release: 0,        //0 to 3000
                    ratio: 12,          //1 to 20
                    knee: 40,           //0 to 40
                    automakeup: false,  //true/false
                    bypass: 0
                });
                break;
            case 6:
                //TODO: set up covolution reverb (put files into place)
                break;
            case 7:
                newEffect = new inst.tuna.WahWah({
                    automode: true,                //true/false
                    baseFrequency: 0.4,            //0 to 1
                    excursionOctaves: 2,           //1 to 6
                    sweep: 0.4,                    //0 to 1
                    resonance: 40,                 //1 to 100
                    sensitivity: 0.7,              //-1 to 1
                    bypass: 0
                });
                break;
            case 8:
                    inst.source.disconnect();
                    inst.source.connect(inst.audioCtx.destination);
                    inst.source.connect(inst.analyser);
                    inst.effectNode = null;
                    insertSliders(null);
                    return;
        }

        inst.source.disconnect();
        inst.source.connect(newEffect);

        if (idx == 0){
            var lowerVolume = inst.audioCtx.createGain();
            lowerVolume.gain.value = 0.19;
            inst.effectNode = newEffect;
            inst.effectNode.connect(lowerVolume);
            lowerVolume.connect(inst.analyser);
            inst.analyser.connect(inst.audioCtx.destination);
            insertSliders(inst.effectNode);
            return;
        }
        inst.effectNode = newEffect;
        inst.effectNode.connect(inst.analyser);
        inst.analyser.connect(inst.audioCtx.destination);

        // update sliders
        insertSliders(inst.effectNode);
    }
}

//used to focus on the YT video
function scrollToVideo() {
    $("html, body").animate({
        scrollTop: $("#content").offset().top - $("#player > canvas").offset().top
    }, 500);
}
