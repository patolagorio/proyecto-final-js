//OPERADOR LOGICO OR      OPERANDO 1                                  || OPERANDO 2
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || []


function retornoCard({id, imagen, nombre, precio}) {
        return `<div class="card" id="card${id}">
                    <div class="card-image"><img src=${imagen}></div>
                    <div class="card-name">${nombre}</div>
                    <div class="card-price">$ ${precio.toFixed(2)}</div>
                    <div class="card-button">
                        <button class="button button-outline button-add" id="${id}" title="Clic para agregar '${nombre}' al carrito"><img src="img/carrito.png"></button>
                    </div> 
                </div>`
}

function retornoError() {
        return `<div class="card-error">
                    <h2>Houston, tenemos un problema 🔌</h2>
                    <h3>No pudimos cargar los productos. 🤦🏻‍♂️</h3>
                    <h3>Intenta nuevamente en unos instantes...</h3>
                </div>`
}

function armarTablaCarrito(pala) {
    console.log('pala')
        return `<tr>
                    <td class="centrar img-xx-large"><img class="img-en-carrito" src="${pala.imagen}"></td>
                    <td>${pala.nombre}</td>
                    <td>${pala.precio}</td>
                    <td><button class="button button-outline button-delete" id="${pala.nombre}" title="Quitar del carrito">🗑</button></td>
                </tr>`
}