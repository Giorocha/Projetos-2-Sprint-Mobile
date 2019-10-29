import React, {Component} from "react";


import {
    Text, 
    View,
    StyleSheet,
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";



export default class Main extends Component{
    constructor(){
        super();
        this.state = {
            eventos: [] //api
        }
    }

    componentDidMount() {
        this._carregarEvetos();
    }

    _carregarEvetos = async () => {
        // axios, fetch, xhr (XmlHttpRequest)
       await fetch('http://192.168.7.85:5000/api/eventos')
        .then(response => response.json())
        .then(data => this.setState({eventos: data}))
        .catch(erro => console.warn(erro));
    }


    render (){
        return(
            <FlatList
                contentContainerStyle={styles.list}
                data={this.state.eventos}
                keyExtractor={item => item.idEvento}
                //renderizar o item que ele quer
                renderItem={({item})=> (
                    <View style={styles.table}>                    
                        <Text style={styles.titulo}>{item.titulo}</Text>
                        <Text style={styles.data}>{item.dataEvento}</Text>                
                    </View>
                        )}
             />

        );
    }
};

const styles = StyleSheet.create({
    table: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    titulo: {
        color: 'white',
        textAlign: "center",
        backgroundColor: '#99c2ff',
        fontSize: 17,
        padding: 5
    },
    data: {
        backgroundColor: 'black',
        color: "white",
        textAlign: "center",
        fontSize: 15,
    }

})

