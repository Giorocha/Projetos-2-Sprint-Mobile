import SignScreen from './pages/signin.js'
import MainScreen from './pages/main.js'
import TemasScreen from './pages/temas'

import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({
    Sign: { screen: SignScreen},
});

const MainNavigation = createBottomTabNavigator({
    Main: {
      screen: MainScreen,
    },
    Temas: {
      screen: TemasScreen,
    }
  },
    {
      initialRouteName: 'Temas',
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        inactiveBackgroundColor: '#B727FF',
        activeBackgroundColor: '#9900e6',
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
  

