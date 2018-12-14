import React, { Component } from 'react';
import {connect} from 'react-redux'
import Config from "react-native-config"

import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Content as Contents } from 'native-base';
import { NavigationActions } from "react-navigation";

class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    dispatch(NavigationActions.back());
    return true;
  };

  handleBack(){
    this.props.dispatch({
        type: 'Navigation/POP'
    })
  }

  render() {
      const data = this.props.navigation.state.params.data
      {
          console.log('data : ' +data.slug)
      }
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
            
                <Text> {data.slug}</Text>
                
            </Body>
            <Right>
                {
                    (this.props.auth.token.length >0)?
                        <TouchableOpacity
                            onPress={
                                () => this.props.navigation.navigate('EditPost',{data})
                            }
                        >
                            <View>
                                <Icon name="md-create" />
                            </View>
                        </TouchableOpacity>
                    :null
                }
            </Right>
         </Header>
         <Contents>
            <View>
                <Image style={styles.imagePost} source={{ uri : Config.HOST_SERVER+'file/'+data.image }}/>
            </View>
            <View>
                <Text>
                    {data.description}
                </Text>
            </View>
                

         </Contents>
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