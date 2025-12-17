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
    exposure : {
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
    hueRotation : {
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
    opacity : {
        value : 100,
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

const noImage = document.querySelector(".no-image");

const Imagecanvas = document.querySelector("#image-canvas")
const canvasCTX = Imagecanvas.getContext("2d");

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

    div.appendChild(filter)
    div.appendChild(input)

    filterContainer.appendChild(div)

}



// this insert filter div into dom
Object.keys(filters).forEach((key) => {
    createfilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
})


inputImage.addEventListener("change", (e) => {
    noImage.classList.add("hide")
    
    const file = e.target.files[0]

    const img = new Image();

    img.src = URL.createObjectURL(file)

    img.onload = () => {
        Imagecanvas.width = img.width
        Imagecanvas.height = img.height
        canvasCTX.drawImage(img,0,0)
    }

})