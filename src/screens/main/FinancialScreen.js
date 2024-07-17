import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setItemTransactionType } from "../../redux/variableSlice";
import { retrieveAllDataIncomeAndExpenses, retrieveDataLiabilityRemaining, retrieveDataAsset } from "../../firebase/RetrieveData";
import { getNetWealth } from "../../Calculate/Calculate";
import { BoxInfo } from "../../components/BoxInfo";

export const FinancialScreen = ({navigation})=>{
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const [incomeValuesAll, setIncomeValuesAll] = useState()
    const [expensesValuesAll, setExpensesValuesAll] = useState()
    const [assetValuesAll, setAssetValuesAll] = useState()
    const [liabilityValuesAll, setLiabilityValuesAll] = useState()

    useEffect(() => {
        getDataIncomeAndExpenses();
        getDataAsset();
        getDataLiabilityRemaining();
        getNetWealth();
    }, [incomeValuesAll, expensesValuesAll, assetValuesAll, liabilityValuesAll, isUpdate]);

    const getIncomeValues = (itemData)=>{
        let incomeValues = 0;
        itemData.forEach(element => {
            if(element.transactionType == 'รายได้'){
                incomeValues += parseFloat(element.value);
            }
        });
        
        return incomeValues
    }

    const getExpensesValues = (itemData)=>{
        let expensesValues = 0;
        itemData.forEach(element => {
            if(element.transactionType == 'ค่าใช้จ่าย'){
                expensesValues += parseFloat(element.value);
            }
        });
        
        return expensesValues
    }

    const getDataIncomeAndExpenses = async()=>{
        try{
            const itemAllDataIncomeAndExpenses = await retrieveAllDataIncomeAndExpenses(userUID)
        
            setIncomeValuesAll(getIncomeValues(itemAllDataIncomeAndExpenses.income))
            setExpensesValuesAll(getExpensesValues(itemAllDataIncomeAndExpenses.expenses))
            
        }catch (error) {
            console.error('Error getDataIncomeAndExpenses:', error);
        }  
    }

    const getAssetValues = (itemsDataAsset)=>{
        let assetValues = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.invest.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.personal.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        
        return assetValues
    }

    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetValuesAll(getAssetValues(itemsDataAsset))
        } catch (error){
            console.error('Error getDataAsset:', error);
        }
    }
    
    const getLiabilityValues = (itemsDataLiability)=>{
        let liabilityValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        itemsDataLiability.long.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        
        return liabilityValues
    }

    const getDataLiabilityRemaining = async()=>{
        try{
            const itemsDataLiabilityRemaining = await retrieveDataLiabilityRemaining(userUID);
            setLiabilityValuesAll(getLiabilityValues(itemsDataLiabilityRemaining))
        } catch (error){
            console.error('Error getDataLiability:', error);
        }
    }  

    return(
        <SafeAreaView style={{flex:1, paddingVertical:10, paddingHorizontal:5, backgroundColor:'#fffffa'}}>
            <View style={{flex:1}}>
                <ScrollView horizontal={true}>
                    <BoxInfo topic='ยอดเงินคงเหลือ' topicValue={incomeValuesAll-expensesValuesAll} subTopic1='รายได้'
                             subTopic1Value={incomeValuesAll} subTopic2='ค่าใช้จ่าย' subTopic2Value={expensesValuesAll}
                             button={true} navigation={navigation}
                    />
                    <BoxInfo topic='ความมั่งคั่งสุทธิ' topicValue={assetValuesAll-liabilityValuesAll} subTopic1='สินทรัพย์'
                             subTopic1Value={assetValuesAll} subTopic2='หนี้สิน' subTopic2Value={liabilityValuesAll}
                             button={true} navigation={navigation}
                    />

                </ScrollView>
            </View>
            
           
            <View style={{flex:2, paddingHorizontal:15}}>
                <Text style={{fontFamily:'Poppins-SemiBold', color:'#000000', fontSize:20}}>ธุรกรรม</Text>
                <View style={{flex:1, backgroundColor:'#F5F5F5', borderRadius:32}}>
                    <View style={{flex:1, margin:30}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <TouchableOpacity style={{flex:1, borderWidth:1, borderRadius:16, margin:5, alignItems:'center', justifyContent:'center'}}
                                onPress={()=>{
                                    dispatch(setItemTransactionType('รายได้'))
                                    navigation.navigate('CategorySelectionScreen')
                                }}
                            >
                                <View style={{width:'65%',height:'65%', alignItems:'center'}}>
                                    <Image source={require('../../assets/financialIcons/IncomeIcon.png')} style={{width:'100%', height:'100%'}} resizeMode="contain"/>
                                </View>
                                <Text style={{fontFamily:'Poppins-Regular', color:'#000000', fontSize:14}}>รายได้</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, borderWidth:1, borderRadius:16, margin:5, alignItems:'center', justifyContent:'center'}}
                                onPress={()=>{
                                    dispatch(setItemTransactionType('ค่าใช้จ่าย'))
                                    navigation.navigate('CategoryExpensesSelectionScreen')
                                }}
                            >
                                <View style={{width:'65%',height:'65%', alignItems:'center'}}>
                                    <Image source={require('../../assets/financialIcons/ExpenseIcon.png')} style={{width:'100%', height:'100%'}} resizeMode="contain"/>
                                </View>
                                <Text style={{fontFamily:'Poppins-Regular', color:'#000000', fontSize:14}}>ค่าใช้จ่าย</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <TouchableOpacity style={{flex:1, borderWidth:1, borderRadius:16, margin:5, alignItems:'center', justifyContent:'center'}}
                                onPress={()=>{
                                    dispatch(setItemTransactionType('สินทรัพย์'))
                                    navigation.navigate('CategoryAssetSelectionScreen')
                                }}
                            >
                                <View style={{width:'65%',height:'65%', alignItems:'center'}}>
                                    <Image source={require('../../assets/financialIcons/AssetIcon.png')} style={{width:'100%', height:'100%'}} resizeMode="contain"/>
                                </View>
                                <Text style={{fontFamily:'Poppins-Regular', color:'#000000', fontSize:14}}>สินทรัพย์</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, borderWidth:1, borderRadius:16, margin:5, alignItems:'center', justifyContent:'center'}}
                                onPress={()=>{
                                    dispatch(setItemTransactionType('หนี้สิน'))
                                    navigation.navigate('CategoryLiabilitySelectionScreen')
                                }}
                            >
                                <View style={{width:'65%',height:'65%', alignItems:'center'}}>
                                    <Image source={require('../../assets/financialIcons/LiabilityIcon.png')} style={{width:'100%', height:'100%'}} resizeMode="contain"/>
                                </View>
                                <Text style={{fontFamily:'Poppins-Regular', color:'#000000', fontSize:14}}>หนี้สิน</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
           
            {/*
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ยอดเงินคงเหลือ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>
                        {isNaN(incomeValuesAll-expensesValuesAll) ? 0 : incomeValuesAll-expensesValuesAll} THB
                    </Text>
                </View>

                <View style={{flex:1.5, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>รายได้</Text>
                        <Text style={styles.subHeaderText}>{incomeValuesAll} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>รายจ่าย</Text>
                        <Text style={styles.subHeaderText}>{expensesValuesAll} THB</Text>
                    </View>
                </View>

                <View style={{flex:2, paddingHorizontal:5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1, borderTopWidth:1, borderColor:'#D2DBD6'}}>
                        <TouchableOpacity style={{flex:1, padding:5}}
                            onPress={()=>{
                                navigation.navigate('IncomeAndExpensesScreen')
                            }}>
                            <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>{"แสดงรายละเอียดเพิ่มเติม  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ความมั่งคั่งสุทธิ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex: 1, color: '#0ABAB5', fontFamily: 'ZenOldMincho-Black', fontSize: 16}}>
                        {isNaN(assetValuesAll - liabilityValuesAll) ? 0 : assetValuesAll - liabilityValuesAll} THB
                    </Text>
                </View>

                <View style={{flex:1.5, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>สินทรัพย์รวม</Text>
                        <Text style={styles.subHeaderText}>{assetValuesAll} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>หนี้สินรวม</Text>
                        <Text style={styles.subHeaderText}>{liabilityValuesAll} THB</Text>
                    </View>
                </View>

                <View style={{flex:2, paddingHorizontal:5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1, borderTopWidth:1, borderColor:'#D2DBD6'}}>
                        <TouchableOpacity style={{flex:1, padding:5}}
                            onPress={()=>{
                                navigation.navigate('AssetLiabilityDetailScreen');
                            }}
                        >
                            <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>{"แสดงรายละเอียดเพิ่มเติม  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{flex:0.5, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{flex:1, alignItems:'center'}} 
                        onPress={()=>{
                            dispatch(setItemTransactionType("รายได้"));
                            navigation.navigate('CategorySelectionScreen')
                            
                        }}
                    >
                        <Image source={require('../../assets/revenueIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>รายได้</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            dispatch(setItemTransactionType("ค่าใช้จ่าย"));
                            navigation.navigate('CategoryExpensesSelectionScreen')
                        }}
                    >
                        <Image source={require('../../assets/expenseIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>ค่าใช้จ่าย</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            dispatch(setItemTransactionType("สินทรัพย์"));
                            navigation.navigate('CategoryAssetSelectionScreen')
                        }}>
                        <Image source={require('../../assets/assetIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>สินทรัพย์</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            dispatch(setItemTransactionType("หนี้สิน"));
                            //รอหน้าเพื่อนเสร็จ
                            navigation.navigate('CategoryLiabilitySelectionScreen')
                        }}>
                        <Image source={require('../../assets/liabilityIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>หนี้สิน</Text>
                    </TouchableOpacity>
                </View>
                
            </View>*/}
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
        fontFamily:'ZenOldMincho-Bold',
        fontSize:14,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    }
    
})