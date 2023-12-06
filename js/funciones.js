//const url = 'http://localhost:8787/venta'
const url = 'https://apiventas-dvb9.onrender.com'

const listarVentas = async() => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById ('contenido') 
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((res) => res.json())//Obtener respuesta de la petición
    .then(function(data){//Se manipulan los datos obtenidos de la url
        let listaVentas = data.msg //msg es el nombre de la lista retorna con json
        console.log(listaVentas)
        listaVentas.map(function (venta) {
            //Configurar el objeto para enviarlo por url
            objetoVenta = Object.keys(venta).map(key => key + '=' + 
            encodeURIComponent(venta[key])).join('&');
            console.log(venta)
            contenido = contenido + `<tr>`+
            `<td>`+venta.nombreCliente+`</td>`+
            `<td>`+venta.documento+`</td>`+
            `<td>`+venta.correo+`</td>`+
            `<td>`+venta.telefono+`</td>`+
            `<td>`+venta.producto+`</td>`+
            `<td>`+venta.precioDolar+`</td>`+
            `<td>`+venta.estado+`</td>`+
            `<td><button onclick="redireccionarEditar('${objetoVenta}')">Editar</button>
            <button onclick="eliminarVenta('${venta.nombreCliente}')">Eliminar</button></td>`+
            `</tr>`
        })
        objectId.innerHTML = contenido
    })

    /*for(i = 1; i<10; i++){
        contenido = contenido + '<tr>'+
        '<td>nombre</td>'+
        '<td>rol</td>'+
        '<td>estado</td>'
    }
    */

}

const registrarVenta= () => {
    const nombreCliente = document.getElementById('nombreCliente').value;
    const documento = document.getElementById('documento').value
    const correo = document.getElementById('correo').value
    const telefono = document.getElementById('telefono').value
    const producto = document.getElementById('producto').value
    const precioDolar = document.getElementById('precioDolar').value
    const estado = document.getElementById('estado').value

    if(nombreCliente.length == 0){
        document.getElementById('nombreClienteHelp').innerHTML = 'Dato requerido'

    }
    else if(documento.length == 0){
        document.getElementById('documentoHelp').innerHTML = 'Dato requerido'
    }  
    else if(correo.length == 0){
        document.getElementById('correoHelp').innerHTML = 'Dato requerido'
    }  
    else if(telefono.length == 0){
        document.getElementById('telefonoHelp').innerHTML = 'Dato requerido'
    } 
    
    else if(producto == ""){
        document.getElementById('productoHelp').innerHTML = 'Dato requerido'
    }
    else if(precioDolar.length == 0){
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
    }  
    else if(estado == ""){
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }

    else{
        let venta = {
            nombreCliente: nombreCliente,
            documento: documento,
            correo: correo,
            telefono: telefono,
            producto: producto,
            precioDolar: parseFloat(precioDolar),
            estado: estado
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(venta),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg) //Imprimir el mensaje de la transacción
        })

        }
}

const actualizarVenta= () => {
    // const id = obtenerIdDesdeURL(); // Asegúrate de tener una función para obtener el ID de la URL
    const nombreCliente = document.getElementById('nombreCliente').value;
    const documento = document.getElementById('documento').value
    const correo = document.getElementById('correo').value
    const telefono = document.getElementById('telefono').value
    const producto = document.getElementById('producto').value
    const precioDolar = document.getElementById('precioDolar').value
    const estado = document.getElementById('estado').value

    if(nombreCliente.length == 0){
        document.getElementById('nombreClienteHelp').innerHTML = 'Dato requerido'

    }
    else if(documento.length == 0){
        document.getElementById('documentoHelp').innerHTML = 'Dato requerido'
    }  
    else if(correo.length == 0){
        document.getElementById('correoHelp').innerHTML = 'Dato requerido'
    }  
    else if(telefono.length == 0){
        document.getElementById('telefonoHelp').innerHTML = 'Dato requerido'
    } 
    
    else if(producto == ""){
        document.getElementById('productoHelp').innerHTML = 'Dato requerido'
    }
    else if(precioDolar.length == 0){
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
    } 
    else if(estado == ""){
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else{
        let venta = {
            nombreCliente: nombreCliente,
            documento: documento,
            correo: correo,
            telefono: telefono,
            producto: producto,
            precioDolar: parseFloat(precioDolar),
            estado: estado
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(venta),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg) //Imprimir el mensaje de la transacción
            
        })
        }
}
const precioDolarInput = document.getElementById('precioDolar');

// Realiza una solicitud a la API
fetch('https://www.datos.gov.co/resource/mcec-87by.json')
    .then(response => response.json())
    .then(data => {
        // Suponiendo que los datos de la API tienen una propiedad 'precioDolar'
        const precioDolar = data[0].valor; 

        // Asigna el precio del dólar a la caja de texto
        precioDolarInput.value = precioDolar;
    })
    .catch(error => {
        console.error('Error al obtener el precio del dólar:', error);
    });

    
const redireccionarEditar = (objetoVenta) => {
    document.location.href='editarVenta.html?venta='+objetoVenta
}



const editarVenta = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('nombreCliente').value = urlParams.get('nombreCliente')
    document.getElementById('documento').value = urlParams.get('documento')
    document.getElementById('correo').value = urlParams.get('correo')
    document.getElementById('telefono').value = urlParams.get('telefono')
    document.getElementById('producto').value = urlParams.get('producto')
    document.getElementById('precioDolar').value = urlParams.get('precioDolar')
    document.getElementById('estado').value = urlParams.get('estado')
}

const eliminarVenta = async (nombreCliente) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombreCliente })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "success",
            title: (json.msg),
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            listarVentas();
        }, 1000);

    } catch (error) {
        console.error('Error al eliminar la venta:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Eliminacion Exitosa');
    }

};
function confirmarEliminar(nombreCliente) {
    Swal.fire({
        title: "¿Estás seguro de que deseas eliminar esta Venta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarVenta(nombreCliente);
        }
    });
}

if(document.querySelector('#btnRegistrar')){ //Si objeto exitste
document.querySelector('#btnRegistrar')
.addEventListener('click', registrarVenta)
}

if(document.querySelector('#btnActualizar')){//Si objeto existe
document.querySelector('#btnActualizar')
.addEventListener('click', actualizarVenta)
}
