const TEST_ORIGIN = "http://127.0.0.1:5500";
const TEST_URL = "http://127.0.0.1:5500/currently_playing.html";

const LIVE_ORIGIN = "https://nichapman.github.io";
const LIVE_URL = "https://nichapman.github.io/Spotify-Player/currently_playing.html";

const CLIENT_ID = "f53fde576f63491494e7b85e76227687";
const RESPONSE_TYPE = "token";

var origin = document.location.origin;

const REDIRECT_URL = origin == TEST_ORIGIN ? TEST_URL : LIVE_URL;

const AUTH_SCOPES = "user-read-currently-playing%20user-read-playback-state";

const authUrl = `https://accounts.spotify.com/en/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URL}&scope=${AUTH_SCOPES}`;

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope:',  registration.scope);
    }).catch(function(error) {
      console.log('ServiceWorker registration failed:', errror);
    });
}

var btn = document.querySelector('.btn');
btn.addEventListener('click', authenticate);

function authenticate() {
    window.location = authUrl;
}