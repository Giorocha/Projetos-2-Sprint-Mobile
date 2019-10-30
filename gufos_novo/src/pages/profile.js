import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    AsyncStorage,
    Image,
} from 'react-native';

export default class Profile extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../assets/img/profile.png')}
            style={styles.tabBarNavigatorIcon}
          />
        ),
      };

    constructor() {
        super();
        this.state = {
            token: null
        }
    }

    componentDidMount() {
        this._buscarDadosDoSTorage();
    }

    _buscarDadosDoSTorage = async () => {
        try {
            const tokenDoStorage = await AsyncStorage.getItem('@gufos:token');
            if (tokenDoStorage != null) {
                this.setState({ tokenLocal : tokenDoStorage })
            }
        } catch (error) {
            
        }
    }

    render() {
        return (
            <Text>{this.state.tokenLocal}</Text>
        );
    }
}

const styles = StyleSheet.create({

    profile: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },

    titulo: {
        color: 'white',
        textAlign: "center",
        backgroundColor: '#99c2ff',
        fontSize: 17,
        padding: 5
    },

    info: {
        backgroundColor: 'black',
        color: "white",
        textAlign: "center",
        fontSize: 15,
    },

    perfil: {
        textAlign: "center",
        paddingBottom: 10,
        fontSize: 30,
        

    },
    tabBarNavigatorIcon: {
        width: 25, 
        height: 25, 
        tintColor: 'white'
    }
})