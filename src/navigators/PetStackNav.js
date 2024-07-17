import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { EnterPetScreen } from '../screens/pet/EnterPetScreen'
import { EnterNameScreen } from "../screens/pet/EnterNameScreen";
import { ExpainingScreen } from "../screens/pet/ExpainingScreen";
import { TaptoStartScreen } from "../screens/pet/TaptoStartScreen";
import { PetBottomTabNav } from "./PetBottomTabNav";

export const PetStackNav = ()=>{
  const Stack = createNativeStackNavigator()

  return(
    <Stack.Navigator
      initialRouteName="EnterPetScreen" 
    >
      <Stack.Screen
        name='EnterPetScreen'
        component={EnterPetScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='EnterNameScreen'
        component={EnterNameScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='ExpainingScreen'
        component={ExpainingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='TaptoStartScreen'
        component={TaptoStartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='PetBottomTabNav'
        component={PetBottomTabNav}
        options={{ headerShown: false }}
      />





    </Stack.Navigator>
  )
}