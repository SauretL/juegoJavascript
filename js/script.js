let juego = document.getElementById("juego")
let jugador = document.getElementById("jugador")
let heroeSeleccionado = null
let monstruoAleatorio = null
let turnoJugador = true
let main = document.getElementsByTagName("main")
let salvar = document.getElementById("salvar")

/* Catalogo de Monstruos */
let arrayMonstruos = [
  { nombre: "Babosa", id: "001", hp: "5", mp: "10", ataqueFisico: "1", ataquePsiquico: "2", imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAY1BMVEX///8AAAD39/f6+vqdnZ3y8vLl5eWsrKza2tpERESjo6OSkpIfHx/i4uLAwMCDg4MvLy+2trZUVFRjY2NbW1vKysp4eHgVFRXR0dEODg6JiYlqampxcXFMTEwnJyc+Pj42NjaXny1MAAACBElEQVRoge2W25ajIBBFU8Yr4hXxgkbz/185knSmk45otOPkYc5+ci1KNlWC1OEAAAAAAAAAAAAAAAAAYBnnQ15F4Ue8DhFZHzFXRPIj4oNN3N/0ouU4kR+5juNsLJlHTbwi/OjWsZ2c0rTnvKGm4pz36blQnozWLkARsdecURyKgZOB6pyH0l2e5TumJUoWw92sO5mU9/Yi9OczH223b2uNM+bHOasf5i9IbwRqbtfo1d32s9sTpcYi1SpdYf1yM2PasS5c95Wnr4PryWTt9dYriTETV5cvuz5LHeo9hUix0XqhMFY81KPXhWU6Uj2MWt7wG61GmNSy+puofQn8Lk9k97/VakrDJXQpdxHpx0THVcFILtr21LxDO8IzQ9JKjzK9ydo3qX5i+kdkutyBPByLncRUGsxuoEfFK/+ljbSmQ93t57zSm84029tMpi0mdzerSW+U7C6m4vlEOx2969TOcX66DNyw/gcZ00S/4az3Vuk5F2K4r1TD06DLU2OHMiIeyz3u6ZIt3H5pyLwLzFYhy27tSyQzluSFYl4so+usji9jzy6LYerz8Ydz5ZX6Zz13KQxr2sH7Utbhz5ynwizdy03Uhy13cDPE5UNGM6uUdiKCYQjSQIjS3tZ0P3KMpK3aU0VcTLY596Ej1lz/t0VvbW39AQAAAAAAAAAAAAAA4L/hD8KTGVrRfhtwAAAAAElFTkSuQmCC" },
  { nombre: "Hormiga", id: "002", hp: "8", mp: "5", ataqueFisico: "3", ataquePsiquico: "3", imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAMAAAALZFNgAAAAaVBMVEX///8AAAD8/Pzm5uZdXV339/ff39/i4uLy8vI3Nzfr6+sRERFjY2Pb29uRkZFnZ2eLi4u5ubmzs7Otra3JycmgoKCmpqYeHh7Pz89ISEhCQkIZGRkjIyNubm7Dw8N/f38rKytTU1N3d3d88I+2AAAFEElEQVR4nO2a2ZaDKBCGU+5CRNS4a1ze/yEHTNw1023o0TOH76I7yYnwW0Bt5naTSCQSiUQikUgkEolEIpyEWGdL4CgU4HG2CIbTQOydLYLxBGjQ2SLYshCA8GwRnPs1toeVQq2eLYJh1ODqZ4tgmDGUytkiGE4M9GwNnCS/xnEx8TXsodZAztbAQRfRccugPFtCRwnaFc7tjYC9k38oyEi8kLrpf3KgWLzd9OuqX91teJEKmUn/GD9MgOfqQ+RXnYDiTsPg6ThCdCA7/jCQ3qwcmeVpMYCt0Yeli9w7DXzyVRS0hQzC14M+hYfhADIbL24MeW0GUN/DxAM83ajKs2Qqqr/ISZQG1BaS2UekgJ4cxvzUcigzRhYKyxS9YJJVOJDdPKimOkqYknYiFSeqmJGg8cRlJKwagHF3emwvKpBN7F/BHmUkMi9SWV4BMEzc8sNZTjJRJ18ryNJUCxPByXvF4lcFab89C8y2vz85N96GKf6ijjE6fz1GDyjYnwQDKVsa8TMZbQjJxaeqigs+/2e/bWBAapF0OCW1lmxZBALhQp7vRUFxJ4i9LxZzanhDSCbaJErRuwzz5SH2j8icRrAjjcDtXz4AkoXL+ABuhK6ODtgY3oRQ/1gHFOsIfACFkpdlq1nqSfZmdezlJ9XTEBBndXbjBbesA/k0gulb25JzQ+3cHGLyjZsGLrv5O2IvuoU2A1KVLfEfOzru7DvGJPARQUem5CObKWCWezKrkA0XPqes0iLPa9f3g8B7iFiTDgoNXw/e+YKn4f6bihd5UWBoBSl4QaCwekWQ/kCDGwUPA/GY434e+Xd4kL93GlodhS3wkKAilqiIwxlT8N3DOjPH6GZuNhibYx5BxUMEN36igxokGi4OxPUh9GJwYM7e3ElCXU3T3AZK1J3Y4ZAYuS1Ih9Id3Pege0L4DlLY5FYMygPbvjler4EgR0Yhe98e2l+NIYaQVefhOcupjxMNDt3K9oUMc6kxXpTaOhbSzEzG3uynpGN0FhVEiyHIK3n6DrYr+lGCDzrAHm7aWnUfHKi/1qGnw5Jbe0GWyygnG7JdGSD9vuF9H2tn+sEeXjjpOSQQL0bxvo43BNI+dn/yZBqbatIJ0JYFDLPrd9uV1fDDAO0HIQbbBpNmT7LqlUXfnWBmhKG8N5flwgTuwrsC643eLF2YDvEXJrEAphFjl+5mCzyZ6Tm44p7wC5OwYm5y8X4K0nbLUM4OxpA0DDcVH98ldKyw+dD7G7UjnJWT4crPh4cPTgTxxC+pezr6w/KYTY1qWAynH/UlzvypW7KjIxi/MOtut6t6O4H6tVyK9Zs02qrn7vG+KcMed4Ja29PxHXCX01HII6QnpLR/s0jpfJE3ewx4GtzYkVXmb1eNoT7JrH8hhAz+iTtW5YnXiTuuzNkl7nxmutELMYlt330D/XxpyOB/wrSlvA0YLXcrNRfXtPPNiAB/3ahSG4j7aTpzYpc52ElFXbj++qaiRY4csi/mGaM+mI0gmk+SC0V1HOelyvLvNaOhj03X9Fj6zse9iDEjx8tE6TOmY5qJF2rsRsIjZSraeDplqaapot/V3qgPas3BX5fo0Aip9hWipalLPefoaIptX+BnGBxXVPnyLXT+bOI8wj/pcB/Av8jDZRZehXZkjqOCqKr/W+xL/G7oxlPm7BJP3Hlh9buo8mcguIpPC6C+xM8g393pSxAKeQwikUgkEolEIpFIJBLJ/5h/AAw5Ohkcu3rXAAAAAElFTkSuQmCC" },
  { nombre: "Abeja", id: "003", hp: "15", mp: "10", ataqueFisico: "6", ataquePsiquico: "4", imagen: "data:image/jpeg;base64,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" },
  { nombre: "Mariposa", id: "004", hp: "10", mp: "15", ataqueFisico: "4", ataquePsiquico: "6", imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAZlBMVEX///8AAAD29vbk5OTu7u7e3t7V1dXZ2dlpaWm8vLwqKirCwsLx8fGNjY07Oztubm7Pz88YGBiampqFhYWsrKx5eXkICAhRUVGzs7OTk5NhYWGhoaFJSUkcHBwwMDBERERZWVkjIyNNkOBeAAAEYElEQVRoge2ai7KiMAxAbXnLQ1RAvCpX/v8nt+WhIG0SijuzM9szO7Oza5s0JU3SwG5nsVgsFovFYrFY/kFcz/d9z/1r8rkT+H7g8MUPedi0FWOsapvLKf/6AryozPZHKf+4z05z8Smb0YRx8j3FzvVSzcQ/nOmvbEGTfsn4+GcpPJz8Xi9/FpSOViCZOlNJfqC6GTtstD2q1HLbyZhco5uxdOmWZHKlzZLLZBTX6mZNZKjZLfVCz9OB+mHCMYxcPtoDIovpSGCNjB3j9apBgWzmxBE4lKUrNQeQ0YLZ4ETjkCPZKoe/wcI+TXkiw9mKfYf3W5DPxyObLrgRNfNfTNL+Y4aLPCHBdRhaK7fgPDwVhy6IvlGvU/nzVKgOWND/fcTlBJ+TfXwOO3QjY6aIdaes+099gHxzWc5GvW2cxtvTcnYfLmKCDJXX4t4m6La7ZovJxZ4TrWaZYtc47iRs2PZsYXhnTEARwBSbJh4Zaap0OI99hPir3A8HiU8DyigFJLPPdaeH2UxHriUh7ds8hb0505TXYmgzc5i7zLMX2mxNcE5os5knLG0mu36Tu0CID5JSrZo8/yE8tX7vuncX/y6I69aWgIpyVUln56ueefrS++gztxnOhF5+H+YUMsloK7MPPL1u4jFhlXjaee+x/LnDE/YIYDbZ1TuXCTuXPTj0Z1WBBb/7IIqR6V8uwJUJUXHzUIKUXtTdk1mlEGZIcaQwLtgjhReneo0ILryQf2gZUFLAqolpkPWGpz+hT8v8kl9MNTk2iupDxhOREakHM8d1u0RRtz6eXHYtbTx4vkauNFnZ8JipZtMulWiRa0JNUk0+M2v4oakm7/oKWnoLg+rrZFZc4hNChb8GZX2og1ZyUglxhVO+6W9kPxvxwi/te0a9wE5x4mt5Tjes4HIq0yI3blTx+xaTTSx+Q82oGojBTAlUQlXDusDlmfcl4cq3L8nLAzRm5emaAIplXmdxDA9a9BiIIJnc6wxHFqi9AyEgdaMni6U7UrY0hu8AYIuYI7sFN6ykB24iANjZTuQJjLCEa3bMsJZbdyfIsSezaKbRdMNCmbw6VoH2ncOAmbMht6xKhp7Kw/pTZrpdOI38DrqRbKvpryAkDWZQKWOHAy9xVcnygsNVmxAaMuZjfTnD1y3w+Y4GP0dyndn5Rpp94hZ4766j4BIfhpkMLBhlA7XprAdbTKtrtQEONSFkq6fXDd6BjUsXKFzeet0iZCbQAzd+nQxFNvG4d/t+CaF+lGkK3UH9NtlE4G1/fIFWxYY3yfrXZlJn0vapQh+E1r7Tm6FLFJU8OrIh1knX+UWzRfXiY4SRLjOOdms771u/HFAq79+dy2jah2tlLqsMQ9oEVW0wVJ/NqyxRxLbsC18s7PKFK4354fluXC3amucNHwxM4KdZqspejbJ40q+bP5snoZlG1R697GqmxZ83Mc57BYPH1fRGoMOLi6KIQdcN6qKo8y9+lWOxWCwWi8Visfxf/AFnPDLT0e1nqQAAAABJRU5ErkJggg==" },
  { nombre: "Gusano", id: "005", hp: "15", mp: "12", ataqueFisico: "10", ataquePsiquico: "8", imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAZlBMVEX///8AAAA2NjZ+fn7r6+sbGxuTk5OkpKSQkJD8/PwSEhJEREQoKCj09PT5+fmrq6vc3Nxzc3Obm5sjIyPBwcHS0tLl5eWJiYltbW27u7vKyspmZmYuLi6xsbFJSUlfX19XV1c9PT2fm73lAAAFLUlEQVRoge1Z2ZaCOBBVQFRkiayCgvL/PzmQylIVwG6FnjPnTO5TN4a6SeXWkrDbWVhYWFhYWFhYWFhYWPyvELG8TSvXrfykLsp/izVuTt1hjxA419r7e17mOvsZZM8m/lPe4j5HC+iSv+Mub8u8I/r6j4jT97wj7tEf8Hpof52qZWIiuzJPX4g735y4UbYfKQj5BMwjzvVT/VxtTJxIwxe1KMQ8oLwqj5+3JD4Kq1mizVLmQffS6c8NieWKO5wwTObdzt+cWu1xiBPlhPmsHL7VXntauQ8UNRPmSo9rt2HuUdC8lpmPaNh+kyoidk/kr9sScy6k8IAQ2EDgJVg87Vz4I51nZgGIPypg2HE9M6z1PvzVgU0Z0IQ5yuBHJgPhsLpuwhIO475FD2V9wiximZeM+zb6viPfCY+Gk+wpd8Ln/5SbLJoRvQgVvXgh9jWzyDRX8dKJCuI7QIyq8DxqCu+mXC9lLfV85v8+VhHHvDQGOkREtjjlYs/HtQniUGcZcH6zhrmZ+E2XQxNMD2LrNQZ7iRNSnC0Qk5Yg5Bpbw3yZWijniWnmAI2tUHfM+2qXPswlWeg4j2CvNYfQTN3wGWC/nCNpZ2VoNYOizqyaY26eE318iFou74QcB6pWjhATQQPaft4Rn6DV+3iT0oV9fulBkEZ88V+EeuPue2Z/j9A1aDYoVmO+RKiezMVvrMgl1Z7g0kZiNiHu6HkTNCbYwjiDrAgrvoIg1LacFLzpTObnRA1u+EEM3zNziXaRj7JHxkO8x6P4XIIO8T4ZbP7XjQlk/kGhUYLWPVlzQn/bu2x1QINMoVDVPTb+wsNqwptyCZQ8B12+JDYiFZ+dSTEokC9UPX1Kf32MswwQlDtLFTMJHqoy+RN5V5wOuubHcy1rb72DIOtvSNK+l8LzAj+M+EYEV0YMygNHiIymU8kVi2XXzL08hDJahXgYO8ZdxWxNOxnWzv7cKEBGVxLzNb/o++nUD3rNBP0wvVj7P3pz7TKmCOIc/synJLA8WkyrWWOD2HPn4EqTyw2OHK0BGqN+2MXdZIoLdyotzPJ1RsYG3CtfI02YLBjoOAyr60yhwEDUlogQ73denfrcpcFovJBT4kEg5J/N3SiJvaqMB4k5Ds65D6UxEeEBeIHnuIPwSK4tQL7t5sPuJZ0EgB7lMB0LM5JxIA/cYlN4k66OHC/5izCmpuuR4Igue+0dOcuZJqfEVBDfOmtT5vPN6XL1eC9d7d3DjqR5BqUi4DZT7EOKm9jXAbEIFbXtlHmY2UAvX1ElnLuCnPfFljmeUsTsTYSnFeGa4jCZd+z6SkVPrhI78RJAyLSTxhfqjzhxJTKe7sZPiNmDLaM7R1xPbT5FiV5q34UY3en8TOYW3MxbdZWT5ph3pKtbvM718LEnw1owmcXxtyeumfG2Xs4IM+UjoDJNpWIycwX2YkExejg97J9Vj+WaP2GoY49RPAzmWFhqyUbHQ7AZNWdcjYjqn1oMdTCgt/sGs+yxhGJVDZjWbqa66LcrHqE6sr5G3JQZUtco1NucgxTiWm/yLw5oeq8zX+01YRYjxiOJ7B2uE26P3tb/6vIhQm9kVctGjfOKAWovZL/Ap4WObYHG3sDtt18ojuabwtbhgD5yiTz4pheSuHxw21LO9kEEKn/89FGmqz/7EsXetldEMHm4PCy8F58fj9hp9kseGCSZKj7OjgwcN//ymiUufPr1UsC4+uDTrH0XgX9lXXl1GYsvtgp+zX5+y8LCwsLCwsLCwsLCwuI/jn8ANN86JAC57RIAAAAASUVORK5CYII=" },
  { nombre: "Escarabajo", id: "006", hp: "12", mp: "15", ataqueFisico: "7", ataquePsiquico: "12", imagen: "data:image/png;base64,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" },
  { nombre: "Reina", id: "007", hp: "30", mp: "30", ataqueFisico: "15", ataquePsiquico: "15", imagen: "data:image/png;base64,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" }
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
    <li>XP (experiencia): <span id="xpHeroe">${heroeSeleccionado.xp}</span> </li>
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
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })

  heroeSeleccionado.xp++
  document.getElementById("xpHeroe").textContent = heroeSeleccionado.xp
  iniciarJuego()

}

function realizarAtaqueFisico() {
  if (heroeSeleccionado !== null && monstruoAleatorio !== null && turnoJugador == true) {
    let hpMonstruo = (monstruoAleatorio.hp)
    let ataqueFisicoHeroe = (heroeSeleccionado.ataqueFisico)

    hpMonstruo -= ataqueFisicoHeroe
    monstruoAleatorio.hp = hpMonstruo.toString()
    document.getElementById("hpMonstruo").textContent = monstruoAleatorio.hp

    if (monstruoAleatorio.hp < 0 || monstruoAleatorio.mp < 0) {
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

    if (monstruoAleatorio.hp < 0 || monstruoAleatorio.mp < 0) {
      ganasteJuego()
    }
    turnoJugador = false
    turnoMonstruo()
  }
}

/*Ataques Monstruo */

function perdisteJuego() {

  Swal.fire({
    title: "Haz perdido el juego",
    text: "Carga una partida vieja o reinicia la página para continuar",
    icon: 'error',
    confirmButtonText: "Ok"
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
      console.log("Turno del monstruo: Realizó un ataque físico")
    } else {
      let mpHeroe = (heroeSeleccionado.mp)
      let ataquePsiquicoMonstruo = (monstruoAleatorio.ataquePsiquico)
      mpHeroe -= ataquePsiquicoMonstruo
      heroeSeleccionado.mp = mpHeroe.toString()
      document.getElementById("mpHeroe").textContent = heroeSeleccionado.mp
      console.log("Turno del monstruo: Realizó un ataque psíquico")

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

  guardarBoton.addEventListener("click", function () {
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
        /* Read more about handling dismissals below */
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
    botonCargar.addEventListener("click", function () {
      cargarDatosPartida(partida)
      salvar.innerHTML = ""
    })
    li.appendChild(botonCargar)
    partidasGuardadas.appendChild(li)
  })
}

