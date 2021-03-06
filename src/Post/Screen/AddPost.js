import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import {addPost} from "../../Public/Redux/Actions/Post"
import axios from 'axios'
import { View, Text, Image , StyleSheet, TouchableOpacity, Platform} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { Button, Container, Content, Header,Body, Left, Right, Icon, Card
, Spinner
} from 'native-base';
import slugify from 'slugify'

import { reduxForm, Field } from 'redux-form'
import Input from '../../Public/Component/Form/TextInput'
import Textarea from "../../Public/Component/Form/Textarea"

 const createFormData = (photo) => {
  const data = new FormData();
  data.append(photo);

  return data;
};


 class AddPost extends Component {

 constructor(){
   super()
   this.state = {
     photo : null
   }
   this.handleUpload = this.handleUpload.bind(this)
 }
  
 handleChoosePhoto = () => {
  const options = {
    noData: true,
  }
  ImagePicker.launchImageLibrary(options, response => {
    if (response.uri) {
      this.setState({ photo: response })
    }
  })
}

  // handleUpload(){
  //   const data = this.state.photo
  //   axios.post("http://192.168.0.62:3333/postfile", {data}
  //   )
  //     .then(response => {
  //       console.warn("upload succes", response);
  //       alert("Upload success!");
  //       this.setState({ photo: null });
  //     })
  //     .catch(error => {
  //       console.warn("upload error", error);
  //       alert("Upload failed!");
  //     });
  // }

  handleSave = (data) => {
    const token = this.props.auth.token[0]['token']
    this.props.dispatch(addPost(data,token))
    .then(() => this.handleBack() && alert('success add Post'))
    .catch(()=> alert('post failed'))
  };
  handleBack(){
    this.props.dispatch({
        type: 'Navigation/POP'
    })
}
  render() {
    const { photo } = this.state
    return (
      <Container>
           <Header style={styles.header} androidStatusBarColor="#d3d3d3">
          <Left>          
              <TouchableOpacity
                onPress={
                  () => this.handleBack()
                }
              >
                <Icon name="ios-arrow-back" style={styles.IconHeader} />
                
              </TouchableOpacity>
            
          </Left>
          <Body>
           
            <Text> Add New Post</Text>
            
          </Body>
          <Right>        
              <TouchableOpacity
                  onPress={
                    this.props.handleSubmit(this.handleSave)
                  }
              >
                  <View>
                      <Icon name="md-checkmark-circle-outline" />
                  </View>
              </TouchableOpacity>
          </Right>
         </Header>
          <Content>
            {
              (this.props.post.isLoading == true)?
              <Spinner></Spinner> : null
            }
            <Card>
              <Field 
                name="slug"
                component={Input}
                placeholder="Judul Berita"
              />
               <Field 
                name="description"
                component={Textarea}
                placeholder="Deskripsi Berita"
                style={{width: '100%', height : 300, borderWidth : 0.2}}
              />
             
            </Card>
                {/* {photo && (
                    <Fragment>
                    <Image
                      source={{ uri: photo.uri }}
                      style={{ width: 300, height: 300 }}
                    />
                    <Button onPress={this.handleUpload} ><Text>Upload</Text></Button>
                  </Fragment>
                )}
                <Button onPress={this.handleChoosePhoto} ><Text>add photo</Text></Button> */}

          </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth,
  post : state.post
})

export default reduxForm({form: 'post'})(connect(mapStateToProps)(AddPost))

const styles= StyleSheet.create({
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
