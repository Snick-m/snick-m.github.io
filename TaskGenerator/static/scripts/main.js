/*

Play Football with A Bottle

____ ________ ---- ________
Verb Activity      Subject

*/
window.onload = function () {
    const shakeEvent = new Shake({ threshold: 15 });

    shakeEvent.start();

    window.addEventListener('shake', shaked, false);

    if (window.DeviceMotionEvent) {
        alert("Feature Found!");
    }

    function shaked() {
        alert("Hi!");
    }

    function generate() {
        let cat = Math.round(Math.random() * 4);

        let verb = verbs[cat];
        let subject = subjects[cat];
        let extension = extensions[cat];

        return (verb.pickRandom(), subject.pickRandom(), extension.pickRandom());
    }

    Array.prototype.pickRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
}