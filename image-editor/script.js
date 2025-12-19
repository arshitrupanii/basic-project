const filters = {
    brightness: {
        name: "Brightness",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        name: "Contrast",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturate: {
        name: "Saturation",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    "hue-rotate": {
        name: "Hue Rotate",
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        name: "Blur",
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        name: "Grayscale",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        name: "Sepia",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        name: "Invert",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    // ⚠️ Canvas-only (handled via globalAlpha)
    opacity: {
        name: "Opacity",
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    }
};
const defaultFilters = JSON.parse(JSON.stringify(filters));


const filterContainer = document.querySelector(".filters");

const inputImage = document.querySelector("#upload-image");
const ResentButton = document.querySelector(".reset-btn");
const downloadButton = document.querySelector(".download-btn");

const noImageDiv = document.querySelector(".no-image");

let Imagecanvas = document.querySelector("#image-canvas")
const canvasCTX = Imagecanvas.getContext("2d");


let file = null
let img = null


// this fn add filter element from object to  dom
function createfilterElement(text, id, unit, value, min, max) {
    const div = document.createElement("div")
    div.classList.add('filter')

    const label = document.createElement("div")
    label.innerText = text

    const input = document.createElement("input")
    input.type = 'range'
    input.min = min
    input.max = max
    input.value = value
    input.id = id
    input.dataset.unit = unit

    div.appendChild(label)
    div.appendChild(input)

    filterContainer.appendChild(div)
}

// draw image canvas
function drawImage() {
    img = new Image();

    img.src = URL.createObjectURL(file)

    img.onload = () => {
        Imagecanvas.width = img.width
        Imagecanvas.height = img.height
        applyAllFilters();
    }
}

function loadFilters() {
    Object.keys(filters).forEach((key) => {
        const f = filters[key];
        createfilterElement(f.name, key, f.unit, f.value, f.min, f.max);
    })
}

function removeFilter() {
  Object.keys(filters).forEach(key => {
    // reset JS state
    filters[key].value = defaultFilters[key].value;

    // reset slider UI
    const input = document.getElementById(key);
    if (input) {
      input.value = defaultFilters[key].value;
    }
  });
}


function buildFilterString() {
    return Object.entries(filters)
        .filter(([key]) => key !== "opacity")
        .map(([key, f]) => `${key}(${f.value}${f.unit})`)
        .join(" ");
}

function applyAllFilters() {
    canvasCTX.clearRect(0, 0, Imagecanvas.width, Imagecanvas.height);

    canvasCTX.globalAlpha = filters.opacity.value / 100;
    canvasCTX.filter = buildFilterString();

    canvasCTX.drawImage(img, 0, 0);

    canvasCTX.globalAlpha = 1;
    canvasCTX.filter = "none";
}


// start ------------------------
// this insert filter div into dom
loadFilters()

// handle image
inputImage.addEventListener("change", (e) => {
    // hide no image div
    noImageDiv.classList.add("hide");
    file = e.target.files[0]
    drawImage()
})

filterContainer.addEventListener("input", (e) => {
    if (!img) return;
    filters[e.target.id].value = e.target.value;
    applyAllFilters();
})


ResentButton.addEventListener("click", (e) => {
    removeFilter();
    if (img) applyAllFilters();
})


downloadButton.addEventListener("click", () => {
    if (!img) return;
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = Imagecanvas.toDataURL("image/png");
    link.click();
});
