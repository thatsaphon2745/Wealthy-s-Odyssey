import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from 'react-redux';
import { setItemPhotoURL } from "../../../redux/variableSlice";

export const EditCategoryIcon = ({route, navigation})=>{

    const dispatch = useDispatch();

    const renderItemEditCategoryIconScreen = ({ item }) => (
    
        <View style={styles.CategoryIcon}>
            <TouchableOpacity style={styles.icon}
                onPress={() => handleItemPress(item)}>
                <Image source={require('../../../assets/white_circle.png')}/>
                <Image style={{position:'absolute'}} source={{uri: item.photoURL}} width={35} height={35}/>
            </TouchableOpacity>
        </View>
    );
    
    const handleItemPress = (item) => {
        // ทำการนำข้อมูลไปยังหน้าถัดไป
        dispatch(setItemPhotoURL(item.photoURL));
        navigation.navigate('AddCategoryScreen');
    };
    
    return(
        <SafeAreaView style={{flex:1, padding:5, backgroundColor:'#fffffa'}}>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%'}} distance={5} startColor={'#0ABAB5'} offset={[6, 8]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>
                                การเงิน
                            </Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={CategoryFinancial}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemEditCategoryIconScreen}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%'}} distance={5} startColor={'#0ABAB5'} offset={[6, 8]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>
                                อาหาร
                            </Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={CategoryFood}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemEditCategoryIconScreen}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%'}} distance={5} startColor={'#0ABAB5'} offset={[6, 8]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>
                                ความงาม
                            </Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={CategoryFairness}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemEditCategoryIconScreen}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold', 
        textAlign:'center', 
        fontSize:17, 
        fontWeight: 'bold', 
        color:'#0ABAB5'
    },
    box:{
        height:167, 
        borderRadius:16,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa', 
        marginBottom:10,
        marginVertical:5
    },
    boxhead:{
        height:50, 
        borderTopLeftRadius:15, 
        borderBottomWidth:1 , 
        borderColor:'#000000',  
        borderTopRightRadius:15, 
        justifyContent:'center', 
        backgroundColor:'#fffffa'
    },
    CategoryIcon:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        flex:1,
        alignItems: 'center',
        marginVertical:10,
        marginBottom:10
    }
})

const CategoryFinancial = [
    {
        category: "การเงิน",
        subCategory: "index0",
        photoURL: 'https://drive.google.com/uc?export=view&id=13nW-UxYv736YIrqlYwOw-gaMkFxtqxna'
    },
    {
        category: "การเงิน",
        subCategory: "index1",
        photoURL: 'https://drive.google.com/uc?export=view&id=1NhEemlRtXNuVEj6xE-MstZ-zNnXuKt78'
    },
    {
        category: "การเงิน",
        subCategory: "index2",
        photoURL: 'https://drive.google.com/uc?export=view&id=1Djy7ssixu-tlUSuVH_aFJt71CD17g0Mt'
    },
    {
        category: "การเงิน",
        subCategory: "index3",
        photoURL: 'https://drive.google.com/uc?export=view&id=1KLcmsTsXlsp4S5Za0Yd47X8NmbaIVtCW'
    },
    {
        category: "การเงิน",
        subCategory: "index4",
        photoURL: 'https://drive.google.com/uc?export=view&id=1rajqHbugvo-vyLwiWHLw1Im_AzZsOicA'
    },
    {
        category: "การเงิน",
        subCategory: "index5",
        photoURL: 'https://drive.google.com/uc?export=view&id=1RRXwVRLb-cyOK2jVaGVGtuHgmo_aU3KK'
    },
    {
        category: "การเงิน",
        subCategory: "index6",
        photoURL: 'https://drive.google.com/uc?export=view&id=1gWcaKlpOaDO_CO-Sa4jcGOj7Pt978Dnc'
    },
    {
        category: "การเงิน",
        subCategory: "index7",
        photoURL: 'https://drive.google.com/uc?export=view&id=1ElQyufONtWwobNH56Yvxux7zAQcwwh8n'
    },
    {
        category: "การเงิน",
        subCategory: "index8",
        photoURL: 'https://drive.google.com/uc?export=view&id=1yfk5y2BfAeOiWK-kAum25yhSz_i6rYDg'
    },
    {
        category: "การเงิน",
        subCategory: "index9",
        photoURL: 'https://drive.google.com/uc?export=view&id=1XTCi29sOH2P1loLj0peeWQzbUAee7V8m'
    },
]

