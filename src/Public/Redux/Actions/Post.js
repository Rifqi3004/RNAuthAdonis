import axios from 'axios'
import Config from 'react-native-config'

export const getPosts = ()=>({
    type :'GET_POSTS',
    payload : axios.get(Config.HOST_SERVER+'posts')
})

export const getUserPost = (user_id)=>({
    type : 'GET_POST_USER',
    payload : axios.get(Config.HOST_SERVER+'posts/user/'+user_id)
})

export const addPost = (data,token) => ({
    type : 'ADD_POST',
    payload : axios.post(Config.HOST_SERVER+'posts',{data},{headers : {
        Authorization :'Bearer '+ token
      }})
})

export const editPost = (data,token) => ({
    type : 'EDIT_POST',
    payload : axios.post(Config.HOST_SERVER+'posts/edit',{data},{headers : {
        Authorization :'Bearer '+ token
      }})
})

export const deletePost = (data,token) => ({
    type : 'DELETE_POST',
    payload : axios.post(Config.HOST_SERVER+'posts/delete',{data},{headers : {
        Authorization :'Bearer '+ token
      }})
})