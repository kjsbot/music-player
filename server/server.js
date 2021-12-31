const express = require('express');
const cors = require("cors");
const parser = require("body-parser")
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const lyricsFinder = requrie('lyrics-finder');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'ac394a797e8d4993a0da7a0ae25230ca',
        clientSecret: '40a6c6f901ad4f13aeb6aa4feaed5558',
        refreshToken,
    })

spotifyApi.refreshAccessToken().then(
    (data) => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code // lead a library to parse the body code
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'ac394a797e8d4993a0da7a0ae25230ca',
        clientSecret: '40a6c6f901ad4f13aeb6aa4feaed5558' // move into env file to make it mores ecure
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res) => {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found :("
    res.json({lyrics})
})

// run appication on port
app.listen(3001)
