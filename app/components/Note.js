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
