import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { OverviewScreen } from "../screens/main/OverviewScreen";
import { OverviewGuideScreen } from "../screens/main/OverviewGuideScreen";
import { View, TouchableOpacity, Image, Text } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';

export const OverviewStackNav = ({navigation})=>{
  const Stack = createNativeStackNavigator()
  const isUpdate = useSelector((state)=>state.variables.isUpdate);

    return(
        <Stack.Navigator
        initialRouteName="OverviewScreen" 
        >
            <Stack.Screen
                name='OverviewScreen'
                component={OverviewScreen}
                options={{ 
                    header: () => (
                        <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                            <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center'}}>Overview</Text>
                        </View>
                    )
                }}
                
            />

            <Stack.Screen
                name='OverviewGuideScreen'
                component={OverviewGuideScreen}
                options={{
                header: () => (
                    <View style={{ flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center'}}>
                    <TouchableOpacity style={{width:35, marginLeft:15}}
                        onPress={()=>{
                        navigation.navigate('OverviewScreen');
                        }}
                    >
                        <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                    </TouchableOpacity>

                    <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center', marginRight:50}}>Overview</Text>
                    </View>
                )
                }}
            />
        </Stack.Navigator>
    )
}