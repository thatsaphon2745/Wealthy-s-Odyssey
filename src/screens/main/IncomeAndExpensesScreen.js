import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { retrieveSelectedMonthDataIncomeAndExp, retrieveAllDataIncomeAndExpenses } from "../../firebase/UserModel";
import { useSelector } from "react-redux";
import { setItemTransactionType, setItemData, setCameFrom } from "../../redux/variableSlice";
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import 'moment/locale/th';
import { BoxInfo } from "../../components/BoxInfo";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { setEditStatus, setSelectedDate, setSelectedItems, setIsUpdate } from '../../redux/variableSlice';


export const IncomeAndExpensesScreen = ({navigation})=>{
    
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const getCurrentMonthName = () => {
        const currentDate = new Date();
        return currentDate.toLocaleString('th-TH', { month: 'long' });
    }

    const [isSelectedMonthConfirm, setIsSelectedMonthConfirm] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthName());
    const months = [
        { label: 'มกราคม', value: 'มกราคม' },
        { label: 'กุมภาพันธ์', value: 'กุมภาพันธ์' },
        { label: 'มีนาคม', value: 'มีนาคม' },
        { label: 'เมษายน', value: 'เมษายน' },
        { label: 'พฤษภาคม', value: 'พฤษภาคม' },
        { label: 'มิถุนายน', value: 'มิถุนายน' },
        { label: 'กรกฎาคม', value: 'กรกฎาคม' },
        { label: 'สิงหาคม', value: 'สิงหาคม' },
        { label: 'กันยายน', value: 'กันยายน' },
        { label: 'ตุลาคม', value: 'ตุลาคม' },
        { label: 'พฤศจิกายน', value: 'พฤศจิกายน' },
        { label: 'ธันวาคม ', value: 'ธันวาคม' },
      ];

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const cameFrom = useSelector((state)=>state.variables.cameFrom);
    let selectedDate = useSelector((state)=>state.variables.selectedDate);
    console.log(selectedDate)

    const [incomeAndExpensesDataSelected, setIncomeAndExpensesDataSelected] = useState({})
    const [incomeValuesAll, setIncomeValuesAll] = useState()
    const [expensesValuesAll, setExpensesValuesAll] = useState()
    const [incomeValuesSelected, setIncomeValuesSelected] = useState()
    const [expensesValuesSelected, setExpensesValuesSelected] = useState()

    const [listHeight, setListHeight] = useState(0);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [headerHeight, setHeaderHeight] = useState(0);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    moment.locale('th');
    let thaiMonth = moment(formattedDate).format('MMMM');
    let thaiDay = moment(formattedDate).format('dddd');
    if(selectedDate != ""){
        thaiMonth = moment(selectedDate).format('MMMM');
        thaiDay = moment(selectedDate).format('dddd');
    }

    useEffect(() =>{
        dispatch(setItemTransactionType(''))
    })
    useEffect(() => {
        getDataIncomeAndExpenses();
    }, [selectedDate, incomeValuesSelected,expensesValuesSelected,isUpdate, isSelectedMonthConfirm]);

    const getDataIncomeAndExpenses = async()=>{
        try{
            const itemAllDataIncomeAndExpenses = await retrieveAllDataIncomeAndExpenses(userUID)
            if(selectedDate == ""){
                selectedDate = formattedDate
            }
            const itemSelectedDataIncomeAndExpenses = await retrieveSelectedMonthDataIncomeAndExp(userUID,selectedMonth)
            setIncomeAndExpensesDataSelected(itemSelectedDataIncomeAndExpenses)
            setIncomeValuesAll(getIncomeValues(itemAllDataIncomeAndExpenses.income))
            setExpensesValuesAll(getExpensesValues(itemAllDataIncomeAndExpenses.expenses))
            setIncomeValuesSelected(getIncomeValues(itemSelectedDataIncomeAndExpenses))
            setExpensesValuesSelected(getExpensesValues(itemSelectedDataIncomeAndExpenses))
            
        }catch (error) {
            console.error('Error getDataIncomeAndExpenses:', error);
        }  
    }

    const getIncomeValues = (itemData)=>{
        let incomeValues = 0;
        itemData.forEach(element => {
            if(element.transactionType == 'รายได้'){
                incomeValues += parseFloat(element.value);
            }
        });
        
        return incomeValues
    }

    const getExpensesValues = (itemData)=>{
        let expensesValues = 0;
        itemData.forEach(element => {
            if(element.transactionType == 'ค่าใช้จ่าย'){
                expensesValues += parseFloat(element.value);
            }
        });
        
        return expensesValues
    }

    const calculateListHeight = () => {
        console.log(`screenHeight = ${screenHeight}`)
        console.log(`headerHeight = ${headerHeight}`)
        console.log(`remainingHeight = ${screenHeight - headerHeight - 50}`)
        return screenHeight - headerHeight - 232;
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setIsSelectedMonthConfirm(!isSelectedMonthConfirm);
    };

    const handleItemPress = (item) => {
        dispatch(setItemData(item))
        dispatch(setCameFrom("IncomeAndExpenseScreen"));
        navigation.navigate('DetailScreen');
    };

    const renderItem = ({ item })=>{
        return(
            <TouchableOpacity style={{flex:1, flexDirection:'row', margin:10, marginHorizontal:20, backgroundColor:'#FFFFFF', borderRadius:16, padding:5}}
                onPress={() => handleItemPress(item)}
            >
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/circle.png')} width={25} height={25}/>
                    <Image source={{uri:item.photoURL}} width={25} height={25} style={{position:'absolute'}}/>
                </View>
                <View style={{flex:2.5, justifyContent:'center', marginLeft:20}}>
                    <Text style={styles.details}>{item.subCategory}</Text> 
                </View>
                <View style={{flex:2, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginRight:20}}>
                    <Text style={{ fontFamily:'ZenOldMincho-Regular',fontSize:14,color:item.transactionType == 'รายได้' ? '#0abab5' : '#ff0000'}}>{item.value}</Text>
                    <Text> THB</Text>
                </View>
            </TouchableOpacity>
        ) 
    }
    
    return(
        <ScrollView style={{flex:1,backgroundColor:'#fffffa'}}>
            <View style={{height:80, backgroundColor:'#0ABAB5'}}>
              <View style={{flex:1}}>

              </View>

              <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{width:35, marginLeft:15}}
                  onPress={()=>{
                    dispatch(setSelectedDate(""))
                    dispatch(setIsUpdate(!isUpdate))
                    navigation.navigate('FinancialScreen');
                  }}
                >
                  <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                </TouchableOpacity>
                <Text style={{flex:1, fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff',textAlign:'center'}}>รายได้-ค่าใช้จ่าย</Text>

                <TouchableOpacity style={{marginRight:15}}
                  onPress={()=>{
                    toggleModal()
                  }}
                >
                  <Image source={require('../../assets/calendarIcon.png')} width={30} height={30} />
                  <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                        <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>เลือกเดือนที่ต้องการ</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedMonth(value)}
                            items={months}
                            style={pickerSelectStyles}
                            placeholder={{
                            label: 'เลือกเดือนที่ต้องการ...',
                            value: null,
                            }}
                        />
                        <TouchableOpacity onPress={toggleModal} style={{backgroundColor:'#000000', padding:10, borderRadius:8}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:14, color:'#FFFFFF', textAlign:'center'}}>ยืนยัน</Text>
                        </TouchableOpacity>
                        {selectedMonth && <Text style={styles.selectedText}>เดือนที่ถูกเลือก: {selectedMonth}</Text>}
                        </View>
                    </Modal>
                </TouchableOpacity>              
              </View>

              <View style={{flex:1}}>
   
              </View>
            </View>

            <View style={{alignItems:'center'}} 
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
            >
                <BoxInfo topic='ยอดเงินคงเหลือ' topicValue={incomeValuesAll-expensesValuesAll} subTopic1='รายได้'
                                subTopic1Value={incomeValuesAll} subTopic2='ค่าใช้จ่าย' subTopic2Value={expensesValuesAll}
                />
            </View>

            <View style={{flexDirection:'row', height:50, paddingHorizontal:15}}>
                <View style={{flex:1.5, justifyContent:'flex-end'}}>
                    <Text style={{fontFamily:'Poppins-SemiBold', color:'#000000', fontSize:20, paddingLeft:20}}>{selectedMonth}</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', backgroundColor:'#B3DBD8', borderRadius:8}}>
                    <View style={{flex:1, alignItems:'center', padding:5}}>
                        <Text style={{fontFamily:'Poppins-Regular', fontSize:12, color:'#000000'}}>รายได้</Text>
                        <Text style={{fontFamily:'Poppins-Regular', fontSize:11, color:'#000000'}}>{incomeValuesSelected}</Text>
                    </View>

                    <View style={{borderWidth:1, borderColor:'#FFFFFF'}}></View>

                    <View style={{flex:1, alignItems:'center', padding:5}}>
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:12, color:'#000000'}}>ค่าใช้จ่าย</Text>
                        <Text style={{fontFamily:'Poppins-Regular', fontSize:11, color:'#000000'}}>{expensesValuesSelected}</Text>
                    </View>
                </View>
            </View>

            {incomeAndExpensesDataSelected != 0 && (
                <View style={{backgroundColor:'#F5F5F5', borderTopLeftRadius:32, borderTopRightRadius:32, marginHorizontal:15, marginTop:10, paddingVertical:10}}>
                    <FlatList 
                            data={incomeAndExpensesDataSelected}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onContentSizeChange={(width, height) => setListHeight(height)}
                            scrollEnabled={false}
                    />
                </View>
            )}

            {incomeAndExpensesDataSelected == 0 && (
                <View style={{height:300, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:14}}>ไม่พบข้อมูล</Text>
                </View>
                
            )}  
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:14,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },
    
    income:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#0ABAB5'
    },
    expenses:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#FF0000'
    },
    circle: {
        width: 40,
        height: 40,
        
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:16,
        color:'#000000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 18,
        marginBottom: 10,
      },
      selectedText: {
        marginTop: 10,
        fontSize: 16,
      },
    
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      marginBottom: 10,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      marginBottom: 10,
    },
  });