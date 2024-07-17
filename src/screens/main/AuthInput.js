import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const AuthInput = (props) => {
  const { secureTextEntry, value, onChangeText } = props

  return (
    <View style={{ justifyContent: 'center' }}>
      {secureTextEntry
        ? (<TextInput
          secureTextEntry={true}
          style={styles.inputBox}
          placeholder={props.placeholder}
          placeholderTextColor="gray"
          value={value}
          onChangeText={(text) => onChangeText(text)}
        ></TextInput>)
        : (<TextInput
          style={styles.inputBox}
          placeholder={props.placeholder}
          placeholderTextColor="gray"
          value={value}
          onChangeText={(text) => onChangeText(text)}
        ></TextInput>)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox:{
    height: 55,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:20,
    borderWidth:1,
    borderColor:'black',
    borderRadius:16,
    marginHorizontal:'8%',
    marginTop:'5%',
    fontFamily: 'ZenOldMincho-Regular'
  }
})

