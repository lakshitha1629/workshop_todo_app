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

import Note from './app/components/Note';
import Color from './app/Colors';

export default class App extends Component {
  state = {
    noteArray: [{ note: 'test one 2', date: '2017/11/4' }],
    noteText: '',
  }

  componentDidMount() { 
    this._updateList(); 
  }

  async _addTask() { 
    await AsyncStorage.setItem('listOfTasks', 
      JSON.stringify(this.state.noteArray)); 

    this._updateList(); 
  } 

  async _updateList() { 
    const response = await AsyncStorage.getItem('listOfTasks'); 
    const listOfTasks = await JSON.parse(response) || []; 
  
    this.setState({ 
      noteArray: listOfTasks, 
    }); 

    console.log(listOfTasks);
  } 

  addNote() {
    if (this.state.noteText) {
      const d = new Date();
      this.state.noteArray.push({ date: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`, note: this.state.noteText });
      this._addTask();
      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: '' });
      Keyboard.dismiss();
    }
  }

  deleteNote(val, key) {
    Alert.alert(
      'Are You Sure?',
      `This will delete ${val.note}`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK',
          onPress: () => {
            this.state.noteArray.splice(key, 1);
            this._addTask();
            this.setState({ noteArray: this.state.noteArray });
          } },
      ],
      { cancelable: false }
    );
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
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.addNote()} style={styles.addButton}>
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
