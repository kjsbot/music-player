import React, { useEffect, useState } from 'react';
import './components.css'
import SpotifyPlayer from "react-spotify-web-playback"

const Player = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    
    return (
        <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        play={true}
        uris={trackUri ? [trackUri] : []} // if there's a song to play
        />
    )
}

export default Player;
