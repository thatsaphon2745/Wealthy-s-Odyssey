import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { GameQuest } from "../screens/pet/GameQuest";
import { AddGoalScreen } from "../screens/pet/AddGoalScreen";
import { CategoryGoal } from "../screens/pet/CategoryGoal";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { GoalNotificationScreen } from "../screens/pet/GoalNotificationScreen";
import { useSelector, useDispatch} from 'react-redux';

export const PetQuestStackNav = ({navigation})=>{
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator()
  const hasNotification = useSelector(state => state.variables.hasNotification);
  const isUpdate = useSelector((state)=>state.variables.isUpdate);
  const cameFromNoti = useSelector(state => state.variables.cameFromNoti);
  
  return(
    <Stack.Navigator
      initialRouteName="GameQuest" 
    >
        <Stack.Screen
            name='GameQuest'
            component={GameQuest}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                       

                        <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginLeft:50}}>ภารกิจ</Text>

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
            name='AddGoalScreen'
            component={AddGoalScreen}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('GameQuest');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>เป้าหมายส่วนตัว</Text>
                    </View>
                )
            }}
        />

        <Stack.Screen
            name='CategoryGoal'
            component={CategoryGoal}
            options={{ 
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('AddGoalScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>เป้าหมายส่วนตัว</Text>
                    </View>
                )
            }}
        />


    </Stack.Navigator>
  )
}