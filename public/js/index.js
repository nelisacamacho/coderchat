// Lado del cliente
// Lo que se encuentra en public es la parte estática del cliente

console.log('Hola desde el lado del cliente index.js');
// Iniciamos el socket
// La funcion io sale del la libreria de socket que se encuentra en index.handlebars
const socket = io();

// Configuracion de SweetAlert
// Vista de autentificacion de SweetAlert
// Se autentifica el usuario
let userName;

Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    inputValidator:(value) => {
        if(!value) {
            return 'Tienes que ingresar tu nombre';
        }
    }, 
    toast: true, // Toast Permite que el usuario siga interactuando con la pagina
}).then(data => {
    userName = data.value;
    // console.log(userName);
    // Se envía notification de que un usuario nuevo se conectó
    socket.emit('newUser', userName);
});

const inputData = document.getElementById('inputData');
const outputData = document.getElementById('outputData');

inputData.addEventListener('keypress', (event) => {
    // console.log('ingreso');
    if(event.key === 'Enter') {
        if(!!inputData.value.trim()){
            socket.emit('message', {user: userName, data: inputData.value});
            inputData.value = '';
        }
    }
});

// Escuchamos messagesLog que es lo que emite el servidor
// Una vez recibido el mensaje los emitimos
socket.on('messageLogs', data => {
    let messages = '';
    data.forEach(message => {
        messages+= `${message.user} dice: ${message.data} <br />`
    });
    // Se envia el mensaje (Al tener etiquietas debemos usar innerHTML)
    outputData.innerHTML = messages;
});

// 1 - Notificacion en consola
socket.on('newConnection', data => {
    console.log(data);
});

// 2 - Notificacion en emergente
socket.on('notification', user => {
    Swal.fire({
        text: `${user} se conectó`,
        toast: true, // Toast Permite que el usuario siga interactuando con la pagina
        position: 'top-right'
    })
});
