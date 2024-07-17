import { View,TouchableOpacity,Image,Text, FlatList, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { setIsUpdate } from "../../redux/variableSlice";
import { addItem2Inventory, checkDuplicateItem, retrieveCurrencyPet, addFurniture2Inventory, 
    updateMoneyBalance, updateRubyBalance, updateGuarantee, addPetImages, addOnePetImage} from "../../firebase/UserModel";
import { retrieveInventory } from "../../firebase/RetrieveData";

export const PetShopScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const [coinBalance, setCoinBalance] = useState();//แทนด้วยเงินทั้งหมด user
    const [rubyBalance, setRubyBalance] = useState();//แทนด้วยเพชรทั้งหมด user
    const [mysteryBoxGuaranteeNormal, setmysteryBoxGuaranteeNormal] = useState();
    const [inventory, setInventory] = useState();
    const [modalChangePetCardVisible, setModalChangePetCardVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [modalInfoForUseVisible, setModalInfoForUseVisible] = useState(false);
    const [modalPurchasedIncomplete, setModalPurchasedIncomplete] = useState(false);
    const [modalPurchasedComplete, setModalPurchasedComplete] = useState(false);
    const [modalRandomCoin, setModalRandomCoin] = useState(false);
    const [modalGuaranteCoin, setModalGuaranteCoin] = useState(false);
    const [modalInsufficientCoins, setModalInsufficientCoins] = useState(false);
    const [modalInsufficientRubies, setModalInsufficientRubies] = useState(false);
    const [modalOneItemInInventory, setModalOneItemInInventory] = useState(false);
    const [modalDuplicateItem, setModalDuplicateItem] = useState(false);
    const [newPetImage, setNewPetImage] = useState(null);
    const [randomCoinValue, setRandomCoinValue] = useState(null);

    useEffect(() => {
        retrieveCurrency();
        handleRetriveInventory()
    }, [coinBalance,rubyBalance,isUpdate]);

    const handleRetriveInventory = async () => {
        const data = await retrieveInventory(userUID);
        setInventory(data);
    }

    //ดึงข้อมูล currency และ เลขการันตี
    const retrieveCurrency = async () => {
        try {
            const currencyData = await retrieveCurrencyPet(userUID);
            if (currencyData) {
                setCoinBalance(currencyData.Money);
                setRubyBalance(currencyData.Ruby);
                setmysteryBoxGuaranteeNormal(currencyData.Guarantee)
            } else {
                console.log("No currency data found.");
            }
        } catch (error) {
            console.error("Error retrieving currency data:", error);
        }
    };

    //รายละเอียดการซื้อและคำนวนเงินและเพชร
    const reportBuyItem = (item) => {
        if (item.itemType === 'กล่องสุ่ม') {
            if (item.itemName === 'CardBoard') {
                if (mysteryBoxGuaranteeNormal === 1) {
                    const newRubyBalance = rubyBalance - item.itemPrice;
                    const updatedMysteryBoxCount = item.itemGuarantee;
                    const newRandomMoney = randomMoney(item);
                    const newCoinBalance = coinBalance + newRandomMoney;
                    // อัปเดตยอดเงินใน Firebase และ เลขการันตี
                    setRubyBalance(newRubyBalance);
                    setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                    updateGuarantee(userUID, updatedMysteryBoxCount)
                    setRandomCoinValue(newRandomMoney)
                    updateRubyBalance(userUID, newRubyBalance)
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            togglePurchasedIncomplete();
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                    })
                    setCoinBalance(newCoinBalance);
                    updateMoneyBalance(userUID, newCoinBalance)
                        .then(() => {
                            console.log(`Item Purchased: ${item.itemName}`);
                            toggleGuaranteCoin();
                        })
                        .catch((error) => {
                            console.error("Error updating money balance:", error);
                            togglePurchasedIncomplete();
                            // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                            setCoinBalance(coinBalance);
                        })
                }else {
                    if (item.itemCurrencyType === 'coin') {
                        if (coinBalance >= item.itemPrice) {
                            const newCoinBalance = coinBalance - item.itemPrice;
                            const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                            const newRandomMoney = randomMoney(item);
                            const newCoinBalance1 = newCoinBalance + newRandomMoney;
                    
                            // อัปเดตยอดเงินและจำนวนกล่องลับใน Firebase
                            setCoinBalance(newCoinBalance);
                            setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                            setCoinBalance(newCoinBalance1);
                            setRandomCoinValue(newRandomMoney);
                            updateMoneyBalance(userUID, newCoinBalance1)
                                .then(() => {
                                    console.log(`Item Purchased: ${item.itemName}`);
                                    toggleRandomCoin();
                                })
                                .catch((error) => {
                                console.error("Error updating money balance:", error);
                                togglePurchasedIncomplete();
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            })
                            updateGuarantee(userUID, updatedMysteryBoxCount);
                        } else {
                            console.log('Insufficient coins to buy this item');
                            toggleInsufficientCoins();
                        }
                    }else if (item.itemCurrencyType === 'ruby') {
                        if (rubyBalance >= item.itemPrice) {
                            const newRubyBalance = rubyBalance - item.itemPrice;
                            const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                            const newRandomMoney = randomMoney(item);
                            const newCoinBalance = coinBalance + newRandomMoney;

                            // อัปเดตยอดเงินใน Firebase และ เลขการันตี
                            setRubyBalance(newRubyBalance);
                            setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                            updateGuarantee(userUID, updatedMysteryBoxCount);
                            setRandomCoinValue(newRandomMoney);
                            updateRubyBalance(userUID, newRubyBalance)
                                .catch((error) => {
                                    console.error("Error updating ruby balance:", error);
                                    togglePurchasedIncomplete();
                                    // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                                    setRubyBalance(rubyBalance);
                            });
                            setCoinBalance(newCoinBalance);
                            updateMoneyBalance(userUID, newCoinBalance)
                                .then(() => {
                                    console.log(`Item Purchased: ${item.itemName}`);
                                    toggleRandomCoin();
                                })
                                .catch((error) => {
                                    console.error("Error updating money balance:", error);
                                    togglePurchasedIncomplete();
                                    // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                    setCoinBalance(coinBalance);
                                });
                        } else {
                            console.log('Insufficient rubies to buy this item');
                            toggleInsufficientRubies();
                        }
                    }   
                }
            }
        } else {
            if (item.itemName === 'บัตรเปลี่ยนสัตว์เลี้ยง') {
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.itemPrice) {
                        const newCoinBalance = coinBalance - item.itemPrice;
                        setCoinBalance(newCoinBalance);//ในแอป
                        updateMoneyBalance(userUID, newCoinBalance)//ในฐานข้อมูล
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                            })
                            .catch((error) => {
                                console.error("Error updating money balance:", error);
                                console.log('Purchased Incomplete!');
                                togglePurchasedIncomplete();
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            });
                    } else {
                        console.log('Insufficient coins to buy this item');
                        toggleInsufficientCoins();
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.itemPrice) {
                        const newRubyBalance = rubyBalance - item.itemPrice;
                        setRubyBalance(newRubyBalance);
                        updateRubyBalance(userUID, newRubyBalance)
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                            })
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            console.log('Purchased Incomplete!');
                            togglePurchasedIncomplete();
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                        })
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        toggleInsufficientRubies();
                    }
                }
            }else{
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.itemPrice) {
                        const newCoinBalance = coinBalance - item.itemPrice;
                        setCoinBalance(newCoinBalance);//ในแอป
                        updateMoneyBalance(userUID, newCoinBalance)//ในฐานข้อมูล
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                                togglePurchasedComplete();
                            })
                            .catch((error) => {
                                console.error("Error updating money balance:", error);
                                console.log('Purchased Incomplete!');
                                togglePurchasedIncomplete();
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            });
                    } else {
                        console.log('Insufficient coins to buy this item');
                        console.log('Purchased Incomplete!\nInsufficient coins to buy this item');
                        toggleInsufficientCoins();
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.itemPrice) {
                        const newRubyBalance = rubyBalance - item.itemPrice;
                        setRubyBalance(newRubyBalance);
                        updateRubyBalance(userUID, newRubyBalance)
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                                togglePurchasedComplete();
                            })
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            console.log('Purchased Incomplete!');
                            togglePurchasedIncomplete();
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                        })
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        console.log('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                        toggleInsufficientRubies();
                    }
                }
            }
        }
    };
    
    //ส่งประเภทไอเทมกดใช้ไป inventory
    const buyItem2Inventory = (item) => {
        addItem2Inventory(userUID,item)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
            })
    }

    //ส่งประเภทไอเทมของตกแต่งไป inventory
    const buyFur2Inventory = (item) => {
        addFurniture2Inventory(userUID,item)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
            })
    }

    //เปลี่ยนเลขรับประกันเงิน
    const changeGuarantee = (item) => {
        if (item.itemName === 'CardBoard') {
            return mysteryBoxGuaranteeNormal
        }
    }
    
    //ข้อความรายละเอียดการสุ่ม
    const toggleRandomInfo = () => {
        setModalInfoVisible(!modalInfoVisible);
    }

    //ข้อความรายละเอียดของไอเทมกดใช้
    const toggleInfoForUse = () => {
        setModalInfoForUseVisible(!modalInfoForUseVisible)
    }

    //สุ่มเงินขั้นต่ำ 100 สูงสุด 1000 การันตี 1000
    const randomMoney = (item) => {
        let randomAmount;
            if (mysteryBoxGuaranteeNormal === 1) {
                randomAmount = 1000;
            }else{
                // สุ่มตัวเลขในช่วง 100 ถึง 1000
                randomAmount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
            }
        return randomAmount;
    }

    const toggleModalChangePetCardVisible = () => {
        setModalChangePetCardVisible(!modalChangePetCardVisible);
    };

    const togglePurchasedIncomplete = () => {
        setModalPurchasedIncomplete(!modalPurchasedIncomplete);
    }

    const togglePurchasedComplete = () => {
        setModalPurchasedComplete(!modalPurchasedComplete);
    }

    const toggleRandomCoin = () => {
        setModalRandomCoin(!modalRandomCoin);
    }

    const toggleGuaranteCoin = () => {
        setModalGuaranteCoin(!modalGuaranteCoin);
    }

    const toggleInsufficientCoins = () => {
        setModalInsufficientCoins(!modalInsufficientCoins);
    }

    const toggleInsufficientRubies = () => {
        setModalInsufficientRubies(!modalInsufficientRubies);
    }

    const toggle1stItemInInventory = () => {
        setModalOneItemInInventory(!modalOneItemInInventory);
    }

    const toggleDuplicateItem = () => {
        setModalDuplicateItem(!modalDuplicateItem);
    }

    const randomPetCard = async () => { //บัตรสุ่มสัตว์เลี้ยง
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
        addPetImages(userUID, selectedPetImages);
        addOnePetImage(userUID, selectedPetImages[0])
        setNewPetImage(selectedPetImages[0]);
        console.log(newPetImage);
        toggleModalChangePetCardVisible();
        dispatch(setIsUpdate(!isUpdate));
    };

    const renderItem = ({ item, index }) => {
        let renderStyle;
        let isDuplicateURL = false;
        if (inventory && inventory.all) {
            isDuplicateURL = inventory.all.find(element => element.itemName === item.itemName) !== undefined;
        }else{
            isDuplicateURL = false
        }
        console.log(isDuplicateURL);
        if (item.itemType === 'กล่องสุ่ม') {
            renderStyle = (
                <View style={mysteryStyles.viewTouchableBoxCategoryMysteryBox}>
                    <View 
                        style={mysteryStyles.view136}>
                        <View style={mysteryStyles.viewImage}>
                            <Image
                                style={mysteryStyles.imageItemBox}
                                source={{uri: item.itemPhotoURL}}
                                width={120}
                                height={120}
                            />
                        </View>
                        <View style={mysteryStyles.viewGuarantee}>
                            <Text style={mysteryStyles.textGuaranteeDetaill}>เปิดอีก {changeGuarantee(item)} กล่องเพื่อรับตำนาน</Text>
                        </View>
                    </View>
                    <View style={mysteryStyles.view164}>
                        <View style={mysteryStyles.viewTextTopic}>
                            <Text style={mysteryStyles.textTopic}>MysteryBox กล่องปริศนา</Text>
                        </View>
                        <View style={mysteryStyles.viewDetaillTextTopic}>
                                <Text style={styles.textDetailTopic}>เปิดกล่องปริศนาเพื่อลุ้นรับเหรียญ</Text>
                            </View>
                        <View style={mysteryStyles.viewTouchableOpacity}>
                            <View style={mysteryStyles.viewPriceButton}>
                                <TouchableOpacity
                                    style={mysteryStyles.touchableMysteryItemBox}
                                    onPress={() => {
                                        reportBuyItem(item);
                                    }}
                                >
                                    <View style={mysteryStyles.viewTextPriceButton}>
                                        <Text style={mysteryStyles.textDetaillMysteryStyle}>เปิด {item.itemPrice}</Text>
                                        <Image
                                            source={{
                                                uri: item.itemCurrencyType === 'coin'
                                                    ? 'https://drive.google.com/uc?export=view&id=1lB6vcCq3Kng3852LIrvXfM-W36guffFI'
                                                    : 'https://drive.google.com/uc?export=view&id=1JBKocVjx9NAa8p8kNwWc7NGTpgc39dIC'
                                            }}
                                            width={15}
                                            height={15}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={mysteryStyles.viewResetTime}>
                            <View style={mysteryStyles.viewResetTimeText}>
                                <TouchableOpacity
                                    onPress={() =>{
                                        toggleRandomInfo()
                                    }}
                                >
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>รายละเอียดเพิ่มเติมคลิก</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>{
                                        toggleRandomInfo()
                                    }}
                                >
                                    <Image
                                        source={{uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1213008042174586880/Vector.png?ex=65f3e8c5&is=65e173c5&hm=d1cecd3133b7e415b7dc3576772dcc0c9e2dec7463734ea748e35175a20f47c6&'}}
                                        width={13}
                                        height={13}
                                    />
                                </TouchableOpacity>
                                <View stryle={{}}>
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>   Page {index + 1}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
            )
        } else if (item.itemType === 'forUse') {
           renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryHealthy}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox} 
                        onPress={() => {
                            if (rubyBalance >= item.itemPrice) {
                                if (item.itemName === 'บัตรกันลดขั้น') {
                                    checkDuplicateItem(userUID, item)
                                    .then(isDuplicate => {
                                        // console.log('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                        // alert('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                        if (!isDuplicate) {
                                            // console.log('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                            // alert('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                            reportBuyItem(item);
                                            buyItem2Inventory(item);
                                        } else {
                                            console.log('ไอเทมชิ้นนี้อนุญาติให้มีแค่ 1 ชิ้นใน Inventory เท่านั้น');
                                            toggle1stItemInInventory();
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error checking duplicate item:', error);
                                        // ทำการจัดการข้อผิดพลาดที่เกิดขึ้น
                                    });
                                }else{
                                    reportBuyItem(item)
                                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                                    randomPetCard();
                                    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                                }
                            }else{
                                if (item.itemCurrencyType === 'ruby') {
                                    console.log('Insufficient rubies to buy this item');
                                    toggleInsufficientRubies();
                                }else{
                                    console.log('Insufficient coins to buy this item');
                                    toggleInsufficientRubies();
                                }
                            }
                        }}
                    >
                        <View style={styles.viewImageAndNameItemBox}>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{ uri: item.itemPhotoURL }}
                                    width={40}
                                    height={40}
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.itemName} </Text>{/*<Text style={styles.textStyleItem}>{item.itemName}</Text>*/}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.itemPrice}</Text>
                        <Image
                            source={{
                                uri: item.itemCurrencyType === 'coin'
                                    ? 'https://drive.google.com/uc?export=view&id=1lB6vcCq3Kng3852LIrvXfM-W36guffFI'
                                    : 'https://drive.google.com/uc?export=view&id=1JBKocVjx9NAa8p8kNwWc7NGTpgc39dIC'
                            }}
                            width={14}
                            height={14}
                        />
                    </View>
                </View>
           )
        } else {
            renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryFurniture}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox}
                        onPress={() => {
                            if (coinBalance >= item.itemPrice) {
                                checkDuplicateItem(userUID, item)
                                .then(isDuplicate => {
                                    // console.log('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    // alert('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    if (!isDuplicate) {
                                        // console.log('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        // alert('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        buyFur2Inventory(item);
                                        reportBuyItem(item);
                                    } else {
                                        console.log('คุณมีไอเทมชิ้นนี้ใน Inventory แล้ว ไม่สามารถซื้อสินค้าซ้ำได้');
                                        toggleDuplicateItem();
                                    }
                                })
                                .catch(error => {
                                    console.error('Error checking duplicate on press item:', error);
                                    // ทำการจัดการข้อผิดพลาดที่เกิดขึ้น
                                });
                            }else{
                                if (item.itemCurrencyType === 'coin') {
                                    console.log('Insufficient coins to buy this item');
                                    toggleInsufficientRubies();
                                }else{
                                    console.log('Insufficient rubies to buy this item');
                                    toggleInsufficientRubies();
                                }
                            }
                        }}
                    >
                        <View style={styles.viewImageAndNameItemBox}>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{
                                        uri: isDuplicateURL === true
                                            ? item.itemSoldoutURL
                                            : item.itemPhotoURL
                                    }}
                                    width={150}
                                    height={150}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.itemName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.itemPrice}</Text>
                        <Image
                            source={{
                                uri: item.itemCurrencyType === 'coin'
                                    ? 'https://drive.google.com/uc?export=view&id=1lB6vcCq3Kng3852LIrvXfM-W36guffFI'
                                    : 'https://drive.google.com/uc?export=view&id=1JBKocVjx9NAa8p8kNwWc7NGTpgc39dIC'
                            }}
                            width={14}
                            height={14}
                        />
                    </View>
                </View>
            );
        }

        return renderStyle;
    };

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#2C6264'}}>
            <View style={{height:'100%',padding:5}}>
                <View style={{flex:0.6,marginHorizontal:19}}>
                    <View style={{flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.2}}>
                                <View style={styles.Emptybox}></View>
                            </View>
                            <View style={{flex:0.2}}>
                                <View style={styles.Emptybox}></View>
                            </View>
                                <View style={{flex:0.2}}>
                            <View style={styles.Emptybox}></View>
                            </View>
                            <View style={{flex:0.3,marginRight:4}}>
                                <View style={styles.Currencybox}>
                                    <Image source={{
                                        uri:'https://drive.google.com/uc?export=view&id=1lB6vcCq3Kng3852LIrvXfM-W36guffFI'}}
                                        width={22}
                                        height={22}
                                    />
                                    <Text style={styles.CurrencyText}>{coinBalance}</Text>
                                </View>
                            </View>
                            <View style={{flex:0.3}}>
                            <View style={styles.Currencybox}>
                                    <Image source={{
                                        uri:'https://drive.google.com/uc?export=view&id=1JBKocVjx9NAa8p8kNwWc7NGTpgc39dIC'}}
                                        width={22}
                                        height={22}
                                    />
                                    <Text styl={styles.CurrencyText}>{rubyBalance}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.4}}></View>
                    </View>
                </View>
                <View style={{flex:3, marginVertical:5}}>
                <View style={styles.box}>
                        <View style={{flex:3}}>
                            <FlatList
                                data={itemsMysteryBox}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:2, marginVertical:5}}>
                <View style={styles.box}>
                    <View style={{flexDirection:'row',backgroundColor:'#0ABAB5', borderRadius:14}}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>ไอเทมกดใช้</Text>
                        </View>
                        <View>
                                        <TouchableOpacity
                                            onPress={toggleInfoForUse}
                                        >
                                            <Image
                                                style={{
                                                width:20,
                                                height:20,
                                                }}
                                                source={{
                                                    uri: 'https://cdn.discordapp.com/attachments/1202281623585034250/1223147271349207060/material-symbols_info-outline.png?ex=6618cbaa&is=660656aa&hm=b470b6ad93747529febdb8740923d079987e0134bf0f1539700df42b8dfb5274&'
                                                }}
                                        />
                                        </TouchableOpacity>
                                    </View>
                        </View>
                        <View style={{flex:4,alignItems: 'center'}}>
                            <FlatList
                                data={UseItem}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:4, marginVertical:5}}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>ของตกแต่ง</Text>
                        </View>
                        <View style={{flex:8}}>
                            <FlatList
                                data={ItemsFurniture}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                
            </View>
            {/*modalChangePetCardVisible */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalChangePetCardVisible}
                onRequestClose={() => {
                    toggleModalChangePetCardVisible();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Change Pet card has been used.</Text>
                        <Text>Your new pet is.</Text>
                        {newPetImage ? ( // เช็คว่า newPetImage มีค่าหรือไม่
                            <View>
                                <Image
                                    source={{
                                        uri: newPetImage
                                    }}
                                    style={{ width: 200, height: 200 }}
                                />
                            </View>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                        <TouchableOpacity onPress={toggleModalChangePetCardVisible} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInfoVisible */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInfoVisible}
                onRequestClose={() => {
                    toggleRandomInfo();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>การสุ่มเหรียญจะสุ่มระหว่าง 100 ถึง 1,000 เหรียญ</Text>
                        <Text>เมื่อเปิดจนครบการันตีจะได้เหรียญจำนวน 1,000 เหรียญแน่นอน</Text>
                        <TouchableOpacity onPress={toggleRandomInfo} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInfoForUseVisible */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInfoForUseVisible}
                onRequestClose={() => {
                    toggleInfoForUse();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>บัตรกันลดขั้น สามารถป้องกันไม่ให้สัตว์เลี้ยงวิวัฒนาการย้อนกลับได้หนึ่งครั้ง เมื่อซื้อแล้วจะถูกเก็บอยู่ในช่องเก็บของ และจะมีได้เพียงชิ้นเดียวในช่องเก็บของเท่านั้น จะซื้อใหม่ได้ก็ต่อเมื่อบัตรถูกใช้แล้ว บัตรจะถูกใช้อัตโนมัติเมื่อเข้าเงื่อนไข</Text>
                        <Text></Text>
                        <Text>บัตรเปลี่ยนสัตว์เลี้ยง เมื่อซื้อจะสุ่มสัตว์เลี้ยงปัจุบันเป็นร่างแรกของสัตว์เลี้ยงที่สุ่มได้ โปรดเข้าใจด้วยว่ามีความเสี่ยงที่จะสุ่มได้สัตว์เลี้ยงปัจจุบัน</Text>
                        <TouchableOpacity onPress={toggleInfoForUse} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalPurchasedComplete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPurchasedComplete}
                onRequestClose={() => {
                    togglePurchasedComplete();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Complete!</Text>
                        <TouchableOpacity onPress={togglePurchasedComplete} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalPurchasedIncomplete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPurchasedIncomplete}
                onRequestClose={() => {
                    togglePurchasedIncomplete();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Incomplete!</Text>
                        <TouchableOpacity onPress={togglePurchasedIncomplete} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalRandomCoin */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalRandomCoin}
                onRequestClose={() => {
                    toggleRandomCoin();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Complete!</Text>
                        <Text>จำนวนเงินที่สุ่มได้คือ: {randomCoinValue}</Text>
                        <TouchableOpacity onPress={toggleRandomCoin} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalGuaranteCoin */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalGuaranteCoin}
                onRequestClose={() => {
                    toggleGuaranteCoin();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Congratulations!</Text>
                        <Text>จำนวนเงินที่สุ่มได้คือ: {randomCoinValue}</Text>
                        <TouchableOpacity onPress={toggleGuaranteCoin} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInsufficientCoins */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInsufficientCoins}
                onRequestClose={() => {
                    toggleInsufficientCoins();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Incomplete!</Text>
                        <Text>Insufficient coins to buy this item</Text>
                        <TouchableOpacity onPress={toggleInsufficientCoins} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInsufficientRubies */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInsufficientRubies}
                onRequestClose={() => {
                    toggleInsufficientRubies();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Incomplete!</Text>
                        <Text>because Insufficient rubies to buy this item</Text>
                        <TouchableOpacity onPress={toggleInsufficientRubies} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalOneItemInInventory */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalOneItemInInventory}
                onRequestClose={() => {
                    toggle1stItemInInventory();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>ไอเทมชิ้นนี้อนุญาติให้มีแค่ 1 ชิ้น</Text>
                        <Text>ใน Inventory เท่านั้น</Text>
                        <TouchableOpacity onPress={toggle1stItemInInventory} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalDuplicateItem */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDuplicateItem}
                onRequestClose={() => {
                    toggleDuplicateItem();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>คุณมีไอเทมชิ้นนี้ใน Inventory แล้ว</Text>
                        <Text>ไม่สามารถซื้อไอเทมซ้ำได้</Text>
                        <TouchableOpacity onPress={toggleDuplicateItem} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = {
    headerText:{
        fontFamily:'ZenOldMincho-Bold', 
        textAlign:'center', 
        fontSize:17, 
        fontWeight: 'bold', 
        color:'#ffffff',
    },
    CurrencyText:{
        fontSize:14,
        fontFamily:'Rubik-Light'
    },
    box:{
        flex:1,
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    Emptybox:{
        flex:1, 
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#2C6264',
        backgroundColor:'#2C6264',
        alignItems: 'center',
    },
    Currencybox:{
        flex:1,
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    boxhead:{
        flex:1.2,
        borderTopRightRadius:14,
        borderTopLeftRadius:14,
        flexDirection:'row',
        borderColor:'#000000', 
        justifyContent:'center', 
        backgroundColor:'#0ABAB5'
    },
    ViewTouchableBoxCategoryHealthy:{
        marginVertical:'2%',
        marginHorizontal:20
    },
    ViewTouchableBoxCategoryFurniture:{
        marginTop:'2%',
        marginHorizontal:20
    },
    TouchableItemBox:{
        flex:1,
        width:'100%',
        height:'100%',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        // backgroundColor:'orange'
    },
    viewImageItemBox:{
        alignItems:'center'
    },
    ImageItemBox:{
        position:'relative'
    },
    textStyleItem:{
        fontFamily: 'ZenOldMincho-Bold',
        fontSize: 14
    },
    itemName:{
        flexDirection:'row',
        justifyContent:'center',
        // backgroundColor:'green'
    },
    itemPrice:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'pink'
    },
    viewImageAndNameItemBox:{
        width:'auto',
        height:'auto'
    }
}

const mysteryStyles = {
    viewTouchableBoxCategoryMysteryBox:{
        flexDirection:'row',
        //backgroundColor:'red'
    },
    view136:{
        flex:1.36,
        flexDirection:'column',
        //backgroundColor:'green'
    },
    view164:{
        flex:1.64,
        flexDirection:'column',
        //backgroundColor:'pink'
    },
    viewImage:{
        flex:4.5,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
    },
    imageItemBox:{
        position:'relative',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        //backgroundColor:'brown'
    },
    viewGuarantee:{
        flex:0.5
    },
    textGuaranteeDetaill:{
        fontFamily:'Rubik-Meduim',
        fontSize:10,
        justifyContent:'center',
        marginHorizontal:5
    },
    viewTextTopic:{
        flex:1,
        //backgroundColor:'orange'
    },
    textTopic:{
        fontFamily:'Rubik-Meduim',
        fontSize:24,
        fontWeight:'bold',
        color:'#2C6264'
    },
    viewDetaillTextTopic:{
        flex:0.5,
        //backgroundColor:'green'
    },
    textDetailTopic:{
        fontFamily:'Rubik-Meduim',
        fontSize:12,
        color:'#2C6264'
    },
    viewTouchableOpacity:{
        flex:3.5,
        flexDirection:'row'
    },
    viewKeySecurity:{
        flex:1.35,
        flexDirection:'row'
    },
    touchableMysteryItemBox:{
        flex:1,
        width:'100%',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        marginHorizontal:'5%',
        marginVertical:'10%',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'green'
    },
    viewCountKeySecurity:{
        justifyContent:'center',
        alignItems:'center'
    },
    textDetaillMysteryStyle:{
        fontFamily:'Rubik-Meduim',
        fontSize:12,
        color:'#2C6264',
        marginHorizontal:3
    },
    viewPriceButton:{
        flex:2.65,
        flexDirection:'row'
    },
    viewTextPriceButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
    },
    viewResetTime:{
        flex:0.5
    },
    viewResetTimeText:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
    },
}

const itemsMysteryBox = [
    {
        itemType: "กล่องสุ่ม",
        itemCurrencyType: 'ruby',
        itemName: "CardBoard",
        itemPrice:20,
        itemGuarantee:8,
        itemPhotoURL: "https://drive.google.com/uc?export=view&id=1Rg_E2xuUkfdcD3gtUDvlxfmXbwX86ir5"
    }
]

const UseItem = [
    {
        itemType: "forUse",
        itemCurrencyType: 'ruby',
        itemName: "บัตรกันลดขั้น",
        itemPrice:200,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1-ajNNnLTDZQuq5qcCGPE5e5vcrV_1F8R"
     },
     {
        itemType: "forUse",
        itemCurrencyType: 'ruby',
        itemName: 'บัตรเปลี่ยนสัตว์เลี้ยง',
        itemPrice: 160,
        itemPhotoURL: "https://drive.google.com/uc?export=view&id=1CHhP-HlJJd4F-H_-tsafSwpXyqdCOCGo"
     }
]

const ItemsFurniture = [
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "ตุ๊กตา",
        itemPrice:700,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1z4prc3eUP1wF4_m6V7LVhItTcCQmIprX",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=17gaWlwmJsDDTzuya_gpP3uZv1ZojAs9T'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "รูปกรอบสีขาว",
        itemPrice:299,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=152wvqZEU8QLam4RWsCgDMRe8Tv8J-Mfd",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=15ECTp3HLVIUiCuUrqKYfI8jL9Lq0Qikx'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "รูปกรอบสีทอง",
        itemPrice:899,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1vTzLb1MUe0w7mCK4-V100UWOLFI2AGAG",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=1LyyqCpZljjS0Xczxfuru2k9RpLzhC1g8'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "หอคอย",
        itemPrice:999,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1OrhiReyx1z9OPvBSA5HU0aWk4rPYU3-I",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=1TzAeiuHaPT5vL5O4x2Q8B70t_P8S23pS'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "นาฬิกา",
        itemPrice:80,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1C-22spWrjM50FiVK0PoUw8N0efx3byTj",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=1P-ouZ-D98XjagKw8CXfqMjHE2GW1B78V'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "โทรศัพท์",
        itemPrice:500,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1XFxMoMSjnQ8WHifRZcaLIk1Hf_MbXu2s",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=18z4W1MNEG9hobVV0MqAAqAIKFj6gHn37'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "นาฬิกาทราย",
        itemPrice:150,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=16K0RRC4n-D2BPJvPw5qv797ytrt_nMW5",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=1lLiNlqcOr6jK0U4jYXV9cnOZfUFu46nD'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "แจกัน",
        itemPrice:120,
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1DIyIZnrb8LoguJd1l9j4Uy8PItvlx-g2",
        itemSoldoutURL:'https://drive.google.com/uc?export=view&id=1sT4Tlm7bUF3ptEXwXG4XTlTa_wbDszds'
    }
]