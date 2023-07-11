let juego = document.getElementById("juego")
let jugador = document.getElementById("jugador")
let heroeSeleccionado = null
let monstruoAleatorio = null
let turnoJugador = true
let main = document.getElementsByTagName("main")
let salvar = document.getElementById("salvar")

/* Catalogo de Monstruos */
let arrayMonstruos = [
  { nombre: "Babosa", id: "001", hp: "5", mp: "10", ataqueFisico: "1", ataquePsiquico: "2", imagen: "" },
  { nombre: "Hormiga", id: "002", hp: "8", mp: "5", ataqueFisico: "3", ataquePsiquico: "3", imagen: "" },
  { nombre: "Abeja", id: "003", hp: "15", mp: "10", ataqueFisico: "6", ataquePsiquico: "4", imagen: "" },
  { nombre: "Mariposa", id: "004", hp: "10", mp: "15", ataqueFisico: "4", ataquePsiquico: "6", imagen: "" },
  { nombre: "Gusano", id: "005", hp: "15", mp: "12", ataqueFisico: "10", ataquePsiquico: "8", imagen: "" },
  { nombre: "Escarabajo", id: "006", hp: "12", mp: "15", ataqueFisico: "7", ataquePsiquico: "12", imagen: "" },
  { nombre: "Reina", id: "007", hp: "30", mp: "30", ataqueFisico: "15", ataquePsiquico: "15", imagen: "" }
];

/*Heroes para elegir */

let arrayHeroes = [
  { nombre: "Psyko", rol: "Tanque psiquico", hp: "70", mp: "30", ataqueFisico: "3", ataquePsiquico: "5", color: "orange", xp: 0 },
  { nombre: "Lance", rol: "Cañon de Cristal", hp: "30", mp: "60", ataqueFisico: "8", ataquePsiquico: "2", color: "blue", xp: 0 },
  { nombre: "Sword", rol: "Guerrero moderado", hp: "60", mp: "40", ataqueFisico: "5", ataquePsiquico: "3", color: "red", xp: 0 }
]

/*Botón de Catálogo */

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

/*Botón de Juego*/

let botonInicio = document.getElementById("botonInicio")
botonInicio.addEventListener("click", clickInicio)

function clickInicio() {
  let infoHeroes = ""

  for (let i = 0; i < arrayHeroes.length; i++) {
    const heroe = arrayHeroes[i]
    infoHeroes += `
        <div>
          <h3>${heroe.nombre}</h3>
          <ul>
            <li>Rol: ${heroe.rol}</li>
            <li>HP (Puntos de Vida): ${heroe.hp}</li>
            <li>MP (Puntos de Mente): ${heroe.mp}</li>
            <li>Ataque Físico: ${heroe.ataqueFisico}</li>
            <li>Ataque Psíquico: ${heroe.ataquePsiquico}</li>
          </ul>
          <button class="guardarHeroeBoton">Elegir</button>
      </div>
    `
  }

  juego.innerHTML = infoHeroes

  let guardarHeroeBotones = document.getElementsByClassName("guardarHeroeBoton")
  for (let i = 0; i < guardarHeroeBotones.length; i++) {
    guardarHeroeBotones[i].addEventListener("click", function () {
      guardarHeroe(i)
    })
  }
}

function guardarHeroe(index) {
  let heroe = arrayHeroes[index]
  heroeSeleccionado = heroe
  sessionStorage.setItem("heroeSeleccionado", JSON.stringify(heroe))
  console.log("Guardando héroe:", heroe)
  iniciarJuego()
}

/*Enemigo aleatorio */

function iniciarJuego() {
  juego.innerHTML = `<div id="infoMonstruoAleatorio"></div>`
  monstruoAleatorio = arrayMonstruos[Math.floor(Math.random() * arrayMonstruos.length)]
  let infoMonstruoAleatorio = document.getElementById("infoMonstruoAleatorio")

  let detalleMonstruo = `
    <h3>${monstruoAleatorio.nombre}</h3>
    <ul>
      <li>HP: <span id="hpMonstruo">${monstruoAleatorio.hp}</span></li>
      <li>MP: <span id="mpMonstruo">${monstruoAleatorio.mp}</span></li>
    </ul>
    <img src="${monstruoAleatorio.imagen}" alt="Imagen del monstruo">
    <div>
      <button id="ataqueFisicoBoton">Ataque Físico</button>
      <button id="ataquePsiquicoBoton">Ataque Psíquico</button>
      <button id="salvarBoton">Salvar Partida</button>
      <button id="cargarBoton">Cargar Partida</button>
    </div>
  `
  jugador.innerHTML = `
  <h3>${heroeSeleccionado.nombre}</h3>
  <ul>
    <li>Rol: ${heroeSeleccionado.rol}</li>
    <li>HP (Puntos de Vida): <span id="hpHeroe">${heroeSeleccionado.hp}</span></li>
    <li>MP (Puntos de Mente): <span id="mpHeroe">${heroeSeleccionado.mp}</span></li>
    <li>Ataque Físico: ${heroeSeleccionado.ataqueFisico}</li>
    <li>Ataque Psíquico: ${heroeSeleccionado.ataquePsiquico}</li>
    <li>XP (experiencia): ${heroeSeleccionado.xp}</li>
  </ul>
`

  infoMonstruoAleatorio.innerHTML = detalleMonstruo
  let ataqueFisicoBoton = document.getElementById("ataqueFisicoBoton")
  let ataquePsiquicoBoton = document.getElementById("ataquePsiquicoBoton")
  let salvarBoton = document.getElementById("salvarBoton")
  let cargarBoton = document.getElementById("cargarBoton")


  ataqueFisicoBoton.addEventListener("click", realizarAtaqueFisico)
  ataquePsiquicoBoton.addEventListener("click", realizarAtaquePsiquico)
  salvarBoton.addEventListener("click", salvarPartida)
  cargarBoton.addEventListener("click", cargarPartida)
}

