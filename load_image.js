// Open images/display_image.jpg and load the pixel data
// into a 2D array of pixels

// Load the image
var img = new Image();
img.src = 'images/display_image.jpg';

// Create a canvas element
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

// When the image has loaded, draw it to the canvas
img.onload = function () {
    // Set the canvas size to the image size
    console.log(img.width, img.height);
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image to the canvas
    ctx.drawImage(img, 0, 0);

    // Get the image data
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Get the pixel data
    var data = imageData.data;

    // Create a 2D array to store the pixel data
    var pixels_2d = [];

    // Loop through the pixel data
    let row = [];
    for (var i = 0; i < data.length; i += 4) {
        // Get the RGB values
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        // Convert RGB to Lightness
        var lightness = rgbToLightness(r, g, b);

        row.push(lightness);

        if (i % (img.width * 4) === 0) {
            pixels_2d.push(row);
            row = [];
        }
    }

    // Create an ascii image from the pixel data
    var asciiImage = createAsciiImage(pixels_2d, canvas.width);

    // Display the ascii image
    const asciiImageElement = document.createElement('div');
    asciiImageElement.classList.add('ascii-art');
    asciiImageElement.id = 'ascii-art';
    asciiImage.forEach(layer => {
        asciiImageElement.appendChild(layer);
    });
    document.getElementById("image-holder").appendChild(asciiImageElement);
};

window.addEventListener('mousemove', handleTransform);
window.addEventListener('wheel', handleZoom);

function checkWithinBounds(event, rect) {
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}

var scale = 1.0;
var xRotation = 0;
var yRotation = 0;

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
    var xPercent = event.clientX / window.innerWidth;
    var yPercent = event.clientY / window.innerHeight;

    xRotation = (yPercent - 0.5) * -60;
    yRotation = (xPercent - 0.5) * 60;

    transformElement();
}

// Calculate the skip value for the image
function calculateSkip(width, height, scale) {
    // Calculate the number of pixels to skip in the x and y directions
    var xSkip = Math.floor(width / (width * scale));
    var ySkip = Math.floor(height / (height * scale));

    // Return the skip values
    return [xSkip, ySkip];
}

// Create ascii image from pixel data
function createAsciiImage(pixels_2d) {
    // Define the ascii characters to use, from darkest to lightest
    var asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

    const [xSkip, ySkip] = calculateSkip(pixels_2d[0].length, pixels_2d.length, 0.5);
    const layers = [];

    asciiChars.forEach(() => {
        layers.push("");
    });

    // Loop through the pixels
    for (var i = 0; i < pixels_2d.length; i += xSkip) {
        for (var j = 0; j < pixels_2d[i].length; j += ySkip) {
            // Get the lightness of the pixel
            var lightness = pixels_2d[i][j];

            // Calculate the index of the ascii character to use
            var height = Math.floor((lightness / 255) * (asciiChars.length - 1));

            // Add the ascii character to the ascii image
            layers.forEach((layer, index) => {
                if (index === height) {
                    layers[index] += asciiChars[height];
                } else {
                    layers[index] += ' ';
                }
            });
        }

        // Add a newline character at the end of each row
        layers.forEach((layer, index) => {
            layers[index] += '\n';
        });
    }

    layers.map((layer, index) => {
        const layerElement = document.createElement('div');
        layerElement.classList.add('ascii-layer');
        layerElement.dataset.layer = index;
        layerElement.innerHTML = layer;
        layers[index] = layerElement;
    });

    // Return the ascii image
    return layers;
}

// Convert RGB to Lightness
function rgbToLightness(r, g, b) {
    return Math.floor((Math.max(r, g, b) + Math.min(r, g, b)) / 2);
}