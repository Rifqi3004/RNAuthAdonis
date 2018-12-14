const initialState = {
    token : [],
    user : [],
    isLoading : false,
    isFinish : false,
    isError : false
}


export default Auth = (state=initialState, action) => {
    switch (action.type) {
        //Login
        case "LOGIN_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "LOGIN_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true,
            token : [action.payload.data.token],
            user : [action.payload.data.user]
        }

        case "LOGIN_REJECTED" : 
            return {
            ...state, isError : true,

            }
        //logout
        case  "LOGOUT" : 
            return {
                ...state,
                token : [], user : []
            }

        //register
        case "REGISTER_PENDING" : 
        return {
          ...state, isLoading : true
        }

        case "REGISTER_FULFILLED" : 
            return {
            ...state, isLoading : false, isFinish : true
        }

        case "REGISTER_REJECTED" : 
            return {
            ...state, isError : true,

            }
        default:
        return state
    }
    
}