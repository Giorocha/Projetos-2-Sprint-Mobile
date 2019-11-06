import React, {Component} from 'react'

import {
    Text, 
    View,
    StyleSheet,
    Image,
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";

export default class Generos extends Component{
    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../assets/img/backend.png')}
            style={styles.tabBarNavigatorIcon}
          />
        ),
      };

      constructor () {
          super ();
          this.state = {
              generos: [],
          }
      }
      
      componentDidMount() {
        this._trazerGeneros();
    }

    _trazerGeneros = async () => {
       await fetch('http://192.168.4.233:5000/api/categorias', {
        headers: {
            'Authorization' : 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        }
       })
        .then(response => response.json())
        .then(data => this.setState({generos: data}))
        .catch(erro => console.warn(erro));
    }

    render (){
        return(
            <View>
                <View >
                    <Text style={styles.la}>Generos</Text>
                </View>
                <FlatList
                contentContainerStyle={styles.lista}
                data={this.state.generos}
                keyExtractor={item => item.IdCategoria}
                renderItem={({item})=> (
                    <View style={styles.tabela}>       
                        <Text style={styles.titulo}>{item.nome}</Text> 
                    </View>
                )}
                />               
             </View>
        );
    } 
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: {
        width: 25, 
        height: 25, 
        tintColor: 'white'
    },
    la: {
        marginBottom: 25,
        marginTop: 25,
        textAlign: "center",
        fontSize: 21,
    },  
    titulo: {
        color: 'black',
        textAlign: "center",
        backgroundColor: '#b3e6ff',
        fontSize: 17,
        padding: 5
    },
    tabela: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    }
})