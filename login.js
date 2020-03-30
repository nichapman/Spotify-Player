//http://127.0.0.1:5500/
//                      #access_token=BQAvD71iRHyPLJTudhQoae-L3daJPd277FQsG9xUoZ0xY2zQc8moxbjyvPw9hx_metCCtbuzlhdaXMyWWps86t0Q84hXiJUchpQZ06DRUV18wVTEC-zWpfPQ1KoAaVQvK6lgOGju_Ub2eHmXDB8
//                      &token_type=Bearer
//                      &expires_in=3600

const CLIENT_ID = "f53fde576f63491494e7b85e76227687";
const RESPONSE_TYPE = "token";
const REDIRECT_URL = "https://nichapman.github.io/Spotify-Player/currently_playing.html"; //TODO: change this to be general
const AUTH_SCOPES = "user-read-currently-playing%20user-read-playback-state";

const authUrl = `https://accounts.spotify.com/en/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URL}&scope=${AUTH_SCOPES}`;

var btn = document.querySelector('.btn');
btn.addEventListener('click', authenticate);

function authenticate() {
    window.location = authUrl;
}