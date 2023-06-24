const APIKEY = 'api_key=96c05c6f53c2f9b20b3e42af4887dc76';
const BASEURL = 'https://api.themoviedb.org/3';
const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

var storageData = localStorage.getItem('MovieArray');
var favMovieArray = JSON.parse(storageData);

favMovieArray.forEach(async id =>{
    let link = `/movie/${id}?language=en-US&`;
    let url = BASEURL+link+APIKEY;
    await apiCall(url, id);
});

function apiCall(url, id){
    const x = new XMLHttpRequest();
    x.open('get',url);
    x.send();
    x.onload = function(){
        var resp = x.response;
        var jsonRes = JSON.parse(resp);
        favMovieData(jsonRes, id);
    }
}

function favMovieData(jsonResp, id){
    var eachListItem = document.createElement('div');
    eachListItem.classList.add('list-item');
    eachListItem.innerHTML = `
    
        <div class="detalles">

            <div class="thumbnail">
                <a href="datos.html?id=${id}">
                    <img id="portada" src=${IMAGEURL+jsonResp.poster_path} alt="portada">
                <a/>
            </div>
            <div id="detallasos">
                <div class="nombre">
                <a href="datos.html?id=${id}"> ${jsonResp.title} </a> 
                </div>
            
                <div class="remove-movie" id='${id}' onclick="deleteMovie(${id})">
                <i id="borrador" class="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
    
    `; 
    document.getElementById('misfavoritos').appendChild(eachListItem);
}


document.getElementById('borrartodo').addEventListener('click', function(){
    if(window.confirm("¿seguro que quieres borrar todo?")){
        localStorage.clear();
        window.location.reload();
    }
});

async function deleteMovie(id){
    if(window.confirm('¿seguro que lo quieres eliminar?')){
        var temp = await JSON.parse(localStorage.getItem('MovieArray'));
        var i = await temp.indexOf(id.toString());
        await temp.splice(i, 1);
        await localStorage.setItem('MovieArray', JSON.stringify(temp));
        await window.location.reload();
    }
}