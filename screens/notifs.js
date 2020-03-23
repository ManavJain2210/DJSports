import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";

import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import TeamCard from '../components/TeamCard'
//import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
// teamDetails
// teamName
// image
// moreDetails

class notifs extends Component {
    render() {
        return (
            <View>
              <Header style = {{backgroundColor: 'blue'}}/>
                <FlatList
         
          scrollEnabled={true}
        
          data=
          {[{teamDetail : 'Team is really Good',
            teamName : 'Team1',
            moreDetail:'Fantastic'
            },
            {teamDetail : 'Team is really Good',
            teamName : 'Team2',
            moreDetail:'Fantastic'
            },{teamDetail : 'Team is really Good',
            teamName : 'Team3',
            moreDetail:'Fantastic'
            },
        
        ]}

          renderItem={({ item }) => <TeamCard image  = {require('../assets/media2.jpg')}
          teamDetails = {item.teamDetail}
          teamName = {item.teamName}
          moreDetails = {item.moreDetail}
      >
      </TeamCard>}
          //keyExtractor={item => item.teamName}
        />
           
            </View>
            
        );
    }
}
export default notifs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});