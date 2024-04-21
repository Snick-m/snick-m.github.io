// When the DOM has loaded, fetch the JSON file containing the ASCII image and display it on the page.
fetch('assets/display_image_ascii_image.json').then(response => response.json()).then(data => {
    displayAsciiImage(data);
});

// Display the ASCII image on the page
function displayAsciiImage(layers) {
    layers.map((layer, index) => {
        const layerElement = document.createElement('div');
        layerElement.classList.add('ascii-layer');
        layerElement.dataset.layer = index;
        layerElement.innerHTML = layer;
        layers[index] = layerElement;
    });

    // Display the ascii image
    const asciiImageElement = document.createElement('div');
    asciiImageElement.classList.add('ascii-art');
    asciiImageElement.id = 'ascii-art';
    document.getElementById("image-holder").appendChild(asciiImageElement);
    
    layers.forEach((layer, i) => {
        setTimeout(() => {
            asciiImageElement.appendChild(layer);
        }, i * Math.random() * 70);
    });
}

window.addEventListener('mousemove', handleTransform);
window.addEventListener('touchmove', handleTransform);
window.addEventListener('wheel', handleZoom);

var scale = 1.0;
var xRotation = 0;
var yRotation = 0;

function checkWithinBounds(event, rect) {
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}

function transformElement() {
    document.getElementById('ascii-art').style.transform = `perspective(2400px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(${scale})`;
}

function handleZoom(event) {
    // zoom the event.target element with respect to mouse position
    const element = document.getElementById('ascii-art');
    const rect = element.getBoundingClientRect();

    if (checkWithinBounds(event, rect)) {
        const y = event.deltaY;
        scale += y > 0 ? -0.1 : +0.1;
        transformElement();
    }
}

function handleTransform(event) {
    // Calculate the percentage of the mouse position within the window
    if (event.type === 'touchmove') {
        event = event.touches[0];
    }
    var xPercent = event.clientX / window.innerWidth;
    var yPercent = event.clientY / window.innerHeight;

    const tilt = 30;

    xRotation = (0.5 - yPercent) * tilt;
    yRotation = (xPercent - 0.5) * tilt;

    transformElement();
}