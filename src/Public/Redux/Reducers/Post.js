const initialState = {
    allPost : [],
    userPost : [],
    isLoading : false,
    isFinish : false,
    isError : false,
    error : []
}

export default Post = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POSTS_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "GET_POSTS_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true,
            allPost : action.payload.data
        }

        case "GET_POSTS_REJECTED" : 
            return {
            ...state, isError : true,
            error : action.payload.data

            }

    //get Post User

        case "GET_POST_USER_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "GET_POST_USER_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true,
            userPost : action.payload.data
        }

        case "GET_POST_USER_REJECTED" : 
            return {
            ...state, isError : true,
            error : action.payload.data

            }

        //add Post

        case "ADD_POST_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "ADD_POST_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true,
            allPost : [...state.allPost, action.payload.data],
            userPost : [...state.userPost, action.payload.data]
        }

        case "ADD_POST_REJECTED" : 
            return {
            ...state, isError : true,
            error : action.payload.data

            }
        
        //edit post
        case "EDIT_POST_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "EDIT_POST_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true,
            allPost : state.allPost.map((data) => 
                    (data.id == action.payload.data.id)?
                    action.payload.data :
                    data
                    ),
            userPost : state.userPost.map((data) => 
                    (data.id == action.payload.data.id)?
                    action.payload.data :
                    data
                    )
        }

        case "EDIT_POST_REJECTED" : 
            return {
            ...state, isError : true,
            error : action.payload.data

            }

        //delete post
        case "DELETE_POST_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "DELETE_POST_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true,
            allPost : state.allPost.filter(data => data.id != action.payload.data),
            userPost : state.userPost.filter(data => data.id != action.payload.data)
        }

        case "DELETE_POST_REJECTED" : 
            return {
            ...state, isError : true,
            error : action.payload.data

            }
        case "LOGOUT" : 
            return {
                ...state,
                userPost : []
            }

        default:
           return state
    }
}