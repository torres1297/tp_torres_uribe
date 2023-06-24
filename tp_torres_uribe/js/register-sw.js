// Chequeo si el browser soport SW
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../js/sw.js').then((message)=>{
        console.log('Service worker esta listo y funcionando!');
    })
} else { // no soporta Service worker el browser
    alert('Este browser no soporta Service Worker');
}