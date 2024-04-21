import Jimp from 'jimp';
import fs from 'fs';

function processImage(imagePath) {
    Jimp.read(imagePath).then(image => {
        const width = image.getWidth();
        const height = image.getHeight();
        const pixels_2d = [];

        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(x, y));
                const lightness = rgbToLightness(r, g, b);
                row.push(lightness);
            }
            pixels_2d.push(row);
        }

        const asciiImage = createAsciiImage(pixels_2d, width);

            fs.writeFileSync(`assets/${imagePath.split("/").reverse()[0].split(".")[0]}_ascii_image.json`, JSON.stringify(asciiImage));
    });
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

    // Create the ascii layer div elements
    // layers.map((layer, index) => {
    //     const layerElement = document.createElement('div');
    //     layerElement.classList.add('ascii-layer');
    //     layerElement.dataset.layer = index;
    //     layerElement.innerHTML = layer;
    //     layers[index] = layerElement;
    // });

    // Return the ascii image
    return layers;
}

// Convert RGB to Lightness
function rgbToLightness(r, g, b) {
    return Math.floor((Math.max(r, g, b) + Math.min(r, g, b)) / 2);
}

// Parse the arguments and process the image

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Please provide image path as an argument');
    process.exit(1);
}
processImage(args[0]);