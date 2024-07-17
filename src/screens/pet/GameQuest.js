import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, FlatList, Modal} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { changeFinished,changeRewards,finalReward, retrieveFinishedQuest, retrieveAllDataQuestNew } from "../../firebase/UserModel";
import { retrievePersonalQuest,retrieveAllQuest,retrieveCurrentQuestTime,retrieveStampQuestTime } from "../../firebase/UserModel";
import { precheckDailyQuest, precheckPersonalQuest, precheckWeeklyQuest} from "../../firebase/UserModel";
import { retrieveAllDataPet } from "../../firebase/UserModel";
import { setCameFromNoti } from "../../redux/variableSlice";
import { setHasNotification } from "../../redux/variableSlice";
import { LogBox } from 'react-native';

export const GameQuest = ({navigation})=>{

    LogBox.ignoreLogs(['source.uri should not be an empty string']);
    LogBox.ignoreLogs(['ReactImageView: Image source "" doesn\'t exist']);
    const dispatch = useDispatch();

    const [petImageData, setPetImageData] = useState(null);

    const [allQuestSelected,setAllQuestSelected] = useState({})
    const [personalQuestSelected, setPersonalQuestSelected] = useState({})
    const [trackingFinishedQuest,setTrackingFinishedQuest] = useState({})

    const [modalVisible, setModalVisible] = useState(false);
    const [disableButtonState,setDisableButtonState] = useState(true)

    const [step,setStep] = useState('0')
    const [finish,setFinish] = useState(false)
    const [finishChangeButton,setFinishChangeButton] = useState(false)

    const [stampTime,setStampTime] = useState({})
    const [questRounds,setQuestRounds] = useState({})

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${year}-${month}-${day}`;
    
    const hasNotification = useSelector(state => state.variables.hasNotification);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const totalGuage = useSelector(state => state.variables.totalGuage);
    console.log('Total Guage in GameQuest:', totalGuage);

    const totalDifferenceDate = useSelector(state => state.variables.totalDifferenceDate);
    console.log('differenceDate in GameQuest:', totalDifferenceDate);

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    
    const [questPersonalData, setQuestPersonalData] = useState([])
    const [questDaily, setQuestDaily] = useState([])
    const [questWeekly, setQuestWeekly] = useState([])
    const [questAll, setQuestAll] = useState([])
    const [questStateTrue, setQuestStateTrue] = useState([])

    useEffect(() => {
      if(step == '0'){
        getAllQuest()
      }
      if(step == '1'){
        setDisableButtonState(false)
      }
      getPQuestData()
      getQuestData()
      if(disableButtonState == true && step =='1'){
        getAllQuest()
      }
      dispatch(setCameFromNoti(false))
      console.log("มาแล้ว")
    }, [isUpdate,finish,finishChangeButton,hasNotification]);

    const getQuestData = async()=>{
      try{
          const itemAllDataQuest = await retrieveAllDataQuestNew(userUID)
          setQuestPersonalData(itemAllDataQuest.personal)
          setQuestDaily(itemAllDataQuest.daily)
          setQuestWeekly(itemAllDataQuest.weekly)
          setQuestAll(itemAllDataQuest.all)
          setQuestStateTrue(itemAllDataQuest.statetrue)
          //setHasNotification(checkNotiRed(itemAllDataQuest.all))
          //console.log("daily: "+checkNotiRed(questDaily))
          //console.log("all: "+checkNotiRed(questAll))
          dispatch(setHasNotification(checkNotiRed(itemAllDataQuest.all)))
          console.log("successful retrieve")
      }catch (error) {
          console.error('Error getQuestData:', error);
      }  
    }
    function checkNotiRed(items) {
      return items.some(item => !item.rewardStatus && !item.seen && item.questState);
    }
    const getPQuestData = async()=>{
      try{
          const itemAllDataQuest = await retrievePersonalQuest(userUID)
          setPersonalQuestSelected(itemAllDataQuest)  
      }catch (error) {
          console.error('Error getQuestData:', error);
      }  
    }

    const getAllQuest = async()=>{
      try{
        const itemAllQuest = await retrieveAllQuest(userUID)
        setAllQuestSelected(itemAllQuest)
        const itemQuestFinished = await retrieveFinishedQuest(userUID)
        setTrackingFinishedQuest(itemQuestFinished)
        const itemTime = await retrieveStampQuestTime(userUID)
        setStampTime(itemTime)
        const itemTime2 = await retrieveCurrentQuestTime(userUID)
        setQuestRounds(itemTime2)
        setStep('1')
        setFinish(true)
      }catch (error) {
          console.error('Error getAllQuest:', error);
      }
    }

    useEffect(() => {
      getImageData()
      dispatch(setCameFromNoti(false));
      getQuestData()
    }, [isUpdate,finishChangeButton,hasNotification]);   

    const getImageData = async()=>{
        try{
            const itemAllDataPet = await retrieveAllDataPet(userUID)
            setPetImageData(itemAllDataPet)
            
        }catch (error) {
            console.error('Error getImageData:', error);
        }  
    }

    const handleDailyQuestReward = (index)=>{
      if((allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].questState) === false) {
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/Vector.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
          </TouchableOpacity>
      }
      if((allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].questState) === true && (allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].rewardStatus) === false){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={disableButtonState}
        onPress={()=>{handleButton()}}>
          <Image source={require('../../assets/greenMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
      if((allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].questState) === true && (allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[index]&&allQuestSelected.Daily[index].rewardStatus) === true){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/grayMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
    }

    const handleWeeklyQuestReward = (index)=>{
      if((allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].questState) === false) {
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/Vector.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
          </TouchableOpacity>
        }
      if((allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].questState) === true && (allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].rewardStatus) === false){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={disableButtonState}
        onPress={()=>handleButton()}>
          <Image source={require('../../assets/greenMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
        }
      if((allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].questState) === true && (allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[index]&&allQuestSelected.Weekly[index].rewardStatus) === true){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/grayMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
        }
    }

    const handlePQuestReward = (item)=>{
      if((item.questState) === false) {
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/Vector.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
          </TouchableOpacity>
      }
      if((item.questState) === true && (item.rewardStatus === false)){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={disableButtonState}
        onPress={()=>{handleButton()}}>
          <Image source={require('../../assets/greenMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
      if((item.questState) === true && (item.rewardStatus) === true){
        return <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, 
        backgroundColor: '#FFFFFF',alignSelf: 'center',transform: [{translateY: -5}] }} disabled={true}>
          <Image source={require('../../assets/grayMark.png')} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
          </TouchableOpacity>
      }
    }

  const handleButton=async()=>{
    setDisableButtonState(true)
    await changeRewards(userUID,trackingFinishedQuest)
    await finalReward(userUID,trackingFinishedQuest) 
    toggleModal()
    setFinishChangeButton(!finishChangeButton)
  }

    let selectedPetImageIndex = 0;
    if (totalGuage > 7) {
        selectedPetImageIndex = 2;
    } else if (totalGuage > 4) {
        selectedPetImageIndex = 1;
    }

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

    const renderItem = ({ item })=>{
      return(
        <View style={{flex:1, backgroundColor:'#B3DBD8',alignContent:'center',justifyContent:'center'}}>
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, 
              marginVertical:5,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#9B51E0',alignSelf: 'center',transform: [{translateY: -5}] }}>
                <Image source={{uri:item.questPic}} style={{ width: 40, height: 40,alignSelf: 'center',justifyContent:'center' }}/>
              </View>
              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.headerText}>    {item.detail} {item.value} บาท</Text>
                <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Personal Goal</Text>
              </View>
              {handlePQuestReward(item)}
          </View>
        </View>
        )  
    }

    return(
        <ScrollView style={{flex:1, padding:30, backgroundColor:'#B3DBD8'}}>
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff',height: 300}}>
              {petImageData ? (
                <Image source={{uri: petImageData.petImage}} 
                style={{width: 150, height:200,alignSelf: 'center',transform: [{translateY: 90}]}} />
              ) : null}
            </View>

            {/* Daliy Quest */}
            <View style={{flex:1, backgroundColor:'#B3DBD8'}}>
                {/* Daliy Quest */}
                <Text style={[styles.department, {color: '#2C6264'}]}>Daliy Quest : ภารกิจรายวัน</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[0] ?allQuestSelected.Daily[0].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[0] ? allQuestSelected.Daily[0].detail:''} {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[0]?allQuestSelected.Daily[0].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Daliy Quest</Text>
                    </View>
                    {handleDailyQuestReward(0)}
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -10}],height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[1] ?allQuestSelected.Daily[1].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[1] ? allQuestSelected.Daily[1].detail:''} {allQuestSelected && allQuestSelected.Daily && allQuestSelected.Daily[1]?allQuestSelected.Daily[1].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Daliy Quest</Text>
                    </View>
                    {handleDailyQuestReward(1)}
                </View>
            
                
            </View>
            {/* Weekly Quest */}
            <View style={{flex:1, backgroundColor:'#B3DBD8',transform: [{translateY: 10}]}}>
                
                <Text style={[styles.department, {color: '#2C6264'},{transform: [{ translateY: -10 }]}]}>Weekly Quest : ภารกิจรายสัปดาห์</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[0] ?allQuestSelected.Weekly[0].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View> 
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[0] ? allQuestSelected.Weekly[0].detail:''} {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1]?allQuestSelected.Weekly[0].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                  </View>
                    {handleWeeklyQuestReward(0)}
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -10}],height: 60}}>
                <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1] ?allQuestSelected.Weekly[1].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View> 
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1] ? allQuestSelected.Weekly[1].detail:''} {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[1]?allQuestSelected.Weekly[1].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                    </View>
                    {handleWeeklyQuestReward(1)}
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, marginVertical:10,backgroundColor:'#ffffff',transform: [{translateY: -20}],height: 60}}>
                <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[2] ?allQuestSelected.Weekly[2].questPic:''}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View> 
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[2] ? allQuestSelected.Weekly[2].detail:''} {allQuestSelected && allQuestSelected.Weekly && allQuestSelected.Weekly[2]?allQuestSelected.Weekly[2].value:''} บาท</Text>
                    <Text style={[styles.subHeaderText, {color: '#A9A9A9'}]}>    Weekly Quest</Text>
                    </View>
                    {handleWeeklyQuestReward(2)}
                </View>
            
                
            </View>
            {/* Personal Goal */}
            <View style={{flex:1, backgroundColor:'#B3DBD8',justifyContent:'center',alignContent:'center'}}>
                
                <Text style={[styles.departmentPersonalGoal, styles.boldText, {color: '#2C6264'}]}>Personal Goal : เป้าหมายส่วนตัว</Text>

                <FlatList 
                    data={personalQuestSelected}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10, borderRadius:16, 
                marginVertical:10,backgroundColor:'#ffffff', justifyContent: 'space-between',height: 60}}>
                  <View style={{ width: 40, height: 40, borderRadius: 20,alignSelf: 'center',transform: [{translateY: -5}] }}>
                    <Image source={{uri:'https://drive.google.com/uc?export=view&id=1TWB7SXtbcwJIuEhLlog3-mizn0dWhIac'}} style={{ width: 40, height: 40,alignSelf: 'center' }}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={styles.headerText}>    ---</Text>
                    <Text style={[styles.subHeaderText,styles.boldText, {color: '#A9A9A9'}]}>    Personal Goal</Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'flex-end',width: 40, height: 40, borderRadius: 20, backgroundColor: '#0ABAB5',
                  alignSelf: 'center',transform: [{translateY: -5}] }}
                    onPress={()=>{
                      navigation.navigate('AddGoalScreen')
                    }}>
                    <Image source={require('../../assets/plus.png')} style={{ width: 20, height: 20,alignSelf: 'center',transform: [{translateY: 10}] }}/>
                  </TouchableOpacity>
                </View>
               </View>
            <View style = {{height:50}}>
            </View>
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
                        <Text>Received Reward.</Text>
                        <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:12,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#000000'
    },

    department:{
      fontFamily:'ZenOldMincho-Bold',
      fontSize:18,
      color:'#000000'
    },
    departmentPersonalGoal: {
      fontFamily:'ZenOldMincho-Bold',
      fontSize:18,
      color:'#000000',
      marginBottom:20
    }
})