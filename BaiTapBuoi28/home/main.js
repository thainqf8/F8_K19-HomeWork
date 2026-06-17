import {get} from "../plugins/api.js"

const getProfile = async() => {
    const profile = await get ('/auth/me') 
}


const init = async() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
        window.location.href = '../login'
    }

    await getProfile()

}


init()
