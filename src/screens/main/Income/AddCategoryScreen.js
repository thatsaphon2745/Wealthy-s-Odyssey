import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useState } from "react";
import { addCategories } from "../../../firebase/UserModel";
import { useDispatch, useSelector } from 'react-redux';
import { setItemPhotoURL } from "../../../redux/variableSlice";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export const AddCategoryScreen = ({route, navigation})=>{
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    
    const transactionTypeItem = useSelector((state)=>state.variables.transactionType)
    console.log(`transactionTypeItem: ${transactionTypeItem}`);
    
    const categoryItem = useSelector((state)=>state.variables.category)
    //console.log(categoryItem);

    const photoURLItem = useSelector((state)=>state.variables.photoURL)
    //console.log(photoURLItem);

    const [checkBoxSavings, setCheckBoxSavings] = useState(false);
    const [checkBoxInvest, setCheckBoxInvest] = useState(false);

    const [checkBoxIncomeInvestAsset, setCheckBoxIncomeInvestAsset] = useState(false)

    const [newCategory, setNewCategory] = useState({
        transactionType: transactionTypeItem,
        category: categoryItem,
        subCategory: 'empty',
        photoURL: photoURLItem
    });

    const addDataItem = ()=>{
        let validatePhotoURL = true;
        let validatesubCategory = true;
        if(!photoURLItem){
            validatePhotoURL = false;
            Alert.alert('กรุณาเลือกรูปภาพ')
        }
        if(newCategory.subCategory == 'empty'){
            validatesubCategory = false;
            Alert.alert('กรุณาระบุชื่อ')
        }

        if(validatePhotoURL && validatesubCategory){
            if(categoryItem == 'ค่าใช้จ่ายออมและลงทุน'){
                if(checkBoxSavings || checkBoxInvest){
                    if(checkBoxSavings){
                        let option = '(ออม)'
                        addCategories(userUID, newCategory.transactionType,newCategory.category, newCategory.subCategory, photoURLItem, option);
                        handleSubmitItem();
                    }else{
                        let option = '(ลงทุน)'
                        addCategories(userUID, newCategory.transactionType,newCategory.category, newCategory.subCategory, photoURLItem, option);
                        handleSubmitItem();
                    }
                }else{
                    Alert.alert(`กรุณาเลือกหมวดหมู่ระหว่าง เงินออม หรือ เงินลงทุน`)
                }
            

            }
            else if(categoryItem == 'รายได้จากสินทรัพย์'){
                if(checkBoxIncomeInvestAsset){
                    let option = '(ลงทุน)';
                    addCategories(userUID, newCategory.transactionType,newCategory.category, newCategory.subCategory, photoURLItem, option);
                    handleSubmitItem();
                }else{
                    let option = ''
                    addCategories(userUID, newCategory.transactionType,newCategory.category, newCategory.subCategory, photoURLItem, option);
                    handleSubmitItem();

                }
            }
            else{
                let option = ''
                addCategories(userUID, newCategory.transactionType,newCategory.category, newCategory.subCategory, photoURLItem, option);
                handleSubmitItem();
            }
        }
    }

    const handleSubmitItem = () => {
        dispatch(setItemPhotoURL(""))
        navigation.navigate('FinancialScreen');
    };

    const checkboxSavingsAndInvest = ()=>{
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{flex:1}}></View>

                    <View style={{flex:2, flexDirection:'row'}}>
                        <Checkbox style={{flex:1}}
                            status={checkBoxSavings ? 'checked' : 'unchecked'}
                            onPress={()=>{
                                setCheckBoxSavings(!checkBoxSavings);
                                
                                if(setCheckBoxInvest){
                                    setCheckBoxInvest(false)
                                }
                            }}
                                
                            color="#0ABAB5"
                        />
                        <Text style={{flex:1, textAlignVertical:'center'}}>เงินออม</Text>
                    </View>

                    <View style={{flex:1}}></View>
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{flex:1}}></View>

                    <View style={{flex:3, flexDirection:'row'}}>
                        <Checkbox style={{flex:1}}
                            status={checkBoxInvest ? 'checked' : 'unchecked'}
                            onPress={()=>{
                                setCheckBoxInvest(!checkBoxInvest);
                                if(checkBoxSavings){
                                    setCheckBoxSavings(false)
                                }
                            }}
                            color="#0ABAB5"
                        />
                        <Text style={{flex:1, textAlignVertical:'center'}}>เงินลงทุน</Text>
                    </View>

                    <View style={{flex:1}}></View>
                </View> 
            </View>
        )
    }

    const componentCheckBoxIncomeInvestAsset = ()=>{
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <View style={{flex:1}}></View>

                <View style={{flex:3, flexDirection:'row'}}>
                    <Checkbox style={{flex:1}}
                        status={checkBoxIncomeInvestAsset ? 'checked' : 'unchecked'}
                        onPress={()=>{
                            setCheckBoxIncomeInvestAsset(!checkBoxIncomeInvestAsset);    
                        }}
                                
                        color="#0ABAB5"
                    />
                    <Text style={{flex:1, textAlignVertical:'center'}}>รายได้จากสินทรัพย์ลงทุน</Text>
                </View>

                <View style={{flex:1}}></View>
            </View>
        )
    }

    return(
        <ScrollView style={{flex:1, backgroundColor:'#fffffa', paddingHorizontal:20}}>
            <View style={{height:100}}></View>
            <View style={{flex:1, alignItems:'center'}}>
                <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('EditCategoryIcon')
                    }}
                >
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image source={require('../../../assets/backgroundIcon.png')} style={{width: 100, height:100}} />
                        <Image source={{uri:photoURLItem ? photoURLItem : "https://cdn.discordapp.com/attachments/1202281623585034250/1202697481461309451/question-mark.png?ex=65ce6650&is=65bbf150&hm=1cc87636791308fe05fc4444763cb3e68195c470bde2858f01c0e3a2a26495de&"}} style={{width: 50, height:50, position:'absolute'}} />
                    </View>
                    
                </TouchableOpacity>
                
                <TextInput style={{flex:1, width:'100%', backgroundColor:'transparent', fontFamily:'ZenOldMincho-Bold', fontSize:22, justifyContent:'center', alignItems:'center'}}
                    placeholder='ระบุชื่อ' underlineColor='#0ABAB5' activeUnderlineColor="#0ABAB5" placeholderTextColor='#0ABAB5' textColor="#0ABAB5"
                    onChangeText={(text) => setNewCategory({ ...newCategory, transactionType:transactionTypeItem,subCategory: text })}>  
                </TextInput>
            </View>
            <View style={{height:50}}></View>
            {categoryItem == 'ค่าใช้จ่ายออมและลงทุน' ? checkboxSavingsAndInvest() : (<View></View>)}
            {categoryItem == 'รายได้จากสินทรัพย์' ? componentCheckBoxIncomeInvestAsset() : (<View></View>)}
            <View style={{height:150, justifyContent:'center', paddingHorizontal:3}}>
                <Shadow  style={{width:'100%', height:50}} distance={5} startColor={'#0ABAB5'} offset={[2, 4]}>
                    <TouchableOpacity style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:16, borderWidth:1, borderColor:'#0ABAB5', backgroundColor:'#ffffff'}}
                        onPress={()=>{
                            addDataItem();
                        }}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', color:'#0ABAB5', fontSize:22}}>บันทึกรายการ</Text>
                    </TouchableOpacity>
                </Shadow>
                
            </View>
        </ScrollView>
    )
}