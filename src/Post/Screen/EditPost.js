import React, { Component } from 'react';
import {connect} from 'react-redux'
import {editPost} from "../../Public/Redux/Actions/Post"
import Config from "react-native-config"

import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Content, Input, Textarea } from 'native-base';
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


  handleSave =() => {
    const data = {
        id : this.state.id,
        slug : this.state.slug,
        description : this.state.description
    }
    if(this.state.slug == "" | this.state.description == ""){
        alert('Field ada yang kosng')
    }else{
       this.props.dispatch(editPost(data,this.state.token))
        .then(()=> alert('sukses'))
        .then((res) => console.log(res))
    }
    
    // (this.state.slug == "" || this.state.description == "")?
    //     alert('Field ada yang kosong') :   
    //     alert(JSON.stringify(data))
    // // this.props.dispatch(addPost(data,this.state.token))
    // // .then(()=> alert('sukses'))
    // // .then(() => this.handleBack())

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
                                () => this.handleSave()
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
                <Input 
                    onChangeText ={
                        (text) => this.setState({
                            slug : text
                        })
                    }
                    value={this.state.slug}
                />
                <Textarea 
                    onChangeText ={
                        (text) => this.setState({
                            description : text
                        })
                    }
                    value={this.state.description}
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
export default connect(mapStateToProps)(DetailPost)

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