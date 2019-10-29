import MainScreen from './pages/main.js'
import ProfileScreen from './pages/profile.js'

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

//criar a navegação
const MainNavigation = createBottomTabNavigator({
    Main: {
        screen: MainScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
},
{
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 19,
          paddingBottom: 10,
        },
        style: {
          backgroundColor:'#99c2ff',
  
        },
      }
}
);

// container 
export default createAppContainer(MainNavigation)
