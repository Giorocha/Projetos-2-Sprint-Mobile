import React, { Component } from 'react'

import {
    Text,
    View,
    Picker,
    StyleSheet,
    Image,
    Button,
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
        // trabalhar com outra lista

        this.setState({ novaLista: this.state.lancamentos.filter(x => x.idCategoria == valor) })
        console.warn(this.state.lancamentos.filter(x => x.idCategoria == valor))
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
                <View>
                    <Image
                        style={{ width: 100, height: 50, alignItems: "center" }}
                        source={require('../assets/img/opflix.nome.png')}
                    />
                    <Button
                        title="Sair"
                        onPress={() => this.props.navigation.navigate("AuthStack")}
                    />
                </View>
                    <View>
                        <Picker selectedValue={this.state.valorSelecionado} onValueChange={this.alterarValor}>
                            <Picker.Item label="Selecione um Gênero" value="0" />
                            {this.state.categorias.map(item => {
                                return (
                                    <Picker.Item label={item.nome} value={item.idCategoria} />
                                )
                            })}
                        </Picker>
                        <Text style={styles.text}>{this.state.valorSelecionado}</Text>
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
    tudo:{height:'98%'},
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