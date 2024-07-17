import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { changePassword } from '../../firebase/AuthModel';

const TurquoiseHeader = ({ navigation }) => {
  return (
    <View style={ styles.turquoiseHeaderContainer }>
      <Image source={require('../../assets/ovalBar.png')} style = { styles.ovalBar } />

      <TouchableOpacity style={ styles.arrowLeft } onPress={() => { navigation.goBack(); }}>
        <IconAntDesign name="arrowleft" size={30} color="#ffffff" />
      </TouchableOpacity>

      <Text style={ styles.headerText }>Your Profile</Text>
    </View>
  );
};

export const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const success = () => {
    console.log('Password changed successfully');
    Alert.alert('Password changed successfully');
    navigation.goBack(); 
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const handleChangePassword = () => {
    if (!email || !oldPassword || !newPassword) {
      Alert.alert('Please provide email, current, and new passwords.');
      return;
    }
    changePassword(email, oldPassword, newPassword, success, unsuccess);
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TurquoiseHeader
        navigation={navigation}
      />
      {/* Profile Button */}
      <View style={styles.buttonExclusive}>
        <Image source={require('../../assets/circle_light.png')} style={{ width: 34, height: 34,marginRight:"6.9%" }}/>
        <Image source={require('../../assets/lock.png')} style={{ width: 9.69, height: 9.69,position:'absolute',marginTop:'6.69%',marginLeft:'6.69%' }}/>
        <TouchableOpacity>
          <Text style={styles.buttonExclusiveText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Email *"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Old Password *"
          secureTextEntry = {true}
          value={oldPassword}
          onChangeText={(text) => setoldPassword(text)}
        />

        <TextInput
          style={styles.inputBoxExclusive}
          placeholder="New Password *"
          secureTextEntry = {true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />

        <TouchableOpacity style={styles.forgetButton} onPress={handleForgetPassword}>
          <Text style={styles.forgetButtonText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  inputContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 0,
    marginTop:'3%'
  },
  inputBox: {
    height: 55,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: '8%',
    fontFamily:'ZenOldMincho-Regular'
  },
  inputBoxExclusive: {
    height: 55,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: '8%',
    fontFamily:'ZenOldMincho-Regular'
  },
  button: {
    height: 50,
    backgroundColor: '#0ABAB5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
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
  forgetButton: {
    alignSelf: 'flex-end',
    marginBottom: 25,
    marginRight: '9%',
  },
  forgetButtonText: {
    color: 'gray',
    fontFamily:'ZenOldMincho-Regular'
  },
  buttonExclusive: {
    flexDirection: 'row',
    height:60,
    marginTop:'5%',
    marginHorizontal: '14%',
    paddingLeft:15,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.75,
    elevation: 3,
  },
  buttonExclusiveText: {
    fontSize: 14,
    fontFamily: 'ZenOldMincho-Bold',
    paddingTop:'2%'
  },
});
