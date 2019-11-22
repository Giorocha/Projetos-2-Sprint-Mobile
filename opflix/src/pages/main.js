import React, { Component } from 'react'

import {
    Text,
    View,
    Picker,
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
            lancamentos: [],
            novaLista: [],
            categorias: [],
            idCategoriaNavigation: [],

            valorSelecionado: null
        }
    }

    componentDidMount() {
        this._trazerLancamentos();
        this._trazerCategorias();

    }

    alterarValor = (valor) => {
        this.setState({ valorSelecionado: valor })
        if (valor == 0) {
            this.setState({ novaLista: [] })
        }

        this.setState({ novaLista: this.state.lancamentos.filter(x => x.idCategoria == valor) })
    }

    _trazerCategorias = async () => {
        await fetch("http://192.168.4.233:5000/api/categorias", {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token'),
                'Content-Type': 'application/json',
            }
        })
            .then(x => x.json())
            .then(response => {
                this.setState({ categorias: response })
            })
            .catch(erro => console.log(erro))
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
                <View style={styles.sair}>
                    <Image style={styles.img}
                        style={{ width: 150, height: 50, marginLeft: 131, marginBottom: 20, marginTop: 20 }}
                        source={require('../assets/img/opflix.nome.png')}
                    />

                </View>
                <View>
                    <Text style={styles.la}>Lançamentos</Text>
                    <Picker style={styles.picker} selectedValue={this.state.valorSelecionado} onValueChange={this.alterarValor}>
                        <Picker.Item style={styles.picker1} label="Selecione um Gênero" value="0" />
                        {this.state.categorias.map(item => {
                            return (
                                <Picker.Item label={item.nome} value={item.idCategoria} />
                            )
                        })}
                    </Picker>
                    <View style={{ height: 1, backgroundColor: '#DB0909' }}></View>
                </View>
                <View>
                    <View>
                        {this.state.novaLista.length > 0 ? <FlatList
                            contentContainerStyle={styles.list}
                            data={this.state.novaLista}
                            keyExtractor={item => item.idLancamento}
                            renderItem={({ item }) => (
                                <View style={styles.tabela}>
                                    <Image
                                        style={{ width: 300, height: 400, marginLeft: 47, }}
                                        source={{ uri: item.imagem }}
                                    />
                                    <Text style={styles.titulo}>{item.titulo}</Text>
                                    <Text style={styles.sinopse}>{item.sinopse}</Text>
                                </View>
                            )}
                        /> :
                            <FlatList
                                contentContainerStyle={styles.list}
                                data={this.state.lancamentos}
                                keyExtractor={item => item.IdLancamento}
                                renderItem={({ item }) => (
                                    <View style={styles.tabela}>
                                        <Image
                                            style={{ width: 300, height: 400, marginLeft: 47, }}
                                            source={{ uri: item.imagem }}
                                        />
                                        <Text style={styles.titulo}>{item.titulo}</Text>
                                        <Text style={styles.sinopse}>{item.sinopse}</Text>
                                    </View>
                                )}
                            />}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        height: '70%'
    },
    ver: {
        backgroundColor: '#DB0909',
    },
    picker: {
        backgroundColor: '#fff',

    },
    tabBarNavigatorIcon: {
        width: 30,
        height: 30,
        tintColor: '#DB0909'
    },
    sair: {
        backgroundColor: '#000'
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
        marginTop: 20,
        color: '#000000',
        textAlign: "center",
        backgroundColor: '#f2f2f2',
        fontSize: 19,
    },
})