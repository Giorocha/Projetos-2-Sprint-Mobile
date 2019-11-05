import React, {Component} from "react";

import {
    Text, 
    View,
    StyleSheet,
    Image,
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";

export default class Temas extends Component{
    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../assets/img/theme.png')}
            style={styles.tabBarNavigatorIcon}
          />
        ),
      };

      constructor () {
          super ();
          this.state = {
              temas: [],
          }
      }
      
      componentDidMount() {
        this._carregarTemas();
    }

    _carregarTemas = async () => {
       await fetch('http://192.168.4.233:5000/api/temas')
        .then(response => response.json())
        .then(data => this.setState({temas: data}))
        .catch(erro => console.warn(erro));
    }

    render (){
        return(
            <View>
                <View >
                    <Text style={styles.la}>Temas</Text>
                </View>
                <FlatList
                contentContainerStyle={styles.lista}
                data={this.state.temas}
                keyExtractor={item => item.IdTema}
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