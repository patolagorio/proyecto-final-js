const titulo = document.getElementById("titulo")
const slogan = document.getElementById("slogan")
const imgCarrito = document.getElementById("imgCarrito")
const btnCarrito = document.getElementById("btnCarrito")
const footer = document.getElementById("footer")
const container = document.getElementById("container")
const inputSearch = document.querySelector("input#inputSearch")
const URL = 'bbdd/productos.json'
const productos = []

async function obtenerDatos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
            if (data.length > 0) {
                productos.push(...data)
                cargarProductos(productos)
                activarClickBotones()
            }
            inicializarContador();
    } catch (error) {
        console.error(error)
        container.innerHTML = retornoError()
    }
}
obtenerDatos()

imgCarrito.addEventListener("mousemove", ()=> {
    let totalProductos = carrito.length
        imgCarrito.title = `${totalProductos} productos en el carrito`
})

titulo.innerText = "Pato Palas Premium"
slogan.textContent = "Las mejores palas del mercado."
imgCarrito.src = "img/carrito.png"
btnCarrito.src = "img/carrito.png"
footer.innerHTML = "<p>Copyright 2022 - <strong> Patricio Lagorio Comisión 34095 JS</strong></p>" 

function cargarProductos(array) {
    let contenido = ""
        if (array.length > 0) {
            array.forEach(producto => {
                contenido += retornoCard(producto)
            })
            container.innerHTML = contenido
        }
}

function inicializarContador() {
    const palasEnCarrito = document.querySelector(".palasEnCarrito")
    if (localStorage.getItem("miCarrito") !== null) {
    var carritoItem = JSON.parse(localStorage.getItem("miCarrito"));
    var size = Object.keys(carritoItem).length;
    } else {
        var size = 0;
    }
    palasEnCarrito.innerHTML = size;
}

function activarClickBotones() {
    const botonesAdd = document.querySelectorAll("button.button.button-outline.button-add")
    botonesAdd.forEach(btn => {
        btn.addEventListener("click", ()=> {
            let resultado = productos.find(prod => prod.id === parseInt(btn.id))
                carrito.push(resultado)
                localStorage.setItem("miCarrito", JSON.stringify(carrito))
                toast(`'${resultado.nombre}' se agregó al carrito`, 'green')
        })
    })
}

function filtrarProductos() { 
    let resultado = productos.filter(producto => producto.nombre.toUpperCase().includes(inputSearch.value.toUpperCase().trim()))
        if (resultado.length > 0) {
            cargarProductos(resultado)
            activarClickBotones()
        } else {
            console.warn("No se han encontrado coincidencias.")
        }
}

inputSearch.addEventListener("search", ()=> { 
    inputSearch.value.trim() !== "" ? filtrarProductos() : cargarProductos(productos)
})

inputSearch.addEventListener("change", ()=> activarClickBotones())

const toast = (text, bgcolor)=> {
    Toastify({
        text: text,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: { background: bgcolor || 'CornFlowerBlue', fontSize: '24px'}
      }).showToast();
      const palasEnCarrito = document.querySelector(".palasEnCarrito")
      var carritoItem = JSON.parse(localStorage.getItem("miCarrito"));
      var size = Object.keys(carritoItem).length;
      palasEnCarrito.innerHTML = size;
      
}