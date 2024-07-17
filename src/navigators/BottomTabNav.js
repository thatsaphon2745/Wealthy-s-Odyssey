import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity } from "react-native"
import { PetScreen } from '../screens/main/PetScreen';
import { MoreScreen } from '../screens/main/MoreScreen';
import { IncomeStackNav } from './IncomeStackNav';
import { OverviewStackNav } from './OverviewStackNav';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpdate } from '../redux/variableSlice';


export const BottomTabNav = ({navigation})=>{
    const BottomTab = createBottomTabNavigator()
    const dispatch = useDispatch()
    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    return(
        <BottomTab.Navigator
            initialRouteName='OverviewStackNav'
            
            screenOptions={{
                headerStyle:{
                    height:80,
                    backgroundColor:'#0ABAB5',
                },
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontSize:24,
                    fontFamily:'ZenOldMincho-Bold',
                    color:'#ffffff'
                },
                tabBarStyle:{
                    height:'8%',
                },
            }}
        >
            <BottomTab.Screen name="OverviewStackNav" component={OverviewStackNav}
            options={{
                title:'Overview',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/overviewIconFocus.png') : require('../assets/overviewIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>Overview</Text>
                  )
                },
                headerShown:false,
                
            }}
            listeners={() => ({
              tabPress: (e) => {
                e.preventDefault(); // Prevent default action
                dispatch(setIsUpdate(!isUpdate))
                navigation.navigate('OverviewScreen') // Replace the current screen with "Pet" screen in the stack
              },
            })}
            />

            <BottomTab.Screen name="IncomeStackNav" component={IncomeStackNav} 
            options={{
                title:'Financial',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/financialIconFocus.png') : require('../assets/financialIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>Financial</Text>
                  )
                },
                headerShown:false
            }}
            />

            <BottomTab.Screen name="Pet" component={PetScreen}
            options={{
                title:'Pet',
                tabBarIcon:({focused, color, size})=>{
                    return(
                        <Image source={require('../assets/petIcon.png')} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>Pet</Text>
                  )
                },
                headerShown: false,  
                
            }}
            listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault(); // Prevent default action
                  navigation.push('PetStackNav'); // Replace the current screen with "Pet" screen in the stack
                },
              })}
            />

            <BottomTab.Screen name="More" component={MoreScreen}
            options={{
                title:'More',
                tabBarIcon:({focused, color, size})=>{
                    const iconSource = focused ? require('../assets/moreIconFocus.png') : require('../assets/moreIcon.png');
                    return(
                        <Image source={iconSource} style={{ width: 32, height: 32, marginTop:'5%' }} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontSize:14, fontFamily: focused ? 'ZenOldMincho-Bold' : 'ZenOldMincho-Regular'}} color={color} size={size}>More</Text>
                  )
                },
                headerShown:false,
            }}
            />

        </BottomTab.Navigator>
    )
}