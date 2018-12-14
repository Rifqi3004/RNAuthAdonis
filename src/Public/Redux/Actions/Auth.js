import axios from 'axios'
import Config from 'react-native-config'
export const login = (user) => ({
    type : 'LOGIN',
    payload : axios.post(Config.HOST_SERVER+'Auth/login',user)
})
export const register = (user) => ({
    type : 'REGISTER',
    payload : axios.post(Config.HOST_SERVER+'User',user)
})

export const logout = () => ({
    type : 'LOGOUT'
})