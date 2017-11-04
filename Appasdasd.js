import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Alert, 
  KeyboardAvoidingView,
  AsyncStorage, 
  Keyboard,
} from 'react-native';

import Color from './app/Colors';
import Note from './app/components/Note';

export default class App extends Component {
    state = {
      noteArray: [{ note: 'test one 3', date: '2017/11/4' }],
      noteText: '',
    }

    addNote() {
      if (this.state.noteText) {
        const d = new Date();
        this.state.noteArray.push({ date: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`, note: this.state.noteText });
        this.setState({ noteArray: this.state.noteArray });
        this.setState({ noteText: '' });
      }
    }
  
    render() {
      const notes = this.state.noteArray.map((val, key) => 
        (<Note 
          key={key} 
          keyval={key} 
          val={val} 
          deleteMethod={() => this.deleteNote(val, key)}
        />)
      );

      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
            - NOTER -
              </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              {notes}
            </ScrollView>
            <View style={styles.footer} >
              <TouchableOpacity onPress={() => {}} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder='> note'
                onChangeText={(noteText) => this.setState({ noteText })}
                value={this.state.noteText}
                placeholderTextColor='white'
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Color.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    padding: 26,
    fontSize: 18,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: Color.themeColor,
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginBottom: -45,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  textInput: {
    alignSelf: 'stretch',
    color: Color.white,
    padding: 20,
    paddingTop: 46,
    backgroundColor: Color.textFieldBackgroundColor,
    borderTopWidth: 2,
    borderTopColor: Color.borderTopColor,
  },
});

