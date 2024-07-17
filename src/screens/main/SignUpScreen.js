import React from "react";
import { View, Text, Image, TouchableOpacity, Alert} from "react-native";
import { TextInput} from "react-native-paper";
import { SafeAreaView} from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from "react";
import { signUpEmailPass } from "../../firebase/AuthModel";
import { useDispatch } from "react-redux";
import { clearProfile, addProfile } from "../../redux/authSlice";

export const SignUpScreen = ({ navigation })=>{
    const [profile, setProfile] = useState({'email':'','password':'','cfPassword':'','phoneNumber':''})
    const [eventTextInput, setEventTextInput] = useState(0);
    const dispatch = useDispatch()

    const setEmail = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          email:text
        }))
    }

    const setPassword = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          password:text
        }))
    }

    const setCFPassword = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          cfPassword:text
        }))
    }

    const setPhoneNumber = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          phoneNumber:text
        }))
    }

    const success = async(user) => {
        const { uid, email } = user;
        const userData = {
            uid,
            email
        };
        dispatch(clearProfile());
        dispatch(addProfile(userData));
        Alert.alert(`${email} has been added to system`)
        navigation.navigate('BottomTabNav')
    }

    const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
    }

    const handleSignUp = async() => {
        setEventTextInput(1)
    
        let isEmailValid = true;
        let isPasswordValid = true;
        let isCFPasswordValid = true;
        let isPhoneNumberValid = true;
        
        while (true) {
            if (!profile.email) {
                isEmailValid = false;
                Alert.alert('Please provide your email information');
                break;
            }
          
            if (!profile.password) {
                isPasswordValid = false;
                Alert.alert('Please provide your password information');
                break;
            } else {
                if (!profile.cfPassword) {
                    isPasswordValid = false;
                    Alert.alert('Please provide your confirm password information');
                    break;
                } else {
                    if (profile.password !== profile.cfPassword) {
                        isCFPasswordValid = false;
                        Alert.alert('Passwords do not match');
                        break;
                    }
                }
            }
    
            if (!profile.phoneNumber) {
                isPhoneNumberValid = false;
                Alert.alert('Please provide your phone number information');
                break;
            }
    
            break;
        }
    
        if (isEmailValid && isPasswordValid && isCFPasswordValid && isPhoneNumberValid) {
            console.log('success');
            signUpEmailPass(profile, success, unsuccess);
          } else {
            console.log('Signed up unsuccessful!!');
            console.log(`isEmailValid: ${isEmailValid}`);
            console.log(`isPasswordValid: ${isPasswordValid}`);
            console.log(`isPhoneNumberValid: ${isPhoneNumberValid}`);
          }
    };

    const handleColor = (name, event)=>{
        if(eventTextInput == 0){
            if(event == 'borderColor') return 'black';
            if(event == 'borderWidth') return 0;
            
        }else{ 
            if(name == 'email'){
                if(event == 'borderColor') return profile.email ? 'black':'red';
                if(event == 'borderWidth') return profile.email ? 0:2;
            }
            if(name == 'password'){
                if(event == 'borderColor') return profile.password ? 'black':'red';
                if(event == 'borderWidth') return profile.password ? 0:2;
            }
            if(name == 'cfPassword'){
                if(event == 'borderColor') return profile.cfPassword ? 'black':'red';
                if(event == 'borderWidth') return profile.cfPassword ? 0:2;
            }
            if(name == 'phoneNumber'){
                if(event == 'borderColor') return profile.phoneNumber ? 'black':'red';
                if(event == 'borderWidth') return profile.phoneNumber ? 0:2;
            }
        }
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#0ABAB5'}}>
            <View style={{flex:1, padding:'5%'}}>
                <TouchableOpacity style={{width:35}}
                    onPress={()=>{
                        navigation.pop();
                    }}
                >
                    <Icon name="arrowleft" size={30} color="#ffffff"/>
                </TouchableOpacity>
                
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:28, color:'#fffffa', fontFamily:'ZenOldMincho-Bold'}}> SIGN UP</Text>
                    <Text style={{fontSize:18, color:'#fffffa', fontFamily:'ZenOldMincho-Regular'}}> Create an Account, it's free </Text>
                </View>
                
            </View>
            <View style={{flex:2, borderTopLeftRadius:32, borderTopRightRadius:32, backgroundColor:'#fffffa'}}>
                <View style={{flex:1, paddingVertical:'10%', paddingHorizontal:'5%'}}>
                    
                    <TextInput style={{height:50, borderRadius:16, backgroundColor:'#ffffff', borderWidth:1, borderRadius:16, borderTopLeftRadius:16, borderTopRightRadius:16,
                    borderColor: handleColor('email','borderColor')}} 
                    placeholder='Email*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='email-address' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"
                    value={profile.email} onChangeText={text => setEmail(text)}
                    >
                    
                    </TextInput>

                    <TextInput style={{height:50, borderRadius:16, marginTop:'5%', backgroundColor:'#ffffff', borderWidth:1, borderRadius:16, borderTopLeftRadius:16, borderTopRightRadius:16,
                    borderColor: handleColor('password','borderColor')}} 
                    placeholder='Password*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={profile.password} onChangeText={text => setPassword(text)}
                    >  
                    </TextInput>

                    <TextInput style={{height:50, borderRadius:16, marginTop:'5%', backgroundColor:'#ffffff', borderWidth:1, borderRadius:16, borderTopLeftRadius:16, borderTopRightRadius:16,
                    borderColor: handleColor('cfPassword','borderColor')}} 
                    placeholder='Confirm Password*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={profile.cfPassword} onChangeText={text => setCFPassword(text)}
                    >  
                    </TextInput>

                    <TextInput style={{height:50, borderRadius:16, marginTop:'5%', backgroundColor:'#ffffff', borderWidth:1, borderRadius:16, borderTopLeftRadius:16, borderTopRightRadius:16,
                    borderColor: handleColor('phoneNumber','borderColor')}} 
                    placeholder='Phone Number*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={profile.phoneNumber} onChangeText={text => setPhoneNumber(text)}
                    >  
                    </TextInput>

                    <View style={{height:20, alignItems:'flex-end', marginBottom:'8%'}}>

                    </View>
                    
                    <TouchableOpacity style={{height:50, borderRadius:16, backgroundColor:'#0ABAB5', justifyContent:'center', alignItems:'center', marginHorizontal:'8%', marginVertical:'2%'}}
                        onPress={handleSignUp}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#fffffa', fontSize:20}}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:1}}></View>
                
            </View>
        </SafeAreaView>
    );
}