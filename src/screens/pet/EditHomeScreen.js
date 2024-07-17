import React, { useEffect } from "react";
import { View,ImageBackground, Image, TouchableOpacity, Text, Alert } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { setEditItemLocation, setIsUpdateItemPet, setPressInventory } from "../../redux/variableSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { retrieveInventory } from "../../firebase/RetrieveData";
import { updateLocationItem } from "../../firebase/UserModel";

export const EditHomeScreen =({navigation, route})=>{

    useEffect(()=>{
        findLocationItem();
    },[itemInventory])

    useEffect(()=>{
        const item = route.params?.itemSelected;
        setItemSelected(item);
        placeItem(item);
    },[route.params?.itemSelected, editItemLocation])


    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const isUpdateItemPet = useSelector((state)=>state.variables.isUpdateItemPet);
    const pressInventory = useSelector((state)=>state.variables.pressInventory);

    const dispatch = useDispatch()
    const editItemLocation = useSelector((state)=>state.variables.editItemLocation);
    const [itemSelected, setItemSelected] = useState()
    const [itemWall1, setItemWall1] = useState();
    const [itemWall2, setItemWall2] = useState();
    const [itemWall3, setItemWall3] = useState();
    const [itemWallSelected1, setItemWallSelected1] = useState();
    const [itemWallSelected2, setItemWallSelected2] = useState();
    const [itemWallSelected3, setItemWallSelected3] = useState();
    const [itemTable1, setItemTable1] = useState();
    const [itemTable2, setItemTable2] = useState();
    const [itemTable3, setItemTable3] = useState();
    const [itemTableSelected1, setItemTableSelected1] = useState();
    const [itemTableSelected2, setItemTableSelected2] = useState();
    const [itemTableSelected3, setItemTableSelected3] = useState();
    const [itemInventory, setItemInventory] = useState();

    const findLocationItem = async()=>{
        const inventory =  await retrieveInventory(userUID);
        setItemInventory(inventory);
        inventory.table.forEach((element)=>{
            if(element.itemLocation == '1'){
                setItemTable1(element);
            }
            if(element.itemLocation == '2'){
                setItemTable2(element);
            }
            if(element.itemLocation == '3'){
                setItemTable3(element);
            }
        })
        inventory.wall.forEach((element)=>{
            if(element.itemLocation == '1'){
                setItemWall1(element);
            }
            if(element.itemLocation == '2'){
                setItemWall2(element);
            }
            if(element.itemLocation == '3'){
                setItemWall3(element);
            }
        })
    }

    const placeItem = (item)=>{
        console.log(item);
        console.log(editItemLocation);
        if(editItemLocation){
            if(item.itemType == 'table'){
                if(itemTable1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemTableSelected1(item);
                    setItemTableSelected2();
                    setItemTableSelected3();
                }
                else if(itemTable2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemTableSelected2(item);
                    setItemTableSelected1();
                    setItemTableSelected3();
                }
                else if(itemTable3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemTableSelected3(item);
                    setItemTableSelected1();
                    setItemTableSelected2();
                }
            }

            if(item.itemType == 'wall'){
                if(itemWall1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemWallSelected1(item);
                    setItemWallSelected2();
                    setItemWallSelected3();
                }
                else if(itemWall2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemWallSelected2(item);
                    setItemWallSelected1();
                    setItemWallSelected3();
                }
                else if(itemWall3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemWallSelected3(item);
                    setItemWallSelected1();
                    setItemWallSelected2();
                }
            }
            
        }
    }

    const handleItemRightLocation = ()=>{
        if(itemSelected.itemType == 'table'){
            if(itemTableSelected1){
                if(itemTable2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemTableSelected2(itemTableSelected1);
                    setItemTableSelected1();
                    
                }
                else if(itemTable3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemTableSelected3(itemTableSelected1);
                    setItemTableSelected1();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemTableSelected2){
                if(itemTable3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemTableSelected3(itemTableSelected2);
                    setItemTableSelected2();
                }
                else if(itemTable1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemTableSelected1(itemTableSelected2);
                    setItemTableSelected2();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemTableSelected3){
                if(itemTable1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemTableSelected1(itemTableSelected3);
                    setItemTableSelected3();
                }
                else if(itemTable2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemTableSelected2(itemTableSelected3);
                    setItemTableSelected3();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
        }

        if(itemSelected.itemType == 'wall'){
            if(itemWallSelected1){
                if(itemWall2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemWallSelected2(itemWallSelected1);
                    setItemWallSelected1();
                    
                }
                else if(itemWall3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemWallSelected3(itemWallSelected1);
                    setItemWallSelected1();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemWallSelected2){
                if(itemWall3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemWallSelected3(itemWallSelected2);
                    setItemWallSelected2();
                }
                else if(itemWall1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemWallSelected1(itemWallSelected2);
                    setItemWallSelected2();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemWallSelected3){
                if(itemWall1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemWallSelected1(itemWallSelected3);
                    setItemWallSelected3();
                }
                else if(itemWall2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemWallSelected2(itemWallSelected3);
                    setItemWallSelected3();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
        }
        
    }

    const handleItemLeftLocation = ()=>{
        if(itemSelected.itemType == 'table'){
            if(itemTableSelected1){
                if(itemTable3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemTableSelected3(itemTableSelected1);
                    setItemTableSelected1();
                }
                else if(itemTable2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemTableSelected2(itemTableSelected1);
                    setItemTableSelected1();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemTableSelected2){
                if(itemTable1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemTableSelected1(itemTableSelected2);
                    setItemTableSelected2();
                }
                else if(itemTable3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemTableSelected3(itemTableSelected2);
                    setItemTableSelected2();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemTableSelected3){
                if(itemTable2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemTableSelected2(itemTableSelected3);
                    setItemTableSelected3();
                }
                else if(itemTable1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemTableSelected1(itemTableSelected3);
                    setItemTableSelected3();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
        }

        if(itemSelected.itemType == 'wall'){
            if(itemWallSelected1){
                if(itemWall3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemWallSelected3(itemWallSelected1);
                    setItemWallSelected1();
                }
                else if(itemWall2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemWallSelected2(itemWallSelected1);
                    setItemWallSelected1();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemWallSelected2){
                if(itemWall1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemWallSelected1(itemWallSelected2);
                    setItemWallSelected2();
                }
                else if(itemWall3 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 3
                    }));
                    setItemWallSelected3(itemWallSelected2);
                    setItemWallSelected2();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
            if(itemWallSelected3){
                if(itemWall2 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 2
                    }));
                    setItemWallSelected2(itemWallSelected3);
                    setItemWallSelected3();
                }
                else if(itemWall1 == undefined){
                    setItemSelected(prevItem => ({
                        ...prevItem,
                        itemLocation: 1
                    }));
                    setItemWallSelected1(itemWallSelected3);
                    setItemWallSelected3();
                }
                else{
                    Alert.alert('พื้นที่เต็ม ไม่สามารถเคลื่อนย้ายได้')
                }
            }
        }
        
    }

    const handleItemPress = (item)=>{
        const newItem = {
            itemLocation: 0,
            itemName: item.itemName,
            itemPhotoURL: item.itemPhotoURL,
            itemType: item.itemType,
            itemSoldoutURL: item.itemSoldoutURL
        };
        updateLocationItem(userUID,item, newItem, dispatch);
        
        if(item.itemType == 'table'){
            if(item.itemLocation == '1'){
                setItemTable1();
            }
            if(item.itemLocation == '2'){
                setItemTable2();
            }
            if(item.itemLocation == '3'){
                setItemTable3();
            }
        }
        if(item.itemType == 'wall'){
            if(item.itemLocation == '1'){
                setItemWall1();
            }
            if(item.itemLocation == '2'){
                setItemWall2();
            }
            if(item.itemLocation == '3'){
                setItemWall3();
            }
        }
        setTimeout(() => {
            dispatch(setIsUpdateItemPet(!isUpdateItemPet))
        }, 2000);
        
    }

    const handleConfirmPress = ()=>{
        dispatch(setPressInventory(false));
        //console.log(itemSelected)
        const newItem = {
            itemLocation: itemSelected.itemLocation,
            itemName: itemSelected.itemName,
            itemPhotoURL: itemSelected.itemPhotoURL,
            itemType: itemSelected.itemType,
            itemSoldoutURL: itemSelected.itemSoldoutURL
        };
        const previousItem = {
            itemLocation: 0,
            itemName: itemSelected.itemName,
            itemPhotoURL: itemSelected.itemPhotoURL,
            itemType: itemSelected.itemType,
            itemSoldoutURL: itemSelected.itemSoldoutURL
        };
        
        updateLocationItem(userUID,previousItem, newItem, dispatch);
        if(itemSelected.itemType == 'table'){
            if(itemSelected.itemLocation == '1'){
                setItemTableSelected1();
                setItemTable1(itemSelected);
            }
            if(itemSelected.itemLocation == '2'){
                setItemTableSelected2();
                setItemTable2(itemSelected);
            }
            if(itemSelected.itemLocation == '3'){
                setItemTableSelected3();
                setItemTable3(itemSelected);
            }
        }
        if(itemSelected.itemType == 'wall'){
            if(itemSelected.itemLocation == '1'){
                setItemWallSelected1();
                setItemWall1(itemSelected);
            }
            if(itemSelected.itemLocation == '2'){
                setItemWallSelected2();
                setItemWall2(itemSelected);
            }
            if(itemSelected.itemLocation == '3'){
                setItemWallSelected3();
                setItemWall3(itemSelected);
            }
        }
        dispatch(setEditItemLocation(false))
        setTimeout(() => {
            dispatch(setIsUpdateItemPet(!isUpdateItemPet))
        }, 2000);
    }

    const componentItem = (item)=>{
        if(item.itemType == 'table'){
            return(
                <TouchableOpacity onPress={()=>{handleItemPress(item)}}>
                    <Image source={{uri:item.itemPhotoURL}}
                        width={65} height={65} resizeMode="contain">
                    </Image>
                </TouchableOpacity>
            )
        }
        if(item.itemType == 'wall'){
            return(
                <TouchableOpacity  style={{marginLeft:8}}
                    onPress={()=>{handleItemPress(item)}}
                >
                    <Image source={{uri:item.itemPhotoURL}}
                        width={90} height={90} resizeMode="contain">
                    </Image>
                </TouchableOpacity>
            )
        }
        
    }
    
    const componentEditItem = ()=>{
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <View style={{flex:1, alignItems:'center'}}>
                            <TouchableOpacity style={{width:30, height:30, backgroundColor:'#ffffff'}}
                                onPress={()=>{
                                    handleItemLeftLocation();
                                }}
                            >
                                <IconAntDesign name="leftsquare" size={30} color="#000000"/>
                            </TouchableOpacity>
                        </View>     

                        <View style={{flex:1, alignItems:'center'}}>
                            <TouchableOpacity style={{backgroundColor:'#0ABAB5', borderWidth:2, padding:3, borderColor:'#ffffff'}}
                                onPress={()=>{
                                    handleConfirmPress();
                                }}
                            >
                                <Text style={{fontFamily: 'ZenOldMincho-Regular', fontSize:25, color:'#ffffff'}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1, alignItems:'center'}}>
                            <TouchableOpacity style={{width:30, height:30, backgroundColor:'#ffffff'}}
                                onPress={()=>{
                                    handleItemRightLocation();
                                }}
                            >
                                <IconAntDesign name="rightsquare" size={30} color="#000000"/>
                            </TouchableOpacity>
                        </View>
            </View>
        )
    }

    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:'https://drive.google.com/uc?export=view&id=1gYEKR3keA_NJQlEE0WRp7zB2770DCsgG'}}
            resizeMode="cover" style={{flex: 1}}>
                <View style={{flex:1,margin:5}}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        <TouchableOpacity  
                            onPress={()=>{
                                dispatch(setEditItemLocation(false));
                                if(pressInventory){
                                    navigation.navigate('InventoryScreen');
                                }
                                
                        }}
                        >
                            <Image source={{uri:'https://drive.google.com/uc?export=view&id=199LxW6_qmtU11-t4OBup9riBcQ1eN5XR'}}
                                width={55} height={55}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:8}}>
                        {/* itemType: wall */}
                        <View style={{flex:1.5, flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                
                            </View>
                            <View style={{flex:3, flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    {/* item ชิ้นที่ 1*/}
                                    <View style={{flex:1}}>
                                        {itemWall1 ? componentItem(itemWall1) : itemWallSelected1 ? componentItem(itemWallSelected1) : <View></View>}
                                    </View>
                                   
                                    {/* item ชิ้นที่ 2*/}
                                    <View style={{flex:1}}>
                                        {itemWall2 ? componentItem(itemWall2) : itemWallSelected2 ? componentItem(itemWallSelected2) : <View></View>}
                                    </View>
                                </View>

                                <View style={{flex:1, justifyContent:'center'}}>
                                    {/* item ชิ้นที่ 3*/}
                                        {itemWall3 ? componentItem(itemWall3) : itemWallSelected3 ? componentItem(itemWallSelected3) : <View></View>}
                                </View>
                                
                            </View>
                            <View style={{flex:2}}>
                                
                            </View>
                        </View>
                        {/* itemType: table */}
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1.5, flexDirection:'row', marginBottom:20}}>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable1 ? componentItem(itemTable1) : itemTableSelected1 ? componentItem(itemTableSelected1) : <View></View>}
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable2 ? componentItem(itemTable2) : itemTableSelected2 ? componentItem(itemTableSelected2) : <View></View>}
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable3 ? componentItem(itemTable3) : itemTableSelected3 ? componentItem(itemTableSelected3) : <View></View>}
                                </View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                        <View style={{flex:1}}>

                        </View>

                    </View>
                    <View style={{flex:1}}>
                        {editItemLocation ? componentEditItem() : <View></View>}
                        
                    </View>
                </View>
                
            </ImageBackground>
        </View>
    )
}