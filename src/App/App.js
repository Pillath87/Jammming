import React from 'react';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../util/Spotify';
import './App.css';


class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      message: 'Add tracks'
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTracks.includes(track)){
        this.setState({
            message: `${track.name} already added`
        })
    } else {
        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({
            playlistTracks: tracks,
            message: 'Add tracks'
        });
    };
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
  const trackURIs = this.state.playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
      });
    });
  }

  search(term) {
        Spotify.search(term).then(searchResults => {
            this.setState({searchResults: searchResults});
        });
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playlistName={this.state.playlistName} onRemove={this.removeTrack} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }

};

export default App;
