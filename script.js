// Catálogo de productos con nombre y precio
const productos = [
    { nombre: "Dipladenia", precio: 100 },
    { nombre: "Bouganvillea", precio: 200 },
    { nombre: "Ficus Bonzai", precio: 300 },
    { nombre: "Eucalipto", precio: 400 },
    { nombre: "Montsera", precio: 500 }
];

// Carrito de compras vacío al inicio
let carrito = [];

/**
 * Muestra el catálogo de productos y solicita al usuario elegir uno.
 * @returns {number} El índice del producto seleccionado o 0 para finalizar.
 */
function mostrarProductos() {
    let lista = "Productos disponibles:\n";
    productos.forEach((producto, index) => {
        lista += `${index + 1}: ${producto.nombre} - $${producto.precio}\n`;
    });

    // Solicitar al usuario que ingrese un número del producto o 0 para finalizar
    let seleccion = prompt(lista + "Ingrese el número del producto que desea agregar al carrito o '0' para finalizar.");
    return parseInt(seleccion); // Convertir la selección a número entero
}

/**
 * Agrega un producto al carrito según el índice seleccionado.
 * @param {number} indiceProducto - El índice del producto seleccionado.
 */
function agregarAlCarrito(indiceProducto) {
    if (indiceProducto > 0 && indiceProducto <= productos.length) {
        const productoSeleccionado = productos[indiceProducto - 1];
        carrito.push(productoSeleccionado);
        alert(`${productoSeleccionado.nombre} ha sido agregado a su carrito.`);
    } else if (indiceProducto !== 0) {
        alert("Selección inválida. Por favor, elija un número válido.");
    }
}

/**
 * Calcula el total del costo de los productos en el carrito.
 * @returns {number} El costo total.
 */
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

/**
 * Muestra el resumen del carrito y el total de la compra.
 */
function mostrarResumenCarrito() {
    const resumen = carrito.map(producto => `${producto.nombre} - $${producto.precio}`).join("\n");
    const total = calcularTotal();

    const resumenElemento = document.getElementById('cart-summary');
    resumenElemento.innerHTML = `<h3>Resumen de su Compra:</h3><p>${resumen}</p><p><strong>Total: $${total}</strong></p>`;
    resumenElemento.style.display = 'block'; // Mostrar el resumen
}

/**
 * Función principal que inicia el proceso de compra.
 */
function iniciarCompra() {
    let seleccion = -1;

    // Permitir al usuario seleccionar productos hasta que ingrese 0 para finalizar
    while (seleccion !== 0) {
        seleccion = mostrarProductos();
        if (seleccion !== 0) {
            agregarAlCarrito(seleccion);
        }
    }

    // Confirmar si desea ver el total del carrito
    if (carrito.length > 0) {
        const confirmar = confirm("¿Desea ver el total de su compra?");
        if (confirmar) {
            mostrarResumenCarrito();
            console.log("Carrito final:", carrito); // Mostrar el carrito en la consola para depuración
        } else {
            alert("Compra cancelada.");
        }
    } else {
        alert("No se agregaron productos al carrito.");
    }
}

// Vincular el botón de "Iniciar Compra" con la función iniciarCompra
document.getElementById("start").addEventListener("click", iniciarCompra);
