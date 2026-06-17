import {post, get} from '../plugins/api.js'

const onLogin = async() => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    
    const response = await login(username, password)

    const {accessToken, refreshToken} = response

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    window.location.href = "http://127.0.0.1:5500/BaiTapBuoi28/home/index.html"
}

const button = document.querySelector('button')
button.addEventListener('click', onLogin)