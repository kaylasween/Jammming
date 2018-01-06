let accessToken;
const clientID = '8a42f5bdaacf450eb9bf8b7bfddabaca';
const redirectURI = 'http://jammming-kaylasween.surge.sh';

let Spotify = {
  getAccessToken() {
    if(accessToken){
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // clears the parameters, allows to grab a new access token when expires
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    ).then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs) {
      return;
    }
    accessToken = this.getAccessToken();
    let headers = {
       'Authorization': `Bearer ${accessToken}`,
       'content-type': 'application/json'
    };
    let userID;
    return fetch('https://api.spotify.com/v1/me', { headers: headers }
  ).then(response => response.json()
  ).then(jsonResponse => {
    userID = jsonResponse.id;
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ name: playlistName })
    }).then(response => response.json()
    ).then(jsonResponse => {
      let playlistID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackURIs })
      });
    })
  });
  }
};

export default Spotify;
