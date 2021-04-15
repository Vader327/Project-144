import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import WebView from "react-native-webview";

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state={
            url: 'https://17de7f6edd27.ngrok.io',
            details: {},
            loggedIn: false,
            userName: "",
            articleLoading: false,
        }
    }

    getArticle=()=>{
        axios.get(this.state.url + '/article').then(data=>{
            this.setState({details: data.data.data, articleLoading: false});
        })
    }

    articleAction=(action)=>{
        this.setState({articleLoading: true}, ()=>{
            axios
                .post(this.state.url + '/' + action)
                .then(() => {
                    this.getArticle();
                })
                .catch(error => {
                    console.log(error.message);
                });
        })
    }

    auth=()=>{
        axios.post(this.state.url + '/auth?name=' + this.state.userName).then(()=>{
            this.setState({loggedIn: true}, this.getArticle)
        })
    }

    render(){
        if(!this.state.loggedIn){
            return (
                <View style={styles.container}>
                    <StatusBar style="light" backgroundColor="tomato" />

                    <View style={[styles.header, {justifyContent: 'center'}]}>
                        <Text style={styles.headerText}>Login / Signup</Text>
                    </View>

                    <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput style={styles.textInput} placeholder="Enter Name" onChangeText={(text)=>{this.setState({userName: text})}} />
                        
                        <TouchableOpacity style={styles.loginButton} onPress={this.auth}>
                            <Text style={styles.headerText}>Submit</Text>
                        </TouchableOpacity>

                        <Text style={{width: '80%', textAlign: 'center'}}>A new account will be created if you do not have one already.</Text>
                    </View>
                </View>
            )
        }
        else{
            const { details } = this.state;
            if (details.url) {
                var disabled = this.state.articleLoading;
                return (
                    <View style={styles.container}>
                        <StatusBar style="light" backgroundColor="tomato" />
                        
                        <View style={styles.header}>
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color="#ffffff"
                                onPress={()=>{
                                    this.setState({
                                        details: {},
                                        loggedIn: false,
                                        userName: "",
                                        articleLoading: false,
                                    })
                                }}
                            />
                            <Text style={styles.headerText}>Recommended Articles</Text>
                            <Ionicons
                                name="search"
                                size={20}
                                color="#ffffff"
                                onPress={()=>this.props.navigation.navigate("RecommendedScreen")}
                            />
                        </View>

                        {
                            this.state.articleLoading
                                ? (
                                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                        <ActivityIndicator />
                                    </View>
                                )
                                : <WebView source={{uri: this.state.details.url}} />
                        }

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>                
                            <TouchableOpacity style={[styles.button, {backgroundColor: disabled ? 'lightgray' : "#76ff03"}]} disabled={disabled}
                            onPress={()=>{this.articleAction('like')}}>
                                <Ionicons
                                    name="thumbs-up"
                                    size={30}
                                    color="#ffffff"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, {backgroundColor: disabled ? 'lightgray' : '#ff1744'}]} disabled={disabled}
                            onPress={()=>{this.articleAction('dislike')}}>
                                <Ionicons
                                    name="thumbs-down"
                                    size={30}
                                    color="#ffffff"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
            else{
                return (
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <ActivityIndicator />
                    </View>
                )
            }
        }        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  header: {
    backgroundColor: 'tomato',
    width: '100%',
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput:{
    borderBottomWidth: 3,
    borderBottomColor: '#eeeeee',
    width: '80%',
  },
  loginButton:{
    backgroundColor: 'tomato',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7, 
    marginVertical: 30,
    borderRadius: 10
  }
});
