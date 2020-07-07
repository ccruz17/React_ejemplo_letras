import React from 'react'
import propTypes from 'prop-types';

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
              <InputBox idInput="artist" placeholder="Artista" onChange={this.handleOnChange.bind(this)}/>
              <InputBox idInput="title" placeholder="Título" onChange={this.handleOnChange.bind(this)}/>
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

SearchPanel.propTypes = {
  searchState: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
  handleUpdateSearchState: propTypes.func.isRequired
}


class InputBox extends React.Component {
    constructor(props) {
      super(props);
      this.idInput = props.idInput;
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

  InputBox.propTypes = {
    idInput: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired
  }