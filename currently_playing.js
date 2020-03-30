const REQUEST_URL = "https://api.spotify.com/v1/me/player/currently-playing";

var message = document.querySelector('h1');
var albumCover = document.querySelector('img');

var url = window.location.href;
var token = getToken(url);

function getToken(url) {
    var hashFragment = url.substring(url.indexOf("#") + 1, url.length);
    var parameters = hashFragment.split('&');
    var token = parameters[0].split('=')[1];
    return token;
}

let request = new XMLHttpRequest();
request.open('GET', REQUEST_URL);
request.setRequestHeader('Authorization', 'Bearer ' + token);
request.responseType = 'json';
request.send();

request.onload = function() {
    response = request.response;
    message.textContent = "Currently Playing: " + response.item.name + " by " + response.item.artists[0].name;
    albumCover.src = response.item.album.images[0].url;
}

