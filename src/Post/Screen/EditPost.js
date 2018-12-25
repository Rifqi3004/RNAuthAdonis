import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reduxForm, Field, initialize} from 'redux-form'
import TextInput from "../../Public/Component/Form/TextInput"
import Textarea from "../../Public/Component/Form/Textarea"

import {editPost} from "../../Public/Redux/Actions/Post"
import Config from "react-native-config"

import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Content} from 'native-base';
import { NavigationActions } from "react-navigation";

class DetailPost extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props.navigation.state.params
    this.state = {
        id : data.id,
        slug : data.slug,
        description : data.description,
        image : data.image,
        token : this.props.auth.token[0]['token']
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    const {data} = this.props.navigation.state.params
    this.props.initialize({
        id : data.id,
        slug : data.slug,
        description : data.description
    })
    
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {

    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    Alert.alert(
        'Cancel Edit ?',
        null,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => dispatch(NavigationActions.back())},
        ],
        { cancelable: false }
      )
    
    return true;
  };

  handleBack(){
    this.props.dispatch(NavigationActions.back())
  }


  handleSave =(value) => {       
    this.props.dispatch(editPost(value,this.state.token))
    .then((res)=>
        this.props.navigation.navigate('DetailPost',{data : res.value.data})
    )
    .then(() => alert('sukses'))   


  }

  render() {
     
    return (
      <Container>
          <Header style={styles.header} androidStatusBarColor="#d3d3d3">
            <Left>          
                <TouchableOpacity
                    onPress={
                    () => this.onBackPress()
                    }
                >
                    <Icon name="ios-arrow-back" style={styles.IconHeader} />
                    
                </TouchableOpacity>
                
            </Left>
            <Body>
            
                <Text> Edit Post</Text>
                
            </Body>
            <Right>
                {
                    (this.props.auth.token.length >0)?
                        <TouchableOpacity
                            onPress={
                               this.props.handleSubmit(this.handleSave)
                            }
                        >
                            <View>
                                <Icon name="md-checkmark-circle-outline" />
                            </View>
                        </TouchableOpacity>
                    :null
                }
            </Right>
         </Header>
         <Content>
            <View>
                <Image style={styles.imagePost} source={{ uri : Config.HOST_SERVER+'file/'+this.state.image }}/>
            </View>
            <View>
                <Field 
                name="slug"
                component={TextInput}
                placeholder="Judul Berita"
              />
               <Field 
                name="description"
                component={Textarea}
                placeholder="Deskripsi Berita"
                style={{width: '100%', height : 300, borderWidth : 0.2}}
              />
            </View>
                

         </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    nav : state.nav
})
export default reduxForm({
    form : 'editPost',
})(connect(mapStateToProps)(DetailPost))

const styles= StyleSheet.create({
    imagePost : {
        margin : 5,
        width : '100%',
        height : 200
    },
    header : {
      justifyContent : 'center',
      padding : 5,
      backgroundColor: "#d3d3d3",
    },
    IconHeader : {
      fontSize : 30,
      fontWeight :'bold',
      color : '#ed6a07',
    },
    fontHeader : {
      fontSize : 20,
      fontWeight :'bold',
      color : '#ed6a07',
      textAlign : 'center',
      justifyContent : 'center'
    },
    Content : {
      padding : 10,
      backgroundColor : '#f2f2f2'
    }, 
    FontFooter : { 
      textAlign : 'center',
       fontWeight : 'bold', 
       fontSize : 16
      },
    footer : {
      justifyContent : 'center',
      padding : 5,
      backgroundColor: "#d3d3d3",
      }
  })