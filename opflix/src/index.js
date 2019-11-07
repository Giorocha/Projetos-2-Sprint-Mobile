import MainScreen from './pages/main.js'
import GeneroScreen from  './pages/generos.js'
import SigninScreen from './pages/signin.js'

import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({    
    Sign: { screen: SigninScreen},
})

const MainNavigation = createBottomTabNavigator({
    Main: {
      screen: MainScreen,
    },
    Generos: {
      screen: GeneroScreen,
    }
  },
    {
      initialRouteName: 'Main',
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        inactiveBackgroundColor: '#00001a',
        activeBackgroundColor: '#00001a',
        style: {
          width: '100%',
          height: 50,
        },
      },
    }
  );

  
  export default createAppContainer(
    createSwitchNavigator(
      {
        MainNavigation,
        AuthStack
      }, {
        initialRouteName: "AuthStack"
      },
    )
  );
  
