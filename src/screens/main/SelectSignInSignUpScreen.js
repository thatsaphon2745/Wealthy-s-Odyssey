import { View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { Shadow } from 'react-native-shadow-2';

export const SelectSignInSignUpScreen = ({ navigation })=>{
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#0ABAB5'}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../../assets/logoWhite.png')} style={{ width: 250, height: 250 }} />
            </View>
            
            <View style={{flex:1, borderTopLeftRadius:32, borderTopRightRadius:32, backgroundColor:'#ffffff'}}>
                <Text style={{flex:0.15, marginTop:'7%', textAlign:'center', fontSize:28, color:'#000000', fontWeight:'bold'}}>Welcome</Text>

                <Text style={{flex:0.6, paddingHorizontal:'5%', textAlign:'center', fontSize:20.5, color:'#000000', borderWidth:1, borderColor:'white'}}>
                    This application is designed to serve as a tool to improve your financial health by creating 
                    financial health indicators. It assesses various criteria to identify weaknesses in your financial 
                    health and provides recommendations for addressing and improving those issues.
                </Text>

                <View style={{flex:0.25, borderWidth:1, borderColor:'white', flexDirection:'row'}}>

                    <View style={{flex:1, marginVertical:'6%',alignItems:'center'}}>
                        <Shadow  distance={5} startColor={'#80808070'} offset={[2, 4]}>
                            <TouchableOpacity style={{flex:1, justifyContent:'center', backgroundColor:'#0ABAB5', borderRadius:8, paddingHorizontal:'8%'}}
                                onPress={()=>{
                                    navigation.navigate('SignInScreen')
                                }}
                            >
                                    <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:20}}>SIGN IN</Text>
                            </TouchableOpacity>
                        </Shadow>
                    </View>
                    
                    <View style={{flex:1, marginVertical:'6%', alignItems:'center'}}>
                        <Shadow  distance={5} startColor={'#80808070'} offset={[2, 4]}>
                            <TouchableOpacity style={{flex:1, justifyContent:'center', backgroundColor:'#000000', borderRadius:8, paddingHorizontal:'8%'}}
                                onPress={()=>{
                                    navigation.navigate('SignUpScreen')
                                }}
                            >
                                    <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:20}}>SIGN UP</Text>
                            </TouchableOpacity>
                        </Shadow>
                    </View>
                </View>  
            </View>
        </SafeAreaView>
    );
}