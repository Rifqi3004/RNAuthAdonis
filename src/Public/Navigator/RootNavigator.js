import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import IconMat from "react-native-vector-icons/MaterialIcons"
import { Icon } from 'native-base'
//scrreen
import Post from "../../Post/Screen/Post"
import Profile from "../../Profile/Screen/Profile"
import Login from "../../Auth/Screen/Login"
import Register from "../../Auth/Screen/Register"
import UserPost from "../../Post/Screen/UserPost"
import AddPost from "../../Post/Screen/AddPost"
import DetailPost from '../../Post/Screen/DetailPost';
import EditPost from '../../Post/Screen/EditPost'

const HomeBottomTabs = createBottomTabNavigator(
    {
        Post : {
            screen : Post
        },
        Profile : {
            screen : Profile
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor}) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Post') {
              iconName = `md-home`;
            } else if (routeName === 'Profile') {
            iconName = `ios-contact`;
            }
            
            return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          showLabel : false
        },
       
    }
)

const HomeStack = createStackNavigator(
    {
        Home : {
            screen : HomeBottomTabs,
            
        },
        Login : {
            screen : Login
        },
        Register : {
            screen : Register
        },
        UserPost :
        {
            screen : UserPost
        },
        AddPost : {
            screen : AddPost
        },
        DetailPost : {
            screen : DetailPost
        },
        EditPost : {
            screen : EditPost
        }
    },
    {
        initialRouteName: "Home",
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
)

export default HomeStack