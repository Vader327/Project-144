import React from "react";

import HomeScreen from "./screens/HomeScreen";
import RecommendedScreen from "./screens/RecommendedScreen";
import PopularScreen from "./screens/PopularScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}

const AppTopNavigation = createMaterialTopTabNavigator({
  RecommendedScreen: {
    screen: RecommendedScreen,
    navigationOptions: {
      tabBarLabel: "Recommended",
    }
  },
  PopularScreen: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarLabel: "Popular",
    }
  }
}, {
  tabBarOptions: {
    indicatorStyle: {backgroundColor: '#fff', height: 3},
    style: {backgroundColor: 'tomato', borderTopWidth: 0, shadowColor: "tomato", shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: {width: 0, height: 5}, elevation: 10},
    labelStyle: {fontWeight: 'bold'}
  }
});

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    AppTopNav: {
      screen: AppTopNavigation,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "#fff",
        headerTitle: "Browse",
        headerStyle: {
          backgroundColor: "tomato",
          shadowRadius: 0,
          shadowOffset: {height: 0}
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20
        }
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppStackNavigator);
