import React from 'react';
import propTypes from 'prop-types';

export default class LyricsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.searchState = props.searchState;
        this.state = {fullLyrics: ''}
        this.handleUpdateSearchState = props.handleUpdateSearchState;
    }


    async updateLyricsState(artist, title) {
        this.handleUpdateSearchState("LOADING");
        const result = await this.fetchLyrics(artist, title);
        const fullLyrics = result.error ? result.error : result.lyrics;
        this.setState({fullLyrics});
        this.handleUpdateSearchState("OK")
    }
    
    componentDidMount() {
        /*
        /////////////////////
        Lo comenté porque mi componente se carga desde el principio y no tiene artista ni título de la canción, pero entiendo el concepto
        /////////////////////
        const { artist, title } = this.props;

        if (artist && title) {
            this.updateLyricsState(artist, title);
        }*/
        alert("Omite este mensaje! es para probar el componentDidMount");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { artist, title } = this.props;
        const { artist: prevArtist, title: prevTitle } = prevProps;
        
        if (artist && title && (artist !== prevArtist || title !== prevTitle)) {
            this.updateLyricsState(artist, title);
        }
    }

    fetchLyrics = async (artist, title) => {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        if(artist && title){
            const response = await fetch(url);
            if(response.status === 200) {
            return response.json();
            } else {
            return ({error: "No se encontro la letra"});     
            }
        } else {
            return ({error: "Debe especificar el nombre y título de canción"});
        }
    };
    
    render() {
        const {fullLyrics} = this.state
        const {searchState} = this.props
        return (
            <div className="text-center justify-content-md-center row">
                <pre className="pt-5 col-8 text-center" id="letras">
                    {searchState === 'OK' ? fullLyrics : "" }
                </pre>
            </div>
        );
    }
}

LyricsPanel.propTypes = {
    searchState: propTypes.string.isRequired,
    handleUpdateSearchState: propTypes.func.isRequired,
    artist: propTypes.string,
    title: propTypes.string
}