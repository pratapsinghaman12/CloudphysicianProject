// Editor.js
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  Text,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateContent, submitText} from '../redux/textSlice';
import Toolbar from './Toolbar';

const Editor = () => {
  const dispatch = useDispatch();
  const {
    editorContent,
    formatting: {isBold, isItalic, isUnderline},
    submittedText,
    submittedStyle,
  } = useSelector(state => state.textEditor);

 
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch(updateContent(editorContent));
    }, 5000);

    return () => clearTimeout(debounceTimeout);
  }, [editorContent, dispatch]);

  const handleSubmit = () => {
    dispatch(submitText());
    Keyboard.dismiss();
  };

  const computedStyle = {
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecorationLine: isUnderline ? 'underline' : 'none',
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Submit" onPress={handleSubmit} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <TextInput
          style={[styles.input, computedStyle]}
          multiline
          placeholder="Type here..."
          value={editorContent}
          onChangeText={text => dispatch(updateContent(text))}
        />
        <Toolbar />
      </KeyboardAvoidingView>
      {submittedText ? (
        <View style={styles.submittedContainer}>
          <Text style={submittedStyle}>{submittedText}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    fontSize: 16,
  },
  submittedContainer: {
    padding: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginTop: 10,
  },
});

export default Editor;