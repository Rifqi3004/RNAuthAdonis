import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getUserPost} from '../../Public/Redux/Actions/Post'
import axios from 'axios'

import { View, Text, FlatList,ListView, TouchableOpacity, StyleSheet, BackHandler} from 'react-native';

import {Spinner, Container, Content, List, Button, Icon, 
    Header,Left, Right, Body, Footer } from 'native-base';

import ListPost from "../Component/ListPostUser"
import { NavigationActions } from "react-navigation";

 class UserPost extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2});
    this.state = {
        iduser : this.props.auth.user[0]['id'],
        grid : false
    };
  }

  componentDidMount(){   
    this.props.dispatch(getUserPost(this.state.iduser));
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  deleteRow = (secId, rowId, rowMap) => {
   
    rowMap[`${secId}${rowId}`].props.closeRow();
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

  handeClick = (screen) => {
      this.props.dispatch({
          type : 'Navigation/NAVIGATE',
          routeName : screen
      })
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
           
            <Text> {
             this.props.post.userPost.length
            } Post</Text>
            
          </Body>
          <Right>
            
          </Right>
         </Header>
        <Content>
            {
                (this.props.post.isLoading == true)?
                <Spinner /> : null
            }
         
          <List              
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.props.post.userPost)}
              renderRow={(data)=> 
                <ListPost data={data}
                />
              }
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger
                  style={{ backgroundColor : '#f0f0f0' }}
                  onPress={_ => {
                      alert('oke');
                      this.deleteRow(secId, rowId, rowMap)
                }}>
                    <Icon name="trash" active style={{ color: '#ef4747' }}/>
                </Button>
                
              }
              
              
            >
              
          </List>
        </Content>
        <Footer style={styles.footer}>
          <Left style={{ alignContent :'center', alignItems :'center', justifyContent : 'center' }}>
            
               <TouchableOpacity onPress=
               {
                 () => alert('grid')
               }
               
               >
                  <View
                   style={{
                     width : 200,
                     alignItems : 'center'
                   }}
                  >
                   <Icon name={
                       (this.state.grid == false) ?
                       'grid' : 'more'
                     } style={styles.IconHeader} />
                  </View>
               </TouchableOpacity>
          </Left>
         
          <Right style={{ paddingRight : 10 }}>           
            <TouchableOpacity
                onPress=
                {
                () => this.handeClick('AddPost')
                }
            >
                <Icon name="ios-add-circle-outline" style={styles.IconHeader} />
            </TouchableOpacity>
          </Right>
        </Footer>
    </Container>
      
    );
  }
}


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

const mapStateToProps = (state) => ({
    post : state.post,
    auth : state.auth,
    nav : state.nav
})

export default connect(mapStateToProps)(UserPost)