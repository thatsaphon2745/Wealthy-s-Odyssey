import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { addPetName, addRandomQuest, newCurrentQuestTime, newStampQuestTime } from "../../firebase/UserModel";
import { setIsUpdate } from "../../redux/variableSlice";
import { retrieveAllDataPet, addLastedDate } from "../../firebase/UserModel";

export const EnterNameScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({ value: '' });
    const [petImageData, setPetImageData] = useState(null);

    const isUpdate = useSelector((state) => state.variables.isUpdate);
    const user = useSelector((state) => state.auths);
    const userUID = user[0].uid;
    const totalGuage = useSelector(state => state.variables.totalGuage);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        getImageData();
    }, [isUpdate]);

    const getImageData = async () => {
        try {
            const itemAllDataPet = await retrieveAllDataPet(userUID);
            setPetImageData(itemAllDataPet);
        } catch (error) {
            console.error('Error getImageData:', error);
        }
    };

    const setValue = (text) => {
        setInput(oldValue => ({
            ...oldValue,
            value: text
        }))
    };

    const handleAddPetName = () => {
        if (input.value.trim() === "") {
            Alert.alert('กรุณาระบุชื่อ');
        } else {
            input.value = input.value.trim();
            if(input.value.length <= 24){
                addPetName(userUID, input)
                addLastedDate(userUID, formattedDate)
                addRandomQuest(userUID)
                newCurrentQuestTime(userUID,formattedDate)
                newStampQuestTime(userUID,formattedDate)
                    .then(() => {
                        dispatch(setIsUpdate(!isUpdate));
                        setTimeout(() => {
                            navigation.navigate('ExpainingScreen');
                        }, 700);
                    })
                    .catch(error => {
                        console.error('Error adding pet name:', error);
                    });
            }else{
                Alert.alert('กรุณาตั้งชื่อไม่เกิน 24 ตัวอักษร')
            }
        }
    };

    let selectedPetImageIndex = 0;
    if (totalGuage > 7) {
        selectedPetImageIndex = 2;
    } else if (totalGuage > 4) {
        selectedPetImageIndex = 1;
    }

    return (
        <ScrollView style={{ height:1000, backgroundColor: '#2C6264' }}>
            <View style={{ height: 250, justifyContent: 'center', alignContent: 'center', flexDirection: 'row'}}>
                <Text style={{ fontFamily: 'ZenOldMincho-Bold', fontSize: 36, color: '#FFFFFF', textAlign: 'center', paddingHorizontal: 70, paddingTop: 80 }}>นี้คืออสูรเงินฝากของคุณ!</Text>
            </View>
            <View style={{ height: 250, justifyContent: 'center', alignContent: 'center', flexDirection: 'row'}}>
                <View style={{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    borderWidth: 6, borderColor: '#0ABAB5',
                    width: Dimensions.get('window').width * 0.5,
                    height: Dimensions.get('window').width * 0.5,
                    backgroundColor: '#FFFFFF',
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: '#FFFFFF',
                    shadowOffset: {
                        width: 0,
                        height: 9,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,
                    elevation: 18
                }}>
                    {petImageData ? (
                        <Image source={{ uri: petImageData.petImage }} style={{ width: 250, height: 250, justifyContent: 'center', alignContent: 'center' }} />
                    ) : null}
                </View>
            </View>
            <View style={{ height: 210, justifyContent: 'center', alignContent: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#000000', backgroundColor: '#0ABAB5' }}>
                <View style={{ flex: 1, borderWidth: 1, borderColor: '#000000', borderRadius: 15, marginVertical: 12, marginHorizontal: 5, backgroundColor: '#ffffff' }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10, paddingTop: 1 }}>
                        <Text style={{ flex: 1, fontFamily: 'ZenOldMincho-Regular', fontSize: 24, color: '#000000', textAlign: 'center', textAlignVertical: 'center' }}>อยากตั้งชื่ออะไรดีละ!</Text>
                        <View style={{ flex: 1, borderWidth: 1, borderColor: '#000000', borderRadius: 15, marginVertical: 12, marginHorizontal: 5, backgroundColor: '#ffffff' }}>
                            <TextInput style={{ height: 50, width: 250, borderRadius: 16, backgroundColor: '#ffffff', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                placeholder='Name*'
                                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                keyboardType='default'
                                underlineColor='transparent'
                                activeUnderlineColor="transparent"
                                cursorColor="gray"
                                value={input.value}
                                onChangeText={(text) => { setValue(text) }}
                            />
                        </View>
                        <View style={{ flex: 1}}>
                            <TouchableOpacity style={{ flex: 1}} onPress={handleAddPetName}>
                                <Text style={{ fontFamily: 'ZenOldMincho-Black', fontSize: 20, color: '#0ABAB5',paddingTop:5}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};
