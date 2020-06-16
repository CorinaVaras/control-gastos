// Variables
const userBudget = prompt('¡Bienvenid@! Para comenzar ingresa tu presupuesto')
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



// Clases

// Clase de Presupuesto
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

// Clase para la interfaz
class Interfaz {
    insertarBudget(cantidad) {
        const budgetSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        
        // Insertar al html
        budgetSpan.innerHTML = `${cantidad}`
        restanteSpan.innerHTML = `${cantidad}`
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        // Quitar el alert despues de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    // Inserta gastos a la lista
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        // crear un LI
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // Insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class='badge badge-primary badge-pill'> $ ${cantidad}</span>
        `;

        // Insertar al html
        gastosListado.appendChild(li);
    }
    // comprueba el resultado restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `
            ${presupuestoRestanteUsuario};
        `
        this.comprobarPresupuesto();
    }
    // cambia de color el presupuesto restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25% del gasto
        if((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if( (presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function(){
    if(userBudget === null || userBudget === ''){
        window.location.reload();
    } else {
        // Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(userBudget)
        // Instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insertarBudget(cantidadPresupuesto.presupuesto);

        
    }
})

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    // leer datos del fomulario 
    const nameGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    

    // instanciar la interfaz
    const ui = new Interfaz();

    // comparar que los campos no esten vacíos
    if(nameGasto === '' || cantidadGasto === '') {
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        // insertar en el html
        ui.imprimirMensaje('Se añadió correctamente!','correcto')
        ui.agregarGastoListado(nameGasto,cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})