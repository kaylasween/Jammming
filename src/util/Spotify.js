let userAccessToken = '';
let Spotify = {};

Spotify.getAccessToken = function() {
  if(userAccessToken !== ''){
    return userAccessToken;
  }
};

export default Spotify;
