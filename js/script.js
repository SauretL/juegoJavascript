let juego = document.getElementById("juego")
let jugador = document.getElementById("jugador")
let heroeSeleccionado = null
let monstruoAleatorio = null
let turnoJugador = true
let main = document.getElementsByTagName("main")
let salvar = document.getElementById("salvar")

const urlLocal = "./db.json"
let arrayMonstruos = []

/* Catalogo de Monstruos */

function obtenerMonstruo() {
  fetch(urlLocal)
    .then(response => response.json())
    .then(data => {
      arrayMonstruos = data.arrayMonstruos
    })
    .catch(() => {
      juego.innerHTML = `<h2>Error al leer el archivo JSON</h2> <p>Tenga en cuenta que, debido a que esta aplicación usa un fetch para acceder a un JSON local, tendra que usar una aplicación que permita el acceso de recursos a través de CORS.</p>`
    })
}

obtenerMonstruo()

/*Heroes para elegir */

let arrayHeroes = [
  { nombre: "Psyko", rol: "Tanque psiquico", hp: "70", mp: "30", ataqueFisico: "3", ataquePsiquico: "5", xp: 0, img: "/img/heroPsyko2.png" },
  { nombre: "Lance", rol: "Cañon de Cristal", hp: "30", mp: "60", ataqueFisico: "8", ataquePsiquico: "2", xp: 0, img: "/img/heroLance2.png" },
  { nombre: "Sword", rol: "Guerrero moderado", hp: "60", mp: "40", ataqueFisico: "5", ataquePsiquico: "3", xp: 0, img: "/img/heroSword2.png" }
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

  let listaMonstruo = `<div class="monstruoLista">
    <h3>${monstruo.nombre}</h3>
    <ul>
      <li>Id: ${monstruo.id}</li>
      <li>HP (puntos de vida): ${monstruo.hp}</li>
      <li>MP (puntos de mentalidad): ${monstruo.mp}</li>
      <li>Ataque Físico: ${monstruo.ataqueFisico}</li>
      <li>Ataque Psíquico: ${monstruo.ataquePsiquico}</li>
    </ul>
    <img class="monstruoImagen" src="${monstruo.img}" alt="Imagen del monstruo"> 
    </div>
  `

  infoMonstruo.innerHTML = listaMonstruo
}

/*Botón de Juego*/

let botonInicio = document.getElementById("botonInicio")
botonInicio.addEventListener("click", clickInicio)

