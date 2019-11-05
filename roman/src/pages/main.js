import React, { Component } from "react";


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
                source={require('../assets/img/projeto.png')}
                style={styles.tabBarNavigatorIcon}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            projetos: [] //api
        }
    }

    componentDidMount() {
        this._carregarProjetos();
    }

    _carregarProjetos = async () => {
        let token = await AsyncStorage.getItem('@roman:token');
        await fetch('http://192.168.4.233:5000/api/projetos', {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ projetos: data }))
            .catch(erro => console.warn(erro));
    }


    render() {
        return (
            <View>
                <View>
                    <Text style={styles.projeto}>Projetos</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.projetos}
                    keyExtractor={item => item.idProjeto}
                    renderItem={({ item }) => (
                        <View style={styles.table}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.tema}>{item.idTemaNavigation.nome}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    tabBarNavigatorIcon: {
        width: 25,
        height: 25,
        tintColor: 'white'
    },
    projeto: {
        textAlign: "center",
        fontSize: 21,
    },
    table: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    nome: {
        color: 'black',
        textAlign: "center",
        backgroundColor: '#b3e6ff',
        fontSize: 17,
        padding: 5
    },
    tema: {
        backgroundColor: '#00004d',
        color: "white",
        textAlign: "center",
        fontSize: 15,
    }
    // eventos: {
    //     textAlign: "center",
    //     paddingBottom: 10,
    //     fontSize: 30,
    // }
})

