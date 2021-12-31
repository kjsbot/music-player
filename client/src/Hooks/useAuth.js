import React, { useState, useEffect } from 'react';
import axios from "axios"; // hleps with making requrests

// logic for login and authentication
const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // get all that information above
    useEffect(() => {
        axios
            .post("http://localhost:3001/login", {
                code, // post code to route ^ and calls all code on server
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken) // so the user doesn't have to log in evrey hour
                setExpiresIn(res.data.expiresIn)
                window.history.pushState({}, null, "/") // removes code, extra stuff from url
            })
            .catch(() => {
                window.location = "/"
            }) // code expiers quickly
    }, [code]) // run useEffect every time code changes

    useEffect(() => {
        // make sure this doesn't run before you get a refreshToken
        if (!refreshToken || !expiresIn) return
        // only refresh before time expires
        const interval = setInterval(() => {
            axios
                .post("http://localhost:3001/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(() => {
                    window.location = "/"
                })
        }, (expiresIn - 60) * 1000)// refresh one min before token expires

        return () => clearInterval(interval) // don't use incorrect refresh token
    }, [refreshToken, expiresIn])

    return accessToken// need to allow us to call all spotify API
}

export default useAuth;