// Constants for w and h representing Legal size paper

let w = 850;
let h = 1100;

const denom = 50;
const cols = w / denom;
const rows = h / denom;

let img;

let pointerX = w / 2;
let pointerY = h / 2;

let isMobileDevice = false;
let permissionGranted = false;

function preload() {
  img = loadImage('./images/resume.jpg');

  if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
    DeviceOrientationEvent.requestPermission()
      .catch(() => { // ios 13 device
        // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed(requestAccess);
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    permissionGranted = true;
  }
}

function setup() {
  let cnv = createCanvas(850, 1100, WEBGL);
  cnv.parent('sketch-holder');

  camera(w / 2, h / 2, 900, w / 2, h / 2, 0, 0, 1, 0);

  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
    cnv.style('transform', 'scale(0.5)');
    document.getElementById("phone-hint").style.visibility = "visible";
  } else {
    document.getElementById("pc-hint").style.visibility = "visible";
  }

}

function draw() {
  if (!isMobileDevice) {
    updatePointer(mouseX, mouseY);
  } else if (permissionGranted) {
    let rx = rotationX - PI / 6;
    let ry = rotationY;
    updatePointer(pointerX + ry * 10, pointerY + rx * 40);
  }
  background(255);
  noStroke();

  beginShape(QUADS);
  texture(img);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      drawQuad(x, y);
    }
  }
  endShape();
}

function drawQuad(x, y) {
  let z = getDistance(x * denom, y * denom, pointerX, pointerY);
  vertex(x * denom, y * denom, z, x * denom, y * denom);

  z = getDistance(x * denom, (y + 1) * denom, pointerX, pointerY);
  vertex(x * denom, (y + 1) * denom, z, x * denom, (y + 1) * denom);

  z = getDistance((x + 1) * denom, (y + 1) * denom, pointerX, pointerY);
  vertex((x + 1) * denom, (y + 1) * denom, z, (x + 1) * denom, (y + 1) * denom);

  z = getDistance((x + 1) * denom, y * denom, pointerX, pointerY);
  vertex((x + 1) * denom, y * denom, z, (x + 1) * denom, y * denom);
}

function getDistance(x1, y1, x2, y2) {
  return min(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 0.35, 140);
}

function updatePointer(x, y) {
  pointerX = min(max(x, 0), w);
  pointerY = min(max(y, 0), h);
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);

  this.remove();
}