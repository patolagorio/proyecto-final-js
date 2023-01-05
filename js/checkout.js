function recuperarCarrito() {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
    const carrito = JSON.parse(localStorage.getItem("miCarrito")) || [];
    (carrito.length > 0) && carrito.forEach(pala => {
        tablaHTML += armarTablaCarrito(pala);tbody.innerHTML = tablaHTML})
    tbody.innerHTML = tablaHTML
    calcularTotal()
}
recuperarCarrito()

function activarBotonesDelete() {
    const buttonsDelete = document.querySelectorAll("button.button-outline.button-delete")
    buttonsDelete.forEach(btn => {
        btn.addEventListener("click", ()=> {
            let pos = carrito.findIndex(pala => pala.nombre === btn.id)
                if (pos > -1) {
                    carrito.splice(pos, 1)
                    localStorage.setItem("miCarrito", JSON.stringify(carrito))
                    recuperarCarrito()
                    activarBotonesDelete()
                }
        })
    })
}
activarBotonesDelete()

function calcularTotal() {
    let total = document.querySelector("h3#total")
    let totalCarrito = carrito.reduce((acc, pala)=> acc + pala.precio, 0)
        total.innerText = `Total: $ ${totalCarrito.toLocaleString()}`
}

const btnComprar = document.querySelector("#btnComprar")

btnComprar.addEventListener("click", ()=> {
    Swal.fire({
        icon: 'question',
        title: '¿Confirmas la compra de estos productos?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: `Cancelar`,
      }) 
      .then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem("miCarrito")
            carrito.length = 0
            Swal.fire("Ya estas listo para ganar", '', 'check')
                .then(()=> {
                    location.href = 'index.html'
                })
        }
      })
})