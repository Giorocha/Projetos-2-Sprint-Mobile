import React, {Component} from 'react'

import {
    Text,
    View,
    StyleSheet,
    Image,
    AsyncStorage
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";


export default class Main extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/film.png')}
                style={styles.tabBarNavigatorIcon}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            lancamentos: []
        }
    }

    componentDidMount() {
        this._trazerLancamentos();
    }

    _trazerLancamentos = async () => {
        // let token = await AsyncStorage.getItem('@opflix:token');
        await fetch ('http://192.168.4.233:5000/api/lancamentos', {
            headers: {
                'Authorization' : 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
            }
        }) 
        .then(response => response.json())
        .then(data => this.setState({ lancamentos: data}))
        .catch(erro => console.warn(erro));
    }

    render() {
        return (
            <View style={styles.tudo}>
                <View>
                    <Text style={styles.la}>Lançamentos</Text>
                </View>
                <FlatList
                contentContainerStyle={styles.list}
                data={this.state.lancamentos}
                keyExtractor={item => item.IdLancamento}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.titulo}>{item.titulo}</Text>
                    </View>
                )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: {
        width: 25,
        height: 25,
        tintColor: 'white'
    },
    la: {
        marginBottom: 25,
        marginTop: 25,
        textAlign: "center",
        fontSize: 21,
    },  
    titulo: {
        color: '#000000',
        textAlign: "center",
        backgroundColor: '#ffffff',
        fontSize: 17,
        padding: 5
    },
})