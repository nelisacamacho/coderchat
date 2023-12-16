// Aqui se agrega todas las vistas
// Server side rendering:
// Se hace una peticion al servidor, y el servidor lo sirve una vez que se ingresa a la ruta.
// Se hace una peticion al servidor y el servidor devuelve el HTML
// Las plantillas estan del lado del servidor
// React es una aplicacion del lado del cliente: el cliente va solicitando y react no vuelve a cargar la pagina
// Sino simplemente modifica la parte del DOM que se desea modificar
import { Router } from "express";

const viewsRouters = Router();

// Pagina principal
viewsRouters.get('/', (req, res) => {
    // Renderizamos nuestra pagina principal que en este caso es index.handlebars
    res.render('index');
});

// Se exporta y se importa en el archivo app.js
export default viewsRouters;