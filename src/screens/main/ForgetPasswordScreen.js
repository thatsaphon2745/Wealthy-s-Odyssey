import React,{useState} from 'react';
import {View, Text, Alert,TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput } from './AuthInput';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { forgetPassword } from '../../firebase/AuthModel';

const TurquoiseHeader = ({ navigation }) => {
  return (
    <View style={ styles.turquoiseHeaderContainer }>
      <Image source={require('../../assets/ovalBar.png')} style = { styles.ovalBar }  />

      <TouchableOpacity style={ styles.arrowLeft } onPress={() => { navigation.goBack(); }}>
        <IconAntDesign name="arrowleft" size={30} color="#ffffff" />
      </TouchableOpacity>
      
      <Text style={ styles.headerText }>Forget Password</Text>
    </View>
  );
};

export const ForgetPasswordScreen = ({navigation}) => {
  const [email,setEmail] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')

  const success = (msg) => {
    Alert.alert(msg)
    navigation.goBack(); 
  }

  const unsuccess = (msg) => {
    console.log(msg)
  }

  function onSendPress() {
    let validateEmail = true;
    let validatePhoneNumber = true;
    if(email == ''){
      validateEmail = false;
      Alert.alert('กรุณากรอก email');
      return;
    }
    if(phoneNumber == ''){
      validatePhoneNumber = false;
      Alert.alert('กรุณากรอก phone number');
      return;
    }
    if(validateEmail && validatePhoneNumber){
      forgetPassword(email, phoneNumber, success, unsuccess)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TurquoiseHeader 
      navigation={navigation} 
      />
        <View style={{ flex: 1, marginTop:'22%' }}>
          <Text style={{ fontFamily: 'ZenOldMincho-Bold', color: '#666666', fontSize: 14, marginLeft: 35 }}>
            Enter the email address associated with{'\n'}
            your account and we'll send you a link to{'\n'}
            reset your password.
          </Text>

          <AuthInput placeholder='Email *' secureTextEntry={false} value={email} onChangeText={(text) => setEmail(text)} />
          <AuthInput placeholder='Phone number *' secureTextEntry={true} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
          
          <TouchableOpacity style={ styles.button }
            onPress={onSendPress}
          >

            <Text style={ styles.buttonText }>SUBMIT</Text>
          </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  turquoiseHeaderContainer:{
    height: 80, 
    backgroundColor: '#0ABAB5', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  arrowLeft:{
    position: 'absolute', 
    left: 15, 
    top:'40%'
  },
  headerText: {
    fontFamily: 'ZenOldMincho-Regular', 
    fontSize: 32, 
    color: '#FFFFFF',
    bottom:'200%'
  },
  ovalBar: {
    bottom: '50%'
  },
  button: {
    marginTop:'5%',
    height: 50, 
    borderRadius: 16, 
    backgroundColor: '#0ABAB5', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: '14%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.75,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'ZenOldMincho-Bold', 
    color: '#fffffa', 
    fontSize: 16
  },
});