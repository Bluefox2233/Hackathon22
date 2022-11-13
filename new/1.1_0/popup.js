//mmm dat background
var background = chrome.extension.getBackgroundPage (); 

//set time
function setTime(e){
	var mins = document.getElementById("freq").value;
	if(isNaN(mins) || mins < 1 || mins > 60){
		document.getElementById("warn").innerHTML="<i><h3 style='color:red;'> Value must be a number between 1 and 60</h3></i>";
		setTimeout(function(){
			document.getElementById("warn").innerHTML="";
		}, 3000);
		
	}
	else{
		background.go(mins);
	}
}


//stop this maddness
function stop(e){
	background.stop();
	document.getElementById("freq").value = "";
}

//change to options 
function showOptions(){
		document.getElementById("water").style.display = 'none'; 
		document.getElementById("options").style.display = 'block';
}

//change back to main
function hideOptions(){
		document.getElementById("water").style.display = 'block';
		document.getElementById("options").style.display = 'none'; 
}

//test the sound
function testSound(){
	var name = document.getElementById("sound").value;
	var audio = new Audio(name);
	audio.play();
}

//set the sound, notificaiton type and length
function setOpts(){
	var name = document.getElementById("sound").value;
	var keepNote = document.getElementById("keepNote").checked;
	var type;
	
	if(document.getElementById('optsAudio').checked){
		type = 'Audio';
	}
	if(document.getElementById('optsVisual').checked){
		type = 'Visual';
	}
	if(document.getElementById('optsBoth').checked){
		type = 'Both';
	}
	background.setOpts(name, type, keepNote);
}

function getHelpButton(){
    console.log("yes");
    window.open('https://app.projecthealthyminds.com/tactics/helplines')
}

function stretchButton(){
    window.open('https://www.youtube.com/watch?v=t2NUI7jM4tg')
}

function yogaButton(){
    window.open('https://www.youtube.com/watch?v=F8_ME4VwTiw')
}


//handlers
window.onload = function(){
	document.getElementById("stopBtn").addEventListener("click", stop);
    document.getElementById("waterBtn").addEventListener("click", setTime);
	document.getElementById("gears").addEventListener("click", showOptions);
	document.getElementById("back").addEventListener("click", hideOptions);
	document.getElementById("testSound").addEventListener("click", testSound);
	document.getElementById("setOpts").addEventListener("click", setOpts);
	document.getElementById("Gethelp").addEventListener("click", getHelpButton);
	document.getElementById("stretchBtn").addEventListener("click", stretchButton);
	document.getElementById("yogaBtn").addEventListener("click", yogaButton);


	chrome.storage.sync.get("time",function(obj){ 
		var time = obj.time;
		if(time != undefined && time != -1){
			document.getElementById("freq").value = time;
		}
	});
	chrome.storage.sync.get(["noteType","soundName","keepNote"],function(obj){
		var name = obj.soundName;
		var type = obj.noteType;
		var keepNote = obj.keepNote;
		if(name != undefined){
			document.getElementById("sound").value = name;
		}
		if(type != undefined){
			document.getElementById("opts"+type).checked = true;
		}
		if(keepNote != undefined && keepNote){
			document.getElementById("keepNote").checked = true;
		}
		
	});
}