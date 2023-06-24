const APIKEY = 'api_key=96c05c6f53c2f9b20b3e42af4887dc76';
const HOMEURL = `https://api.themoviedb.org/3/discover/movie?${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

var container = document.getElementById('contenedor');
var search = document.getElementById('buscapeli');
var wrapperDiv = document.querySelector('.search-conten');
var resultsDiv = document.querySelector('.results');


var pBtn = document.getElementById('anterior');
var nBtn = document.getElementById('siguiente');
let pageNumber = 1;

apiCall(HOMEURL);
function apiCall(url){
    const x = new XMLHttpRequest();
    x.open('get',url);
    x.send();
    x.onload = function(){
        container.innerHTML="";
        var res = x.response;
        var conJson = JSON.parse(res);
        var moviesArray = conJson.results;
        moviesArray.forEach(movie => moviesElement(movie));
        addMovieToListButtonArray = document.getElementsByClassName('.add-movie-to-list');
    }
}
function moviesElement(movie){
    var movieElement = document.createElement('div');
    movieElement.classList.add('elemento');
    movieElement.innerHTML = `
        <div class="poster">
            <a href="datos.html?id=${movie.id}"><img src= ${IMAGEURL+movie.poster_path} alt="poster"></a>
        </div>
        <div class="nombre">${movie.title}</div>
        <div class="peliculaelemento">
            <div class="ranki">
            <i class="fas fa-star"></i> ${movie.vote_average} 
            </div>
            <div class="listapeliculas"  id="${movie.id}" onclick="addMovie(${movie.id})">
                <i class="fas fa-plus"></i>
            </div>
        </div>
    `;
    container.appendChild(movieElement);
}

var favMovies=[];
var oldMovies=[];

function addMovie(btnId){
    document.getElementById(btnId).innerHTML = '<i class="fas fa-check"></i>';
    if(!favMovies.includes(btnId.toString())){
        favMovies.push(btnId.toString());
    }

    oldMovies = JSON.parse(localStorage.getItem('MovieArray'));
    if(oldMovies==null){
        localStorage.setItem('MovieArray', JSON.stringify(favMovies));
    }else{
        favMovies.forEach(item=>{
            if(!oldMovies.includes(item)){
                oldMovies.push(item);
            }
        })
        localStorage.setItem('MovieArray', JSON.stringify(oldMovies));
    }
}

search.addEventListener('keyup', function(){
    var input = search.value;
    var inputUrl = `https://api.themoviedb.org/3/search/movie?query=${input}&${APIKEY}`;
    if(input.length !=0){
        apiCall(inputUrl);
    }else{
        window.location.reload();
    }
})

pBtn.disabled = true;
function disablePBtn(){
    if(pageNumber ==1)pBtn.disabled=true;
    else pBtn.disabled=false;
}

nBtn.addEventListener('click',()=>{
    pageNumber++;
    let tempURL = `https://api.themoviedb.org/3/discover/movie?${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`;
    apiCall(tempURL);
    disablePBtn();
});

pBtn.addEventListener('click',()=>{
    if(pageNumber==1)return;

    pageNumber--;
    let tempURL = `https://api.themoviedb.org/3/discover/movie?${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`;
    apiCall(tempURL);
    disablePBtn();
})