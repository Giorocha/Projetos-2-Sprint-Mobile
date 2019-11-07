import React, { Component } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Image,
} from 'react-native'

export default class SignIn extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            email: "erik@email.com",
            senha: "123456"
        };
    }

    _realizarLogin = async () => {
        await fetch('http://192.168.4.233:5000/api/usuarios/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            }),
        })
            .then(resposta => resposta.json())
            .then(data => this._irParaHome(data.token))
            .catch(erro => console.warn(erro));
    }

    _irParaHome = async tokenAReceber => {
        if (tokenAReceber != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', tokenAReceber);
                this.props.navigation.navigate("MainNavigation");
            } catch (error) {
                console.warn(error)
            }
        }
    }

    render() {
        return (
            <View style={styles.tudo}>
                <Image
                    style={{ width: 100, height: 50, alignItems: "center"}}
                    source={require('../assets/img/opflix.nome.png')}
                />
                <View>
                    <Text style={styles.login}>Login</Text>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.input1}>
                        <TextInput
                            style={styles.nome}
                            placeholder="email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>
                    <View style={styles.input2}>
                        <TextInput
                            style={styles.senha}
                            placeholder="senha"
                            onChangeText={senha => this.setState({ senha })}
                            value={this.state.senha}
                        />
                    </View>
                </View>
                <View style={styles.botao}>
                    <TouchableOpacity onPress={this._realizarLogin}>
                        <Text style={styles.logar}>Efetuar Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: '#00004d',
        textAlign: "center",
    },
    login: {
        textAlign: "center",
        fontSize: 20,
        margin: 30,
    },
    inputs: {
        alignItems: "center",
    },
    input1: {
        margin: 10,
        width: 200,
    },
    input2: {
        margin: 10,
        width: 200,
    },
    logar: {
        margin: 10,
        textAlign: "center",
        fontSize: 15,
        padding: 9,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "black",
    },
    botao: {
        alignItems: "center",
    },
    nome: {
        fontSize: 17,
        backgroundColor: '#f2f2f2',

    },
    senha: {
        fontSize: 17,
        backgroundColor: '#f2f2f2',
    }
})
