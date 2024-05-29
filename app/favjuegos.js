let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
  console.log("Productos en carrito:", productosEnCarrito);

  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      console.log("Producto:", producto);
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <img src="../${producto.imageUrl}" alt="${
        producto.title
      }" class="carrito-producto-imagen">
        <div class="carrito-producto-titulo">
            <small>Title</small>
            <h3 class="carrito-h3-producto">${producto.title}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>Quantity</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Price</small>
            <p>$${parseFloat(producto.price).toFixed(2)}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${(parseFloat(producto.price) * producto.cantidad).toFixed(
              2
            )}</p>
        </div>
        <button type="button" class="carrito-producto-eliminar" ">X</button>
      `;

      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function actualizarTotal() {
  const total = productosEnCarrito.reduce((acc, producto) => {
    const subtotal = parseFloat(producto.price) * producto.cantidad;
    console.log(
      `Precio: ${producto.price}, Cantidad: ${producto.cantidad}, Subtotal: ${subtotal}`
    );
    return acc + subtotal;
  }, 0);
  contenedorTotal.innerText = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}

botonComprar.addEventListener("click", () => {
  Swal.fire("Thank you for buying!");
  productosEnCarrito = [];
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
});

cargarProductosCarrito();