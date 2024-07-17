import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image,TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import { retrieveInventory } from '../../firebase/RetrieveData';
import { useDispatch, useSelector } from 'react-redux';
import { setEditItemLocation } from '../../redux/variableSlice';
import { retrieveCurrencyPet } from '../../firebase/UserModel';

export const InventoryScreen=({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const dispatch = useDispatch()

    const [inventory, setInventory] = useState([])
    const [coinBalance, setCoinBalance] = useState();
    const [rubyBalance, setRubyBalance] = useState();

    useEffect(()=>{
        getDataInventory()
        retrieveCurrency()
    },[coinBalance, rubyBalance])

    const getDataInventory = async()=>{
        const inventoryData = await retrieveInventory(userUID);
        const itemNotPlace = [];
        inventoryData.all.forEach((element)=>{
            if(element.itemLocation == '0' || element.itemType == 'forUse'){
                itemNotPlace.push(element) 
            }
        })
        setInventory(itemNotPlace);
    }

    const retrieveCurrency = async () => {
        try {
            const currencyData = await retrieveCurrencyPet(userUID);
            if (currencyData) {
                setCoinBalance(currencyData.Money);
                setRubyBalance(currencyData.Ruby);
            } else {
                console.log("No currency data found.");
            }
        } catch (error) {
            console.error("Error retrieving currency data:", error);
        }
    };

    const handleItemPress = (item) => {
        let validateItemWall = true;
        let validateItemTable = true;

        if(item.itemType == "wall"){
            if(inventory.totalPositionWall == 6){
                Alert.alert("พื้นที่เต็มไม่สามารถวางเพิ่มได้")
                validateItemWall = false;
                return;
            }
        }
        if(item.itemType == "table"){
            if(inventory.totalPositionTable == 6){
                Alert.alert("พื้นที่เต็มไม่สามารถวางเพิ่มได้")
                validateItemTable = false;
                return;
            }
        }
        
        if(item.itemType == "wall"){
            if(validateItemWall){
                dispatch(setEditItemLocation(true))
                navigation.navigate('EditHomeScreen', { itemSelected: item});
            }
        }
        if(item.itemType == "table"){
            if(validateItemTable){
                dispatch(setEditItemLocation(true))
                navigation.navigate('EditHomeScreen', { itemSelected: item});
            }
        }
        
    };

    const renderItem = ({ item })=>{
        if(item.itemType == 'forUse'){
            return(
                <View style={{height:100,width:'35%',flexDirection:'row', marginBottom:15}}>
                    <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                        <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                            <Image source={{uri: item.itemPhotoURL}}
                                width={90} height={90} resizeMode="contain" style={{flex:1, margin:5}}></Image>
                        </View>
                    </Shadow>
                </View>
            ) 
        }
        else{
            return(
                <View style={{height:100,width:'35%',flexDirection:'row', marginBottom:15}}>
                    <Shadow  startColor={'#D2DBD6'} offset={[10, 10]}>
                        <View style={{height:'100%',width:'100%',backgroundColor:'#fffffa',borderColor:'black',borderWidth:1,borderRadius:15}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    handleItemPress(item);
                            }}>
                                <Image source={{uri: item.itemPhotoURL}}
                                width={90} height={90} resizeMode="contain" style={{flex:1, margin:5}}></Image>
                            </TouchableOpacity>
                        </View>
                    </Shadow>
                </View>
            ) 
        }
        
    }


    return(
        <SafeAreaView style={{ flex:1,backgroundColor:'#2C6264',paddingHorizontal:15,paddingVertical:5}}>
            <View style={{flexDirection:'row-reverse',height:35}}>
                <View style={{flexDirection:'row', width:'30%',height:'80%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa', marginLeft:5}}>
                    <Image source={{uri:'https://drive.google.com/uc?export=view&id=1JBKocVjx9NAa8p8kNwWc7NGTpgc39dIC'}}
                        width={25} height={25}>
                    </Image>
                    <Text style={{textAlignVertical:'center'}}>{rubyBalance}</Text>
                </View>
                <View style={{flexDirection:'row', width:'30%',height:'80%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa'}}>
                    <Image source={{uri:'https://drive.google.com/uc?export=view&id=1lB6vcCq3Kng3852LIrvXfM-W36guffFI'}}
                        width={25} height={25}>
                    </Image>
                    <Text style={{textAlignVertical:'center'}}>{coinBalance}</Text>
                </View>
                
            </View>
            <ScrollView style={{width:'100%',backgroundColor:'#FFFFFF',borderRadius:16}}>
                <FlatList style={{margin:10}}
                    data={inventory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    horizontal={false}
                    numColumns={3}
                />
            </ScrollView>
        </SafeAreaView>
    )
}