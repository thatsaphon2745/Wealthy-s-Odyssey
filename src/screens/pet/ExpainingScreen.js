import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, TouchableHighlight} from 'react-native';
import { PetBottomTabNav } from "../../navigators/PetBottomTabNav";
import { TextInput} from "react-native-paper";
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import { addLastedDate, addPetName } from "../../firebase/UserModel";
import { setIsUpdate } from "../../redux/variableSlice";
import { retrieveAllDataPet, addOnePetImage } from "../../firebase/UserModel";
import { addDownGradeCardtoFalse, addDownGradeCardtoTrue } from "../../firebase/UserModel";
import { setTotalDownGradeCardValue } from "../../redux/variableSlice";

export const ExpainingScreen = ({navigation})=>{
    const dispatch = useDispatch()
    const [input,setInput] = useState({value:''})
    const [petImageData, setPetImageData] = useState();
    const [updateImage, setUpdateImage] = useState('');
    const [downGradeCardValue, setDownGradeCardValue] = useState();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const totalGuage = useSelector(state => state.variables.totalGuage);
    console.log('Total Guage in ExpainingScreen:', totalGuage);

    const totalDifferenceDate = useSelector(state => state.variables.totalDifferenceDate);
    console.log('differenceDate in ExpainingScreen:', totalDifferenceDate);

    useEffect(() => {
        getImageData()
        //calculateDate()
    }, [isUpdate, updateImage]);   

    useEffect(() => {
        if (petImageData && petImageData.downGradeCard !== undefined) {
            setDownGradeCardValue(petImageData.downGradeCard);
        }
    }, [petImageData]);
    
    useEffect(() => {
        console.log("downGradeCardValue updated:", downGradeCardValue);
    }, [downGradeCardValue]);

    const getImageData = async()=>{
        try{
            const itemAllDataPet = await retrieveAllDataPet(userUID)
            //console.log('itemAllDataPet value:', itemAllDataPet);
            setPetImageData(itemAllDataPet)
            calculateDate(itemAllDataPet)
            
        }catch (error) {
            console.error('Error getImageData:', error);
        }  
    }

    const setValue = (text) => {
        setInput(oldValue => ({
            ...oldValue,
            value:text
        }))
    }

    const calculateDate = (petImageData) => {
        //console.log('petImageData downGradeCard:', petImageData.downGradeCard);
        //console.log('petImageData all value:', petImageData);
        if(petImageData.downGradeCard === false){
            console.log("downGradeCard is false (ไม่มีบัตรกันลดขั้น)",petImageData.downGradeCard)
            if (totalDifferenceDate >= 7){
                if (totalGuage > 7) {
                    setUpdateImage(petImageData.petImages[2])
                    addOnePetImage(userUID, petImageData.petImages[2])
                    addLastedDate(userUID, formattedDate)
                } else if (totalGuage > 4) {
                    setUpdateImage(petImageData.petImages[1])
                    addOnePetImage(userUID, petImageData.petImages[1])
                    addLastedDate(userUID, formattedDate)
                } else {
                    //console.log('setUpdateImage:', petImageData);
                    setUpdateImage(petImageData.petImages[0])
                    addOnePetImage(userUID, petImageData.petImages[0])
                    addLastedDate(userUID, formattedDate)
                }
            }else{
                setUpdateImage(petImageData.petImage)
            }
        }else{
            console.log("downGradeCard is true (ใช้บัตรกันลดขั้น): ",petImageData.downGradeCard)
            if (totalDifferenceDate >= 7){
                if (petImageData.petImage === petImageData.petImages[2] || totalGuage > 7) {
                    setUpdateImage(petImageData.petImages[2])
                    addOnePetImage(userUID, petImageData.petImages[2])
                    addLastedDate(userUID, formattedDate)
                    if(totalGuage <= 7){ //ใช้บัตรกันลดขั้นทันที -> เปลี่ยน downGradeCard เป็น false ใน HomeScreen
                        dispatch(setTotalDownGradeCardValue(downGradeCardValue))
                    }                                 

                } else if (petImageData.petImage === petImageData.petImages[1] || totalGuage > 4) {
                    setUpdateImage(petImageData.petImages[1])
                    addOnePetImage(userUID, petImageData.petImages[1])
                    addLastedDate(userUID, formattedDate)
                    if(totalGuage <= 4){ //ใช้บัตรกันลดขั้นทันที -> เปลี่ยน downGradeCard เป็น false ใน HomeScreen
                        dispatch(setTotalDownGradeCardValue(downGradeCardValue))
                    } 

                }else { //กรณี lvl0 ไม่ต้องใช้บัตรกันลดขั้น
                    //console.log('setUpdateImage:', petImageData);
                    setUpdateImage(petImageData.petImages[0])
                    addOnePetImage(userUID, petImageData.petImages[0])
                    addLastedDate(userUID, formattedDate)
                    //dispatch(setTotalDownGradeCardValue(downGradeCardValue))
                }
            }else{
                setUpdateImage(petImageData.petImage)
            }
        }
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#0ABAB5'}}>
             <View style={{flex:1,alignItems:'flex-end', padding:'2%'}}>
 
                 
             </View>
 
             <View  style={{flex: 5,justifyContent:'center',alignContent:'center',flexDirection:'row'}} >
                 <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:36, color:'#FFFFFF',
                 textAlign:'center', paddingHorizontal:70, paddingTop:30}}>
                    นี้คืออสูรเงินฝากของคุณในปัจจุบัน!</Text> 
             </View>
 
             <View style={{flex: 5,justifyContent:'Top',alignContent:'Top',flexDirection:'column'}} > 
                     <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                         <View style = {{
                              borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                              borderWidth:6, borderColor:'#0ABAB5',
                              width: Dimensions.get('window').width * 0.5,
                              height: Dimensions.get('window').width * 0.5,
                               backgroundColor:'#FFFFFF',
                               justifyContent: "center",
                                 alignItems: "center"
                          }}
                         >                       
                        {updateImage ? (
                            <Image source={{uri: updateImage}} 
                            style={{width: 250, height:250,justifyContent:'center',alignContent:'center'}} />
                        ) : null}
 
                         </View>
                    
                     
                      
 
                     </View>
             </View>
 
             <View  style={{flex: 5,justifyContent:'center',alignContent:'center',flexDirection:'row', 
             borderWidth:1, borderColor:'#000000',backgroundColor:'#2C6264'}} >
                <TouchableOpacity style={{flex:1}} 
                    onPress={()=>{
                    navigation.navigate('PetBottomTabNav');
                    }}
                    >
                    <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:15, marginVertical:12,
                    marginHorizontal : 5, backgroundColor:'white'}}>
                     <View style={{flex:1, flexDirection:'column', alignItems:'center',backgroundColor:'transparent',
                     justifyContent:'center',paddingHorizontal:'8%'}}>
                        
                        <Text style={{fontFamily:'ZenOldMincho-Regular', fontSize:24, color:'#000000',textAlign:'center',paddingTop:'5%'}}>
                            {petImageData && petImageData.petImage === petImageData.petImages[2] ? 'อสูรเงินฝากของคุณ\nระดับสูงสุด!' : petImageData && petImageData.petImage === petImageData.petImages[1] ? 'อสูรเงินฝากของคุณ\nอยู่ในระดับไม่มากไม่น้อย ;)' : 'ภารกิจของคุณคือทำ Quest\nในแต่ละวันเพื่ออัปเกรด\nอสูรเงินฝากของคุณ'}
                        </Text>

                    </View>
                    <View style={{flex:0, flexDirection:'column', alignItems:'center',backgroundColor:'transparent',alignItems:'flex-end',paddingRight:'5%'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Regular', fontSize:20, color:'#0ABAB5',paddingBottom:'5%'}}>Next..</Text> 
                     </View>      
                 </View>
                     
                </TouchableOpacity>
                 
             </View>
             
             
        </SafeAreaView>
     )
}