const CategoryFood = [
    {
        category: 'อาหาร',
        subCategory: "index0",
        photoURL: 'https://drive.google.com/uc?export=view&id=1Mt4X_se2aip2L3hbDA-ru1Uz75N1eEgi'
    },
    {
        category: 'อาหาร',
        subCategory: "index1",
        photoURL: 'https://drive.google.com/uc?export=view&id=1bX7qy_fdHoSgiQHcfCvlmVuSaV_OKrKB'
    },
    {
        category: 'อาหาร',
        subCategory: "index2",
        photoURL: 'https://drive.google.com/uc?export=view&id=1UR9KUTsP5i6n22AD5An9DF88XpTUxFhI'
    },
    {
        category: 'อาหาร',
        subCategory: "index3",
        photoURL: 'https://drive.google.com/uc?export=view&id=1zez4OdfCqMiOLQKppOz-yqz1Z_z6Cz41'
    },
    {
        category: 'อาหาร',
        subCategory: "index4",
        photoURL: 'https://drive.google.com/uc?export=view&id=1YT9MQB6M44aAzvcXVeowqh78yqQbYfAs'
    },
    {
        category: 'อาหาร',
        subCategory: "index5",
        photoURL: 'https://drive.google.com/uc?export=view&id=10jozVKruUryyfuGWECK3NCMI0CbDc63w'
    },
    {
        category: 'อาหาร',
        subCategory: "index6",
        photoURL: 'https://drive.google.com/uc?export=view&id=1lrFv1kLpvr7hKu7q1sy2OI9S3ujz7ti2'
    },
    {
        category: 'อาหาร',
        subCategory: "index7",
        photoURL: 'https://drive.google.com/uc?export=view&id=19RarhedVgImHCJDjy60dSXC1G9jZBEDX'
    },
    {
        category: 'อาหาร',
        subCategory: "index8",
        photoURL: 'https://drive.google.com/uc?export=view&id=18yywhmEc_Q-e30aKCBYg_Cl7cfJ0npEY'
    },
    {
        category: 'อาหาร',
        subCategory: "index9",
        photoURL: 'https://drive.google.com/uc?export=view&id=1q9NRSgBAai5dVjUKp1ag7ZJoqwjITJuF'
    }
]

const CategoryFairness = [
    {
        category: 'ความงาม',
        subCategory: 'index0',
        photoURL: 'https://drive.google.com/uc?export=view&id=1q8lG1Ouifo5-HU83yiGfCkzWyp6tlJEg'
    },
    {
        category: 'ความงาม',
        subCategory: 'index1',
        photoURL: 'https://drive.google.com/uc?export=view&id=1Imkiynru6ei8P-gI_iG_EE_me0skaScY'
    },
    {
        category: 'ความงาม',
        subCategory: 'index2',
        photoURL: 'https://drive.google.com/uc?export=view&id=1l7euRB7ObgxPCqizZ5d96hUPJvkpnRTf'
    },
    {
        category: 'ความงาม',
        subCategory: 'index3',
        photoURL: 'https://drive.google.com/uc?export=view&id=18VFFtVP_65Vm0t6kwHu7YXc627wexGrf'
    },
    {
        category: 'ความงาม',
        subCategory: 'index4',
        photoURL: 'https://drive.google.com/uc?export=view&id=12vGgWizjKBdKu_E7S831873gc3vJiTV-'
    },
    {
        category: 'ความงาม',
        subCategory: 'index5',
        photoURL: 'https://drive.google.com/uc?export=view&id=1AXU6mCh_lJV6UK9JYeQKgbGJeYfX-k9W'
    },
    {
        category: 'ความงาม',
        subCategory: 'index6',
        photoURL: 'https://drive.google.com/uc?export=view&id=1dI1NiL_XKYSaJLeT4xEq4pvVheCjnAlm'
    },
    {
        category: 'ความงาม',
        subCategory: 'index7',
        photoURL: 'https://drive.google.com/uc?export=view&id=1otldZnBIc0O-aIPCkUIYxVSCzX7H-dCf'
    },
    {
        category: 'ความงาม',
        subCategory: 'index8',
        photoURL: 'https://drive.google.com/uc?export=view&id=15EJf1NMS3oStdTPlK66zMO4T0OaQ4MqQ'
    },
    {
        category: 'ความงาม',
        subCategory: 'index9',
        photoURL: 'https://drive.google.com/uc?export=view&id=1a3z4Os736Gk6i50DZYyrefUkOCbe5cQl'
    }
]