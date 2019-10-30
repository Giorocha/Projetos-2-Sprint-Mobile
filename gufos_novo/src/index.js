import MainScreen from './pages/main.js'
import ProfileScreen from './pages/profile.js'
import SignInScreen from './pages/signin.js'
import CategoriasScreen from './pages/categorias.js'

import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

// outro caminho para o login
const AuthStack = createStackNavigator({
  Sign: { screen: SignInScreen },
});

//criar a navegação
const MainNavigation = createBottomTabNavigator({
  Main: {
    screen: MainScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Categorias: {
    screen: CategoriasScreen,
  }
},
  {
    initialRouteName: 'Profile',
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

// container 
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
