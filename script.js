// Catálogo de productos con nombre y precio
const productos = [
    { id: 1, nombre: "Montsera", precio: 100 },
    { id: 2, nombre: "Rosa", precio: 200 },
    { id: 3, nombre: "Dipladenia", precio: 300 },
    { id: 4, nombre: "Bouganvillea", precio: 400 },
    { id: 5, nombre: "Ficus Bonsai", precio: 500 }
];

// Carrito de compras, cargado desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const productSelect = document.getElementById("product-select");
const productCount = document.getElementById("product-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");
const orderForm = document.getElementById("order-form");
const contactForm = document.getElementById("contact-form");

// Inicializar la página con productos y carrito cargados
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarCarrito();
});

// Cargar el catálogo de productos en el select del formulario
function cargarProductos() {
    productos.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.id;
        option.textContent = `${producto.nombre} - $${producto.precio}`;
        productSelect.appendChild(option);
    });
}

// Agregar producto al carrito
document.getElementById("add-to-cart").addEventListener("click", () => {
    const productoSeleccionadoId = productSelect.value;

    if (productoSeleccionadoId) {
        const productoSeleccionado = productos.find(prod => prod.id == productoSeleccionadoId);
        carrito.push(productoSeleccionado);
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
        actualizarCarrito();
    } else {
        alert("Por favor, seleccione un producto.");
    }
});

// Actualizar la vista del carrito en el DOM
function actualizarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        cartItems.appendChild(li);
        total += producto.precio;
    });

    productCount.textContent = carrito.length;
    cartTotal.textContent = total;

    // Mostrar o esconder botón de vaciar carrito según el estado
    if (carrito.length > 0) {
        clearCartButton.style.display = "block";
    } else {
        clearCartButton.style.display = "none";
    }
}

// Vaciar el carrito
clearCartButton.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
});

// Mostrar formulario para ordenar pedido
document.getElementById("place-order").addEventListener("click", () => {
    if (carrito.length > 0) {
        orderForm.style.display = "flex";
    } else {
        alert("El carrito está vacío. Agregue productos para realizar un pedido.");
    }
});

// Cancelar el formulario de pedido
document.getElementById("cancel-order").addEventListener("click", () => {
    orderForm.style.display = "none";
});

// Confirmar el pedido
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("phone").value;

    if (nombre && email && telefono) {
        const detallesPedido = carrito.map(prod => `${prod.nombre} - $${prod.precio}`).join("\n");
        const mensaje = `
            Nombre: ${nombre}
            Email: ${email}
            Teléfono: ${telefono}
            Detalles del pedido:
            ${detallesPedido}
        `;

        alert("Su pedido ha sido enviado correctamente.\n" + mensaje);
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
        orderForm.style.display = "none";

        // Aquí es donde se implementaría el envío de email usando un servicio como EmailJS.
        // Ejemplo:
        // emailjs.send("service_id", "template_id", {
        //     to_name: nombre,
        //     message: mensaje,
        //     to_email: email
        // });

        alert("El equipo de Planta Flora se pondrá en contacto pronto.");
    } else {
        alert("Por favor complete todos los campos.");
    }
});
