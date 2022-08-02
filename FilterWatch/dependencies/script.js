var VideoList = [];
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var ChannelsList = [
	"UCsXVk37bltHxD1rDPwtNM8Q",
	"UCZYTClx2T1of7BRZ86-8fow",
	"UC7DdEm33SyaTDtWYGO2CwdA",
	"UCsooa4yRKGN_zEE8iknghZA",
	"UCHnyfMqiRRG1u-2MsSQLbXA"
];
var Radios = [
	document.getElementById("science"),
	document.getElementById("technology"),
	document.getElementById("history"),
	document.getElementById("health")
]
getVideos();
function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	xmlHttp.send(null);
}

function filter() {
	document.getElementById("videoFrame").setAttribute("src", " ");
	for (i = 0; i < Radios.length; i++) {
		if (Radios[i].checked) {
			getVideos(Radios[i].id);
		}
	}
}

function getVideos(tag) {
	if (!tag) {
		VideoList = [];
		for (i = 0; i < ChannelsList.length; i++) {
			httpGetAsync(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDRaQyCWIL41jsrDo7Rd7sZbLCi-613C8I&channelId=${ChannelsList[i]}&part=snippet,id&maxResults=50`,
				function (responseObj) {
					var TempList = JSON.parse(responseObj);
					VideoList.push(TempList);
					refreshVideo();
				});
		}
	} else {
		VideoList = [];
		for (i = 0; i < ChannelsList.length; i++) {
			httpGetAsync(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDRaQyCWIL41jsrDo7Rd7sZbLCi-613C8I&q=${tag}&channelId=${ChannelsList[i]}&part=snippet,id&maxResults=50`,
				function (responseObj) {
					var TempList = JSON.parse(responseObj);
					VideoList.push(TempList);
					refreshVideo();
				});
		}
	}
}

function refreshVideo() {
	document.getElementById("videoFrame").setAttribute("src", " ");
	var selectedChannel = VideoList[Math.floor(Math.random() * VideoList.length)];
	document.getElementById('videoFrame').setAttribute('src', `https://www.youtube.com/embed/${selectedChannel.items[Math.floor(Math.random() * selectedChannel.items.length)].id.videoId}`);
}

function toggleNav() {
	if (!document.getElementById("sidenavToggler").classList.contains("change")) {
		document.getElementById("mySidenav").style.left = "0rem";
		if (w < 700) {
			document.getElementById("main").style.marginLeft = "23rem";
		} else {
			document.getElementById("main").style.marginLeft = "28rem";
		}
	} else {
		if (w < 700) {
			document.getElementById("mySidenav").style.left = "-25rem";
		} else {
			document.getElementById("mySidenav").style.left = "-30rem";
		}
		document.getElementById("main").style.marginLeft = "0rem";

	}
	document.getElementById("sidenavToggler").classList.toggle("change");
}

function FilterHotKey(InputObj) {
	(InputObj.key == 'f' || InputObj.key == "F") && toggleNav();
	(InputObj.key == 'r' || InputObj.key == "R") && refreshVideo();
}
document.addEventListener('keyup', FilterHotKey, false);