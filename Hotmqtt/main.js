var url = "wss://connect.intvill.com:20202/mqtt";

var connected = false;
var subscriptionList = [];

var options = {
	timeout: 3,
	userName: "",
	password: "",
	onSuccess: connectSuccess,
	onFailure: (resp) => {
		console.log("FAILURE!");
		if (resp.errorCode == 6) {
			showAlert(2, "Incorrect Username & Password Combination");
		} else {
			showAlert(2, "Connection attempt to Broker Failed. Please recheck Host & Port.");
		}
	}
}

var client;

var visibleAlerts = [];

var loginContainer = document.getElementById('login');

var host = loginContainer.querySelector(".host");
var port = loginContainer.querySelector(".port");
var user = loginContainer.querySelector(".user");
var pass = loginContainer.querySelector(".pass");

var interfaceContainer = document.getElementById('interface');

var subInput = interfaceContainer.querySelector("#sub input");
var pubInput = interfaceContainer.querySelector("#pub input");
var msgInput = interfaceContainer.querySelector("input.message");

var pubTopicHolder = "";

subInput.addEventListener('change', (ev) => {
	subscribe(ev.target.value);
})

let pubDebounce = null;

pubInput.addEventListener('change', pubInputHandler);
pubInput.addEventListener('keyup', (ev) => {
	if (ev.keyCode == 13 && !pubDebounce) {
		pubInputHandler(ev);
	}
})

host.addEventListener('change', () => {
	port.focus();
});

port.addEventListener('change', () => {
	user.focus();
});

user.addEventListener('change', () => {
	pass.focus();
});

pass.addEventListener('change', () => {
	if (validateLoginInputs()) {
		url = `${(host.value.endsWith("/") ? host.value.slice(0, -1) : host.value)}:${port.value}/`;
		options.userName = user.value;
		options.password = pass.value;

		client = new Paho.MQTT.Client(url, `${options.userName}_${generateCID()}`)
		
		client.onMessageArrived = handleIncoming;
		client.onMessageDelivered = handleOut;
		client.reconnect = true;

		client.onConnected = () => {
			connected = true;
		}
		client.onConnectionLost = () => {
			connected = false;
		}

		client.connect(options);
	}
})

function validateLoginInputs() {
	let inputs = loginContainer.querySelectorAll("input");

	if (!(host.value.startsWith("ws://") || host.value.startsWith("wss://"))) {
		showAlert(2, "Host address must start with 'ws://' or  'wss://'(for SSL enabled).");
		return false;
	}

	if (isNaN(Number(port.value))) {
		showAlert(2, "Port must be a Number.");
		return false;
	}

	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].value == "") {
			showAlert(2, "One or more required input fields empty.");
			return false;
		}
	}
	return true;
}

function showAlert(referenceNode, alertType, alertMessage) {
	if (arguments.length == 2) {
		alertMessage = alertType;
		alertType = referenceNode;
		referenceNode = document.body;
	}

    let alertElement = document.getElementById("alertTemplate").cloneNode(true);
	
	alertElement.removeAttribute("id");
	alertElement.removeAttribute("style");
	alertElement.querySelector(".message").innerText = "> " + alertMessage;
	alertElement.style.bottom = "50px";

    if (alertType == 0) {
        alertElement.querySelector(".message").style.color = 'darkgreen';
		alertElement.querySelector(".tag").style.backgroundColor = 'darkgreen';
    } else if (alertType == 1) {
        alertElement.querySelector(".message").style.color = 'darkgoldenrod';
		alertElement.querySelector(".tag").style.backgroundColor = 'darkgoldenrod';
    } else if (alertType == 2) {
        alertElement.querySelector(".message").style.color = 'crimson';
		alertElement.querySelector(".tag").style.backgroundColor = 'crimson';
    } else {
        throw new TypeError("Alert Type out of bounds");
	}

	referenceNode.parentElement.insertBefore(alertElement, referenceNode.nextSibling);

	for (let i = 0; i < visibleAlerts.length; i++) {
		visibleAlerts[i].style.bottom = `${10 + alertElement.offsetHeight + parseInt(visibleAlerts[i].style.bottom)}px`;
	}
    
	visibleAlerts.push(alertElement);

    setTimeout(() => {
		function removal(i, max) {
			setTimeout(() => {
				let newOpacity = ((i-1)/max * 1); // Mapping value to 0.0-0.9
				alertElement.style.opacity = newOpacity;

				if (--i) removal(i, max); else alertElement.remove(), visibleAlerts.shift();
			}, 50);
		}

		removal(30, 30);
    }, 10000, alertElement);
}

function generateCID() {
	let d = new Date();
	return d.getTime().toString().slice(-6)
}

function subscribe(topic) {
	let subOptions = {
		onSuccess: () => {
			subscriptionList.push(topic);
			subInput.value = "";
			showAlert(subInput, 0, `Subscribed to "${topic}".`);
		},
		onFailure: () => {
			subInput.value = "";
			showAlert(subInput, 2, `Failed to subscribe to "${topic}".`);
		}
	}

	client.subscribe(topic, subOptions);
}

function publish(topic, message) {
	if (arguments.length < 2) {
		throw SyntaxError("Missing Arguments. Expected 2, Got" + arguments.length);
	}

	try {
		let msg = new Paho.MQTT.Message(message);
		msg.destinationName = topic;
		client.send(msg);
	} catch (e) {
		showAlert(2, e);
		client.connect(options);
	}
}

function connectSuccess() {
	connected = true;
	showAlert(0, "Connected to MQTT Broker at " + url);

	loginContainer.style.display = "none";
	interfaceContainer.style.display = "flex";

	for (let i = 0; i < subscriptionList.length; i++) {
		client.subscribe(subscriptionList[i]);
	}
}

function pubInputHandler(ev) {
	pubDebounce = ev;
	setTimeout(() => {
		pubDebounce = null;
	}, 250);
	
	let value = ev.target.value;
	let label = pubInput.parentElement.querySelector("label");

	if (value == "") {
		pubTopicHolder = "";
		label.innerText = "Topic";
		pubInput.value = "";
	} else if (pubTopicHolder == "" && label.innerText == "Topic") {
		pubTopicHolder = value;
		label.innerText = "Message";
		pubInput.value = "";
	} else {
		publish(pubTopicHolder, ev.target.value);
		pubInput.value = "";
	}
}

function handleIncoming(msgObject) {
	showAlert(pubInput, 1, `Received "${msgObject.payloadString}" on "${msgObject.destinationName}".`);
}

function handleOut(msgObject) {
	showAlert(pubInput, 0, `Published, "${msgObject.payloadString}" to "${msgObject.destinationName}".`);
}