// Toolbar.js
import React, {useEffect} from 'react';
import {Button, Animated, StyleSheet, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleBold, toggleItalic, toggleUnderline} from '../redux/textSlice';

const Toolbar = () => {
  const dispatch = useDispatch();
  const {
    formatting: {isBold, isItalic, isUnderline},
  } = useSelector(state => state.textEditor);

   const translateY = new Animated.Value(0);

   useEffect(() => {
     const keyboardDidShowListener = Keyboard.addListener(
       'keyboardDidShow',
       () => {
         Animated.spring(translateY, {
           toValue: -60,
           useNativeDriver: true,
         }).start();
       },
     );
     const keyboardDidHideListener = Keyboard.addListener(
       'keyboardDidHide',
       () => {
         Animated.spring(translateY, {
           toValue: 0,
           useNativeDriver: true,
         }).start();
       },
     );

     return () => {
       keyboardDidHideListener.remove();
       keyboardDidShowListener.remove();
     };
   }, []);


  return (
    <Animated.View style={[styles.toolbar, {transform: [{translateY}]}]}>
      <Button
        title="B"
        onPress={() => dispatch(toggleBold())}
        color={isBold ? 'red' : 'black'}
      />
      <Button
        title="I"
        onPress={() => dispatch(toggleItalic())}
        color={isItalic ? 'red' : 'black'}
      />
      <Button
        title="U"
        onPress={() => dispatch(toggleUnderline())}
        color={isUnderline ? 'red' : 'black'}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    bottom: 0,
    width: '100%',
  },
});

export default Toolbar;