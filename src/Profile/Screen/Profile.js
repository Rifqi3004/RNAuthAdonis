import React, { Component } from 'react';
import {connect} from 'react-redux'
import {logout} from "../../Public/Redux/Actions/Auth"

import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import {
  Container, Body, List, ListItem, Content,
  Grid, Col, Left, Right, Icon, Button, Header
} from 'native-base'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress = (Screen)=>{
      this.props.dispatch({
          type: 'Navigation/NAVIGATE',
          routeName : Screen
      })
  }

  cekAuth = () => {
    <Text style={styles.textheader}>{this.props.auth.user.username}</Text>  

  }
  render() {
    const auth = this.props.auth
    return (
      <Container>
        <Content>
           {
             (this.props.auth.token.length >=1) ?              
                <View>
                  <Text style={styles.textheader}> Hallo {this.props.auth.user[0]['username']} </Text>
                 <View style={styles.contentIcon}>
                    
                    <View style={styles.viewImage} >
                      <Image source={require("../../Public/dist/Images/face.png")} style={styles.imageIcon} ></Image>
                    </View>
                    
                  </View>
                </View>
              :
                <View>
                  <Text style={styles.textheader}> Login dengan </Text>
                  <View style={styles.contentIcon}>
                    <View style={styles.viewImage} >
                      <Image source={require("../../Public/dist/Images/facebook.png")} style={styles.imageIcon} ></Image>
                    </View>
                    <View style={styles.viewImage} >
                      <Image source={require("../../Public/dist/Images/google.png")} style={styles.imageIcon} ></Image>
                    </View>
                    <View style={styles.viewImage} >
                      <Image source={require("../../Public/dist/Images/twitter.png")} style={styles.imageIcon} ></Image>
                    </View>
                    <TouchableOpacity
                      onPress ={ () => this.handlePress('Login')
                      }
                    >
                      <View style={styles.viewImage} >
                        <Image source={require("../../Public/dist/Images/email.png")} style={styles.imageIcon} ></Image>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={{ textAlign:'center', marginTop:20 }}>
                    Dengan melanjutkan berarti anda setuju dengan 
                    <Text style={{ fontWeight:'bold', color : '#0985ea' }}> Persyaratan </Text>
                    dan <Text style={{ fontWeight:'bold', color : '#0985ea' }}> Kebijakan </Text> aplikasi ini
                  </Text>
                </View>
           }
            <List style={{ marginTop: 10 }}>
              <ListItem></ListItem>
              {
                (this.props.auth.token.length >= 1 )?
                <ListItem
                  onPress = {
                    () => this.handlePress('UserPost')
                  }
                >
                  <Left>
                  <Text>My Post</Text>
                  </Left>
                  <Right>
                    <Icon name="ios-return-right" style={{ color : '#c6bebe' }} />
                  </Right>
                </ListItem>
                :
                null
              }
              <ListItem>
                <Left>
                  <Text>Riwayat</Text>
                </Left>
                <Right>
                  <Icon name="ios-arrow-forward" style={{ color : '#c6bebe' }} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Suka</Text>
                </Left>
                <Right>
                  <Icon name="ios-arrow-forward" style={{ color : '#c6bebe' }} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Tersimpan</Text>
                </Left>
                <Right>
                  <Icon name="ios-arrow-forward" style={{ color : '#c6bebe' }} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Notifikasi</Text>
                </Left>
                <Right>
                  <Icon name="ios-arrow-forward" style={{ color : '#c6bebe' }} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Pengaturan</Text>
                </Left>
                <Right>
                  <Icon name="ios-arrow-forward" style={{ color : '#c6bebe' }} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Saran</Text>
                </Left>
                <Right>
                  <Icon name="ios-arrow-forward" style={{ color : '#c6bebe' }} />
                </Right>
              </ListItem>
              {
                (this.props.auth.token.length >= 1 )?
                <ListItem
                  onPress = {
                    () => this.props.dispatch(logout())
                  }
                >
                  <Left>
                  <Text>Log Out</Text>
                  </Left>
                  <Right>
                    <Icon name="ios-return-right" style={{ color : '#c6bebe' }} />
                  </Right>
                </ListItem>
                :
                null
              }
            </List>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    textheader : {
      textAlign : 'center',
      fontSize : 17,
      fontWeight : 'bold',
      fontFamily :'arial',
      marginTop : 30
    },
    imageIcon : {
      width : 50,
      height : 50,
    },
    viewImage : {
      flex : 1,
      alignItems : 'center'
    },
    contentIcon : {
      flex : 1,
      paddingTop : 20,
      flexDirection : 'row'
    }
})

const stateMapsToProps = (state) => ({
 auth : state.auth
})

export default connect(stateMapsToProps)(User)