/*Ataques Jugador */

function realizarAtaqueFisico() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == true) {
    let hpMonstruo = parseInt(monstruoAleatorio.hp)
    let ataqueFisicoHeroe = parseInt(heroeSeleccionado.ataqueFisico)

    hpMonstruo -= ataqueFisicoHeroe
    monstruoAleatorio.hp = hpMonstruo.toString()
    document.getElementById("hpMonstruo").textContent = monstruoAleatorio.hp

    let hpHeroe = parseInt(heroeSeleccionado.hp)
    hpHeroe -= ataqueFisicoHeroe
    heroeSeleccionado.hp = hpHeroe.toString()
    document.getElementById("hpHeroe").textContent = heroeSeleccionado.hp

    turnoJugador = false
    turnoMonstruo()
  }
}

function realizarAtaquePsiquico() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == true) {
    let mpMonstruo = parseInt(monstruoAleatorio.mp)
    let ataquePsiquicoHeroe = parseInt(heroeSeleccionado.ataquePsiquico)

    mpMonstruo -= ataquePsiquicoHeroe
    monstruoAleatorio.mp = mpMonstruo.toString()
    document.getElementById("mpMonstruo").textContent = monstruoAleatorio.mp

    let mpHeroe = parseInt(heroeSeleccionado.mp)
    mpHeroe -= ataquePsiquicoHeroe
    heroeSeleccionado.mp = mpHeroe.toString()
    document.getElementById("mpHeroe").textContent = heroeSeleccionado.mp

    turnoJugador = false
    turnoMonstruo()
  }
}

/*Ataques Monstruo */

function perdisteJuego() {
  alert("PERDISTE EL JUEGO")
}

function turnoMonstruo() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == false) {
    let ataqueAleatorio = Math.floor(Math.random() * 2) + 1

    if (ataqueAleatorio === 1) {
      let hpHeroe = parseInt(heroeSeleccionado.hp)
      let ataqueFisicoMonstruo = parseInt(monstruoAleatorio.ataqueFisico)
      hpHeroe -= ataqueFisicoMonstruo
      heroeSeleccionado.hp = hpHeroe.toString()
      console.log('Turno del monstruo: Realizó un ataque físico')
    } else {
      let mpHeroe = parseInt(heroeSeleccionado.mp)
      let ataquePsiquicoMonstruo = parseInt(monstruoAleatorio.ataquePsiquico)
      mpHeroe -= ataquePsiquicoMonstruo;
      heroeSeleccionado.mp = mpHeroe.toString()
      console.log('Turno del monstruo: Realizó un ataque psíquico')

    }

    if (heroeSeleccionado.hp < 0 || heroeSeleccionado.mp < 0) {
      perdisteJuego()
    }
    
    turnoJugador = true
  }
}

/*Salvar juego */


function salvarPartida() {
  salvar.innerHTML = `
    <input type="text" id="nombreInput" placeholder="Ingresa tu nombre">
    <button id="guardarBoton">Guardar</button>
  `;

  let nombreInput = document.getElementById("nombreInput")
  let guardarBoton = document.getElementById("guardarBoton")

  guardarBoton.addEventListener("click", function() {
    let nombre = nombreInput.value.trim()
    if (nombre) {
      const clave = "partida_" + nombre.toLowerCase()
      const datosPartida = {
        hp: heroeSeleccionado.hp,
        mp: heroeSeleccionado.mp,
        rol: heroeSeleccionado.rol,
        xp: heroeSeleccionado.xp,
        ataqueFisico: heroeSeleccionado.ataqueFisico,
        ataquePsiquico: heroeSeleccionado.ataquePsiquico
      };
      localStorage.setItem(clave, JSON.stringify(datosPartida))
      alert(`Estadísticas del héroe ${heroeSeleccionado.nombre} guardadas exitosamente.`)
    }
    salvar.innerHTML = ""
  })
}

/*Cargar Partidas */

function cargarDatosPartida(partida) {
  heroeSeleccionado.hp = partida.hp
  heroeSeleccionado.mp = partida.mp
  heroeSeleccionado.rol = partida.rol
  heroeSeleccionado.xp = partida.xp
  heroeSeleccionado.ataqueFisico = partida.ataqueFisico
  heroeSeleccionado.ataquePsiquico = partida.ataquePsiquico

  document.getElementById("hpHeroe").textContent = heroeSeleccionado.hp
  document.getElementById("mpHeroe").textContent = heroeSeleccionado.mp
}

function cargarPartida() {
  salvar.innerHTML = "<ul id='partidasGuardadas'></ul>";
  let partidasGuardadas = document.getElementById("partidasGuardadas")

  let claves = Object.keys(localStorage).filter((clave) => clave.startsWith("partida_"))

  claves.forEach((clave) => {
    let partida = JSON.parse(localStorage.getItem(clave))
    let li = document.createElement("li")
    let botonCargar = document.createElement("button")
    botonCargar.textContent = clave.substring("partida_".length)
    botonCargar.addEventListener("click", function() {
      cargarDatosPartida(partida)
      salvar.innerHTML = ""
    })
    li.appendChild(botonCargar)
    partidasGuardadas.appendChild(li)
  })
}

