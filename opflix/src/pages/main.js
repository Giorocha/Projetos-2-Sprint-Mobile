import React, { Component } from 'react'

import {
    Text,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
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
        await fetch('http://192.168.4.233:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn(erro));
    }
    render() {
        return (
            <View style={styles.tudo}>
                <View>
                    <Image
                        style={{ width: 80, height: 30, alignItems: "center" }}
                        source={require('../assets/img/opflix.nome.png')}
                    />
                    {/* <Button
                        title="Sair"
                        onPress={() => this.props.navigation.navigate('signin')}
                    /> */}
                </View>
                    <Text style={styles.la}>Lançamentos</Text>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.lancamentos}
                    keyExtractor={item => item.IdLancamento}
                    renderItem={({ item }) => (
                        <View style={styles.tabela}>
                            <Image
                                style={{ width: 144, height: 240, marginLeft: 122, }}
                                source={{ uri: item.imagem }}
                            />
                            <Text style={styles.titulo}>{item.titulo}</Text>
                            <Text style={styles.sinopse}>{item.sinopse}</Text>
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
    sinopse: {
        textAlign: "center",

    },
    data: {
        color: 'white',
        backgroundColor: 'black',
        textAlign: "center",
        fontSize: 15,
    },
    la: {
        color: 'black',
        marginTop: 10,
        textAlign: "center",
        fontSize: 21,
    },
    tabela: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    titulo: {
        marginTop: 20,
        color: '#000000',
        textAlign: "center",
        backgroundColor: '#f2f2f2',
        fontSize: 19,
    },
})