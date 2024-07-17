import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllDataPet } from '../../firebase/UserModel';
import { addPetImage } from '../../firebase/UserModel';
import { addPetImages } from '../../firebase/UserModel';
import { setTotalGuage } from '../../redux/variableSlice';
import { setTotalDifferenceDate, setEditItemLocation } from '../../redux/variableSlice';
import { addOnePetImage } from '../../firebase/UserModel';
import { addLastedDate } from '../../firebase/UserModel';

export const EnterPetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [petNameExists, setPetNameExists] = useState(null);
  const [tapText, setTapText] = useState('');
  const [differenceDate, setDifferenceDate] = useState('');
  
  const guageValues = useSelector(state => state.variables); 

  const { guageWealth, guageRiability } = guageValues || {};
  const totalGuage = (guageWealth * 0.4) + (guageRiability * 0.6);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  console.log('Guage Wealth:', guageWealth);
  console.log('Guage Riability:', guageRiability);
  console.log('Total Guage in EnterPetScreen:', totalGuage);

  const user = useSelector((state) => state.auths);
  const userUID = user[0].uid;

  const checkPetName = async () => {
    try {
      const PetData = await retrieveAllDataPet(userUID);
      setPetNameExists(PetData.petName || '');
      setTapText(PetData.petName ? 'Tap to Start...' : 'Tap to Hatching...');
      setDifferenceDate(findDateDifference(formattedDate, PetData.lastedDate));
      console.log('PetData:', PetData.lastedDate);
      console.log('DateDifference:',findDateDifference(formattedDate, PetData.lastedDate));
      //console.log('PetNameExists:',petNameExists)
    } catch (error) {
      console.error('Error checking pet name:', error);
    }
  };

  useEffect(() => {
    dispatch(setEditItemLocation(false));
    checkPetName();
    dispatch(setTotalGuage(totalGuage));
  }, []);

  function findDateDifference(nowDate, oldDate) {
    if(nowDate !== undefined && oldDate !== undefined){
        // แยกปี, เดือน, และวันออกจาก string วันที่
        const [nowYear, nowMonth, nowDay] = nowDate.split('-').map(Number);
        const [oldYear, oldMonth, oldDay] = oldDate.split('-').map(Number);
    
        // สร้างวัตถุ Date สำหรับวันที่ปัจจุบันและวันที่เก่า
        const nowDateObj = new Date(nowYear, nowMonth - 1, nowDay); // เดือนต้องลบ 1 เนื่องจากเดือนใน JavaScript เริ่มนับจาก 0
        const oldDateObj = new Date(oldYear, oldMonth - 1, oldDay);
    
        // หาความแตกต่างในวัน
        const differenceTime = nowDateObj.getTime() - oldDateObj.getTime();
        const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24)); // หาผลต่างของวันที่เป็นจำนวนวัน
    
        return differenceDays; 
    }
  }
  
  
  const handleTapToHatching = async () => {
    dispatch(setTotalDifferenceDate(differenceDate ? differenceDate : 0));
    const allPetImages = [
        [
          //bear
            "https://drive.google.com/uc?export=view&id=1mcYmgRiSPdgie2sAMjOSbJ1Ir04I2lx1",
            "https://drive.google.com/uc?export=view&id=1C51dbKSProDXq8IsQRGAn3AO_gRAYJKs",
            "https://drive.google.com/uc?export=view&id=1mUsBZlZtYXQrLdQ6BbO3IsaZpSdQNQ9X"
        ],
        [
          //cat
            "https://drive.google.com/uc?export=view&id=1N5gYRqkgB6lYguJ-yoA8fmmHyDtzd9tO",
            "https://drive.google.com/uc?export=view&id=1pRg9Ti7eMpWxz7zUwXI4iN5BvVelxx7i",
            "https://drive.google.com/uc?export=view&id=11PLNBtnHUaKJtHisN6WuUxesut1zym6M"
        ],
        [
          //devil
            "https://drive.google.com/uc?export=view&id=1kT-sg4RXybRN_T1sgKqWHpFoTglnjyr2",
            "https://drive.google.com/uc?export=view&id=16gezCcgH_ciEz3dXm55e2ddntPQozQAw",
            "https://drive.google.com/uc?export=view&id=15QTNVBqM5LAwak-8ytPMge2ux_TyZC5L"
        ],
        [
          //penguin
            "https://drive.google.com/uc?export=view&id=1r7Py2Xy1R_-hznjJ8g_novbwuyP7vk6c",
            "https://drive.google.com/uc?export=view&id=1pldUhs7tULbFZEmlNf3gQIYPW9S9uSaW",
            "https://drive.google.com/uc?export=view&id=1tp9RZpl8Ccvzxf1bky9QSN0duCv_Qq4T"
        ],
    ];

    const randomIndex = Math.floor(Math.random() * allPetImages.length);
    const selectedPetImages = allPetImages[randomIndex];

    if (petNameExists === '') {
        try {
            await addPetImages(userUID, selectedPetImages);
            await addOnePetImage(userUID, selectedPetImages[0])
            addLastedDate(userUID, formattedDate)
            if(tapText == 'Tap to Hatching...'){
              navigation.navigate('EnterNameScreen');
            }
        } catch (error) {
            console.error('Error adding pet images:', error);
            Alert.alert('Failed to add pet images. Please try again.');
        }
    } else {
        if(differenceDate >= 7){
          navigation.navigate('ExpainingScreen');
        }else{
          navigation.navigate('PetBottomTabNav');
        }
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0ABAB5' }}>
      <View style={{ flex: 1, alignItems: 'flex-end', padding: '2%' }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={require('../../assets/exitIcon.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 25,
          margin: 5,
          borderWidth: 1,
          borderColor: '#000000',
          backgroundColor: '#ffffff',
          borderRadius: 9,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontFamily: 'ZenOldMincho-Bold',
              fontSize: 48,
              color: '#000000',
              textAlign: 'center',
              paddingHorizontal: 10,
              paddingTop: 5,
            }}
          >
            Money Monster
          </Text>
          <Text
            style={{
              fontFamily: 'ZenOldMincho-Regular',
              fontSize: 24,
              color: '#0ABAB5',
              textAlign: 'center',
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            อสูรเงินฝาก
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'Top', alignContent: 'Top', flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
            <View
              style={{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                borderWidth: 1,
                borderColor: '#000000',
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').width * 0.5,
                backgroundColor: '#0ABAB5',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/petAssets/Pet_8.png')}
                style={{ width: 250, height: 250, justifyContent: 'center', alignContent: 'center' }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity 
            style={{ flex: 1 }}
            onPress={handleTapToHatching}
            >
            <Text
                style={{
                fontFamily: 'ZenOldMincho-Black',
                fontSize: 24,
                color: '#000000',
                textAlign: 'center',
                paddingTop: 20,
                }}
            >
                {tapText}
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
