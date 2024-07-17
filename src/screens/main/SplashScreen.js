import { View, Text, Image} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { useEffect } from 'react';

export const SplashScreen = ({ navigation })=>{
    
    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('SelectSignInSignUpScreen');
          navigation.reset({ index: 0, routes: [{ name: 'SelectSignInSignUpScreen' }] });
        }, 2000);
      }, []);

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                <Image source={require('../../assets/logoGreen.png')} style={{ width: 100, height: 100 }} />
            </View>
        </SafeAreaView>
    );
}