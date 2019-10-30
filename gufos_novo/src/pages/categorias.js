import React, {Component} from "react";

import {
    Text, 
    View,
    StyleSheet,
    Image,
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";

export default class Categorias extends Component{
    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../assets/img/list.png')}
            style={styles.tabBarNavigatorIcon}
          />
        ),
      };

      constructor () {
          super ();
          this.state = {
              categorias: []
          }
      }
      
      componentDidMount() {
        this._carregarCategorias();
    }

    _carregarCategorias = async () => {
       await fetch('http://192.168.7.85:5000/api/categorias')
        .then(response => response.json())
        .then(data => this.setState({categorias: data}))
        .catch(erro => console.warn(erro));
    }


    render (){
        return(
            <FlatList
            contentContainerStyle={styles.lista}
            data={this.state.categorias}
            keyExtractor={item => item.idCategoria}
            renderItem={({item})=> (
                <View style={styles.tabela}>       
                    {/* <Text style={styles.eventos}>EVENTOS</Text>             */}
                    <Text style={styles.titulo}>{item.nome}</Text> 
                </View>
             )}
            />               
        );
    }
    
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: {
        width: 25, 
        height: 25, 
        tintColor: 'white'
    },
    titulo: {
        color: 'white',
        textAlign: "center",
        backgroundColor: '#9900e6',
        fontSize: 17,
        padding: 5
    },
    tabela: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    }
})