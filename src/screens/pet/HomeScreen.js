import React from "react";
import { View, ImageBackground, Text, TouchableOpacity, Image, Alert, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, TouchableHighlight} from 'react-native';
import { PetBottomTabNav } from "../../navigators/PetBottomTabNav";
import { TextInput} from "react-native-paper";
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import { addPetName, addRandomDailyQuest, addRandomWeeklyQuest, changeFinished, delDailyQuest, delWeeklyQuest, finalReward, newCurrentQuestTime, newStampQuestTime, precheckDailyQuest, precheckExpenseQuest, precheckPersonalQuest, precheckWeeklyQuest, retrieveAllQuest, retrieveCheckExpenseQuest, retrieveCurrentQuestTime, retrieveFinishedQuest, retrievePersonalQuest, retrieveRandomWeeklyQuest, retrieveStampQuestTime } from "../../firebase/UserModel";
import { retrieveAllDataPet } from "../../firebase/UserModel";
import { retrieveInventory } from "../../firebase/RetrieveData";
import { setEditItemLocation } from "../../redux/variableSlice";
import { retrieveAllDataQuest } from "../../firebase/UserModel";
import { retrieveQuestDaliyAndWeek,retrieveAllDataQuestNew, removeCardDownGrade } from "../../firebase/UserModel"
import { setHasNotification } from "../../redux/variableSlice";
import { addDownGradeCardtoFalse, retrieveCurrencyPet } from "../../firebase/UserModel";
import { setTotalDownGradeCardValue, setItemData } from "../../redux/variableSlice";


