const status_element = document.getElementById('status');


window.addEventListener('offline', event => {
    status_element.innerHTML = 'Usuario estas desconectado! maldito Fibertel!';
});


window.addEventListener('online', event => {
    status_element.innerHTML = 'Usuario estas online! que bueno que recargaste el pack de datos!';
});

//
if ( !navigator.onLine ){
    status_element.innerHTML = 'Estoy sin conexion en el momento de carga! horror!';
    console.log('Estoy sin conexion en el momento de carga! horror!');
}