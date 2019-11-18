import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';

export default class Cadastro extends Component {

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            imagem: null,
            idTipoUsuario: null
        }
    }

    _realizarCadastro = async () => {
        await fetch('http://192.168.4.233:5000/api/usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                imagem: this.state.imagem,
                idTipoUsuario: 2
            })
        })
            .then(this._irPraHome())
            .catch(erro => console.warn(erro))
    }


    _irPraHome = () => {
        try {
            this.props.navigation.navigate('MainNavigation');
        } catch (error) {
            <Tex>Estamos com algum problema. Por favor tente mais tarde.</Tex>
        }
    }

    _voltar = () => {
        this.props.navigation.navigate('AuthStack')
    }

    render() {
        return (
            <View>
                <View style={styles.tudo}>
                    <Image
                        style={{ width: 150, height: 50, marginLeft: 131, marginBottom: 35, marginTop: 35 }}
                        source={require('../assets/img/opflix.nome.png')}
                    />
                </View>
                <View style={styles.inputs}>
                <View>
                    <Text style={styles.cad}>Cadastrar</Text>
                </View>

                    <View style={styles.input}>
                        <TextInput
                            style={styles.nome}
                            placeholder='Nome'
                            onChangeText={nome => this.setState({ nome })}
                            value={this.state.nome}
                        />
                    </View>
                    <TextInput
                    style={styles.nome}
                        placeholder='Email'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                    style={styles.nome}
                        placeholder='Senha'
                        onChangeText={senha => this.setState({ senha })}
                        value={this.state.senha}
                    />
                    <TextInput
                    style={styles.nome}
                        placeholder="URL da imagem"
                        onChangeText={imagem => this.setState({ imagem })}
                        value={this.state.imagem}
                    />

                </View>
                <TouchableOpacity onPress={this._realizarCadastro}>
                    <Text style={styles.cadastro}>Cadastrar</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={this._voltar}>
                        <Text style={styles.voltar}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#000'
    },
    voltar: {
        fontSize: 15,
        marginLeft: 9.5,
    },
    cadastro: {
        margin: 10,
        textAlign: "center",
        fontSize: 15,
        padding: 9,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "black",
    },
    cad: {
        textAlign: "center",
        fontSize: 25,
        margin: 30,
    },
    nome: {
        fontSize: 15,
    },
    inputs: {
        marginTop: 45,
        alignItems: "center",
    },
})