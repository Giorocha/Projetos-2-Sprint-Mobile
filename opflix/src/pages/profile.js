import React, { Component } from 'react';

import { View, Image, Text, StyleSheet, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


export default class profile extends Component {
    
    constructor() {
        super();
        this.state = {
            user: []
        }
    }
    
    componentDidMount() {
        this._recuperarUsuario();
    }
    
    
    _recuperarUsuario = async () => {
        let jwtDecode = require('jwt-decode')
        let token = await AsyncStorage.getItem('@opflix:token');
        let decoded = jwtDecode(token);
        console.warn(decoded)
        if (decoded !== null) {
            this.setState({ user: decoded })
        } else {
            console.warn('tá nulo')
        }
    }
    
    
    render() {
        return (
            <View style={styles.tudo}>

                <View style={styles.info}>
    
                     <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.user}
                    keyExtractor={item => item.IdUsuario}
                    renderItem={({ item }) => (
                        <View style={styles.tabela}>
                            <Image
                                style={{ width: 144, height: 240, marginLeft: 122, }}
                                source={{ uri: item.imagem }}
                                />
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                    )}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({


})