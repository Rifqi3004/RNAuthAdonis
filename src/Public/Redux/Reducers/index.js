import { combineReducers } from 'redux'
import Navigator from "../../Navigator/RootNavigator"
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { reducer as reducerForm } from 'redux-form';
import Auth from "./Auth"
import Post from "./Post"

const navReducer = createNavigationReducer(Navigator)

const reducers = combineReducers(
    {
        nav : navReducer,
        form: reducerForm,
        auth : Auth,
        post : Post      
    }
)
export default reducers