import React from 'react'
export default class SearchPanel extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { artist: '', title: ''}
    this.searchState = props.searchState;
    this.handleClick = props.handleClick;
    this.handleUpdateSearchState = props.handleUpdateSearchState;
  }



  handleOnChange = (ev) => {
    let update = {};
    update[ev.target.id] = ev.target.value;
    this.setState(update);
  }

  render() {
      const {artist, title} = this.state;
      const {searchState} = this.props;
      const searchClick = () => { 
        this.handleClick(artist, title);
       }
      return (
          <div className="p-5 mt-5 justify-content-md-center row">
              <InputBox id="artist" placeholder="Artista" onChange={this.handleOnChange.bind(this)}/>
              <InputBox id="title" placeholder="Título" onChange={this.handleOnChange.bind(this)}/>
              <div className="col-8">
                  <button className="btn btn-primary btn-block" id="btn" 
                      onClick={searchClick} 
                      disabled={(searchState) === 'LOADING' || (!artist || !title) ? 'disabled' : ''}>
                        Buscar lera de canción
                  </button>
              </div>
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