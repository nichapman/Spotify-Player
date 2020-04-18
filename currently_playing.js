const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const PAUSE_URL = "https://api.spotify.com/v1/me/player/pause";
const PLAY_URL = "https://api.spotify.com/v1/me/player/play";
const PREVIOUS_SONG_URL = "https://api.spotify.com/v1/me/player/previous";
const SKIP_SONG_URL = "https://api.spotify.com/v1/me/player/next";

var message = document.querySelector('h1');
var albumCover = document.querySelector('.album');
var songTitle = document.querySelector('#title');
var artist = document.querySelector('#artist');

var pause = document.querySelector('.pause');
var play = document.querySelector('.play');
var back = document.querySelector('.back');
var skip = document.querySelector('.skip');

pause.addEventListener('click', pauseSong);
play.addEventListener('click', playSong);
back.addEventListener('click', previousSong);
skip.addEventListener('click', skipSong);

var url = window.location.href;
var token = getToken(url);

function getToken(url) {
    var hashFragment = url.substring(url.indexOf("#") + 1, url.length);
    var parameters = hashFragment.split('&');
    var token = parameters[0].split('=')[1];
    return token;
}

function getCurrentlyPlaying() {
    let request = makeRequest('GET', CURRENTLY_PLAYING_URL);
    request.onload = function() {
        if (request.status == "200") {
            response = request.response;
            message.textContent = "Currently Playing:";
            songTitle.textContent = response.item.name;
            artist.textContent = response.item.artists[0].name;
            albumCover.src = response.item.album.images[0].url;
            albumCover.hidden = false;
            pause.hidden = false;
        } else {
            message.textContent = "Nothing currently playing";
            console.log(request.status);
        }
    }
}

getCurrentlyPlaying();

setInterval(function() {
    getCurrentlyPlaying();
}, 5 * 1000);

function pauseSong() {
    let request = makeRequest('PUT', PAUSE_URL);
    request.onload = function() {
        if (request.status == 204) {
            play.hidden = false;
            pause.hidden = true;
        }
    }
}

function playSong() {
    let request = makeRequest('PUT', PLAY_URL);
    request.onload = function() {
        if (request.status == 204) {
            play.hidden = true;
            pause.hidden = false;
        }
    }    
}

function skipSong() {
    makeRequest('POST', SKIP_SONG_URL);      
    getCurrentlyPlaying();
}

function previousSong() {
    makeRequest('POST', PREVIOUS_SONG_URL);      
    getCurrentlyPlaying();
}

function makeRequest(requestType, URL) {
    let request = new XMLHttpRequest();
    request.open(requestType, URL);
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.responseType = 'json';
    request.send();  
    return request;
}