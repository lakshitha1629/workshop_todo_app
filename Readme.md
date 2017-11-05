## Tutorials
Good Youtube Chanels 
YOUTUBE
https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw

FACEBOOK Code
https://facebook.github.io/react-native/

CrowdSolution -> https://github.com/CrowderiaSolution/react-native-expo-boilerplate

## ADD GITHUB
```
git remote add origin <ADD YOUR REMOTE URL>

git remote set-url origin https://github.com/octocat/Spoon-Knife.git

```

## set npm cache
npm config set proxy http://cache.uwu.ac.lk:3128


## Download VSCode

## VsCode Setups and install extentions

1. ESLint Setups 
  `npm i --save-dev eslint-config-equimper`
  then create .eslint
  add ```{
    "extends": "equimper"
  }```
2. Download VSCode Extentions
    EditorConfigGenarator
    then go to CMD+SHIFT+P
3. EQuimper React-native/React/Redux/snipets for es6/es7 version Standard 

```
"eslint.autoFixOnSave": true,
```

## imports

import react, react native

## Create Compinent
eddcs

## create header

1. add container 

```
<View style={styles.container}>
    
</View>
```

2. add header view

```
<View style={styles.container}>
    <View style={styles.header}>
    </View>
</View>
```

4. add header title text
```
<View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.headerText}>
    - NOTER -
    </Text>
    </View>
</View>
``` 

 5. View styleing

```
container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'green',
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
```

## add Task area (ScrollView)

```
<ScrollView style={styles.scrollContainer}>
    {notes}
</ScrollView>
```

ScrollView Style

```
scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
```

## create Fotter
```
<View style={styles.footer}>
    
</View>
```

Footer Style
```
footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
```

## Add AddButton
```
<TouchableOpacity onPress={() => this.addNote()} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
```

add button style

```
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
```

## Create Input Field
```
<TextInput
        style={styles.textInput}
        placeholder='> note'
        onChangeText={(noteText) => this.setState({ noteText })}
        value={this.state.noteText}
        placeholderTextColor='white'
        underlineColorAndroid='transparent'
    />
```

InputField Style

```
 textInput: {
    alignSelf: 'stretch',
    color: Color.white,
    padding: 20,
    paddingTop: 46,
    backgroundColor: Color.textFieldBackgroundColor,
    borderTopWidth: 2,
    borderTopColor: Color.borderTopColor,
  },
```

## add state

```
state = {
    noteArray: [{ note: 'test one 2', date: '2017/11/4' }],
    noteText: '',
  }

```


# Create Note Component
Create new js file under src/components/Note.js


# Note List

```
const notes = this.state.noteArray.map((val, key) => 
      (<Note 
        key={key} 
        keyval={key} 
        val={val} 
        deleteMethod={() => this.deleteNote(val, key)}
      />)
    );
```

## Note Component

```
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const Note = () => (
  <View style={styles.note}>
    <Text style={styles.noteText}>Text Value</Text>
  </View>
);

const styles = {
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
  },
}
```

## Complete new Note

```
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Note = ({
  val, 
  deleteMethod, 
}) => (
  <View style={styles.note}>
    <Text style={styles.noteText}>{val.date}</Text>
    <Text style={styles.noteText}>{val.note}</Text>
    <TouchableOpacity
      onPress={deleteMethod}
      style={styles.noteDelete}
    >
      <Text style={styles.noteDeleteText}>D</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  noteDeleteText: {
    color: 'white',
  },
});

export default Note;

```

## Complete App.js code

```
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

```

1. How promise works in Javascript?

The Promise constructor takes a function (an executor) that will be executed immediately and passes in two functions: resolve , which must be called when the Promise is resolved (passing a result), and reject , when it is rejected (passing an error)

```
var request = require('request');

function getRandomPonyFooArticle () {
  return new Promise((resolve, reject) => {
    request('https://ponyfoo.com/articles/random', (err, res, body) => {
      if (err) {
        reject(err); return;
      }
      resolve(body);
    });
  });
}
```

2. Using async / await
Note that await may only be used in functions marked with the async keyword. It works similarly to generators, suspending execution in your context until the promise settles. If the awaited expression isn’t a promise, its casted into a promise.

```
read();

async function read () {
  var html = await getRandomPonyFooArticle();
  var md = hget(html, {
    markdown: true,
    root: 'main',
    ignore: '.at-subscribe,.mm-comments,.de-sidebar'
  });
  var txt = marked(md, {
    renderer: new Term()
  });
  console.log(txt);
}
```

# Ref
```
CrowdSolution -> https://github.com/CrowderiaSolution/react-native-expo-boilerplate
NodeJS -> https://nodejs.org/en/
Eslint     -> https://eslint.org/
Babel    -> https://babeljs.io/
Expo     -> https://expo.io/
Android Studio -> https://developer.android.com/studio/index.html
Xcode -> https://developer.apple.com/xcode/
Promises -> https://ponyfoo.com/articles/understanding-javascript-async-await
React Native -> https://facebook.github.io/react-native/
Firebase -> https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html
What is react -> https://wetalkit.xyz/react-native-what-it-is-and-how-it-works-e2182d008f5e

```