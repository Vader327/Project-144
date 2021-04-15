import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default class RecommendedScreen extends React.Component{
    constructor(){
        super();
        this.state={
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    timeConvert(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours}h ${minutes}m`;
    }

    getData = () => {
        var url = "https://17de7f6edd27.ngrok.io/recommendations";

        axios.get(url)
        .then(async(response)=>{
            this.setState({data: response.data.data});
        })
        .catch(error=>{
            console.log(error.message);
        });
    };

    keyExtractor=(item, index)=>index.toString();

    renderItems=({ item, index })=>{
        return (
          <View style={styles.cardContainer}>
            <Text style={styles.title}>{item.title[0].toUpperCase() + item.title.slice(1, -1)}</Text>

            <View style={{flexDirection: 'row', marginTop: 5}}>
                <Ionicons name="heart" size={17} color="tomato" />
                <Text style={styles.subtitle}>{item.total_events}</Text>
            </View>
          </View>
        );
    };
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
                {
                    this.state.data.length == 0
                    ? <ActivityIndicator />
                    : <FlatList data={this.state.data} keyExtractor={this.keyExtractor} renderItem={this.renderItems} />
                }
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        marginVertical: 5,
    },
    subtitle: {
        color: '#aaaaaa',
        fontSize: 15,
        marginLeft: 5
    },
    cardContainer: {
        borderRadius: 20,
        margin: 20,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
        elevation: 10,
    }
});
