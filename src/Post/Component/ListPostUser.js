import React, {Component} from 'react'
import {withNavigation} from 'react-navigation'

import {
    View, Text
} from 'react-native'
import {
    ListItem
} from 'native-base'

class ListPostUser extends Component {
    render(){
        const data = this.props.data
        return(
            <ListItem style={{ backgroundColor:'#fff' ,  paddingLeft : 15, paddingRight : 15}} 
            onPress={            
              () => this.props.navigation.navigate('DetailPost', {data})
            }
            >
             
              <View style={{ flex:1,  flexDirection : 'row' }}>             
                <View style={{ flex : 5, flexDirection : 'column' }}>
                  <View style={{ flex :2 }}>
                    <Text style={{ fontWeight : 'bold' }} numberOfLines={1}>
                      {data.slug}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection : 'row' }}>
                    <View style={{ flex:1, marginTop : 5, marginRight : 10 }}>
                      <Text style={{ fontSize : 12, color: 'grey' }} numberOfLines={1}>
                        {data.created_at}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              </ListItem>
        )
    }
}

export default withNavigation(ListPostUser)