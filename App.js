import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PostScreen from './src/screens/PostScreen';
import FormPostScreen from './src/screens/FormPostScreen';
import AddPostScreen from './src/screens/AddPostScreen';
import EditPostScreen from './src/screens/EditPostScreen';

const AppNavigator = createStackNavigator(
  {
    Post: PostScreen,
    FormPost: FormPostScreen,
    AddPost: AddPostScreen,
    EditPost: EditPostScreen,
  },
  {
    initialRouteName: 'Post',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <AppContainer/>
      </>
    );
  }
}