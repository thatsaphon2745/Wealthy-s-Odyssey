import { View, Text, Image, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { addTransaction, editTransaction, RemoveTransaction } from "../../firebase/UserModel";
import { useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from "react";
import { setIsUpdate } from "../../redux/variableSlice";

export const DetailScreen = ({navigation})=>{
    const cameFrom = useSelector((state)=>state.variables.cameFrom);
    const dispatch = useDispatch()

    const isUpdate = useSelector((state)=>state.variables.isUpdate); 
     //itemData มี category,subcategory,url
     const itemData = useSelector((state)=>state.variables.itemData); 
     //console.log(itemData);
     const selectedDate = useSelector((state)=>state.variables.selectedDate);
     //console.log(selectedDate);
 
     const transactionType = useSelector((state)=>state.variables.transactionType);
 
     const user = useSelector((state)=>state.auths);
     const userUID = user[0].uid;
 
     const currentDate = new Date();
     const year = currentDate.getFullYear();
     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
     const day = currentDate.getDate().toString().padStart(2, '0');
     const formattedDate = `${year}-${month}-${day}`;
 
     const [input,setInput] = useState({detail:itemData.detail,value:itemData.value})
 
     const setDetail = (text) => {
         setInput(oldValue => ({
             ...oldValue,
             detail:text
         }))
       }
 
     const setValue = (text) => {
         setInput(oldValue => ({
             ...oldValue,
             value:text
         }))
     }

     const success = ()=>{
        if (cameFrom === "IncomeAndExpenseScreen") {
            dispatch(setIsUpdate(!isUpdate));
            navigation.navigate('IncomeAndExpensesScreen');
        } else if (cameFrom === "AssetLiabilityDetailScreen") {
            dispatch(setIsUpdate(!isUpdate));
            navigation.navigate('AssetLiabilityDetailScreen');
        }
        
     }
 
     const handleEditTransaction = ()=>{

        let validateInput = true;
        let validateTypeInput = true;
        let validateValueMaxLimitInput = true;
        let validateValueMinLimitInput = true;
        let validateValueFixedDecimal = true;
        
        if(input.value == ""){
            validateInput = false
            Alert.alert('กรุณาระบุจำนวนเงิน')
            return;
        }
        
        if(isNaN(input.value)){
            validateTypeInput = false
            Alert.alert('กรุณากรอกเป็นตัวเลข')
            return;
        }

        if(input.value >= 100000000){
            validateValueMaxLimitInput = false
            Alert.alert('กรุณากรอกจำนวนเงินไม่เกิน 100,000,000')
            return;
        }

        if(input.value <= 0){
            validateValueMinLimitInput = false
            Alert.alert('กรุณากรอกเลขที่มากกว่า 0')
            return;
        }

        if(input.value.toString().includes(".")){
            let decimalPlaces = input.value.toString().split('.')[1].length;
            if(decimalPlaces > 2){
                validateValueFixedDecimal = false
                Alert.alert('กรุณาป้อนทศนิยมไม่เกิน 2 ตำแหน่ง')
                return;
            }
        }
        
        /*let parts = input.value.toString().split('.')
        Alert.alert(parts.toString())
        if (input.value > 0 && input.value < 1) {
            input.value = '0' + input.value;
        }*/

        if(validateInput && validateTypeInput && validateValueMaxLimitInput&& validateValueMinLimitInput && validateValueFixedDecimal){
            input.value = input.value.trim();
            editTransaction(userUID,itemData, input, success)
        }


         
     }
     const handleRemoveTransaction = ()=>{
        RemoveTransaction(userUID,itemData, success)
     }
     
     
     return(
        <ScrollView style={{ backgroundColor:'#fffffa', paddingHorizontal:20}}>
        <View style={{height:25,backgroundColor:'transparent'}}></View>
        <Shadow style={{width:'100%', borderRadius:16}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
            <View style={{flex:1,backgroundColor:'#FFFFFA',borderRadius:16,borderWidth:1,width:'99%'}}>
                <View style={{flex:1, alignItems:'center',marginTop:15,flexDirection:'row'}}>

    {/* รูป & ชื่อรายการ */}
                    <View style={{flex:0.5,width:'100%',backgroundColor:'transparent',marginLeft:15, justifyContent:'center', alignItems:'center'}}>
                        <Image source={require('../../assets/backgroundIcon.png')} style={{width: 100, height:100}} />
                        <Image source={{uri:itemData.photoURL}} style={{width: 50, height:50, position:'absolute'}}/>
    {/* รับรูปไอค่อน */}
                    </View>
                    <TextInput style={{flex:1, backgroundColor:'transparent', fontFamily:'ZenOldMincho-Bold', fontSize:28}}
                        placeholder={itemData.subCategory} underlineColor='transparent' placeholderTextColor='#0ABAB5' textColor="#0ABAB5" editable={false}
                        >
                    </TextInput>
                    <Image source={require('../../assets/right_arrow.png')} style={{flex:0,width: 20, height:20,backgroundColor:'transparent',marginRight:15}} />
                </View>
                <View style={{height:20,backgroundColor:'transparent'}}></View>
                <View style={{flex:1,borderColor:'#A9A9A9',borderWidth:1,marginHorizontal:15,backgroundColor:'transparent'}}></View>
                
    {/* กล่องจำนวนเงิน */}
                <View style={{height:20,backgroundColor:'transparent'}}></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRadius:15,borderColor:'#000000',
                    paddingHorizontal:3,backgroundColor:'transparent'}}>
                    <View style={{flex:0,borderRadius:15,borderWidth:2,borderColor:'#A9A9A9',marginLeft:30,backgroundColor:'transparent'}}>
                        <TextInput style={{flex:0,backgroundColor:'transparent'}}
                            placeholder='THB' underlineColor='transparent' placeholderTextColor='#0ABAB5' textColor="#0ABAB5" editable={false}
                            >
                        </TextInput>
                    </View>
                    <TextInput style={{flex:1,width:'100%', borderColor:'#000000', backgroundColor:'transparent', fontFamily:'ZenOldMincho', fontSize:22}}
                        placeholder='ระบุจำนวนเงิน' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                        value={input.value} onChangeText={(text)=>{setValue(text)}} keyboardType="number-pad"
                        >
                    </TextInput>
                </View>
                <View style={{height:10}}></View>
                <View style = {{flex:1,flexDirection:'row',backgroundColor:"transparent",borderColor:'transparent',alignItems:'center'}}>
                    <View style={{height:20}}></View>
                    <View style={{flex:1,borderColor:'#A9A9A9',borderWidth:1,marginHorizontal:15,backgroundColor:'transparent',height:0}}></View>
                </View>

    {/* กล่องรายละเอียด */}
                <View style={styles.DetailInputBox}>
                    <TextInput style={{flex:3,width:'100%', borderColor:'#000000', backgroundColor:'transparent', fontFamily:'ZenOldMincho', fontSize:18, justifyContent:'start', alignItems:'start'}}
                        placeholder='รายละเอียดเพิ่มเติม' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                        value={input.detail} onChangeText={(text)=>{setDetail(text)}}
                    >  
                    </TextInput>
                </View>
                <View style={{height:10}}></View>
                {transactionType == 'หนี้สิน' ? componentCheckBoxRepayDebt() : <View></View>}
            </View>
        </Shadow>
       
    {/* ปุ่มบันทึก */}
       <View style={{height:100, justifyContent:'center', paddingHorizontal:3}}>
                <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                    <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}
                        onPress={()=>{
                            handleEditTransaction()
                        }}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>บันทึกรายการ</Text>
                    </TouchableOpacity>
                </Shadow>
            </View>
            <View style={{height:70, justifyContent:'center', paddingHorizontal:3}}>
                 <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#ff0000'} offset={[2, 4]}>
                     <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#ff0000', backgroundColor:'#ffffff'}}
                         onPress={handleRemoveTransaction}
                     >
                         <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#ff0000', fontSize:22}}>ลบรายการ</Text>
                     </TouchableOpacity>
                 </Shadow>
             </View>
             <View style = {{height:40}}></View>
    </ScrollView>
     )
 }
 
 const styles = StyleSheet.create({
     TextInputBox: {
         flex:1,
         justifyContent:'center',
         borderRadius:15,
         borderWidth:1,
         borderColor:'#000000',
         paddingHorizontal:3,
         
     },
     DetailInputBox:{
        height:150,
        justifyContent:'flex-start',
        borderRadius:15,
        borderWidth:2,
        borderColor:'#A9A9A9',
        alignItems: 'flex-start',
        paddingHorizontal:3,
        marginHorizontal:15,
        marginVertical:15,
     }
 })