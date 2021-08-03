//Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca
    this.year = year
    this.tipo = tipo
}
//Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function () {
    /*
        1= Americano 1.15
        2= Asiatico 1.05
        3= Europeo 1.35
    */

    let cantidad
    const base = 2000



    switch (this.marca) {
        case '1':

            cantidad = base * 1.15
            break

        case '2':

            cantidad = base * 1.05
            break

        case '3':

            cantidad = base * 1.35
            break

        default:
            break
    }

    //leer el año
    const diferencia = new Date().getFullYear() - this.year

    //cada año que la dif. es mayor, reduce el costo un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100

    //si el seguro es básico se multiplica por un 30% mas
    //si el seguro es completo se multiplica por un 50% mas

    if (this.tipo === 'basico') {
        cantidad *= 1.30
    } else {
        cantidad *= 1.50
    }

    return cantidad
}


function UI() { }

//Llenar las opciones de los años
UI.prototype.llenarOpciones = () => { //Al no hace uso de this usa arrow function

    const max = new Date().getFullYear()
    const min = max - 22

    const selectYear = document.querySelector('#year')

    for (let i = max; i > min; i--) {
        let option = document.createElement('option')
        option.value = i
        option.textContent = i
        selectYear.appendChild(option)

    }

}

//muestra alertas en pantallas
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div')

    if (tipo === 'error') {
        div.classList.add('error')
    } else {
        div.classList.add('correcto')
    }
    div.classList.add('mensaje', 'mt-10')

    div.textContent = mensaje

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    //Elimino msj de error
    setTimeout(() => {
        div.remove()
    }, 3000);

}

UI.prototype.mostrarResultado = (seguro, total) => {
    const {marca,year, tipo}=seguro
    
    let textoMarca

    switch (marca) {
        case '1':

            textoMarca = 'Americano'
            break

        case '2':

            textoMarca = 'Asiatico'
            break

        case '3':

            textoMarca = 'Europeo'
            break

        default:
            break
    }

    //crear el resultado
    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML = `

        <p class="header">Tu Resumen</p>
        <p ><b>Marca:</b> ${textoMarca}</p>
        <p ><b>Año:</b> ${year}</p>
        <p><b>Tipo:</b> ${tipo}</p>
        <p ><b>Total:</b> ${total}</p>
        
    
    `
    const resultadoDiv = document.querySelector('#resultado')
    

    //Mostrar el spinner
    const spinner=document.querySelector('#cargando')
        spinner.style.display='block'
    setTimeout(()=>{
        spinner.style.display='none'//Se borra spinner
        resultadoDiv.appendChild(div)//y se muestra el resultado
    },3000)
    
}

//instaciar UI
const ui = new UI()



document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones() //llena el select con los años
})

eventListener()
function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizaSeguro)
}

function cotizaSeguro(e) {
    e.preventDefault()

    //Leer la marca seleccionada 
    const marca = document.querySelector('#marca').value


    //leer el años seleccionado
    const year = document.querySelector('#year').value


    // Leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los Campos son obligatorios', 'error')
        return
    } 
        ui.mostrarMensaje('Cotizando', 'exito')

      //Ocultar cotizaciones viejas
        const resultados=document.querySelector('#resultado div')
        if(resultados!==null){
            resultados.remove()
        }

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()

    //Utilizar prototype que va a cotizar
    ui.mostrarResultado(seguro, total)
}

