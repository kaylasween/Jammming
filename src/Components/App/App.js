import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: '',
          artist: '',
          album: ''
        }
      ],
      playlistName: 'Kayla Playlist',
      playlistTracks: [
        {
          name: 'Holly Jolly Christmas',
          artist: 'Michael Buble',
          album: 'Christmas Whatever'
        },
        {
          name: 'The A Team',
          artist: 'Ed Sheeran',
          album: 'I literally do not know'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    for(let i = 0; i < this.state.playlistTracks.length; i++){
      if(track.id !== this.state.playlistTracks[i].id) {
        this.setState({
          playlistTracks: [
            this.state.playlistTracks,
            {
            name: track.name,
            artist: track.artist,
            album: track.album
          }]
        });
      }
    }
  }

  removeTrack(track) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(track => this.state.playlistTracks.id !== track.id)
      });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {

  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
