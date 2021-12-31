import React, { useState, useEffect } from 'react';
import './components.css'
import useAuth from '../Hooks/useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "ac394a797e8d4993a0da7a0ae25230ca",
})

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState([])
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }

    // for API to asccess lyrics
    useEffect(() => {
        if (!playingTrack) return
        axios.get("http://localhost:3001/lyrics", {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    // searching, every time user search quergy changes
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })
        return () => (cancel = true) // if new request is made, cancel previous request
        // actually do request when user stops typing to prevent multipe arrays showing up
    }, [search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }} chooseTrack={chooseTrack}>
                {searchResults.map(track => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                    />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{whiteSpace:"pre"}}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
        </Container>
    )
}

export default Dashboard;