const APIKEY = 'api_key=96c05c6f53c2f9b20b3e42af4887dc76';
const BASEURL = 'https://api.themoviedb.org/3';
const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

let id = '';
const urlParams = new URLSearchParams(location.search);
for(const [key, value]of urlParams){
    id = value;
}

let link = `/movie/${id}?language=en-US&append_to_response=videos&`;
let f_url = BASEURL+link+APIKEY;

apiCall(f_url);

function apiCall(url){
    const x = new XMLHttpRequest();
    x.open('get',url);
    x.send();
    x.onload = function(){
        document.getElementById('pantalla').innerHTML='';
        var res=x.response;
        var Json = JSON.parse(res);
        getMovies(Json);
    }
    x.onerror =function(){
        window.alert('cannot get')
    }
}

function getMovies(myJson){
    var MovieTrailer = myJson.videos.results.filter(filterArray);
    document.body.style.backgroundImage = `url(${IMAGEURL+myJson.backdrop_path}), linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0) 250%)`;
    var movieDiv = document.createElement('div');
    movieDiv.classList.add('pelicula');

    var youtubeURL;
    if(MovieTrailer.length==0){
        if(myJson.videos.results.length ==0){
            youtubeURL='';
        }else{
            youtubeURL = `https://www.youtube.com/embed/${myJson.videos.results[0].key}`;
        }
    }else{
        youtubeURL = `https://www.youtube.com/embed/${MovieTrailer[0].key}`;
    }

    movieDiv.innerHTML = `
        <div class="poster">
            <img src=${IMAGEURL+myJson.poster_path} alt="Poster">
        </div>
        <div class="detalles">
            <div class="nombre">
                ${myJson.title}
            </div>

            <div class="tagline">${myJson.tagline}</div>

            <div style="display: flex;"> 
                <div class="tiempo">
                    <b><i class="fas fa-clock"></i></b> ${myJson.runtime}
                </div>
                <div class="fecha">
                    <b>Raleased</b>: ${myJson.release_date}
                </div>
            </div>

            <div class="rakin">
                <b>IMDb Rating</b>: ${myJson.vote_average}
            </div>

            <div class="trailer" id="trailer-div-btn">
                <i class="fab fa-youtube"></i>
            </div>

            <div id="video">
                <button id="remove-video-player"><i class="fas fa-times"></i></button>
                <br>
                <span><iframe width="560" height="315" src=${youtubeURL} title="YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>
                
            </div>
    
            <div class="cosa">
                ${myJson.overview}
            </div>
        </div>
    `;

    document.getElementById('pantalla').appendChild(movieDiv);

    var youtubeVideo = document.getElementById('video');
    document.getElementById('trailer-div-btn').addEventListener('click', function(){
        youtubeVideo.style.display = 'block';
    });
    document.getElementById('remove-video-player').addEventListener('click', function(){
        stopVideo();
        youtubeVideo.style.display = 'none';
    })
    function stopVideo(){
        var iframe =document.getElementsByTagName("iframe")[0];
        var url = iframe.getAttribute('src');
        iframe.setAttribute('src', '');
        iframe.setAttribute('src', url);
    }

}

function filterArray(obj){
    var vtitle = obj.name 
    var rg = /Official Trailer/i;
    if(vtitle.match(rg)){
        return obj;
    }
}