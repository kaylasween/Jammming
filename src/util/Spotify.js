let accessToken = '';
const clientID = '8a42f5bdaacf450eb9bf8b7bfddabaca';
const redirectURI = 'http://localhost:3000/';
let Spotify = {
  getAccessToken() {
    if(accessToken !== ''){
      return accessToken;
    }
    let url = window.location.href;
    accessToken = url.match(/access_token=([^&]*)/);
    let expiresIn = url.match(/expires_in=([^&]*)/);
    if(accessToken !== '' || expiresIn !== '') {
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  }

  search(term) {
    let response = fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    let jsonResponse = response.json();
    jsonResponse.map(track => {
      if(track === null) {
        return [];
      }
    });
  }

};

export default Spotify;