function clickInicio() {
  obtenerMonstruo()
  let infoHeroes = ""
  for (let i = 0; i < arrayHeroes.length; i++) {
    const heroe = arrayHeroes[i]
    infoHeroes += `
        <div class="heroeLista">
          <h3>${heroe.nombre}</h3>
          <ul>
            <li>Rol: ${heroe.rol}</li>
            <img class="heroeImagen" src="${heroe.img}" alt="Imagen del heroe">
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
  heroeSeleccionado = Object.assign({}, heroe)
  sessionStorage.setItem("heroeSeleccionado", JSON.stringify(heroeSeleccionado))
  console.log("Guardando héroe:", heroeSeleccionado)
  iniciarJuego()
}

/*Enemigo aleatorio */
function iniciarJuego() {
  obtenerMonstruo()
  juego.innerHTML = `<div id="infoMonstruoAleatorio"></div>`
  monstruoAleatorio = arrayMonstruos[Math.floor(Math.random() * arrayMonstruos.length)]

  /*si el jugador es de un nivel menor o igual a 5 no se va a encontrar a la Reina, sino a la abeja en su lugar*/

  if (monstruoAleatorio.id == "007" && heroeSeleccionado.xp <= 5) {
    mounstruoAbeja = arrayMonstruos.find(monstruo => monstruo.id == "003")
    monstruoAleatorio = mounstruoAbeja
  }
  console.log(typeof (heroeSeleccionado.xp))
  console.log(monstruoAleatorio)
  let infoMonstruoAleatorio = document.getElementById("infoMonstruoAleatorio")

  let detalleMonstruo = ` <div class="monstruoAleatorio">
    <h3>${monstruoAleatorio.nombre}</h3>
    <ul>
      <li>HP: <span id="hpMonstruo">${monstruoAleatorio.hp}</span></li>
      <li>MP: <span id="mpMonstruo">${monstruoAleatorio.mp}</span></li>
    </ul>
    <img class="monstruoImagen" src="${monstruoAleatorio.img}" alt="Imagen del monstruo">
    <div class="panelDePelea">
      <button id="ataqueFisicoBoton" class="botonPelea">Ataque Físico</button>
      <button id="ataquePsiquicoBoton" class="botonPelea">Ataque Psíquico</button>
      <button id="salvarBoton" class="botonPelea">Salvar Partida</button>
      <button id="cargarBoton" class="botonPelea">Cargar Partida</button>
    </div>
    </div>
  `
  jugador.innerHTML = ` <div class="heroeJugador">
  <h3 id="nombreHeroe">${heroeSeleccionado.nombre}</h3>
  <ul>
    <li id="rolHeroe">Rol: ${heroeSeleccionado.rol}</li>
    <img id="imgHeroe" class="heroeImagen" src="${heroeSeleccionado.img}" alt="Imagen del heroe">
    <li>HP (Puntos de Vida): <span id="hpHeroe">${heroeSeleccionado.hp}</span></li>
    <li>MP (Puntos de Mente): <span id="mpHeroe">${heroeSeleccionado.mp}</span></li>
    <li>Ataque Físico: <span id="ataqueFisHeroe">${heroeSeleccionado.ataqueFisico}</span></li>
    <li>Ataque Psíquico: <span id="ataquePsiHeroe">${heroeSeleccionado.ataquePsiquico}</span></li>
    <li>XP (experiencia): <span id="xpHeroe">${heroeSeleccionado.xp}</span> </li>
  </ul>
  </div>
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

function ganasteJuego() {

  let timerInterval
  Swal.fire({
    title: "¡Ganaste!",
    html: `Le ganaste a ${monstruoAleatorio.nombre}`,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {

    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('Me cerro el timer')
    }
  })

  heroeSeleccionado.xp++
  heroeSeleccionado.hp = Number(heroeSeleccionado.hp) + Math.floor(Number(heroeSeleccionado.xp) / 2)
  heroeSeleccionado.mp = Number(heroeSeleccionado.mp) + Math.floor(Number(heroeSeleccionado.xp) / 2)
  heroeSeleccionado.ataqueFisico++
  heroeSeleccionado.ataquePsiquico++
  document.getElementById("xpHeroe").textContent = heroeSeleccionado.xp
  document.getElementById("hpHeroe").textContent = heroeSeleccionado.hp
  document.getElementById("mpHeroe").textContent = heroeSeleccionado.mp
  document.getElementById("ataqueFisHeroe").textContent = heroeSeleccionado.ataqueFisico
  document.getElementById("ataquePsiHeroe").textContent = heroeSeleccionado.ataquePsiquico

  iniciarJuego()

}

function realizarAtaqueFisico() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == true) {
    let hpMonstruo = (monstruoAleatorio.hp)
    let ataqueFisicoHeroe = (heroeSeleccionado.ataqueFisico)

    hpMonstruo -= ataqueFisicoHeroe
    monstruoAleatorio.hp = hpMonstruo.toString()
    document.getElementById("hpMonstruo").textContent = monstruoAleatorio.hp

    Toastify({
      text: "¡Has realizado un ataque físico!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast()

    if (monstruoAleatorio.hp <= 0 || monstruoAleatorio.mp <= 0) {
      ganasteJuego()
    }

    turnoJugador = false
    turnoMonstruo()
  }
}

function realizarAtaquePsiquico() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == true) {
    let mpMonstruo = (monstruoAleatorio.mp)
    let ataquePsiquicoHeroe = (heroeSeleccionado.ataquePsiquico)

    mpMonstruo -= ataquePsiquicoHeroe
    monstruoAleatorio.mp = mpMonstruo.toString()
    document.getElementById("mpMonstruo").textContent = monstruoAleatorio.mp

    Toastify({
      text: "¡Has realizado un ataque psíquico!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #96c93d, #00b09b)",
    }).showToast()

    if (monstruoAleatorio.hp <= 0 || monstruoAleatorio.mp <= 0) {
      ganasteJuego()
    }
    turnoJugador = false
    turnoMonstruo()
  }
}

/*Ataques Monstruo */

function reiniciar() {
  window.location.reload()
}

function perdisteJuego() {

  Swal.fire({
    title: "Haz perdido el juego",
    text: "Carga una partida vieja o inicia un nuevo juego para continuar",
    icon: 'error',
    confirmButtonText: "Ok"
  }).then((result) => {
    if (result.isConfirmed) {
      reiniciar()
    }
  })

}



