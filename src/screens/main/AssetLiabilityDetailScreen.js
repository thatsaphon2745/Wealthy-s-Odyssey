import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { retrieveDataAsset, retrieveDataLiability} from "../../firebase/UserModel"
import { retrieveDataLiabilityRemaining } from "../../firebase/RetrieveData"
import { useSelector } from "react-redux"
import { SafeAreaView } from "react-native-safe-area-context"
import { addTransaction } from "../../firebase/UserModel"
import { useDispatch } from "react-redux";
import { setItemData, setCameFrom } from "../../redux/variableSlice";
import { BoxInfo } from "../../components/BoxInfo"


export const AssetLiabilityDetailScreen = ({navigation})=>{
    
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const [selectedType,setSelectedType] = useState('graph')
    const [selectedDetail,setSelectedDetail] = useState('asset')
    const [selectedDetailLiability,setSelectedDetailLiability] = useState('All')

    const [percentageOfAssetHeight, setPercentageOfAssetHeight] = useState(0)
    const [percentageOfLiabilityHeight, setPercentageOfLiabilityHeight] = useState(0)
    const [percentageOfNetWealthHeightTop, setPercentageOfNetWealthHeightTop] = useState(0)
    const [percentageOfNetWealthHeightBottom, setPercentageOfNetWealthHeightBottom] = useState(0)
    
    const [assetData, setAssetData] = useState({})
    const [assetValues, setAssetValues] = useState()
    const [assetContainerHeight, setAssetContainerHeight] = useState()
    const [liabilityData, setLiabilityData] = useState({})
    const [liabilityRemainingData, setLiabilityRemainingData] = useState({})
    const [liabilityValues, setLiabilityValues] = useState()
    const [liabilityContainerHeight, setLiabilityContainerHeight] = useState()
    const [liabilityRemainingContainerHeight, setLiabilityRemainingContainerHeight] = useState()
    const [netWealthValue, setNetWealthValue] = useState()
    //แยกหมวดหมู่ย่อย asset
    const [assetLiquidValue,setAssetLiquidValue] = useState();
    const [assetInvestValue,setAssetInvestValue] = useState();
    const [assetPersonalValue,setAssetPersonalValue] = useState();
    // แยกหมวดหมูย่อย liability
    const [liabilityShortValues,setLiabilityShortValues] = useState();
    const [liabilityLongValues,setliabilityLongValues] = useState();
    //
    const dispatch = useDispatch();
    
    useEffect(()=>{
        getDataAsset();
        getDataLiability();
        setNetWealthValue(assetValues - liabilityValues)
        getDataLiabilityRemaining();
        BottomBoxAssetGraphHeight();
        BottomBoxLiabilityGraphHeight();
    },[assetValues, liabilityValues, isUpdate])

    useEffect(() => {
        if (percentageOfAssetHeight !== null && percentageOfLiabilityHeight !== null) {
            TopBoxNetWealthGraphHeight();
            BottomBoxNetWealthGraphHeight();
        }
    }, [percentageOfAssetHeight, percentageOfLiabilityHeight, setPercentageOfNetWealthHeightTop, setPercentageOfNetWealthHeightBottom]);
        
    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetData(itemsDataAsset);
            let height = 240 + (itemsDataAsset.liquid.length * 50) + (itemsDataAsset.invest.length * 62) + (itemsDataAsset.personal.length * 62)
            setAssetContainerHeight(height)
            setAssetValues(getAssetValues(itemsDataAsset));
            setAssetLiquidValue(getAssetLiquidValue(itemsDataAsset));
            setAssetInvestValue(getAssetInvestValue(itemsDataAsset));
            setAssetPersonalValue(getAssetPersonalValue(itemsDataAsset));
        } catch (error) {
            console.error('Error getDataAsset:', error);
        }
    }

    const getDataLiability = async()=>{
        try{
            const itemsDataLiability = await retrieveDataLiability(userUID);
            //console.log(itemsDataLiability)
            setLiabilityData(itemsDataLiability);
            let height = 240 + (itemsDataLiability.short.length * 50) + (itemsDataLiability.long.length * 50)
            setLiabilityContainerHeight(height)
           
        } catch (error) {
            console.error('Error getDataLiability:', error);
        }
    }

    const getDataLiabilityRemaining = async()=>{
        try{
            const itemsDataLiabilityRemaining = await retrieveDataLiabilityRemaining(userUID)
            //console.log(itemsDataLiabilityRemaining)
            setLiabilityRemainingData(itemsDataLiabilityRemaining)
            
            let lengthOfShortLiabilityRemaining = itemsDataLiabilityRemaining.short.length;
            let lengthOfLongLiabilityRemaining = itemsDataLiabilityRemaining.long.length; 
            let height = 240 + (lengthOfShortLiabilityRemaining * 48) + (lengthOfLongLiabilityRemaining * 48)
            setLiabilityRemainingContainerHeight(height)

            setLiabilityValues(getLiabilityValues(itemsDataLiabilityRemaining));
            setLiabilityShortValues(getLiabilityShortValues(itemsDataLiabilityRemaining));
            setliabilityLongValues(getLiabilityLongValues(itemsDataLiabilityRemaining));
        }catch (error) {
            console.error('Error getLiabilityRemaining:', error);
        }
    }

    const getAssetValues = (itemsDataAsset)=>{
        let assetValues = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.invest.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.personal.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        
        return assetValues
    }
    const getAssetLiquidValue = (itemsDataAsset)=>{
        let assetLiquidValue = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetLiquidValue += parseFloat(element.value);
        });
        
        return assetLiquidValue;
    }
    
    const getAssetInvestValue = (itemsDataAsset)=>{
        let assetInvestValue = 0;
        itemsDataAsset.invest.forEach(element => {
            assetInvestValue += parseFloat(element.value);
        });
        
        return assetInvestValue;
    }

    const getAssetPersonalValue = (itemsDataAsset)=>{
        let assetPersonalValue = 0;
        itemsDataAsset.personal.forEach(element => {
            assetPersonalValue += parseFloat(element.value);
        });
        
        return assetPersonalValue;
    }
    const getLiabilityValues = (itemsDataLiability)=>{
        let liabilityValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        itemsDataLiability.long.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        
        return liabilityValues
    }
    const getLiabilityShortValues = (itemsDataLiability)=>{
        let liabilityShortValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityShortValues += parseFloat(element.value);
        });
        
        return liabilityShortValues
    }
    const getLiabilityLongValues = (itemsDataLiability)=>{
        let liabilityLongValues = 0;
        itemsDataLiability.long.forEach(element => {
            liabilityLongValues += parseFloat(element.value);
        });
        
        return liabilityLongValues
    }

    

    const percentageOfAssets = ()=>{
        return assetValues > 0 ? '(100.00%)' : '(0%)'
    }
    const percentageOfLiability = ()=>{
        if(assetValues > 0){
            let percentageOfLiabilityValue = (liabilityValues/assetValues*100).toFixed(2)
            return percentageOfLiabilityValue > 0 ? `(${percentageOfLiabilityValue}%)` : `(0%)`
        }else{
            if(liabilityValues > 0){
                let percentageOfLiabilityValue = 100
                return percentageOfLiabilityValue > 0 ? `(${percentageOfLiabilityValue}%)` : `(0%)`
            }else{
                let percentageOfLiabilityValue = 0
                return percentageOfLiabilityValue > 0 ? `(${percentageOfLiabilityValue}%)` : `(0%)`
            }
            
            
        }   
    }
    const percentageOfNetWealth = () => {
        // คำนวณค่าเปอร์เซ็นต์ของความมั่งคั่งสุทธิ โดยปรับเป็นทศนิยมสองตำแหน่ง
        let percentageOfnetWealthValue = (netWealthValue / assetValues * 100).toFixed(2);
        
        if(assetValues == 0 && liabilityValues > 0){
            return '(100%)'
        }
        
        // ตรวจสอบว่าค่าที่คำนวณได้เป็นบวกหรือลบ และปรับรูปแบบการแสดงผลให้สอดคล้อง
        else if (percentageOfnetWealthValue > 0) {
            return `(${percentageOfnetWealthValue}%)`;
        } else if (percentageOfnetWealthValue < 0) {
            return `(-${Math.abs(percentageOfnetWealthValue)}%)`;
        } else {
            return `(0%)`;
        }
    }
    
    const percentageOfAssetLiquid = ()=>{
        let percentageOfAssetLiquid = (assetLiquidValue/assetValues*100).toFixed(2)
        return percentageOfAssetLiquid > 0 ? `(${percentageOfAssetLiquid}%)` : `(0%)`
    }
    const percentageOfAssetInvest = ()=>{
        let percentageOfAssetInvest = (assetInvestValue/assetValues*100).toFixed(2)
        return percentageOfAssetInvest > 0 ? `(${percentageOfAssetInvest}%)` : `(0%)`
    }
    const percentageOfAssetPersonal = ()=>{
        let percentageOfAssetPersonal = (assetPersonalValue/assetValues*100).toFixed(2)
        return percentageOfAssetPersonal > 0 ? `(${percentageOfAssetPersonal}%)` : `(0%)`
    }
    const percentageOfLiabilityShort = ()=>{
        if(assetValues > 0){
            let percentageOfLiabilityShort = (liabilityShortValues/assetValues*100).toFixed(2)
            return percentageOfLiabilityShort > 0 ? `(${percentageOfLiabilityShort}%)` : `(0%)`
        }else{
            let percentageOfLiabilityShort = (liabilityShortValues/liabilityValues*100).toFixed(2)
            return percentageOfLiabilityShort > 0 ? `(${percentageOfLiabilityShort}%)` : `(0%)`
        }   
    }
    const percentageOfLiabilityLong = ()=>{
        if(assetValues > 0){
            let percentageOfLiabilityLong = (liabilityLongValues/assetValues*100).toFixed(2)
            return percentageOfLiabilityLong > 0 ? `(${percentageOfLiabilityLong}%)` : `(0%)`
        }else{
            let percentageOfLiabilityLong = (liabilityLongValues/liabilityValues*100).toFixed(2)
            return percentageOfLiabilityLong > 0 ? `(${percentageOfLiabilityLong}%)` : `(0%)`
        }   
    }
    
    
    const handleSelectedGraph = ()=>{
        setSelectedType('graph')
    }

    const handleSelectedMenuBar = ()=>{
        setSelectedType('menuBar')
    }

    const handleSelectedAsset = ()=>{
        setSelectedDetail('asset')
    }

    const handleSelectedLiability = ()=>{
        setSelectedDetail('liability')
    }

    const handleItemPress = (item) => {
        dispatch(setItemData(item))
        dispatch(setCameFrom("AssetLiabilityDetailScreen"));
        navigation.navigate('DetailScreen');
    };
    const renderItem = ({ item })=>{
        return(
            <TouchableOpacity style={{flex:1, flexDirection:'row', alignItems:'center', marginVertical:5, backgroundColor:'#FFFFFF', borderRadius:16, padding:5}}
            onPress={() => handleItemPress(item)}>
                <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/circle.png')} width={25} height={25}/>
                    <Image source={{uri:item.photoURL}} width={25} height={25} style={{position:'absolute'}}/>
                </View>
                
                <Text style={{flex:2, color:'#000000', fontSize:12, fontFamily:'Poppins-Regular'}}>{item.subCategory}</Text>
                <Text style={selectedDetail === 'asset' ? styles.textValueGreen : styles.textValueRed}>{item.value}</Text>
                <Text style={{paddingHorizontal:5}}>THB</Text>
            </TouchableOpacity>
        )
        
    }
    
    const componentAsset = ()=>{
        return(
            <View style={{paddingHorizontal:20, marginVertical:10}}>
                <Text style={{fontFamily:'Poppins-Bold', color:'#FFFFFF', marginVertical:5}}>สินทรัพย์สภาพคล่อง</Text>
                <FlatList
                    data={assetData.liquid}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{fontFamily:'Poppins-Bold', color:'#FFFFFF', marginVertical:5}}>สินทรัพย์ลงทุน</Text>
                <FlatList 
                    data={assetData.invest}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{fontFamily:'Poppins-Bold', color:'#FFFFFF', marginVertical:5}}>สินทรัพย์ส่วนตัว</Text>
                <FlatList
                    data={assetData.personal}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
            
        )
    }

    const componentLiability = ()=>{
        return(
            <View style={{paddingHorizontal:20, marginVertical:10}}>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:'#FFFFFF', marginVertical:5}}>หนี้ระยะสั้น</Text>
                    <View style={{flexDirection:'row', width:140}}>
                        <TouchableOpacity style={{flex:1, backgroundColor: selectedDetailLiability === 'Remaining' ? '#000000' : '#D8D8D8', margin:3, justifyContent:'center', alignItems:'center', borderRadius:16}}
                            onPress={()=>{
                                setSelectedDetailLiability('Remaining')
                            }}
                        >
                            <Text style={{color: selectedDetailLiability === 'Remaining' ? '#FFFFFF' : '#000000'}}>คงเหลือ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1, backgroundColor: selectedDetailLiability === 'Remaining' ? '#D8D8D8' : '#000000', margin:3, justifyContent:'center', alignItems:'center', borderRadius:16}}
                            onPress={()=>{
                                setSelectedDetailLiability('All')
                            }}
                        >
                            <Text style={{color: selectedDetailLiability === 'Remaining' ? '#000000' : '#FFFFFF'}}>ทั้งหมด</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                {selectedDetailLiability === 'Remaining' && (
                    <View>
                        <FlatList
                            data={liabilityRemainingData.short}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                        />

                        <Text style={{fontFamily:'Poppins-Bold', color:'#FFFFFF', marginVertical:5}}>หนี้ระยะยาว</Text>
                        <FlatList
                            data={liabilityRemainingData.long}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                        />
                    </View>
                )}
                
                {selectedDetailLiability === 'All' && (
                    <View>
                        <FlatList
                            data={liabilityData.short}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                        />

                        <Text style={{fontFamily:'Poppins-Bold', color:'#FFFFFF', marginVertical:5}}>หนี้ระยะยาว</Text>
                        <FlatList
                            data={liabilityData.long}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                
                
            </View>
            
        )
    }

    const componentMenuBar = ()=>{
        return(
            <View style={{height:'100%'}}>
                <View style={{flexDirection:'row', backgroundColor:'#F5F5F5'}}>
                    <TouchableOpacity style={{height:35, width:80, backgroundColor:'#0ABAB5', marginTop:20, marginLeft:10, borderTopLeftRadius:16, borderTopRightRadius:16, justifyContent:'center'}}
                        onPress={handleSelectedAsset}
                    >
                        <Text style={{textAlign:'center', fontFamily:'Poppins-Bold', color:'#FFFFFF'}}>สินทรัพย์</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:35, width:80, backgroundColor:'#FF0000', marginTop:20, marginLeft:10, borderTopLeftRadius:16, borderTopRightRadius:16, justifyContent:'center'}}
                        onPress={handleSelectedLiability}
                    >
                        <Text style={{textAlign:'center', fontFamily:'Poppins-Bold', color:'#FFFFFF'}}>หนี้สิน</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{height:'100%', backgroundColor: selectedDetail == 'asset' ? '#0ABAB5' : '#FF0000'}}>
                    {selectedDetail == 'asset' ? componentAsset() : componentLiability()}
                </View>
            </View>
        )
    }

    const TopBoxAssetGraphHeight = ()=>{
        const percentageOfLiability = liabilityValues / assetValues * 100
        if(assetValues >= liabilityValues){
            return 0
        }else{
            // หนี้สิน > 100%
            if(percentageOfLiability > 100){
                return `${100 - assetValues / liabilityValues * 100}%`
            }
            else{
                return '100%'
            }
            
        }
    }
    const BottomBoxAssetGraphHeight = ()=>{
        const percentageOfLiability = liabilityValues / assetValues * 100
        if(assetValues >= liabilityValues){
            setPercentageOfAssetHeight(100)
            //return '100%'
        }else{
            if(percentageOfLiability > 100){
                const value = assetValues / liabilityValues * 100
                setPercentageOfAssetHeight(value)
                //return `${value}%`
            }
            else if(percentageOfLiability > 0){
                const value = 100 - percentageOfLiability
                setPercentageOfAssetHeight(value)
                //return `${value}%`
            }
            else{
                setPercentageOfAssetHeight(0)
                //return '0%'
            }
            
        }
    }

    const TopBoxLiabilityGraphHeight = ()=>{
        if(assetValues != 0){
            const height = 100 - liabilityValues / assetValues * 100
            return `${height}%`
        }else{
            return 0
        } 
    }
    const BottomBoxLiabilityGraphHeight = ()=>{
        if(assetValues != 0){
            const height = liabilityValues / assetValues * 100
            if(height > 100){
                setPercentageOfLiabilityHeight(100)
                //return '100%'
            }else{
                setPercentageOfLiabilityHeight(height)
                //return `${height}%`
            }
        }else{
            setPercentageOfLiabilityHeight(100)
            //return '100%'
        } 
    }

    const TopBoxNetWealthGraphHeight = ()=>{
        if(percentageOfAssetHeight - percentageOfLiabilityHeight > 0){
            const value = 100 - (percentageOfAssetHeight - percentageOfLiabilityHeight)
            setPercentageOfNetWealthHeightTop(value)
            console.log(value)
        }
        else if(percentageOfAssetHeight - percentageOfLiabilityHeight < 0){
            const value = percentageOfLiabilityHeight - percentageOfAssetHeight
            setPercentageOfNetWealthHeightTop(value)
        }
        
        
    }
    const BottomBoxNetWealthGraphHeight = ()=>{
        if(percentageOfAssetHeight >= percentageOfLiabilityHeight){
            const value = percentageOfAssetHeight - percentageOfLiabilityHeight
            console.log(value)
            setPercentageOfNetWealthHeightBottom(value)
        }
        else{
            const value = 100 + (percentageOfAssetHeight - percentageOfLiabilityHeight)
            setPercentageOfNetWealthHeightBottom(value)
        }
        
    }
   
    const componentGraph = ()=>{
        
        return(
            <View style ={{flex:1, backgroundColor:'#f5f5f5'}}>
                <View style={{height:400,marginTop:25,alignItems:'center', marginHorizontal:25}}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row', width:'100%',marginBottom:10, justifyContent:'space-between'}}>
                            <View style={{flex:1.5, justifyContent:'center', alignItems:'flex-start'}}>
                                <Text style={styles.textHeaderGraph}>สินทรัพย์</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                <Text style={styles.textHeaderValueGraph}>{assetValues}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <Text style={styles.textHeaderValueGraph}>{percentageOfAssets()}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', width:'100%',marginBottom:10}}>
                            <View style={{flex:1.5, justifyContent:'center', alignItems:'flex-start'}}>
                                <Text style={styles.textHeaderGraph}>หนี้สิน</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                <Text style={styles.textHeaderValueGraph}>{liabilityValues}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <Text style={styles.textHeaderValueGraph}>{percentageOfLiability()}</Text>
                            </View>
                            
                        </View>
                        <View style={{flexDirection:'row', width:'100%',marginBottom:20}}>
                            <View style={{flex:1.5, justifyContent:'center', alignItems:'flex-start'}}>
                                <Text style={styles.textHeaderGraph}>ความมั่งคั่งสุทธิ</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                <Text style={styles.textHeaderValueGraph}>{netWealthValue}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <Text style={styles.textHeaderValueGraph}>{percentageOfNetWealth()}</Text>
                            </View>
                            
                            
                            
                        </View>
                    </View>

                    {/* bar graph */}
                    <View style={{height:300, width:'100%', borderWidth:1, flexDirection:'row'}}>
                        {/* asset */}
                        <View style={{flex:1, borderWidth:2, borderColor:'transparent', margin:5}}>
                            <View style={{flex:1}}>
                                <View style={{height: TopBoxAssetGraphHeight()}}></View>
                                <View style={{height: `${percentageOfAssetHeight}%`, width:'100%', justifyContent:'flex-end', alignItems:'center'}}>
                                    {/* asset liquid */}
                                    <View style={{width:'50%', height:`${assetLiquidValue / assetValues * 100}%`, backgroundColor:'#9EB700'}}></View>
                                    {/* asset invest */}
                                    <View style={{width:'50%', height:`${assetInvestValue / assetValues * 100}%`, backgroundColor:'#D1EB2A'}}></View>
                                    {/* asset personal */}
                                    <View style={{width:'50%', height:`${assetPersonalValue / assetValues * 100}%`, backgroundColor:'#EDFF7C'}}></View>
                                </View>
                                
                            </View>

                            <View style={{borderWidth:1, borderColor:'#000000'}}></View>

                            <View style={{flex:1}}>

                            </View>
                            <Text style={{color:'#000000', textAlign:'center'}}>สินทรัพย์</Text>
                        </View>

                        {/* liability */}
                        <View style={{flex:1, borderWidth:2, borderColor:'transparent', margin:5}}>
                            <View style={{flex:1}}>
                                <View style={{height: TopBoxLiabilityGraphHeight()}}></View>
                                <View style={{height: `${percentageOfLiabilityHeight}%`, width:'100%', justifyContent:'flex-end', alignItems:'center'}}>
                                    {/* liability short */}
                                    <View style={{width:'50%', height:`${liabilityShortValues / liabilityValues * 100}%`, backgroundColor:'#FF4C45'}}></View>
                                    {/* liability long */}
                                    <View style={{width:'50%', height:`${liabilityLongValues / liabilityValues * 100}%`, backgroundColor:'#FF7F7A'}}></View>
                                </View>
                                
                            </View>

                            <View style={{borderWidth:1, borderColor:'#000000'}}></View>
                            
                            <View style={{flex:1}}>

                            </View>
                            <Text style={{color:'#000000', textAlign:'center'}}>หนี้สิน</Text>
                        </View>
                        
                        
                        {/* net wealth */}
                        <View style={{flex:1, borderWidth:2, borderColor:'transparent', margin:5}}>
                            <View style={{flex:1}}>
                                <View style={{height: netWealthValue > 0 ? `${percentageOfNetWealthHeightTop}%` : '0%'}}></View>
                                <View style={{height: netWealthValue > 0 ? `${percentageOfNetWealthHeightBottom}%` : '0%', width:'100%', justifyContent:'flex-end', alignItems:'center'}}>
                                    {/* net wealth */}
                                    <View style={{width:'50%', height: '100%', backgroundColor:'#34D399'}}></View>
                                </View>
                                
                            </View>

                            <View style={{borderWidth:1, borderColor:'#000000'}}></View>
                            
                            <View style={{flex:1}}>
                                
                                <View style={{height: netWealthValue < 0 ? `${percentageOfNetWealthHeightTop}%` : '0%', width:'100%', justifyContent:'flex-end', alignItems:'center'}}>
                                    {/* net wealth */}
                                    <View style={{width:'50%', height: '100%', backgroundColor:'#34D399'}}></View>
                                </View>
                                <View style={{height: netWealthValue < 0 ? `${percentageOfNetWealthHeightBottom}%` : '0%'}}></View>
                                
                            </View>
                            <Text style={{color:'#000000', textAlign:'center'}}>ความมั่งคั่งสุทธิ</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{height:120, marginTop:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', paddingHorizontal:10, paddingBottom:5, color:'#000000'}}>รายละเอียด</Text>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <View style={{flex:0.25,flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                            <View style={{width: 15,height: 15, borderWidth:1,marginBottom:15,backgroundColor: '#9EB700'}}></View>
                            <View style={{width: 15,height: 15, borderWidth:1,marginBottom:15,backgroundColor: '#D1EB2A'}}></View>
                            <View style={{width: 15,height: 15, borderWidth:1,marginBottom:15,backgroundColor: '#EDFF7C'}}></View>
                        </View>

                        <View style={{flexflexDirection: 'column',justifyContent:'center',marginHorizontal:8}}>
                            <Text style={styles.textDetail}>สินทรัพย์สภาพคล่อง {percentageOfAssetLiquid()}</Text>
                            <Text style={styles.textDetail}>สินทรัพย์ลงทุน {percentageOfAssetInvest()}</Text>
                            <Text style={styles.textDetail}>สินทรัพยส่วนตัว {percentageOfAssetPersonal()}</Text>
                        </View>
                        <View style={{flex:0.25,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                            <View style={{width: 15,height: 15, borderWidth:1,marginBottom:15,backgroundColor: '#FF4C45'}}></View>
                            <View style={{width: 15,height: 15, borderWidth:1,marginBottom:15,backgroundColor: '#FF7F7A'}}></View>
                            <View style={{width: 15,height: 15, borderWidth:1,marginBottom:15,backgroundColor: '#34D399'}}></View>
                        </View>
                        <View style={{flexDirection: 'column',justifyContent:'center',marginHorizontal:8}}>
                            <Text style={styles.textDetail}>หนี้สินระยะสั้น {percentageOfLiabilityShort()}</Text>
                            <Text style={styles.textDetail}>หนี้สินระยะยาว {percentageOfLiabilityLong()}</Text>
                            <Text style={styles.textDetail}>ความมั่งคั่งสุทธิ {percentageOfNetWealth()}</Text>
                        </View>
                    </View>
                    
                </View> 
            </View>
        )
    }

    return(
        <ScrollView style={{backgroundColor:'#fffffa'}}>
            <View style={{alignItems:'center'}}>
                <BoxInfo topic='ยอดเงินคงเหลือ' topicValue={netWealthValue} subTopic1='สินทรัพย์'
                                    subTopic1Value={assetValues} subTopic2='หนี้สิน' subTopic2Value={liabilityValues}
                />
            </View>
            
            <View style={{height:selectedType === 'graph' ? 620 : (selectedDetail == 'asset' ? assetContainerHeight : (selectedDetailLiability == 'All' ? liabilityContainerHeight : liabilityRemainingContainerHeight)), borderColor:'#a9a9a9', marginHorizontal:15, borderRadius:16, backgroundColor:'#ffffff'}}>
                <View style={{height:55, flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: selectedType === 'graph' ? '#0ABAB5' : '#B3D8DB', borderTopLeftRadius:16}}
                        onPress={handleSelectedGraph}
                    >
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:18}}>กราฟ</Text>
                        <Image source={require('../../assets/barChartIcon.png')} width={30} height={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: selectedType === 'menuBar' ? '#0ABAB5' : '#B3D8DB', borderTopRightRadius:16}}
                        onPress={handleSelectedMenuBar}
                    >
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:18}}>เมนู</Text>
                        <Image source={require('../../assets/menuBarIcon.png')} width={30} height={30}/>
                    </TouchableOpacity>
                    
                </View>
    
                { selectedType == 'graph'? componentGraph() : componentMenuBar()}
                                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:16,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:13,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#000000'
    },

    textValueGreen:{
        flex:1,
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#0ABAB5',
        textAlign:'right'
    },
    textValueRed:{
        flex:1,
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#FF0000',
        textAlign:'right'
    },
    textValueinGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#000000',
        textAlign:'center',
        marginBottom:2
    },
    textHeaderGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:15,
        color:'#000000',
       
        
    },
    textHeaderValueGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000',
        
        
    },
    textDetail:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:11,
        color:'#000000',
        marginBottom:15,
        lineHeight: 15
    }
})