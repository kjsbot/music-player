import React from 'react';
import './components.css'

const TrackSearchResult = ({track, chooseTrack}) => {

    function handlePlay() {
        chooseTrack(track) // when you click on a song
    }

    return (
        <div 
        className="d-flex m-2 align-items-center" 
        style={{cursor: "pointer"}}
        onClick={handlePlay}>
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div className="info">
                <div className="title">{track.title}</div>
                <div className="artist">{track.artist}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult;
