import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, TouchableHighlight} from 'react-native';


export const TaptoStartScreen = ({navigation})=>{
    return(
       <SafeAreaView style={{flex:1, backgroundColor:'#0ABAB5'}}>
            <View style={{flex:1, alignItems:'flex-end', padding:'2%'}}>

                <TouchableOpacity style={{flex:1}} 
                    onPress={()=>{
                        navigation.goBack();
                    }}
                >
                    <Image source={require('../../assets/exitIcon.png')}></Image>
                </TouchableOpacity>
                
            </View>
            <View style={{flex:25, margin:5, borderWidth:1, borderColor:'#000000', backgroundColor:'#ffffff', borderRadius:9}}>
                <View  style={{flex: 1,justifyContent:'center',alignContent:'center',flexDirection:'column'}} >
                    <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:48, color:'#000000',textAlign:'center', paddingHorizontal:10, paddingTop:5}}>Money Monster</Text> 
                    <Text style={{fontFamily:'ZenOldMincho-Regular', fontSize:24, color:'#0ABAB5',textAlign:'center',paddingHorizontal:10, paddingTop:10}}>อสูรเงินฝาก</Text> 

                </View>
                <View style={{flex: 1,justifyContent:'Top',alignContent:'Top',flexDirection:'column'}} > 
                    <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                        <View style = {{
                             borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                             borderWidth:1, borderColor:'#000000',
                             width: Dimensions.get('window').width * 0.5,
                             height: Dimensions.get('window').width * 0.5,
                              backgroundColor:'#0ABAB5',
                              justifyContent: "center",
                                alignItems: "center"
                         }}
                        >                       
                        <Image source={require('../../assets/petAssets/Pet_8.png')} style={{width: 250, height:250,justifyContent:'center',alignContent:'center'}} />
                        </View>
                   
                    
                     

                    </View>
                </View>
                <View  style={{flex: 1,justifyContent:'center',alignContent:'center',flexDirection:'row'}} >
                    <TouchableOpacity style={{flex:1}} 
                        onPress={()=>{
                            /* navigation.navigate('HomePet'); */
                            console.log('Home')
                        }}
                     >
                          <Text style={{fontFamily:'ZenOldMincho-Black', fontSize:24, color:'#000000',textAlign:'center', paddingTop:20}}>Tap to Start</Text> 
                    </TouchableOpacity>
                    
                </View>
            
                
            </View>
            
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:16,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },
    
    descibeText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#A9A9A9'
    }
})