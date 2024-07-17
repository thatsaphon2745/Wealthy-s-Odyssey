import React from "react";
import { View, Text, Image, TouchableOpacity, Alert} from "react-native";
import { TextInput} from "react-native-paper";
import { SafeAreaView} from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from "react";
import { signInEmailPass } from "../../firebase/AuthModel";
import { useDispatch } from "react-redux";
import { clearProfile, addProfile } from "../../redux/authSlice";
import { setStatus } from "../../redux/variableSlice";

export const SignInScreen = ({ navigation })=>{

    const [credential,setCredential] = useState({email:'',password:''})
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const dispatch = useDispatch()

    const setEmail = (text) => {
        setCredential(oldValue => ({
            ...oldValue,
            email:text
        }))
      }
    
    const setPassword = (text) => {
        setCredential(oldValue => ({
            ...oldValue,
            password:text
        }))
    }

    const success = async(user) => {
        const { uid, email } = user;
        const userData = {
            uid,
            email
        };
        dispatch(setStatus(false))
        dispatch(clearProfile());
        dispatch(addProfile(userData));
        navigation.navigate('BottomTabNav')
    }
    
    const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
    }

    const handleSignIn = ()=>{
        let isEmailValid = true;
        let isPasswordValid = true;

        while(true){
            if(!credential.email){
                isEmailValid = false;
                Alert.alert('Please provide your email information');
                break;
            }
            if(!credential.password){
                isPasswordValid = false;
                Alert.alert('Please provide your password information');
                break;
            }
            break;
        }

        if(isEmailValid && isPasswordValid){
            signInEmailPass(credential.email, credential.password, success, unsuccess)
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
                    <Text style={{fontSize:28, color:'#fffffa', fontFamily:'ZenOldMincho-Bold'}}> SIGN IN</Text>
                    <Text style={{fontSize:18, color:'#fffffa', fontFamily:'ZenOldMincho-Regular'}}> Welcome back! Login with your credentials</Text>
                </View>
                
            </View>
            <View style={{flex:2, borderTopLeftRadius:32, borderTopRightRadius:32, backgroundColor:'#fffffa'}}>
                <View style={{flex:1, paddingVertical:'10%', paddingHorizontal:'5%'}}>
                    
                    <TextInput style={{height:50, borderRadius:16, backgroundColor:'#ffffff', borderWidth:1, borderRadius:16, borderTopLeftRadius:16, borderTopRightRadius:16}} 
                    placeholder='Email*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='email-address' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"
                    value={credential.email} onChangeText={(text)=>{setEmail(text)}}
                    >
                    </TextInput>

                    <TextInput style={{height:50, borderRadius:16, marginTop:'5%', backgroundColor:'#ffffff', borderWidth:1, borderRadius:16, borderTopLeftRadius:16, borderTopRightRadius:16}} 
                    placeholder='Password*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={credential.password} onChangeText={(text)=>{setPassword(text)}}
                    >   
                    </TextInput>

                    <TouchableOpacity style={{height:20, alignItems:'flex-end', marginBottom:'8%'}} 
                        onPress={() => {
                            navigation.navigate('ForgetPasswordScreen');
                          }}
                    >
                        <Text style={{color:'#A9A9A9'}}>Forget Password?</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{height:50, borderRadius:16, backgroundColor:'#0ABAB5', justifyContent:'center', alignItems:'center', marginHorizontal:'8%', marginVertical:'2%'}}
                        onPress={handleSignIn}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#fffffa', fontSize:20}}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:1}}></View>
                
            </View>
        </SafeAreaView>
    );
}