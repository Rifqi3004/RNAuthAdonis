import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getPosts} from "../../Public/Redux/Actions/Post"

import { View, Text, FlatList } from 'react-native';
import { Container } from 'native-base'
import Config from 'react-native-config'

import ListPost from "../Component/ListPost"

const HOST_SERVER = "http://192.168.0.62:3333/file/"

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.props.dispatch(getPosts())
    
  }
  

  render() {
    return (
      <Container>
        <FlatList style={{ alignItems : 'center' , marginLeft : 10, marginRight : 10}}
          data={this.props.post.allPost}
          style={{ flex:1, marginVertical :20 }}
          renderItem={({item, index}) => (
            <ListPost data={item}/>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          />
        
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  post : state.post
})

export default connect(mapStateToProps)(Post)
