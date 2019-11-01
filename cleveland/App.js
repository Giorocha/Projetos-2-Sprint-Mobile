
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";

class App extends Component {
  constructor() {
    super();
    this.state = {
      medicos: []
    }
  }

  componentDidMount() {
    this._trazerMedicos();
  }

  _trazerMedicos = async () => {
    await fetch('http://192.168.4.221:5000/api/medicos')
      .then(response => response.json())
      // .then(data => console.warn('data'))
      .then(data => this.setState({ medicos: data }))
      .catch(erro => console.warn(erro));
  }

  render() {
    return (
      <View>
        <Text style={styles.titulo}>Medicos</Text>
        <FlatList
          contentContainerStyle={styles.list}a
          data={this.state.medicos}
          keyExtractor={item => item.idMedico}
          renderItem={({ item }) => (
            <View style={styles.tabela}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.especialidade}>{item.especialidade}</Text>
            </View>
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  titulo: {
    color: "#80bfff",
    textAlign: 'center',
    fontSize: 30
  },
  tabela: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nome: {
    backgroundColor: "#80bfff",
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  especialidade: {
    color: "black",
    textAlign: "center",
    fontSize: 19,
  }

});

export default App;