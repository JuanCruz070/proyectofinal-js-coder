const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const contenedorProductos = document.getElementById("contenedor-productos");

window.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

let todosLosProductos = [];

async function cargarProductos() {
  try {
    const response = await fetch("data.json");
    todosLosProductos = await response.json();
    mostrarProductos(todosLosProductos);
  } catch (error) {
    console.log(error);
  }
}

function mostrarProductos(productos) {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imageUrl}" alt="${producto.title}" class="gameimg">
      <h3 class="game">${producto.title}</h3>
      <a class="p-article">${producto.content}</a>
      <p class="producto-precio">${producto.price}</p>
      <button class="juego-agregar" id="${producto.id}">Agregar</button>
    `;
    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    const categoriaSeleccionada = e.currentTarget.id;
    if (categoriaSeleccionada !== "todos") {
      const productosFiltrados = todosLosProductos.filter(
        (producto) => producto.categoria.id === categoriaSeleccionada
      );
      tituloPrincipal.innerText = productosFiltrados[0].categoria.nombre;
      mostrarProductos(productosFiltrados);
    } else {
      tituloPrincipal.innerText = "All Games";
      mostrarProductos(todosLosProductos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".juego-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = todosLosProductos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    // Si el producto ya está en el carrito, muestra una alerta
    Swal.fire({
      icon: "warning",
      title: "Producto repetido",
      text: "Este producto ya está en tu carrito.",
      confirmButtonColor: "#0070cc",
    });
  } else {
    if (productoAgregado) {
      // Si el producto no está en el carrito, agrégalo
      productoAgregado.cantidad = 1;
      productoAgregado.price = parseFloat(productoAgregado.price);
      productosEnCarrito.push(productoAgregado);

      actualizarNumerito();

      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
      );
    }
  }
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}

document.addEventListener("DOMContentLoaded", function () {
  const botonesMenu = document.querySelectorAll(".boton-menu");

  botonesMenu.forEach((boton) => {
    boton.addEventListener("click", function () {
      botonesMenu.forEach((b) => b.classList.remove("boton-activo"));
      this.classList.add("boton-activo");
    });
  });
});