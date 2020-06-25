import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lyrics: false, fullLyrics: ""}
  }

  fetchMiAPIData = async (artist, title) => {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if(response.status == 200) {
      this.setState({lyrics: true});
    } else {
      alert("No se encontro la canción");
    }
    return response.json();
  };

  handleClick = async (ev) => {
    this.setState({lyrics: false});
    let response = await this.fetchMiAPIData(this.state.artist, this.state.title);
    this.setState({fullLyrics: this.state.lyrics ? response.lyrics : "" });
  }

  handleOnChange = (ev) => {
    let update = {};
    update[ev.target.id] = ev.target.value;
    this.setState(update);
  }

  render() {
    return (
      <div className="p-5 mt-5 justify-content-md-center row">
        <InputBox id="artist" placeholder="Artista" onChange={this.handleOnChange.bind(this)}/>
        <InputBox id="title" placeholder="Título" onChange={this.handleOnChange.bind(this)}/>
        <div className="col-8">
          <button className="btn btn-primary btn-block" id="btn" onClick={this.handleClick.bind(this)}>Buscar lera de canción</button>
        </div>
        <pre className="pt-5 col-8 text-center" id="letras">
          {this.state.lyrics ? this.state.fullLyrics : "" }
        </pre>
      </div>
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


