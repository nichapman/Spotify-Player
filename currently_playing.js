const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const PAUSE_URL = "https://api.spotify.com/v1/me/player/pause";
const PLAY_URL = "https://api.spotify.com/v1/me/player/play";

var message = document.querySelector('h1');
var albumCover = document.querySelector('.album');
var songTitle = document.querySelector('#title');
var artist = document.querySelector('#artist');
var pause = document.querySelector('.pause');
var play = document.querySelector('.play');

pause.addEventListener('click', pauseSong);
play.addEventListener('click', playSong);

var url = window.location.href;
var token = getToken(url);

function getToken(url) {
    var hashFragment = url.substring(url.indexOf("#") + 1, url.length);
    var parameters = hashFragment.split('&');
    var token = parameters[0].split('=')[1];
    return token;
}

function getCurrentlyPlaying() {
    let request = new XMLHttpRequest();
    request.open('GET', CURRENTLY_PLAYING_URL);
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status == "200") {
            response = request.response;
            message.textContent = "Currently Playing:";
            songTitle.textContent = response.item.name;
            artist.textContent = response.item.artists[0].name;
            albumCover.src = response.item.album.images[0].url;
            albumCover.style.display = "inline";
        } else {
            message.textContent = "Nothing currently playing";
            console.log(request.status);
        }
    }
}

getCurrentlyPlaying();

setInterval(function() {
    getCurrentlyPlaying();
}, 15 * 1000);

function pauseSong() {
    let request = new XMLHttpRequest();
    request.open('PUT', PAUSE_URL);
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status == 204) {
            play.hidden = false;
            pause.hidden = true;
        }
    }
}

function playSong() {
    let request = new XMLHttpRequest();
    request.open('PUT', PLAY_URL);
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status == 204) {
            play.hidden = true;
            pause.hidden = false;
        }
    }    
}