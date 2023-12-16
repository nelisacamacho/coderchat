import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
//Importacion de las vistas
import viewsRouters from "./routes/views.routes.js"; 

const PORT = 8080;
const app = express();
// Configuyracion de express
// Establecer carpeta publica
app.use(express.static('public'));
// Permite recibir query params
app.use(express.urlencoded({extended: true}));
// Permite recibir en el body objetos JSON
app.use(express.json());

// Configuracion del motor de vistas
app.engine('handlebars', handlebars.engine());
// Seteamos la ubicación de las vistas
app.set('views', 'src/views');
// Indicar el motor que se está utilizando
app.set('view engine', 'handlebars' );

// Indicamos cual sera la raiz de nuestro proyecto
app.use('/', viewsRouters);

// Configyracion básica del socekt
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

// La convencion es io, seteamos el socket
const io = new Server(httpServer);
const messages = [];

// Se exucha el evento connect
// Recibimos un socket
io.on('connect', socket => {
    console.log('Nuevo cliente conectado');

    // Escuchar cuando llega un nuevo mensaje
    socket.on('message', data => {
        // Para recibir la data, la agregamos al array
        // De esta manera guardamos la data del lado del sevidor en el array
        messages.push(data);
        // Una vez recibida la data, emitimos el mensaje a todos los usuarios conectados, 
        // incluyendo a quien lo escribió
        io.emit('messageLogs', messages);
    });

    // Escuchar que un nuevo usuario se contectó
    socket.on('newUser', user => {
        // 1 - Notificacion en consola
        io.emit('newConnection', 'Un nuevo usuario se conectó');
        // 2 - Notificacin en v emergente
        socket.broadcast.emit('notification', user);
    }) 
})