function turnoMonstruo() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == false) {
    let ataqueAleatorio = Math.floor(Math.random() * 2) + 1

    if (ataqueAleatorio === 1) {
      let hpHeroe = (heroeSeleccionado.hp)
      let ataqueFisicoMonstruo = (monstruoAleatorio.ataqueFisico)
      hpHeroe -= ataqueFisicoMonstruo
      heroeSeleccionado.hp = hpHeroe.toString()
      document.getElementById("hpHeroe").textContent = heroeSeleccionado.hp

      Toastify({
        text: `¡${monstruoAleatorio.nombre} realizo un ataque físico!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #FBD72B, #F9484A)",
      }).showToast()

      console.log("Turno del monstruo: Realizó un ataque físico")
    } else {
      let mpHeroe = (heroeSeleccionado.mp)
      let ataquePsiquicoMonstruo = (monstruoAleatorio.ataquePsiquico)
      mpHeroe -= ataquePsiquicoMonstruo
      heroeSeleccionado.mp = mpHeroe.toString()
      document.getElementById("mpHeroe").textContent = heroeSeleccionado.mp

      Toastify({
        text: `¡${monstruoAleatorio.nombre} realizo un ataque psíquico!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ED008C, #FFF000)",
      }).showToast()

      console.log("Turno del monstruo: Realizó un ataque psíquico")

    }

    if (heroeSeleccionado.hp <= 0 || heroeSeleccionado.mp <= 0) {
      perdisteJuego()
    }

    turnoJugador = true
  }
}

/*Salvar juego */


function salvarPartida() {
  salvar.innerHTML = ` <div class="guardado">
    <input type="text" id="nombreInput" placeholder="Ingresa tu nombre">
    <button id="guardarBoton">Guardar</button>
    </div>
  `;

  let nombreInput = document.getElementById("nombreInput")
  let guardarBoton = document.getElementById("guardarBoton")

  guardarBoton.addEventListener("click", function () {
    let nombre = nombreInput.value.trim()
    if (nombre) {
      const clave = "partida_" + nombre.toLowerCase()
      const datosPartida = {
        nombre: heroeSeleccionado.nombre,
        img: heroeSeleccionado.img,
        hp: heroeSeleccionado.hp,
        mp: heroeSeleccionado.mp,
        rol: heroeSeleccionado.rol,
        xp: heroeSeleccionado.xp,
        ataqueFisico: heroeSeleccionado.ataqueFisico,
        ataquePsiquico: heroeSeleccionado.ataquePsiquico
      };
      localStorage.setItem(clave, JSON.stringify(datosPartida))

      let timerInterval
      Swal.fire({
        title: "Salvado exitoso",
        html: `Estadísticas del héroe ${heroeSeleccionado.nombre} guardadas exitosamente.`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })

    }
    salvar.innerHTML = ""
  })
}

/*Cargar Partidas */

function cargarDatosPartida(partida) {
  heroeSeleccionado = Object.assign({}, partida)
  heroeSeleccionado.nombre = partida.nombre
  heroeSeleccionado.img = partida.img
  heroeSeleccionado.hp = partida.hp
  heroeSeleccionado.mp = partida.mp
  heroeSeleccionado.rol = partida.rol
  heroeSeleccionado.xp = partida.xp
  heroeSeleccionado.ataqueFisico = partida.ataqueFisico
  heroeSeleccionado.ataquePsiquico = partida.ataquePsiquico

  document.getElementById("nombreHeroe").textContent = heroeSeleccionado.nombre
  document.getElementById("imgHeroe").src = heroeSeleccionado.img
  document.getElementById("rolHeroe").textContent = heroeSeleccionado.rol
  document.getElementById("hpHeroe").textContent = heroeSeleccionado.hp
  document.getElementById("mpHeroe").textContent = heroeSeleccionado.mp

  iniciarJuego()
}

function cargarPartida() {
  salvar.innerHTML = "<ul id='partidasGuardadas'></ul>"
  let partidasGuardadas = document.getElementById("partidasGuardadas")

  let claves = Object.keys(localStorage).filter((clave) => clave.startsWith("partida_"))

  claves.forEach((clave) => {
    let partida = JSON.parse(localStorage.getItem(clave))
    let li = document.createElement("li")
    let botonCargar = document.createElement("button")
    botonCargar.classList.add("botonCargarPartida")
    botonCargar.textContent = clave.substring("partida_".length)
    botonCargar.addEventListener("click", function () {
      cargarDatosPartida(partida)
      salvar.innerHTML = ""
    })
    li.appendChild(botonCargar)
    partidasGuardadas.appendChild(li)
  })
}

