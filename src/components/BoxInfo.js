import { View, Text, TouchableOpacity } from "react-native"
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export const BoxInfo = ({
    topic, 
    topicValue = '', 
    subTopic1, 
    subTopic1Value = '', 
    subTopic2, 
    subTopic2Value = '',
    button,
    navigation
    })=>{
    return(
        <View style={{width:200, margin:10, borderRadius:18, padding:10, backgroundColor:'#0ABAB5'}}>
            <View style={{flex:1, borderBottomWidth:2, borderColor:'#D2D8D6'}}>
                <Text style={{color:'#000000', fontFamily:'Poppins-Regular'}}>{topic}</Text>
                <Text style={{paddingVertical:10, color:'#ffffff', fontSize:18, fontWeight:'bold',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                }}>{topicValue} THB</Text>
                <Text style={{textAlign:'right', color:'#000000', fontSize:11, fontFamily:'Poppins-Regular'}}>ข้อมูล ณ ปัจจุบัน</Text>
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:2}}>
                    <Text style={{color:'#000000', fontSize:12, fontFamily:'Poppins-Regular', paddingTop:5}}>{subTopic1}</Text>
                    <Text style={{color:'#ffffff'}}>{subTopic1Value} THB</Text>
                    <Text style={{color:'#000000', fontSize:12, fontFamily:'Poppins-Regular', paddingTop:5}}>{subTopic2}</Text>
                    <Text style={{color:'#ffffff'}}>{subTopic2Value} THB</Text>
                </View>
                {button && (
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', marginVertical:15}}
                        onPress={()=>{
                            if(topic == 'ยอดเงินคงเหลือ'){
                                navigation.navigate('IncomeAndExpensesScreen')
                            }
                            else{
                                navigation.navigate('AssetLiabilityDetailScreen')
                            }
                            
                        }}
                    >
                        <IconAntDesign name="arrowright" size={30} color="#ffffff"/>
                    </TouchableOpacity>
                )}
            </View>
            
            
        </View>
    )
}