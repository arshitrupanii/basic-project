const filterContainer = document.querySelector(".right");

const filters = {
    brightness : {
        value : 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    contrast : {
        value : 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    saturation : {
        value : 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    "hue-rotate" : {
        value : 0,
        min : 0,
        max : 360,
        unit : 'deg'
    },
    blur : {
        value : 0,
        min : 0,
        max : 20,
        unit : "px"
    },
    grayscale : {
        value : 0,
        min : 0,
        max : 100,
        unit : "%"
    },
    sepia : {
        value : 0,
        min : 0,
        max : 100,
        unit : "%"
    },
    invert : {
        value : 0,
        min : 0,
        max : 100,
        unit : "%"
    }
}

const inputImage = document.querySelector("#upload-image");
const ResentButton = document.querySelector(".reset-btn");
const downloadButton = document.querySelector(".download-btn");

const noImageDiv = document.querySelector(".no-image");

let Imagecanvas = document.querySelector("#image-canvas")
const canvasCTX = Imagecanvas.getContext("2d");


let file = null
let img = null


// this fn add filter element from object to  dom
function createfilterElement(name, unit, value, min, max){
    const div = document.createElement("div")
    div.classList.add('filter')

    const filter = document.createElement("div")
    filter.innerText = name

    const input = document.createElement("input")
    input.type = 'range'
    input.min = min
    input.max = max
    input.value = value
    input.id = name
    input.dataset.unit = unit

    div.appendChild(filter)
    div.appendChild(input)

    filterContainer.appendChild(div)
}

// draw image canvas
function drawImage(){
    img = new Image();

    img.src = URL.createObjectURL(file)

    img.onload = () => {
        Imagecanvas.width = img.width
        Imagecanvas.height = img.height
        canvasCTX.drawImage(img,0,0)
    }
}

function loadFilters(){
    Object.keys(filters).forEach((key) => {
        createfilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    })
}

function removeFilter(){
    const elements = document.querySelectorAll(".filter");
    elements.forEach(el => el.remove());
}

function downloadCanvas() {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = Imagecanvas.toDataURL("image/png");
    link.click();
}


// start
// this insert filter div into dom
loadFilters()

// handle image
inputImage.addEventListener("change", (e) => {
    // hide no image div
    noImageDiv.classList.add("hide");
    file = e.target.files[0]
    drawImage()
})

ResentButton.addEventListener("click", (e)=> {
    removeFilter()
    loadFilters()
    drawImage()
})

downloadButton.addEventListener("click", ()=> {
    if(img) downloadCanvas()
})

filterContainer.addEventListener("input", (e)=>{
    if(img){
        const filterString = `${e.target.id}(${e.target.value}${e.target.dataset.unit})`
        canvasCTX.filter = filterString;
        canvasCTX.drawImage(img, 0, 0);
    }
})