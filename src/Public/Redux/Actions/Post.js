import axios from 'axios'
import Config from 'react-native-config'

export const getPosts = ()=>({
    type :'GET_POSTS',
    payload : axios.get(Config.HOST_SERVER+'Posts')
})

export const getUserPost = ()=>({
    type : 'GET_POST_USER',
    payload : axios.get(Config.HOST_SERVER+'Post/User/1')
})

export const addPost = (data,token) => ({
    type : 'ADD_POST',
    payload : axios.post(Config.HOST_SERVER+'Post',{data},{headers : {
        Authorization :'Bearer '+ token
      }})
})

export const editPost = (data,token) => ({
    type : 'EDIT_POST',
    payload : axios.post(Config.HOST_SERVER+'Post/edit',{data},{headers : {
        Authorization :'Bearer '+ token
      }})
})