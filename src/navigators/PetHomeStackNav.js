import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { HomeScreen } from "../screens/pet/HomeScreen";
import { EditHomeScreen } from "../screens/pet/EditHomeScreen";
import { InventoryScreen } from "../screens/pet/InventoryScreen";
import { GoalNotificationScreen } from "../screens/pet/GoalNotificationScreen";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { retrieveAllDataPet } from "../firebase/UserModel";
import { setEditItemLocation } from "../redux/variableSlice";
import { PetQuestStackNav } from "./PetQuestStackNav";
import { PetBottomTabNav } from "./PetBottomTabNav";
export const PetHomeStackNav = ({navigation})=>{
    const Stack = createNativeStackNavigator()
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    
    const [petNameData, setPetNameData] = useState("")
    //const [hasNotification,setHasNotification] = useState(false)
    const hasNotification = useSelector(state => state.variables.hasNotification);
    
    useEffect(() => {
        getNameData()
        
    }, [isUpdate,hasNotification]);   

    const getNameData = async()=>{
        try{
            const itemAllDataPet = await retrieveAllDataPet(userUID)
            setPetNameData(itemAllDataPet.petName)
            
        }catch (error) {
            console.error('Error getNameData:', error);
        }  
    }

    return(
    <Stack.Navigator
      initialRouteName="HomeScreen"
      //initialParams={{ hasNotification: hasNotification }}
    >
        <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{ 
                header: ({navigation}) => (
                    
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                       

                        <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginLeft:50}}>House of {petNameData}</Text>

                        <TouchableOpacity style={{width:35, marginRight:15}}
                            onPress={()=>{
                            navigation.navigate('GoalNotificationScreen');
                            }}
                        >   
                        {hasNotification ? (
                            <Image 
                                source={require('../assets/petBottomTab/notificationRedIcon.png')} 
                                style={{ width: 32, height: 32, marginRight:'10%'}} 
                            />
                            ) : 
                            <Image 
                                source={require('../assets/petBottomTab/notificationIcon.png')} 
                                style={{ width: 32, height: 32, marginRight:'10%'}} 
                            />
                        }    
                        </TouchableOpacity>
                    </View>
                )
            }} 
        />

        <Stack.Screen
            name='EditHomeScreen'
            component={EditHomeScreen}
            options={{
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                            dispatch(setEditItemLocation(false));
                            navigation.navigate('HomeScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>House of {petNameData}</Text>
                    </View>
                )
            }}
        />

        <Stack.Screen
            name='InventoryScreen'
            component={InventoryScreen}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('EditHomeScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>Inventory</Text>
                    </View>
                )
            }}
        />

        <Stack.Screen
            name='GoalNotificationScreen' 
            component={GoalNotificationScreen}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('HomeScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>Notification</Text>
                    </View>
                )
            }}
        />
        <Stack.Screen name="PetQuestStackNav" component={PetQuestStackNav}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="PetBottomTabNav" component={PetBottomTabNav}
            options={{ headerShown: false }}
        />
        



    </Stack.Navigator>
  )
}