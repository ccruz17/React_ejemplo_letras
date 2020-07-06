import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchState: "NO", fullLyrics: ""}
  }

  fecthLyrics = async () => {
    const {artist, title} = this.state;
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    if(artist && title){
      const response = await fetch(url);
      if(response.status == 200) {
        return response.json();
      } else {
        return ({error: "No se encontro la letra"});     
      }
    } else {
      return ({error: "Debe especificar el nombre y título de canción"});
    }
  };

  handleClick = async (ev) => {
    this.setState({searchState: "LOADING"});
    const response = await this.fecthLyrics();
    this.setState({
      fullLyrics: response.error ? response.error : response.lyrics,
      searchState: "OK"
    });
  }

  handleOnChange = (ev) => {
    let update = {};
    update[ev.target.id] = ev.target.value;
    this.setState(update);
  }

  render() {
    const {searchState, fullLyrics} = this.state;
    return (
      <>
        <div className="p-5 mt-5 justify-content-md-center row">
          <InputBox id="artist" placeholder="Artista" onChange={this.handleOnChange.bind(this)}/>
          <InputBox id="title" placeholder="Título" onChange={this.handleOnChange.bind(this)}/>
          <div className="col-8">
            <button className="btn btn-primary btn-block" id="btn" onClick={this.handleClick.bind(this)}>Buscar lera de canción</button>
          </div>
        </div>
        <div className="text-center justify-content-md-center row">
          <div className={searchState == 'LOADING' ? 'col-8' : 'col-8 d-none'}>
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <pre className="pt-5 col-8 text-center" id="letras">
            {searchState == 'OK' ? fullLyrics : "" }
          </pre>
        </div>
      </>
    );
  }
}

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.idInput = props.id;
    this.placeholder = props.placeholder;
    this.onChange = props.onChange;
  }


  render() {
    return (
      <div className="col-8 mb-3">
        <input className="form-control" id={this.idInput} placeholder={this.placeholder} onChange={this.onChange} />
      </div>
    )
  }
}


