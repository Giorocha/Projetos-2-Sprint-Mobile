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
            email: "",
            senha: ""
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

    _irCadastro = () => {
        this.props.navigation.navigate('CadastroScreen')
    }

    render() {
        return (

            <View style={styles.tudo}>
                <View style={styles.oi}>
                    <Image
                        style={{ width: 150, height: 50, marginLeft: 131, marginBottom: 35, marginTop: 35 }}
                        source={require('../assets/img/opflix.nome.png')}
                    />
                </View>

                <View>
                    <Text style={styles.login}>Login</Text>
                </View>

                <View style={styles.inputs}>

                    <TextInput
                        style={styles.nome}
                        placeholder="email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />

                    <TextInput
                        style={styles.nome}
                        placeholder="senha"
                        onChangeText={senha => this.setState({ senha })}
                        value={this.state.senha}
                    />
                </View>
                
                    <TouchableOpacity onPress={this._realizarLogin}>
                        <Text style={styles.logar}>Efetuar Login</Text>
                    </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={this._irCadastro}>
                        <Text style={styles.cadastro}>Cadastrar-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    cadastro: {
        fontSize: 15,
        marginLeft: 9.5,
    },
    oi: {
        backgroundColor: '#000'
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
    login: {
        textAlign: "center",
        fontSize: 20,
        margin: 30,
    },
    nome: {
        fontSize: 15,
    },
    inputs: {
        alignItems: "center",
    },
})
