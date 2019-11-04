import React, {Component} from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'

export default class SignIn extends Component{

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
        await fetch('http://192.168.4.233:5000/api/usuarios', {
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
                await AsyncStorage.setItem('@roman:token', tokenAReceber);
                this.props.navigation.navigate("MainNavigation");
            } catch (error) {
                console.warn(error)
            }
        }
    }

    render(){
        return (
            <View>
                <TextInput
                placeholder="email"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                />
                <TextInput
                placeholder="senha"
                onChangeText={senha => this.setState({senha})}
                value={this.state.senha}
                />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Logar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}