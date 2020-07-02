import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import SignUpScreen from './SignUpScreen';
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import Geocoder from 'react-native-geocoding';


//const firebase = require('firebase');
//require("firebase/firestore");
var db = firebase.firestore();



export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            displayname: '',
            event_name : '',
            sport: '',
            no_people : '',
            venue : '',
            date: '',
            location: ''

        }
    }

    componentDidMount(){
        const user = firebase.auth().currentUser
        Geocoder.init("AIzaSyCwsGyxbGuuYoCXOvr2Ju4PLZzM9gAo0NY");
        
        this.setState({email : user.email })
        
        // console.log(user.email)
        
      }
      
    setVenue = () => {
        console.log(this.state.venue)
        console.log(typeof(this.state.venue))
        Geocoder.from(this.state.venue)
        .then(json => {
            var locatio = json.results[0].geometry.location;
            this.setState({
                location : locatio
            })
            console.log(location);
        // this.setState({venue : []})
    })
}
    handleCreate = () => {
        
        console.log("Creating event setting value")
        this.setVenue().then(alert('Event created'))
        console.log(this.state.event_name)
        this.setVenue().then(
        db.collection('CreatedEvent').doc(this.state.email).collection(this.state.event_name).doc(this.state.event_name).set({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            location : this.state.location
        }))
        .then(() => console.log("doc added successfully"))
        .catch(function(error) {
            console.log("error adding ", error);
        });
    }

    render() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.header}>{'Create your event'}</Text>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Event name</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="words" 
                    onChangeText = {event_name => this.setState({event_name})}
                    value = {this.state.event_name}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Sport</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="none" 
                    onChangeText = {sport => this.setState({sport})}
                    value = {this.state.sport}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Number of players in team</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="none" 
                    keyboardType = "number-pad"
                    onChangeText = {no_people => this.setState({no_people})}
                    value = {this.state.no_people}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Venue</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize= "sentences" 
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText = {venue => this.setState({venue})}
                    value = {this.state.venue}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Date</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="none" 
                    onChangeText = {date => this.setState({date})}
                    value = {this.state.date}
                    >
                    </TextInput>
                </View>
                
                <TouchableOpacity style = {styles.button } onPress = {this.setVenue}>
                    <Text style = {{color: "white"}}>CREATE</Text>

                </TouchableOpacity>
                
                
            </View>
   
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 40,
        marginTop: 20
    },
    inputForm: {
        marginHorizontal: 20,
        marginBottom: 30

    },

    inputTitle: {
        fontSize:18,
        color: "#8A8F9E"
    },
    input: {
        fontSize: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40
    
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "black",
        borderRadius: 8,
        height: 52,
        justifyContent:"center",
        alignItems:"center"
    }


});
