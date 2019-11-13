import React, { Component } from 'react'

import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    AsyncStorage
} from 'react-native';

export default class Generos extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/backend.png')}
                style={styles.tabBarNavigatorIcon}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            generos: [],
        }
    }

    componentDidMount() {
        this._trazerGeneros();
    }

    _trazerGeneros = async () => {
        await fetch('http://192.168.4.233:5000/api/categorias', {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ generos: data }))
            .catch(erro => console.warn(erro));
    }

    render() {
        return (
            <View>
                <View style={styles.imga}>
                    <Image
                        style={{ width: 150, height: 50, marginLeft: 131 , marginBottom: 20, marginTop: 20 }}
                        source={require('../assets/img/opflix.nome.png')}
                    />
                </View>
                <View >
                    <Text style={styles.la1}>Generos</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.lista}
                    data={this.state.generos}
                    keyExtractor={item => item.IdCategoria}
                    renderItem={({ item }) => (
                        <View style={styles.tabela}>
                            <Text style={styles.titulo}>{item.nome}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: {
        width: 30,
        height: 30,
        tintColor: '#DB0909'
    },
    imga:{
        backgroundColor: '#000'
    },
    la1: {
        padding: 5,
        textAlign: "center",
        fontSize: 21,
        color: 'white',
        backgroundColor: '#DB0909'
    },
    tabela: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    titulo: {
        color: '#000000',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
        fontSize: 17,
    },
})