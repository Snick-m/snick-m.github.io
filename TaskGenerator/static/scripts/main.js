/*

Play Football with A Bottle

____ ________ ---- ________
Verb Activity      Subject

*/

window.onload = () => {
    if (window.innerWidth < 992) {
        // true for mobile device
        document.getElementById("task").innerHTML = "📱 Shake 📱";
    }
}

const shakeEvent = new Shake({ threshold: 15 });

shakeEvent.start();

window.addEventListener('shake', shaked, false);

window.onkeypress = function (ev) {
    if (ev.code == "Space") {
        shaked();
    }
}

function shaked() {
    document.getElementById('task').innerHTML = generate();

    $("#taskCard").effect("shake", { direction: "right", times: 3, distance: 10 });
    // alert(generate());
}

function generate() {
    let cat = Math.round(Math.random() * 4);

    let verb = verbs[cat];
    let subject = subjects[cat];
    let extension = extensions[cat];

    return verb.pickRandom().concat(' ', subject.pickRandom(), ' ', extension.pickRandom(), '.');
}

Array.prototype.pickRandom = function () {
    return this[Math.floor(Math.random() * this.length)];
}