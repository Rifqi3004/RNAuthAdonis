import React, { Component } from 'react';
import { View, Text , TouchableHighlight, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
    ListItem, Body, Icon,Right
} from 'native-base'

import Config from 'react-native-config'
import {withNavigation} from 'react-navigation'

class ListNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const data = this.props.data
    return (
        <ListItem>
        <Body style={{ flex : 1, flexDirection : 'column' ,marginRight : 5}}>
          <View class={{ flex : 4, marginRight: 15,}}>
            <TouchableHighlight onPress=
              {
                () => this.props.navigation.navigate('DetailPost',  {data })
                
              }
            >
               
                 <Text style={styles.textSlug} numberOfLines={1}>{ data.slug }</Text>
              </TouchableHighlight>
          </View>
          <View style={{ flex : 1, marginTop : 30 , flexDirection : 'row'}}>
              <Text style={ styles.textFooterContent } >{data.user_id}</Text>
              <Text style={ styles.textFooterContent } >
               <Icon name={ data.viewer >0 ? 'ios-eye' : 'ios-eye-outline'  }
               style={{ fontSize : 13, marginRight: 15, }}
               ></Icon> 
               99
              </Text>
              <TouchableOpacity style={{ flex : 1  }}
                onPress={
                  () => alert('laporkan!')
                }
              >
                <Icon name="ios-more-outline" style={{ fontSize : 16, flex : 1 }}></Icon>
              </TouchableOpacity>
          </View>
        </Body>
        <Right style={{ marginLeft:10 }}>
            <TouchableOpacity onPress=
              {
                () => this.props.navigation.navigate('DetailPost',  {data})
              }
            >
                <Image style={styles.imageContent} source={{ uri : Config.HOST_SERVER+'file/'+data.image }}/>
            </TouchableOpacity>
          
        </Right>
      </ListItem>  
  
    );
  }
}
const styles = StyleSheet.create({
    imageContent : {
      height : 100,
      width: 100,
      borderRadius : 10
    },
    textSlug : { 
      fontSize : 15, 
      fontWeight : 'bold', 
      color : '#2b2b2b' ,
      marginRight : 30
    },
    textFooterContent : 
    { fontSize : 10, 
      color : 'grey' , 
      flex: 1
    },
    imageContentBanner : {
      height : 120,
      width : '100%',
      flex : 1,
      borderRadius : 1
    }
  })


  export default withNavigation(ListNews)