export const HomeScreen =({navigation})=>{
    const dispatch = useDispatch()
    const editItemLocation = useSelector((state)=>state.variables.editItemLocation);

    const [petImageData, setPetImageData] = useState(null);
    const [itemWall1, setItemWall1] = useState();
    const [itemWall2, setItemWall2] = useState();
    const [itemWall3, setItemWall3] = useState();
    const [itemTable1, setItemTable1] = useState();
    const [itemTable2, setItemTable2] = useState();
    const [itemTable3, setItemTable3] = useState();
    const [itemInventory, setItemInventory] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [coinBalance, setCoinBalance] = useState();
    const [rubyBalance, setRubyBalance] = useState();

    const totalDifferenceDate = useSelector(state => state.variables.totalDifferenceDate);
    console.log('differenceDate in HomeScreen:', totalDifferenceDate);

    const totalDownGradeCardValue = useSelector(state => state.variables.totalDownGradeCardValue);
    console.log('InputValue in HomeScreen:', totalDownGradeCardValue);

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const isUpdateItemPet = useSelector((state)=>state.variables.isUpdateItemPet);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const totalGuage = useSelector(state => state.variables.totalGuage);
    console.log('Total Guage in HomeScreen:', totalGuage);

    const [questPersonalData, setQuestPersonalData] = useState([])
    const [questDaily, setQuestDaily] = useState([])
    const [questWeekly, setQuestWeekly] = useState([])
    const [questAll , setQuestAll] = useState([])
    const [questStateTrue, setQuestStateTrue] = useState([])
    
    const [allQuestSelected,setAllQuestSelected] = useState({})
    const [personalQuestSelected, setPersonalQuestSelected] = useState({})

    const [dailyProgression,setDailyProgression] = useState({})
    const [weeklyProgression,setWeeklyProgression] = useState({})
    const [personalProgression,setPersonalProgression] = useState({})

    const [step,setStep] = useState('0')
    const [finish,setFinish] = useState(false)
    const [finishChecked,setFinishChecked] = useState(false)
    const [finishProgression,setFinishProgression] = useState(false)

    const [expenseQuest,setExpenseQuest] = useState([]) 
    const [expenseProgression,setExpenseProgression] = useState({})

    const [stampTime,setStampTime] = useState({})
    const [questRounds,setQuestRounds] = useState({})
    

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${year}-${month}-${day}`;

    const hasNotification = useSelector(state => state.variables.hasNotification);
    const cameFromNoti = useSelector(state => state.variables.cameFromNoti);
    useEffect(() => {
        findLocationItem();
        dispatch(setItemData({}))
        retrieveCurrency()
        getImageData()
        getQuestData()
        if(step == '0'){
            getPQuestData()
            getAllQuest()
        }
        if(step == '1'){
            getProgression()
        }
        if(step == '2'){
            const checked = checkDailyQuest()
            handleChangedFinished(checked)
        }
        if(step == '2'){
            const checked = checkWeeklyQuest()
            handleChangedFinished(checked)
        }
        if(step == '2'){
            const checked = checkPersonalQuest()
            handleChangedFinished(checked)
        }
        if (step == '2'){
            const checked = checkExpenseDailyQuest()
            console.log('checked',checked)
            sumReward(checked)
            setStep('3')
            setFinishChecked(true)
        }
        if(step == '3'){
            checkRandomQuest();
            setStep('4')
        }
        console.log(hasNotification)
        handleTotalDownGradeCardValue()
    }, [isUpdate,hasNotification,cameFromNoti,totalDownGradeCardValue, editItemLocation, isUpdateItemPet,finish,finishChecked,finishProgression]);    

    const retrieveCurrency = async () => {
        try {
            const currencyData = await retrieveCurrencyPet(userUID);
            if (currencyData) {
                setCoinBalance(currencyData.Money);
                setRubyBalance(currencyData.Ruby);
            } else {
                console.log("No currency data found.");
            }
        } catch (error) {
            console.error("Error retrieving currency data:", error);
        }
    };

    const getImageData = async()=>{
        try{
            const itemAllDataPet = await retrieveAllDataPet(userUID)
            setPetImageData(itemAllDataPet)
            
        }catch (error) {
            console.error('Error getImageData:', error);
        }  
    }

    const getAllQuest = async()=>{
        try{
            const itemAllQuest = await retrieveAllQuest(userUID)
            setAllQuestSelected(itemAllQuest)
            const itemTime = await retrieveStampQuestTime(userUID)
            setStampTime(itemTime)
            const itemTime2 = await retrieveCurrentQuestTime(userUID)
            setQuestRounds(itemTime2)
            const expenseQuestItem = await retrieveCheckExpenseQuest(userUID)
            setExpenseQuest(expenseQuestItem)
            //console.log(expenseQuestItem)
            setStep('1')
            setFinish(true)
        }catch (error) {
            console.error('Error getAllQuest:', error);
        }
    }

    const getPQuestData = async()=>{
        try{
            const itemAllDataQuest = await retrievePersonalQuest(userUID)
            setPersonalQuestSelected(itemAllDataQuest)
        }catch (error) {
            console.error('Error getQuestData:', error);
        }  
      }

    const getProgression = async()=>{
        try{
            const itemDailyQuest = await precheckDailyQuest(userUID,allQuestSelected.Daily,formattedCurrentDate)
            setDailyProgression(itemDailyQuest)
            const itemWeeklyQuest = await precheckWeeklyQuest(userUID,allQuestSelected.Weekly,questRounds)
            setWeeklyProgression(itemWeeklyQuest)
            const itemPersonalQuest = await Promise.all(
                personalQuestSelected.map(async (element) => {
                    const retObj = await precheckPersonalQuest(userUID, element);
                    return retObj;
                })
            );
            setPersonalProgression(itemPersonalQuest)
            const itemExpenseProgression = await precheckExpenseQuest(userUID,expenseQuest,formattedCurrentDate,questRounds)
            setExpenseProgression(itemExpenseProgression)
            setStep('2')
            setFinishProgression(true)
        }
        catch (error) {
            console.error('Error getProgression:',error);
        }
    }
    
    const checkDailyQuest = ()=>{
        const updatedQuest=[]
        if(allQuestSelected.Daily != undefined){
          allQuestSelected.Daily.forEach(element=>{
            if(element.questState == false){
              if(element.transactionType == 'รายได้'){
                let incomeUnit =0
                dailyProgression.Income.forEach(element1=>{
                  incomeUnit += parseInt(element1.value)
                })
                if(incomeUnit>=element.value){
                  updatedQuest.push(element)
                  console.log("daily quest income finished")
                }
              }
              if(element.transactionType == 'สินทรัพย์'){
                let assetUnit =0
                dailyProgression.Assest.forEach(element1=>{
                  assetUnit += parseInt(element1.value)
                })
                if(assetUnit>=element.value){
                  updatedQuest.push(element)
                  console.log("daily quest asset finished")
                }
              }
              if(element.transactionType == 'หนี้สิน'){
                let debtUnit = 0
                dailyProgression.Debt.forEach(element1=>{
                  debtUnit += parseInt(element1.value)
                })
                if(debtUnit>=element.value){
                  updatedQuest.push(element)
                  console.log("daily quest debt finished")
                }
              }
            }
          })
          return updatedQuest
        }
    }
  
    //แก้ให้เป็นรายสัปดาห์
    const checkWeeklyQuest = ()=>{
        const updatedQuest=[]
        if(allQuestSelected.Weekly != undefined){
            allQuestSelected.Weekly.forEach(element=>{
                if(element.questState == false){
                    if(element.transactionType == 'รายได้'){
                    let incomeUnit = 0
                    weeklyProgression.Income.forEach(element1=>{
                        incomeUnit += parseInt(element1.value)
                    })
                    if(incomeUnit>=element.value){
                        updatedQuest.push(element)
                        console.log("weekly quest income finished")
                    }
                    }
                    if(element.transactionType == 'สินทรัพย์'){
                    let assetUnit =0
                    weeklyProgression.Assest.forEach(element1=>{
                        assetUnit += parseInt(element1.value)
                    })
                    if(assetUnit>=element.value){
                        updatedQuest.push(element)
                        console.log("weekly quest asset finished")
                    }
                    }
                    if(element.transactionType == 'หนี้สิน'){
                    let debtUnit = 0
                    weeklyProgression.Debt.forEach(element1=>{
                        debtUnit += parseInt(element1.value)
                    })
                    if(debtUnit>=element.value){
                        updatedQuest.push(element)
                        console.log("weekly quest debt finished")
                    }
                    }
                }
            })
            return updatedQuest
        }
    }
  
    const checkPersonalQuest = ()=>{
        const updatedQuest=[]
        if(personalQuestSelected != undefined){
            personalQuestSelected.forEach(quest=>{
            if(quest.questState == false){
                personalProgression.forEach(progression =>{
                    if(progression.Date == quest.addDate){
                        if(quest.transactionType == 'รายได้'){
                        let incomeUnit = 0
                        progression.Income.forEach(element=>{
                            incomeUnit += parseInt(element.value)
                        })
                        if(incomeUnit>=quest.value){
                            updatedQuest.push(quest)
                            console.log("Personal quest income finished")
                        }
                        }
                        if(quest.transactionType == 'สินทรัพย์'){
                        let assestUnit =0
                        progression.Assest.forEach(element=>{
                            assestUnit += parseInt(element.value)
                        })
                        if(assestUnit>=quest.value){
                            updatedQuest.push(quest)
                            console.log("Personal quest assest finished")
                        }
                        }
                        if(quest.transactionType == 'หนี้สิน'){
                        let debtUnit =0
                        progression.Debt.forEach(element=>{
                            debtUnit += parseInt(element.value)
                        })
                        if(debtUnit>=quest.value){
                            updatedQuest.push(quest)
                            console.log("Personal quest debt finished")
                        }
                        }
                    }
                    })
                }
            })
            return updatedQuest
        }
    }  

    const checkExpenseDailyQuest = ()=>{
        const updatedQuest=[]
        if(expenseQuest != undefined){
            expenseQuest.forEach(element=>{
            if(element.questState == false){
              if(element.questType == 'daily'){
                let expenseUnit =0
                expenseProgression.Daily.forEach(element1=>{
                  expenseUnit += element1.value 
                })
                if(expenseUnit<element.value ){
                  const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
                  const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()
  
                  const stampTimeAsDateObject = new Date(stampTime)
                  const stampTimetimestamp = stampTimeAsDateObject.getTime()
                  const daydif = (formattedCurrentDatetimestamp-stampTimetimestamp)/86400000;
                  if(daydif >= 1){
                    updatedQuest.push(element)
                    console.log("daily quest expense finished")
                  }
                }
              }
              if(element.questType == 'weekly'){
                let expenseUnit =0
                expenseProgression.Expense.forEach(element1=>{
                    expenseUnit += element1.value
                })
                if(expenseUnit<element.value ){
                    const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
                    const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()
    
                    const questRoundsAsDateObject = new Date(questRounds)
                    const questRoundstimestamp = questRoundsAsDateObject.getTime()
                    const daydif = (formattedCurrentDatetimestamp-questRoundstimestamp)/86400000;
                    if(daydif >= 7){
                    updatedQuest.push(element)
                    console.log("weekly quest expense finished")
                    }
                }
                }
            }
          })
          //console.log(updatedQuest)
          return updatedQuest
        }
    }

    const handleChangedFinished =async(checked)=>{
        await changeFinished(allQuestSelected,checked,userUID)
    }

    const sumReward = async(checkedQuest) =>{
        const prepare = {
            Daily:[],
            Weekly:[],
            Personal:[]
        }
        checkedQuest.forEach(quest => {
            if(quest.questType == 'daily'){
                prepare.Daily.push(quest)
            }
            if(quest.questType == 'weekly'){
                prepare.Weekly.push(quest)
            }
        }) 

        await finalReward(userUID, prepare);
    }

    const checkRandomQuest= async()=>{
        const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
        const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()
    
        const questRoundsAsDateObject = new Date(questRounds)
        const questRoundstimestamp = questRoundsAsDateObject.getTime()
  
        const stampTimeAsDateObject = new Date(stampTime)
        const stampTimetimestamp = stampTimeAsDateObject.getTime()
        //86400000 คือ จำนวนมิลลิวินาทีใน 1 วัน 
        const rounddaydif = (formattedCurrentDatetimestamp-questRoundstimestamp)/86400000;
        const daydif = (formattedCurrentDatetimestamp-stampTimetimestamp)/86400000;
  
        if(daydif >= 1){
            await delDailyQuest(userUID)
            await addRandomDailyQuest(userUID)
            await newStampQuestTime(userUID,formattedCurrentDate)
            if(rounddaydif >= 7) {
                await delWeeklyQuest(userUID)
                const moddaydif = (rounddaydif%7)
                const newquestRounds = new Date(formattedCurrentDatetimestamp-(86400000*moddaydif))
                const year = newquestRounds.getFullYear();
                const month = (newquestRounds.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
                const day = newquestRounds.getDate().toString().padStart(2, '0');
                const formattednewquestRounds = `${year}-${month}-${day}`;
                await newCurrentQuestTime(userUID,formattednewquestRounds)
                await addRandomWeeklyQuest(userUID)
            }
        }
    }

    const findLocationItem = async()=>{
        setItemTable1();
        setItemTable2();
        setItemTable3();
        setItemWall1();
        setItemWall2();
        setItemWall3();
        const inventory =  await retrieveInventory(userUID);
        setItemInventory(inventory)
        
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

    const showAlert = () => {
        Alert.alert(
            "Downgrade Card Used",
            "The downgrade card has been used.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
        
    const handleTotalDownGradeCardValue = async() => {
        if (totalDownGradeCardValue) {
            addDownGradeCardtoFalse(userUID);
            dispatch(setTotalDownGradeCardValue(false));
            removeCardDownGrade(userUID)
            //showAlert();
            toggleModal();
        }
    }

    const componentItem = (item)=>{
        if(item.itemType == 'table'){
            return(
                <View>
                    <Image source={{uri:item.itemPhotoURL}}
                        width={65} height={65} resizeMode="contain">
                    </Image>
                </View>
            )
        }
        if(item.itemType == 'wall'){
            return(
                <View  style={{marginLeft:8}}>
                    <Image source={{uri:item.itemPhotoURL}}
                        width={90} height={90} resizeMode="contain">
                    </Image>
                </View>
            )
        }
        
    }
    const getQuestData = async()=>{
        try{
            const itemAllDataQuest = await retrieveAllDataQuestNew(userUID)
            setQuestPersonalData(itemAllDataQuest.personal)
            setQuestDaily(itemAllDataQuest.daily)
            setQuestWeekly(itemAllDataQuest.weekly)
            setQuestAll(itemAllDataQuest.all)
            //setHasNotification(checkNotiRed(itemAllDataQuest.all))
            dispatch(setHasNotification(checkNotiRed(itemAllDataQuest.all)))
        }catch (error) {
            console.error('Error getQuestData:', error);
        }  
    }
    function checkNotiRed(items) {
        return items.some(item => !item.rewardStatus && !item.seen && item.questState);
    }
    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:'https://drive.google.com/uc?export=view&id=1gYEKR3keA_NJQlEE0WRp7zB2770DCsgG'}}
            resizeMode="cover" style={{flex: 1}}>
                <View style={{flex:1,margin:5}}>
                    <View style={{flexDirection:'row', flex:1}}>
                        <View style={{flexDirection:'row', height:'50%',width:'25%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa',justifyContent:'flex-start', alignItems:'center', marginRight:10}}>
                            <Image source={{uri:'https://drive.google.com/uc?export=view&id=1lB6vcCq3Kng3852LIrvXfM-W36guffFI'}}
                                height={25} width={25}>
                            </Image>
                            <Text style={{textAlignVertical:'center'}}>{coinBalance}</Text>
                        </View>

                        <View style={{flexDirection:'row', height:'50%',width:'25%',borderWidth:2,borderRadius:15,backgroundColor:'#fffffa',justifyContent:'flex-start', alignItems:'center'}}>
                            <Image source={{uri:'https://drive.google.com/uc?export=view&id=1JBKocVjx9NAa8p8kNwWc7NGTpgc39dIC'}}
                                height={25} width={25}>
                            </Image>
                            <Text style={{textAlignVertical:'center'}}>{rubyBalance}</Text>
                        </View>

                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}
                            onPress={async()=>{
                                navigation.navigate('EditHomeScreen')
                        }}
                        >
                            <Image source={{uri:'https://drive.google.com/uc?export=view&id=1shnRqlCPSzZtcbLXsjfixmP-9y4Nwtjd'}}
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
                                        {itemWall1 ? componentItem(itemWall1) : <View></View>}
                                    </View>
                                   
                                    {/* item ชิ้นที่ 2*/}
                                    <View style={{flex:1}}>
                                        {itemWall2 ? componentItem(itemWall2) : <View></View>}
                                    </View>
                                </View>

                                <View style={{flex:1, justifyContent:'center'}}>
                                    {/* item ชิ้นที่ 3*/}
                                        {itemWall3 ? componentItem(itemWall3) : <View></View>}
                                </View>
                                
                            </View>
                            <View style={{flex:2}}>
                                
                            </View>
                        </View>
                        {/* itemType: table */}
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1.5, flexDirection:'row', marginBottom:20}}>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable1 ? componentItem(itemTable1) : <View></View>}
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable2 ? componentItem(itemTable2) : <View></View>}
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                    {itemTable3 ? componentItem(itemTable3) : <View></View>}
                                </View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                        <View style={{flex:1}}>
                            
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                        {petImageData ? (
                            <Image source={{uri: petImageData.petImage}} 
                            style={{width: 110, height:130,justifyContent:'center',alignContent:'center'}} />
                        ) : null}
                    </View>
                </View>
                
            </ImageBackground>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    toggleModal();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Downgrade card has been used.</Text>
                        <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}