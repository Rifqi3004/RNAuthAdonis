import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container , Card, Header, Icon, Content, Spinner} from "native-base"

import { connect } from 'react-redux';
import {login} from '../../Public/Redux/Actions/Auth'

import TextInput from '../../Public/Component/Form/TextInput';
import Password from "../../Public/Component/Form/Password";

class Login extends React.Component {
   

    handleSave = (value) => {
        this.props.dispatch(login(value))
        .then(() => {
            this.handlePress('Home')
        })
    }
    handlePress = (Screen) => {
        this.props.dispatch({
            type : 'Navigation/NAVIGATE',
            routeName : Screen
        })
    }

    render() {
        return (
            <ImageBackground source={require('../../Public/dist/Images/bg1.jpg')}
                style={styles.backgroundImage}>

                 <Container style={{ backgroundColor : 'rgba(0,0,0,0)' }}>
                 
                    <Header style={{ backgroundColor : 'rgba(0,0,0,0)' }}>
                       <TouchableOpacity
                            onPress={() => this.handlePress('Home')}
                            style={{flex: 1, flexDirection : 'row' }}
                        >
                            <View style={{ flex : 1, paddingLeft : 5 }}>
                                <Icon name="ios-arrow-back" style={{ fontSize : 30, color : 'white' }}></Icon>
                            </View>
                            <View style={{ flex : 9, paddingLeft : 5 }}>
                                <Text style={{ fontSize : 20, color : 'white' }}>Back</Text>
                            </View>
                         </TouchableOpacity>
                         
                    </Header>
                    <Content style={{ backgroundColor : 'rgba(0,0,0,0)' }}>
                        {
                            (this.props.auth.isLoading == true)?
                                <Spinner />
                            : null
                        }
                        <View style={styles.container}>
                            <Text style={{ textAlign : 'center', fontSize : 20, color : 'white' }}>Login</Text>
                            <Card style={styles.card} transparent>
                                    <Field
                                        name="email"
                                        component={TextInput}
                                        placeholder="Email address"
                                        style={inputStyle}
                                        placeholderColor={"#fff"}
                                    />
                                    <Field
                                        name="password"
                                        component={Password}
                                        placeholder="Password"
                                        style={inputStyle}
                                        placeholderColor={"#fff"}
                                    />
                                    <View style={{ justifyContent : 'center'}}>
                                        <Button
                                            color="#000"
                                            title="Login"
                                            onPress={this.props.handleSubmit(this.handleSave)}
                                            style={{ margin : 5}}
                                        />
                                        <Text style={{color : 'white', textAlign : 'center' }}> Or </Text>
                                        <Button
                                            color="#000"
                                            title="Register"
                                            onPress={() => this.handlePress('Register')}
                                            style={{ margin : 5 }}
                                        />
                                    </View>
                            </Card>
                            <View>
                                <Text style={{ textAlign:'center', marginTop:20 , color : 'white'}}>
                                    Dengan melanjutkan berarti anda setuju dengan 
                                    <Text style={{ fontWeight:'bold', color : '#0985ea' }}> Persyaratan </Text>
                                    dan <Text style={{ fontWeight:'bold', color : '#0985ea' }}> Kebijakan </Text> aplikasi ini
                                </Text>
                            </View>


                        </View>
                    </Content>
                   
                </Container>         
                                
            </ImageBackground>
          
        );
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default reduxForm({
    form: 'login'
})(connect(mapStateToProps)(Login));

const inputStyle = {
    width : 300,
    height : 44,
    borderRadius : 2,
    margin: 7,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth :0.3, 
    borderColor : '#fff',
    color : '#fff'
    
}
const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    cord: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        width : 500
    },
    textCounter: {
        fontSize: 100
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});
