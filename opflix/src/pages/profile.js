import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';

import jwtDecode from 'jwt-decode'

export default class profile extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/user.png')}
                style={styles.tabBarNavigatorIcon}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            usuario: [],
            IdTipoUsuarioNavigation: [],
        }
    }

    componentDidMount() {
        this._recuperarUsuario();
    }


    _recuperarUsuario = async () => {
        let token = await AsyncStorage.getItem('@opflix:token');
        let decoded = jwtDecode(token);
        console.warn(decoded)
        if (decoded !== null) {
            this.setState({ usuario: decoded })
        } else {
            console.warn('tá nulo')
        }
    }
    
    _sairDaConta = () => {
        this.props.navigation.navigate('AuthStack')
    } 


    render() {
        return (
            <View style={styles.tudo}>
                <View style={styles.foi}>
                    <Image style={styles.imagi}
                        style={{ width: 150, height: 50, marginLeft: 131, marginBottom: 20, marginTop: 20 }}
                        source={require('../assets/img/opflix.nome.png')}
                    />
                </View>
                
                <View style={styles.info}>
                    <Image source={{ uri: this.state.usuario.Imagem }} style={styles.imagem} />
                    <Text style={styles.texto}> {this.state.usuario.nome}</Text>
                    <Text style={styles.texto}> {this.state.usuario.email}</Text>
                </View>

                <TouchableOpacity onPress={this._sairDaConta}>
                    <Text style={styles.sair}>Sair</Text>
                </TouchableOpacity>
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
    foi: {
        backgroundColor: '#000'
    },
    sair: {
        margin: 10,
        textAlign: "center",
        fontSize: 17,
        padding: 9,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "black",
    },
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: '#000',
        borderWidth: 1,
        marginHorizontal: 12,
        marginVertical: 10,
    },
    info: {
        marginVertical: '7.5%',
        alignSelf: 'center'
    },
    tudo: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
    },
    texto: {
        fontSize: 17,
        alignSelf: 'center',
        marginVertical: 5,
        color: '#000'
    }


})