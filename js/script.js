let juego = document.getElementById("juego")

/* Catalogo de Monstruos */
let arrayMonstruos = [
    { nombre: "Babosa", id: "001", hp: "5", mp: "10", ataqueFisico: "1", ataquePsiquico: "2", imagen: "" },
    { nombre: "Hormiga", id: "002", hp: "8", mp: "5", ataqueFisico: "3", ataquePsiquico: "3", imagen: "" },
    { nombre: "Abeja", id: "003", hp: "15", mp: "10", ataqueFisico: "6", ataquePsiquico: "4", imagen: "" },
    { nombre: "Mariposa", id: "004", hp: "10", mp: "15", ataqueFisico: "4", ataquePsiquico: "6", imagen: "" },
    { nombre: "Gusano", id: "005", hp: "15", mp: "12", ataqueFisico: "10", ataquePsiquico: "7", imagen: "" },
    { nombre: "Escarabajo", id: "006", hp: "12", mp: "15", ataqueFisico: "7", ataquePsiquico: "10", imagen: "" },
    { nombre: "Reina", id: "007", hp: "30", mp: "30", ataqueFisico: "15", ataquePsiquico: "15", imagen: "" }
];

let botonCatalogo = document.getElementById("botonCatalogo")
botonCatalogo.addEventListener("click", clickCatalogo)

function clickCatalogo() {
    let botonesCatalogo = ""
    for (let i = 0; i < arrayMonstruos.length; i++) {
        let monstruo = arrayMonstruos[i]
        botonesCatalogo += `<button class="botonMonstruo" data-index="${i}">${monstruo.nombre}</button>`
    }
    juego.innerHTML = `<div>${botonesCatalogo}</div><div id="infoMonstruo"></div>`

    let botonMonstruo = document.getElementsByClassName("botonMonstruo")
    for (let i = 0; i < botonMonstruo.length; i++) {
        botonMonstruo[i].addEventListener("click", function () {
            mostrarDetalleMonstruo(i)
        })
    }
}

function mostrarDetalleMonstruo(index) {
    let monstruo = arrayMonstruos[index]
    let infoMonstruo = document.getElementById("infoMonstruo")

    let listaMonstruo = `
    <h3>${monstruo.nombre}</h3>
    <ul>
      <li>Id: ${monstruo.id}</li>
      <li>HP (puntos de vida): ${monstruo.hp}</li>
      <li>MP (puntos de mentalidad): ${monstruo.mp}</li>
      <li>Ataque Físico: ${monstruo.ataqueFisico}</li>
      <li>Ataque Psíquico: ${monstruo.ataquePsiquico}</li>
    </ul>
    <img src="${monstruo.imagen}" alt="Imagen del monstruo">
  `

    infoMonstruo.innerHTML = listaMonstruo
}
