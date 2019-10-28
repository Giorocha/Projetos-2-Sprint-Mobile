/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component  {

  constructor(valor) {
    super(valor);
    this.state = {
      text: ''
    }
  }

  render(){

    return (
      <Fragment>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}> Hello Word</Text>
              </View>
              <View>
                <TextInput 
                placeholder="Digita aqui" 
                style={styles.input}
                onChangeText={(text) =>
                this.setState({text})}
                value={this.state.text}
                ></TextInput>
                <Button color= '#b3d9ff' style={styles.button}
                onPress={() => {
                  alert(this.state.text);
                }}
                title="Clica aqui vai"
               />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  texto: {
    fontSize: 25,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#b3d9ff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: '600',
    color: 'yellow',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  input: {
    backgroundColor: 'white',
  }
});


