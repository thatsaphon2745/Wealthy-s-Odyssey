import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/main/SplashScreen';
import { SignInScreen } from '../screens/main/SignInScreen';
import { SignUpScreen } from '../screens/main/SignUpScreen';
import { SelectSignInSignUpScreen } from '../screens/main/SelectSignInSignUpScreen';
import { PetStackNav } from "./PetStackNav";
import { BottomTabNav } from './BottomTabNav';
import { ForgetPasswordScreen } from "../screens/main/ForgetPasswordScreen";
import { ChangePasswordScreen } from "../screens/main/ChangePasswordScreen";
import { MoreScreen } from "../screens/main/MoreScreen";

export const StackNav = ()=>{
  const Stack = createNativeStackNavigator()

  return(
    <Stack.Navigator
      initialRouteName="SplashScreen" 
    >
      {/* Splash Screen */}
      <Stack.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SelectSignInSignUpScreen'
        component={SelectSignInSignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SignInScreen'
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      {/* BottomTabNav */}
      <Stack.Screen
        name='BottomTabNav'
        component={BottomTabNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='PetStackNav'
        component={PetStackNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='ForgetPasswordScreen'
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='ChangePasswordScreen'
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='MoreScreen'
        component={MoreScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}