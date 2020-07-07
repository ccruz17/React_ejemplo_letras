import React from 'react';
import './App.css';
import './SearchPanel';
import SearchPanel from './SearchPanel';
import LyricsPanel from './LyricsPanel';
import Modal from './Modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchState: "START", fullLyrics: ""}
  }

  handleClick = async (artist, title) => {
    this.setState({artist, title});
  }

  handleUpdateSearchState = async (searchState) => {
    this.setState({searchState});
  }

  render() {
    const {searchState, artist, title} = this.state;
    return (
      <>
        <SearchPanel handleClick={this.handleClick.bind(this)} searchState={searchState} handleUpdateSearchState={this.handleUpdateSearchState.bind(this)}/>
        <LyricsPanel handleUpdateSearchState={this.handleUpdateSearchState.bind(this)} searchState={searchState} artist={artist} title={title}/>
        { searchState=== 'LOADING' && <Modal />}
      </>
    );
  }
}