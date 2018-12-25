import axios from 'axios'
import Config from 'react-native-config'
export const login = (user) => ({
    type : 'LOGIN',
    payload : axios.post(Config.HOST_SERVER+'auth/login',user)
})
export const register = (user) => ({
    type : 'REGISTER',
    payload : axios.post(Config.HOST_SERVER+'users',user)
})

export const logout = () => ({
    type : 'LOGOUT'
})