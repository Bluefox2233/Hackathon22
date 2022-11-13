var sleepTime = -1;
var displayIndef = false;
var timer;
var noteID;
var fileName = "Default.mp3";
var noteType = "both";


var opt = {
  type: "basic",
  title: "Take A Drink",
  message: "It's time to take a sip!",
  iconUrl: "noteImage.png",
  requireInteraction: false
}

//called when the first browser instance is started
function onStartGo(){
	chrome.storage.sync.get(["time","soundName","noteType","keepNote"],function(obj){
		var name = obj.soundName;
		var type = obj.noteType;
		var keepNote = obj.keepNote;
		if(name != undefined){
			fileName = name;
		}
		if(type != undefined){
			noteType = type;
		}
		if(keepNote != undefined && keepNote){
			displayIndef = true;
		}
		var time = obj.time;
		if(time != undefined && time != -1 && time !=0) {
			sleepTime = time * 60000;
			remind();
		}
	});
}



//initial method thats called to start the reminder process
function go(mins){
	var found = false;
	sleepTime = mins * 60000;
	saveTime(mins);
	remind();
}

//continuously called until it is stopped or another time is started
function remind(){
		if(timer)clearTimeout(timer);
		var audio = new Audio(fileName);
		if(noteType != "Visual"){
			audio.play();
			window.open('https://www.calm.com/breathe')
			
		}
		if(noteType != "Audio"){
			opt.requireInteraction = displayIndef;
			if(noteID != undefined){
				chrome.notifications.clear(noteID);
			}
			chrome.notifications.create(opt, function(id){noteID = id;});
		}
	
		timer = setTimeout(remind,sleepTime);
		
}

//stops the current timer and rich notification if they exist
function stop(){
	if(timer){
		clearTimeout(timer);
		saveTime(-1);
	}
	if(noteID != undefined){
		chrome.notifications.clear(noteID);
	}
}

//save the time
function saveTime(time){
	     chrome.storage.sync.set({"time": time});
}

//save options
function setOpts(name,type,keepNote){
	fileName = name;
	noteType = type;
	displayIndef = keepNote;
	chrome.storage.sync.set({"soundName": name});
	chrome.storage.sync.set({"noteType": type});
	chrome.storage.sync.set({"keepNote":displayIndef});
}


//start the whole shebang
onStartGo();