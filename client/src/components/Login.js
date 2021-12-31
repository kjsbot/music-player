import React from 'react';
import { Container } from 'react-bootstrap';
import './components.css'

// %20 represents a space in an encoded URL
// redirects user to this URL to authenticate their account
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=ac394a797e8d4993a0da7a0ae25230ca&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const Login = () => {
    return (
        <div className="login">
            <h1>Music Player</h1>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>Log in with Spotify</a>
        </div>
    )
}

export default Login;