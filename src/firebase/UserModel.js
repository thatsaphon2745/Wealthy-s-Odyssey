import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { retrieveDataLiabilityRemaining, retrieveDataExpenses, retrieveRepayDebt, retrieveInventory } from './RetrieveData';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpdateItemPet, setPressInventory } from '../redux/variableSlice';



export const addUser = (user, profile, success, unsuccess)=>{
    console.log(`addUser in UserModel user id: ${user.uid}`)

    categories = [
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "เงินเดือน",
            photoURL: "https://drive.google.com/uc?export=view&id=1l1-2unv2jhqe0pu6-pzAFlzGfc8rL59i",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "ค่าจ้าง",
            photoURL: "https://drive.google.com/uc?export=view&id=1GRoSwH_cKqx18PmLpbUSJaZbmxgWq-5R",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "โบนัส",
            photoURL: "https://drive.google.com/uc?export=view&id=1azwxU-irgheWQaWNLPQvDdz90VdZWFqx",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "คอมมิชชัน",
            photoURL: "https://drive.google.com/uc?export=view&id=1UZqYiFlMNnz2RiPR5nsIF_Vgw_3jHFbe",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "ดอกเบี้ย",
            photoURL: "https://drive.google.com/uc?export=view&id=15fNDGQaPX0ZQdsu_xhMCyW4irzLlQfOs",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "เงินปันผล",
            photoURL: "https://drive.google.com/uc?export=view&id=1PG1uswi-_cOpXOwtHi3_OMrWsIHdMP1H",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "ค่าเช่า",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJI2bCxCzoakgCfQG69Sd_pmXPwW78Rg",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "ค่าขายสินทรัพย์",
            photoURL: "https://drive.google.com/uc?export=view&id=1HEcFBOyGqfd0DmOPXE82HuLdgQAyCBk8",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm",
        },
        {
            transactionType:"รายได้",
            category: "รายได้อื่นๆ",
            subCategory: "เงินรางวัล",
            photoURL: "https://drive.google.com/uc?export=view&id=1ezChwGYNownYMglGV-8Y65ciwqwCyOOK",
        },
        {
            transactionType:"รายได้",
            category: "รายได้อื่นๆ",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm",
        },
        // Expensese
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "อาหาร",
            photoURL: "https://drive.google.com/uc?export=view&id=10uK1HiMpdgvhFUvVqJK2dL02DTycy8Yr"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "สาธารณูป\n      โภค",
            photoURL: "https://drive.google.com/uc?export=view&id=1riZiUTlTsBEZlJVhdNQ0y7ORlZwDRi3p"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ค่าเดินทาง",
            photoURL: "https://drive.google.com/uc?export=view&id=13weTyNRAPUd0mXijnfXU39qrhrTYKJ-f"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "เสริมสวย",
            photoURL: "https://drive.google.com/uc?export=view&id=15WBYCaVThF2DsSrVhsFP3j411xcr8e2G"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ค่ารักษาพยาบาล",
            photoURL: "https://drive.google.com/uc?export=view&id=1rUkN_kmz7uVXZGUgKAtoXkAXZCWy63Lz"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ชำระหนี้",
            photoURL: "https://drive.google.com/uc?export=view&id=1AjtxF8FLoWfrqnTCM1EnRcn7Daxqkuxj"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ภาษี",
            photoURL: "https://drive.google.com/uc?export=view&id=1KN7g25jeXiemaoYjO1GC8uzwRhlItU8r"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ของใช้ในบ้าน",
            photoURL: "https://drive.google.com/uc?export=view&id=1lpsQ0mrlnoW8kRLcBimemhTjVPGr_mHu"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าผ่อน/\nเช่าบ้าน",
            photoURL: "https://drive.google.com/uc?export=view&id=1SwKbFf35nMAWwbDFyA0uHM5f739sXGTr"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าผ่อนรถ",
            photoURL: "https://drive.google.com/uc?export=view&id=1SwKbFf35nMAWwbDFyA0uHM5f739sXGTr"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าผ่อนสินค้า",
            photoURL: "https://drive.google.com/uc?export=view&id=12Y9SGkhHXSBYtCQCUC50tm2FWOIW_Jy1"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "    ค่าผ่อน\nหนี้นอกระบบ",
            photoURL: "https://drive.google.com/uc?export=view&id=1S4uwVkpH2GeyLOWCUCq8e2P26SpfBNFG"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "  ค่าผ่อน\n   สินเชื้อ\nส่วนบุคคล",
            photoURL: "https://drive.google.com/uc?export=view&id=14R8WUFpJxpVVY85fN0VICKFC0svCghff"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "   ค่าผ่อน\nหนี้กยศ",
            photoURL: "https://drive.google.com/uc?export=view&id=1H9zYTwcLVVjlPaYHRk-bJ1yMMMooyGVh"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "    ค่าผ่อน\nหนี้สหกรณ์",
            photoURL: "https://drive.google.com/uc?export=view&id=16LARXp4ENzz-lsKXd0yCCDve0907guD6"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าเบี้ยประกัน",
            photoURL: "https://drive.google.com/uc?export=view&id=1RV-1Z33UQoXTBVQUz2njWGlZirQq7_0L"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน(ออม)",
            subCategory: "ประกันสังคม",
            photoURL: "https://drive.google.com/uc?export=view&id=1G5RFuNliO7aTg9R-TG0-H1VG1kbgq2q3"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน(ออม)",
            subCategory: "สวัสดิการ\n การออม",
            photoURL: "https://drive.google.com/uc?export=view&id=1awPBEcAoF_7yQKXwbP5W93q0UNgbP6BC"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน(ออม)",
            subCategory: "เงินออม",
            photoURL: "https://drive.google.com/uc?export=view&id=1Wb2Af_izrHO25MfDtBP3ceFX8flXxEW2"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน(ลงทุน)",
            subCategory: "เงินลงทุน",
            photoURL: "https://drive.google.com/uc?export=view&id=1wbjmyxRV2HqY36QF_6G0dZpZSM2MFp4g"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        //Asset
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "เงินสด",
            photoURL: "https://drive.google.com/uc?export=view&id=1-PAttYTKXkoOw_GGakI_mDiPycZFnhMJ",
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "  เงินฝาก\nออมทรัพย์",
            photoURL: "https://drive.google.com/uc?export=view&id=1Wf-OJKB-WuvERjQqHbbVjzYY7yrZXfpA"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "      เงิน\nฝากประจำ",
            photoURL: "https://drive.google.com/uc?export=view&id=1l1-2unv2jhqe0pu6-pzAFlzGfc8rL59i"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "    เงินฝาก\nกระแสรายวัน",
            photoURL: "https://drive.google.com/uc?export=view&id=12sLru5Rowa6H1T8dBZbp4hHmJkMb4K5U"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "สลากออม\n    ทรัพย์",
            photoURL: "https://drive.google.com/uc?export=view&id=1VOzblt8zHG5d45CyezuaRUeiaVilbrPc"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "หุ้นสหกรณ์",
            photoURL: "https://drive.google.com/uc?export=view&id=1J5QyEgeyGP0w5Sao_VkMR5YzJUYT4goN"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "กองทุนออม\n   เพื่อการ\n   เกษียณ",
            photoURL: "https://drive.google.com/uc?export=view&id=10cu2--OuT_PYywRq92Bg4FAPP4GwtKjT"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "ตราสารหนี้",
            photoURL: "https://drive.google.com/uc?export=view&id=1Y1yQOBG7-ESLO0Ysb5fA9yqa26jgBXsO"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "กองทุนรวม",
            photoURL: "https://drive.google.com/uc?export=view&id=1J5QyEgeyGP0w5Sao_VkMR5YzJUYT4goN"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "หุ้นสามัญ",
            photoURL: "https://drive.google.com/uc?export=view&id=18DXWnAO-GWEO5dAATfWTWM3C2DaYT_ta"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "  อสังหาฯ\n(ขาย/เช่า)",
            photoURL: "https://drive.google.com/uc?export=view&id=1H-XP29Yap7x4oarGSDy9PIVuN-AnN7WE"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: " กรมธรรม์\nประกันชีวิต",
            photoURL: "https://drive.google.com/uc?export=view&id=1Le_SumtB_s4PFXj_RMBWOr67s-AP-dON"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "  อสังหาฯ\n(อยู่อาศัย)",
            photoURL: "https://drive.google.com/uc?export=view&id=1H-XP29Yap7x4oarGSDy9PIVuN-AnN7WE"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "รถ",
            photoURL: "https://drive.google.com/uc?export=view&id=1GSIUZ-U4qIWzhaBraCxoZlK0Vwqavtz0"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "เครื่องประดับ",
            photoURL: "https://drive.google.com/uc?export=view&id=15BW-lcfDCqPGHl0jJWVg2wEluatFL2ew"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "เครื่องใช้ใน\n      บ้าน",
            photoURL: "https://drive.google.com/uc?export=view&id=1lpsQ0mrlnoW8kRLcBimemhTjVPGr_mHu"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        //Liability
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "      หนี้\nนอกระบบ",
            photoURL: "https://drive.google.com/uc?export=view&id=1KeYXT-FLtJzEhCBvWQT-9sQAgBnEikZI"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "       หนี้\nบัตรเครดิต",
            photoURL: "https://drive.google.com/uc?export=view&id=1bgiTvm-LLvoYSLNLYz3k-6xxEokPqVlw"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "        หนี้\nผ่อนซื้อสินค้า",
            photoURL: "https://drive.google.com/uc?export=view&id=1Bh4Be1ZgIQdWjQUOeMMB1_Wx_YwqkiS2"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "หนี้สินจาก\n สินทรัพย์",
            photoURL: "https://drive.google.com/uc?export=view&id=1BBEljCjj4LFIc95x5faIqK211I5tGrUA"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้ที่อยู่อาศัย",
            photoURL: "https://drive.google.com/uc?export=view&id=1PWG5F5D9WGeTTQa7qKVbf7GqBEcVt-Fk"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้รถ",
            photoURL: "https://drive.google.com/uc?export=view&id=1Oaz0RUGL8s2Ujfe0ytxy2sDBCY1S-Khb"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้สินเชื่อ\nส่วนบุคคล",
            photoURL: "https://drive.google.com/uc?export=view&id=1wfNzuOnwSexl4uXhWgkJclO6ZSb1cklT"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้กยศ.",
            photoURL: "https://drive.google.com/uc?export=view&id=1TGgVU-QnVnT6bMh9COIK41tiV8SqdPlJ"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้สหกรณ์",
            photoURL: "https://drive.google.com/uc?export=view&id=1wLocua-E9JfjwsQAv3cyd71Tfsva6rwz"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้สินจากสินทรัพย์",
            photoURL: "https://drive.google.com/uc?export=view&id=1f0kWg3nVu1lvrYACrzuNH7j17ni4w2dc"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "เพิ่ม",
            photoURL: "https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm"
        }
    ]
    
    firestore()
    .collection('users')
    .doc(user.uid)
    .set({
            email: user.email,
            phoneNumber: profile.phoneNumber,
            categories: categories
        },
    )
    .then(()=>{
        success(user)
    })
    .catch((error)=>{
      console.error(`addUser in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}

export const addFinancials = (user,datecurrent)=>{
    const Transactions = []
    const currentDate = datecurrent
    const lastedDate = datecurrent
    const isFirstTransaction = true
    const guageRiability = 0;
    firestore()
    .collection('financials')
    .doc(user.uid)
    .set({
        transactions: Transactions,
        CurrentDate: currentDate,
        LastedDate: lastedDate,
        IsFirstTransaction: isFirstTransaction,
        GuageRiability: guageRiability
    })
    .then(()=>{
        console.log("addFinancials success")
    })
    .catch((error) => {
        console.error("Error addFinancials:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}

export const addPetsQuest = (user)=>{
    const DownGradeCard = false
    const Quest = []
    const PetImages = []
    const PetName = ""
    const PetImage = ""
    const LastedDate = ""
    const Inventory = []
    firestore()
    .collection('pets')
    .doc(user.uid)
    .set({
        downGradeCard: DownGradeCard,
        quest: Quest,
        petName: PetName,
        petImage: PetImage,
        petImages: PetImages,
        lastedDate: LastedDate,
        inventory: Inventory

    })
    .then(()=>{
        console.log("addPetsQuest success")
    })
    .catch((error) => {
        console.error("Error addPetsQuest:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}
//ดึงหัวข้อ Icon
export const retrieveCategory = (userUID) => {
    return firestore()
        .collection('users')
        .doc(userUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const category = doc.data().categories;
                return category;
            } else {
                // กรณีไม่พบเอกสาร
                console.log("No such document555");
                return null;
            }
        })
        .catch((error) => {
            // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
            console.error("Error getting document:", error);
            throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
        });
}

export const addCategories = (userUID,transactionType,category, subCategory, photoURL, option) => {
    const categoryId = uuid.v4();

    const newCategory = {
        transactionType: transactionType,
        category: `${category}${option}`,
        subCategory: subCategory,
        photoURL: photoURL,
        categoryId: categoryId
    };

    console.log(`transactionType: ${transactionType}`)
    console.log(`category: ${category}`)
    console.log(`subCategory: ${subCategory}`)
    
    const plusIcon = {
        transactionType: transactionType,
        category: category,
        subCategory: 'เพิ่ม',
        photoURL: 'https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm'
    }
    return firestore()
        .collection('users')
        .doc(userUID)
        .get()
        .then((doc) => {
            firestore()
                .collection('users')
                .doc(userUID)
                .update({
                    categories: firestore.FieldValue.arrayRemove(plusIcon)
                })
            if (doc.exists) {
                const existingCategories = doc.data().categories;
                let isDuplicate = false;
                // เช็คว่า transactionTpe และ category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                if(transactionType == 'หนี้สิน'){
                    isDuplicate = existingCategories.some(category => 
                        category.subCategory === newCategory.subCategory
                    );
                }else{
                    isDuplicate = existingCategories.some(category => 
                        category.transactionType === newCategory.transactionType && category.category === newCategory.category && category.subCategory === newCategory.subCategory
                    );
                }
                
                    
                if (!isDuplicate) {
                    // ถ้าไม่มี object ที่มีชื่อซ้ำกันใน array ให้ทำการเพิ่ม
                    return    firestore()
                        .collection('users')
                        .doc(userUID)
                        .update({
                            categories: firestore.FieldValue.arrayUnion(newCategory)
                        })
                        .then (()=>{
                            return   firestore()
                                    .collection('users')
                                    .doc(userUID)
                                    .update({
                                        categories: firestore.FieldValue.arrayUnion(plusIcon)
                                    })
                        })
                } else {
                    // ถ้ามี object ของ categories ที่มีชื่อซ้ำกันแล้วให้แจ้งเตือนว่าไม่สามารถ add ได้
                    console.log('Duplicate category and subCategory. Cannot add.');
                    Alert.alert("มีชื่อซ้ำ ไม่สามารถบันทึกได้")
                    return firestore()
                            .collection('users')
                            .doc(userUID)
                            .update({
                                categories: firestore.FieldValue.arrayUnion(plusIcon)
                            })
                }
            } else {
                console.log("No such document!");
                return null;
            }

        })
        .then(() => {
            console.log("Category added successfully!");
        })
        //กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding category:", error);
            throw error;
        });
};

export const RemoveCategoryIcon = async(userUID, selectedItems, success) => {
    console.log(selectedItems)
    let isLiabilityRemaining = false;
    const itemsDataLiabilityRemaining = await retrieveDataLiabilityRemaining(userUID)
    //console.log(itemsDataLiabilityRemaining)
    
    for (const item of selectedItems) {
        if (item.transactionType == 'ค่าใช้จ่าย') {
            let matchingShort = itemsDataLiabilityRemaining.short.find(data => data.transactionId === item.transactionId);
            if (matchingShort) {
                isLiabilityRemaining = true;
                Alert.alert(
                    'แจ้งเตือน!',
                    'ไม่สามารถลบได้เนื่องจาก มีหัวข้อสำหรับชำระหนี้ที่ยังชำระไม่ครบจำนวน กรุณาชำระให้ครบ ก่อนทำการลบหัวข้อ',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ],
                    {cancelable: false}
                );
                
                return;
            }

            let matchingLong = itemsDataLiabilityRemaining.long.find(data => data.transactionId === item.transactionId);
            //console.log(matchingLong)
            if (matchingLong) {
                isLiabilityRemaining = true;
                Alert.alert(
                    'แจ้งเตือน!',
                    'ไม่สามารถลบได้เนื่องจาก มีหัวข้อสำหรับชำระหนี้ที่ยังชำระไม่ครบจำนวน กรุณาชำระให้ครบ ก่อนทำการลบหัวข้อ',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ],
                    {cancelable: false}
                );
                return;
            }
        }
    }
    
    if(isLiabilityRemaining == false){
        return firestore()
        .collection('users')
        .doc(userUID)
        .update({
            categories: firestore.FieldValue.arrayRemove(...selectedItems)
        })
        .then(() => {
            success()
            console.log("Categories removed successfully!");
        })
        .catch((error) => {
            console.error("Error removing categories:", error);
            throw error;
        });
    }
    
}

export const addTransaction = (userUID, itemData, input, selectedDate,isFirstTransaction) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // เพิ่ม 1 เพราะเดือนใน JavaScript เริ่มนับที่ 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    //ทำไว้เพื่อดูว่า transaction ที่ทำมาวันอะไร โดยยึดวันจริงไม่ใช่วันที่ user เลือก
    const nowDate = `${year}-${month}-${day}`;

    const transactionId = uuid.v4();
    if (input.value !== 0) {
        const newTransaction = {
            transactionId: transactionId,
            transactionType: itemData.transactionType,
            category: itemData.category,
            subCategory: itemData.subCategory,
            photoURL: itemData.photoURL,
            date: selectedDate,
            detail: input.detail,
            value: input.value
        };

        return firestore()
            .collection('financials')
            .doc(userUID)
            .update({
                transactions: firestore.FieldValue.arrayUnion(newTransaction),
                CurrentDate: nowDate,
                //ให้เขียนเพิ่มว่าถ้า isFirstTransaction == true ให้ทำการ update ค่า IsFirstTransaction เป็น false ใน firebase
                IsFirstTransaction: isFirstTransaction ? false : false
            })
            .then(() => {
                console.log("Transactions added successfully!");

            })
            // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
            .catch((error) => {
                console.error("Error adding transactions:", error);
                throw error;
            });
    } else {
        // ถ้าค่า value เป็น 0 ให้แสดงข้อความแจ้งเตือน
        Alert.alert("Value must not be 0!")
        console.error("Value must not be 0!");
        throw new Error("Value must not be 0!");
    }
};

export const addPersonalGoal = (userUID, itemData, input, currentFormatedDate) => {
    if (input!== 0) {
        const personalGoal = {
            transactionType: itemData.category,
            detail: itemData.subCategory,
            questPic: itemData.photoURL,
            questType: itemData.questType,
            questState: false,
            rewardStatus: false,
            value: input,
            seen: false,
            addDate: currentFormatedDate
        };
        
        return firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                quest: firestore.FieldValue.arrayUnion(personalGoal)
            })
            .then(() => {
                console.log("quest added successfully!");

            })
            // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
            .catch((error) => {
                console.error("Error adding quest:", error);
                throw error;
            });
    } else {
        // ถ้าค่า value เป็น 0 ให้แสดงข้อความแจ้งเตือน
        Alert.alert("Value must not be 0!")
        console.error("Value must not be 0!");
        throw new Error("Value must not be 0!");
    }
};

export const addPetName = (userUID, input) => {
    const myPetName = input.value;
    if (input.value !== 0) {
        return firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                petName: myPetName,
                Money: 0,
                Ruby: 0,
                Guarantee: 8
            })
            .then(() => {
                console.log("petName added successfully!");
            })
            .catch((error) => {
                console.error("Error adding petName:", error);
                throw error;
            });
    } else {
        Alert.alert("Value must not be 0!")
        console.error("Value must not be 0!");
        throw new Error("Value must not be 0!");
    }
};

export const addLastedDate = (userUID, formattedDate) => {
    const myLastedDate = formattedDate;
    if (formattedDate !== 0) {
        return firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                lastedDate: myLastedDate
            })
            .then(() => {
                console.log("petName added successfully!");
            })
            .catch((error) => {
                console.error("Error adding petName:", error);
                throw error;
            });
    } else {
        Alert.alert("Value must not be 0!")
        console.error("Value must not be 0!");
        throw new Error("Value must not be 0!");
    }
};

export const addOnePetImage = (userUID, input) => {
    const myPetImage = input;
    if (input !== 0) {
        return firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                petImage: myPetImage
            })
            .then(() => {
                console.log("petImage random and added successfully!");
            })
            .catch((error) => {
                console.error("Error adding petImage:", error);
                throw error;
            });
    } else {
        Alert.alert("Value must not be 0!")
        console.error("Value must not be 0!");
        throw new Error("Value must not be 0!");
    }
};

export const addPetImages = (userUID, images) => {
    if (!Array.isArray(images) || images.length === 0) {
        Alert.alert("Images array must not be empty!");
        console.error("Images array must not be empty!");
        throw new Error("Images array must not be empty!");
    }

    return firestore()
        .collection('pets')
        .doc(userUID)
        .update({
            petImages: images
        })
        .then(() => {
            console.log("Pet images added successfully!");
        })
        .catch((error) => {
            console.error("Error adding pet images:", error);
            throw error;
        });
        //สร้าง field ขึ้นมาเพิ่ม
};

export const addDownGradeCardtoTrue = (userUID) => {
    return firestore()
        .collection('pets')
        .doc(userUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const downGradeCardValue = data.downGradeCard;
                if (!downGradeCardValue) {
                    return firestore()
                        .collection('pets')
                        .doc(userUID)
                        .update({
                            downGradeCard: true
                        })
                        .then(() => {
                            console.log("downGradeCard updated successfully!");
                            alert("Purchased Complete!");
                        })
                        .catch((error) => {
                            console.error("Error updating downGradeCard:", error);
                            throw error;
                        });
                } else {
                    console.log("downGradeCard is already true. Cannot add more.");
                    alert("คุณยังไม่ได้ใช้งานบัตรกันลดขั้น ไม่สามารถซื้อเพิ่มได้");
                }
            } else {
                console.log("document doesn't exist");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            throw error;
        });
};



export const addDownGradeCardtoFalse = (userUID) => {
    return firestore()
        .collection('pets')
        .doc(userUID)
        .update({
            downGradeCard: false
        })
        .then(() => {
            console.log("petImage random and added successfully!");
        })
        .catch((error) => {
            console.error("Error addDownGradeCardtoFalse:", error);
            throw error;
        });
    
};

export const addTransactionLiability = (userUID, itemData, input, selectedDate, categoryPlusIcon,categoryExpenses, subCategoryExpenses, isFirstTransaction) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // เพิ่ม 1 เพราะเดือนใน JavaScript เริ่มนับที่ 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    //ทำไว้เพื่อดูว่า transaction ที่ทำมาวันอะไร โดยยึดวันจริงไม่ใช่วันที่ user เลือก
    const nowDate = `${year}-${month}-${day}`;
    const transactionId = uuid.v4();
    if (input.value !== 0) {
        // เชื่อมต่อ firestore
        const firestoreRef = firestore();
        // ค้นหาธุรกรรมทั้งหมดของผู้ใช้
        return firestoreRef.collection('financials').doc(userUID).get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    const transactions = userData.transactions || [];
                    // ตรวจสอบว่ามีชื่อธุรกรรมซ้ำหรือไม่
                    const isDuplicate = transactions.some(transaction => transaction.subCategory === itemData.subCategory);
                    if (!isDuplicate) {
                        const newTransaction = {
                            transactionId: transactionId,
                            transactionType: itemData.transactionType,
                            category: itemData.category,
                            subCategory: itemData.subCategory,
                            photoURL: itemData.photoURL,
                            date: selectedDate,
                            detail: input.detail,
                            value: input.value
                        };
                        // เพิ่มธุรกรรมใหม่เข้าไปในรายการ
                        return firestoreRef.collection('financials').doc(userUID)
                            .update({
                                transactions: firestore.FieldValue.arrayUnion(newTransaction),
                                CurrentDate: nowDate,
                                // อัพเดต IsFirstTransaction เป็น false หาก isFirstTransaction เป็น true
                                IsFirstTransaction: isFirstTransaction ? false : false
                            })
                            .then(() => {
                                addCategoriesExpenses(userUID, 'ค่าใช้จ่าย', categoryPlusIcon, categoryExpenses, subCategoryExpenses, itemData.photoURL, transactionId, newTransaction)
                                console.log("Transactions added successfully!");
                            })
                            .catch((error) => {
                                console.error("Error adding transactions:", error);
                                throw error;
                            });
                    } else {
                        // ถ้าชื่อธุรกรรมซ้ำกัน
                        Alert.alert("ไม่สามารถสร้างได้เนื่องจากชื่อซ้ำ");
                        
                    }
                } else {
                    // หากไม่มีเอกสารสำหรับผู้ใช้นี้ใน firestore
                    Alert.alert("User data not found!");
                }
            })
            .catch((error) => {
                console.log("Error fetching user data:", error);
                throw error;
            });
    } else {
        // ถ้าค่า value เป็น 0 ให้แสดงข้อความแจ้งเตือน
        Alert.alert("Value must not be 0!")
        console.error("Value must not be 0!");
        throw new Error("Value must not be 0!");
    }
};


export const addCategoriesExpenses = (userUID,transactionType, categoryPlusIcon, category, subCategory, photoURL, transactionId, newTransaction) => {
    const categoryId = uuid.v4();
    //plusCategory = หนี้สินระยะยาว 
    // category = 'ค่าใช้จ่ายคงที่(ชำระหนี้)'
    const newCategory = {
        transactionType: transactionType,
        category: category,
        subCategory: subCategory,
        photoURL: photoURL,
        categoryId: categoryId,
        transactionId: transactionId
    };
    
    const plusIcon = {
        transactionType: transactionType,
        category: categoryPlusIcon,
        subCategory: 'เพิ่ม',
        photoURL: 'https://drive.google.com/uc?export=view&id=1wJIqp47QLmtIpLij-AGim-bUayuULNlm'
    }
    return firestore()
        .collection('users')
        .doc(userUID)
        .get()
        .then((doc) => {
            firestore()
                .collection('users')
                .doc(userUID)
                .update({
                    categories: firestore.FieldValue.arrayRemove(plusIcon)
                })
            if (doc.exists) {
                const existingCategories = doc.data().categories;

                // เช็คว่า transactionTpe และ category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                const isDuplicate = existingCategories.some(category => 
                    category.transactionType === newCategory.transactionType && category.category === newCategory.category && category.subCategory === newCategory.subCategory
                );
                    
                if (!isDuplicate) {
                    // ถ้าไม่มี object ที่มีชื่อซ้ำกันใน array ให้ทำการเพิ่ม
                    return    firestore()
                        .collection('users')
                        .doc(userUID)
                        .update({
                            categories: firestore.FieldValue.arrayUnion(newCategory)
                        })
                        .then (()=>{
                            Alert.alert(
                                'แจ้งเตือน!',
                                'ทำการสร้างหัวข้อสำหรับการชำระหนี้รายการนี้ให้แล้ว โปรดทำการชำระหนี้รายการนี้จากหัวข้อที่สร้างให้อัตโนมัติ',
                                [
                                  {text: 'OK', onPress: () => console.log('OK Pressed')}
                                ],
                                {cancelable: false}
                            );
                            return   firestore()
                                    .collection('users')
                                    .doc(userUID)
                                    .update({
                                        categories: firestore.FieldValue.arrayUnion(plusIcon)
                                    })
                        })
                } else {
                    // ถ้ามี object ของ categories ที่มีชื่อซ้ำกันแล้วให้แจ้งเตือนว่าไม่สามารถ add ได้
                    console.log('Duplicate category and subCategory. Cannot add.');
                    Alert.alert("มีชื่อซ้ำ ไม่สามารถบันทึกได้")
                    return firestore()
                            .collection('users')
                            .doc(userUID)
                            .update({
                                categories: firestore.FieldValue.arrayUnion(plusIcon)
                            })
                }
            } else {
                console.log("No such document!");
                return null;
            }

        })
        .then(() => {
            console.log("Category added successfully!");
        })
        //กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding category:", error);
            throw error;
        });
};

export const addTransactionExpenses = async(userUID, itemData, input, selectedDate)=>{
    const itemsDataLiabilityRemaining = await retrieveDataLiabilityRemaining(userUID)
    let matchingDebts = itemsDataLiabilityRemaining.long.find(data => data.transactionId === itemData.transactionId);
    if(!matchingDebts){
        matchingDebts = itemsDataLiabilityRemaining.short.find(data => data.transactionId === itemData.transactionId);
    }
    if(matchingDebts){
        if(matchingDebts.value - input.value >= 0){
            if (input.value !== 0) {
                const newTransaction = {
                    transactionId: itemData.transactionId,
                    transactionType: itemData.transactionType,
                    category: itemData.category,
                    subCategory: itemData.subCategory,
                    photoURL: itemData.photoURL,
                    date: selectedDate,
                    detail: input.detail,
                    value: input.value
                };
        
                return firestore()
                    .collection('financials')
                    .doc(userUID)
                    .update({
                        transactions: firestore.FieldValue.arrayUnion(newTransaction)
                    })
                    .then(() => {
                        console.log("Transactions added successfully!");
        
                    })
                    // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
                    .catch((error) => {
                        console.error("Error adding transactions:", error);
                        throw error;
                    });
            } else {
                // ถ้าค่า value เป็น 0 ให้แสดงข้อความแจ้งเตือน
                Alert.alert("Value must not be 0!")
                console.error("Value must not be 0!");
                throw new Error("Value must not be 0!");
            }
        }
        else{
            Alert.alert(
                'แจ้งเตือน!',
                'ไม่สามารถชำระหนี้รายการนี้ได้เนื่องจากคุณชำระหนี้รายการเกินจำนวน โปรดชำระหนี้ให้พอดี',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            );
        }
    }else{
        Alert.alert(
            'แจ้งเตือน!',
            'ไม่สามารถชำระหนี้ก้อนนี้ได้เนื่องจากหนี้ก้อนนี้ไม่มีอยู่จริง',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ],
            {cancelable: false}
        );
    }

    
}

//ดึง value ทั้งหมด
export const  retrieveDataAsset = (userUID)=>{
    const assetData = {
        liquid:[],
        invest:[],
        personal:[]
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'สินทรัพย์สภาพคล่อง'){
                    assetData.liquid.push(element)
                }
                if(element.category == 'สินทรัพย์ลงทุน'){
                    assetData.invest.push(element)
                }
                if(element.category == 'สินทรัพย์ส่วนตัว'){
                    assetData.personal.push(element)
                }
            });

            return assetData
        }
    })
}

export const  retrieveDataLiability = (userUID)=>{
    const liabilityData = {
        short:[],
        long:[],
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'หนี้สินระยะสั้น'){
                    liabilityData.short.push(element)
                }
                if(element.category == 'หนี้สินระยะยาว'){
                    liabilityData.long.push(element)
                }
            });

            //console.log(liabilityData)
            return liabilityData
        }
    })
}

export const  retrieveSelectedDataIncomeAndExp = (userUID, selectedDate)=>{
    const IncomeAndExpensestData = []

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.date == selectedDate){
                    if(element.transactionType == 'รายได้'){
                        IncomeAndExpensestData.push(element)
                    }
                    if(element.transactionType == 'ค่าใช้จ่าย'){
                        IncomeAndExpensestData.push(element)
                    }
                }
            });

            return IncomeAndExpensestData
        }
    })
}

export const  retrieveSelectedMonthDataIncomeAndExp = (userUID, selectedMonth)=>{
    const IncomeAndExpensestData = []

    const monthMap = {
        "มกราคม": 1,
        "กุมภาพันธ์": 2,
        "มีนาคม": 3,
        "เมษายน": 4,
        "พฤษภาคม": 5,
        "มิถุนายน": 6,
        "กรกฎาคม": 7,
        "สิงหาคม": 8,
        "กันยายน": 9,
        "ตุลาคม": 10,
        "พฤศจิกายน": 11,
        "ธันวาคม": 12
      };

    const formatDate1 = (monthName) => {
        // ตรวจสอบว่าชื่อเดือนถูกต้องหรือไม่
        if (!monthMap.hasOwnProperty(monthName)) {
          return 'Invalid Month Name';
        }
      
        // แปลงชื่อเดือนเป็นหมายเลขเดือน
        const monthNumber = monthMap[monthName];
        return monthNumber;
      }

    const selectedformattedMonth = formatDate1(selectedMonth);
    
    const formatDate2 = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'numeric' }; // เปลี่ยนเป็น 'short' หรือ 'numeric' ถ้าต้องการรูปแบบอื่น
        return date.toLocaleString('th-TH', options);
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                const formattedMonth = formatDate2(element.date);
                if(formattedMonth == selectedformattedMonth){
                    if(element.transactionType == 'รายได้'){
                        IncomeAndExpensestData.push(element)
                    }
                    if(element.transactionType == 'ค่าใช้จ่าย'){
                        IncomeAndExpensestData.push(element)
                    }
                }
            });
            console.log(IncomeAndExpensestData)
            return IncomeAndExpensestData
        }
    })
}

export const  retrieveAllDataIncomeAndExpenses = (userUID)=>{
    const IncomeAndExpensestData = {
        income:[],
        expenses:[],
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.transactionType == 'รายได้'){
                    IncomeAndExpensestData.income.push(element)
                }
                if(element.transactionType == 'ค่าใช้จ่าย'){
                    IncomeAndExpensestData.expenses.push(element)
                }
            });

            return IncomeAndExpensestData
        }
    })
}
//retrieve มาทุก quest มี daily weekly personal
export const  retrieveAllDataQuestNew = (userUID)=>{
    const QuestData = {
        daily:[],
        weekly:[],
        personal:[],
        statetrue:[],
        all:[]
    }
    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().quest;
            allData.forEach(element => {
                if(element.questType == 'daily'){
                    QuestData.daily.push(element)
                    QuestData.all.push(element)
                    if(element.questState == true){
                        QuestData.statetrue.push(element)
                    }
                }else if(element.questType == 'weekly'){
                    QuestData.weekly.push(element)
                    QuestData.all.push(element)
                    if(element.questState == true){
                        QuestData.statetrue.push(element)
                    }
                }else if(element.questType == 'Personal Goal'){
                    QuestData.personal.push(element)
                    QuestData.all.push(element)
                    if(element.questState == true){
                        QuestData.statetrue.push(element)
                    }
                }
            });

            return QuestData
        }else{
            return null
        }
    })
    .catch((error) => {
        console.error("Error retrieving AllDataQuest:", error);
        throw error;
    });
};
//เฉพาะ PersonalGoal
export const  retrieveAllDataQuest = (userUID)=>{
    const QuestData = []
    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().quest;
            allData.forEach(element => {
                if(element.questType != ''){
                    QuestData.push(element)
                }
            });

            return QuestData
        }else{
            return null
        }
    })
    .catch((error) => {
        console.error("Error retrieving AllDataQuest:", error);
        throw error;
    });
};
// ของ Quest and Week แยกกันกับ Personal
export const retrieveQuestDaliyAndWeek = async () => {
    const QuestData = {
        daily: [],
        weekly: []
    };

    try {
        const dailyData = await firestore()
            .collection('quests')
            .doc('daily')
            .get();

        if (dailyData.exists) {
            const allData = dailyData.data().quest;
            allData.forEach(element => {
                QuestData.daily.push(element);
            });
        }

        const weeklyData = await firestore()
            .collection('quests')
            .doc('weekly')
            .get();

        if (weeklyData.exists) {
            const allData = weeklyData.data().quest;
            allData.forEach(element => {
                QuestData.weekly.push(element);
            });
        }
    } catch (error) {
        console.error('Error retrieving quest data:', error);
    }

    return QuestData;
};

export const retrieveAllDataPet = (userUID) => {
    const PetData = {
        petName: "",
        lastedDate: "",
        petImage: "",
        petImages: [],
        downGradeCard: false
    };
    return firestore()
        .collection('pets')
        .doc(userUID)
        .get()
        .then((data) => {
            if (data.exists) { 
                PetData.petName = data.data().petName
                PetData.lastedDate = data.data().lastedDate
                PetData.petImage = data.data().petImage
                PetData.petImages = data.data().petImages
                PetData.downGradeCard = data.data().downGradeCard
                return PetData;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving petName:", error);
            throw error;
        });
};

export const retrieveAllDataPetImage = (userUID) => {
    return firestore()
        .collection('pets')
        .doc(userUID)
        .get()
        .then((data) => {
            if (data.exists) {
                return data.data().petImages;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving petName:", error);
            throw error;
        });
};


export const editTransaction = async(userUID, itemData, input, success)=>{
    let resultRepayDebt = 0;
    let isCanEdit = false;
    if(itemData.transactionType == 'หนี้สิน'){
        const itemsDataRepayDebt = await retrieveRepayDebt(userUID)
        let matchingDebts = itemsDataRepayDebt.filter(data => data.transactionId === itemData.transactionId);
        console.log(matchingDebts)
        if(matchingDebts.length > 0){
            matchingDebts.forEach(element => {
                resultRepayDebt+=parseFloat(element.value);
            });
            console.log(`input.value: ${input.value}`)
            console.log(`resultRepayDebt: ${resultRepayDebt}`)
            if(input.value >= resultRepayDebt){
                isCanEdit = true;
            }else{
                Alert.alert(
                    'แจ้งเตือน!',
                    'ไม่สามารถแก้ไขได้เนื่องจากจำนวนหนี้ไม่สามารถน้อยกว่าจำนวนชำระหนี้ได้',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ],
                    {cancelable: false}
                );
            }
        }else{
            isCanEdit = true;
        }
    }else{
        isCanEdit = true;
    }

    if(isCanEdit){
        const docRef = firestore().collection('financials').doc(userUID);

        docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const oldData = doc.data();
                let transactions = oldData.transactions;

                // ทำการแก้ไขข้อมูลที่ต้องการ
                // ในตัวอย่างนี้เราจะแก้ไขค่า detail และ value ของ transaction ที่มี index เท่ากับ 0
                transactions.forEach((element)=>{
                    if(itemData.transactionId == element.transactionId && itemData.transactionType == element.transactionType){
                        element.detail = input.detail
                        element.value = input.value
                    }
                });

                // สร้างออบเจกต์ที่มี key เป็น transactions และ value เป็นอาร์เรย์ transactions ที่แก้ไขแล้ว
                const updatedData = {
                    transactions: transactions
                };

                // ทำการอัปเดตข้อมูลใน Firestore
                return docRef.update(updatedData)
                    .then(() => {
                        success()
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                        throw error;
                    });
            } else {
                console.error("No such document!");
                throw new Error("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            throw error;
        });
    }
    

}

export const RemoveTransaction = async(userUID, itemData, success) => {
    if(itemData.transactionType == 'หนี้สิน'){
        const itemsDataRepayDebt = await retrieveRepayDebt(userUID);
        console.log(`itemsDataRepayDebt: ${itemsDataRepayDebt}`)
        if(itemsDataRepayDebt.length > 0){
            itemsDataRepayDebt.forEach(repayDebt =>{
                if(repayDebt.transactionId == itemData.transactionId){
                    firestore()
                    .collection('financials')
                    .doc(userUID)
                    .update({
                        transactions: firestore.FieldValue.arrayRemove(repayDebt)
                    })
                    .then(() => {
                        console.log("RemoveTransaction Expense successfully!");
                        
                    })
                    .catch((error) => {
                        console.error("Error RemoveTransaction:", error);
                        throw error;
                    });
                        }
            })
            firestore()
            .collection('financials')
            .doc(userUID)
            .update({
                transactions: firestore.FieldValue.arrayRemove(itemData)
            })
            .then(() => {
                console.log("RemoveTransaction Liability successfully!");
            })
            .catch((error) => {
                console.error("Error RemoveTransaction:", error);
                throw error;
            });

            const category = await retrieveCategory(userUID);
            console.log(`category.length: ${category.length}`)
            category.forEach((element)=>{
                if(element.transactionId == itemData.transactionId){
                    return firestore()
                        .collection('users')
                        .doc(userUID)
                        .update({
                            categories: firestore.FieldValue.arrayRemove(element)
                        })
                        .then(() => {
                            success()
                            console.log("Categories removed successfully!");
                        })
                        .catch((error) => {
                            console.error("Error removing categories:", error);
                            throw error;
                        });
                }
            }) 
        }
        else{
            firestore()
            .collection('financials')
            .doc(userUID)
            .update({
                transactions: firestore.FieldValue.arrayRemove(itemData)
            })
            .then(() => {
                console.log("RemoveTransaction successfully!");
                
                success()
            })
            .catch((error) => {
                console.error("Error RemoveTransaction:", error);
                throw error;
            });

            const category = await retrieveCategory(userUID);
            category.forEach((element)=>{
                if(element.transactionId == itemData.transactionId){
                    return firestore()
                        .collection('users')
                        .doc(userUID)
                        .update({
                            categories: firestore.FieldValue.arrayRemove(element)
                        })
                        .then(() => {
                            success()
                            console.log("Categories removed successfully!");
                        })
                        .catch((error) => {
                            console.error("Error removing categories:", error);
                            throw error;
                        });
                }
            }) 
        }
    }
    else{
        return firestore()
        .collection('financials')
        .doc(userUID)
        .update({
            transactions: firestore.FieldValue.arrayRemove(itemData)
        })
        .then(() => {
            console.log("RemoveTransaction successfully!");
            success()
        })
        .catch((error) => {
            console.error("Error RemoveTransaction:", error);
            throw error;
        });
    }
    
}

export const updateLastedDate = (userUID,dateinput,isFirstTransaction) =>{
    if (isFirstTransaction === false && dateinput !== undefined) {
        return firestore()
            .collection('financials')
            .doc(userUID)
            .update({
                LastedDate: dateinput
            })
            .then(() => {
                console.log("Update LastedDate successfully!");

            })
            // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
            .catch((error) => {
                console.error("Error update lastedDate:", error);
                throw error;
            });
    } else {
        console.error("Updated lastedDate Error");
        throw new Error("Value must not be 0!");
    }
}

export const updateGuageRiability = (userUID,newGuageRiability) =>{
    if (newGuageRiability !== undefined) {
        return firestore()
            .collection('financials')
            .doc(userUID)
            .update({
                GuageRiability: newGuageRiability
            })
            .then(() => {
                console.log("Update GuageRiability successfully!");

            })
            // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
            .catch((error) => {
                console.error("Error update riability guague:", error);
                throw error;
            });
    } else {
        console.error("Updated riabilityGuage Error");
        throw new Error("Value must not be undefined");
    }
}

//ลบไอเท็มใน inventory
export const removeCardDownGrade = (userUID) => {
    const downGradeCard = {
        itemType: "forUse",
        itemName: "บัตรกันลดขั้น",
        itemPhotoURL:"https://drive.google.com/uc?export=view&id=1-ajNNnLTDZQuq5qcCGPE5e5vcrV_1F8R"
    }

    return firestore()
        .collection('pets')
        .doc(userUID)
        .update({
            downGradeCard: false,
            inventory: firestore.FieldValue.arrayRemove(downGradeCard)
        })
        .then(() => {
            console.log("add Item2Inventory successfully!");
        })
        // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding Item2Inventory:", error);
            throw error;
        });
};

//เพิ่มไอเท็มไปใน inventory
export const addItem2Inventory = (userUID, itemData) => {
    const newItem2Inventory = {
        itemName: itemData.itemName,
        itemType: itemData.itemType,
        itemPhotoURL: itemData.itemPhotoURL,
    };

    return firestore()
        .collection('pets')
        .doc(userUID)
        .update({
            downGradeCard: true,
            inventory: firestore.FieldValue.arrayUnion(newItem2Inventory)
        })
        .then(() => {
            console.log("add Item2Inventory successfully!");
        })
        // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding Item2Inventory:", error);
            throw error;
        });
};

//เพิ่มของตกแต่งไปใน inventory
export const addFurniture2Inventory = (userUID, itemData) => {
    const newItem2Inventory = {
        itemName: itemData.itemName,
        itemType: itemData.itemType,
        itemLocation: 0,
        itemPhotoURL: itemData.itemPhotoURL,
        itemSoldoutURL: itemData.itemSoldoutURL
    };

    return firestore()
        .collection('pets')
        .doc(userUID)
        .update({
            inventory: firestore.FieldValue.arrayUnion(newItem2Inventory)
        })
        .then(() => {
            console.log("add Furniture2Inventory successfully!");
        })
        // กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding Furniture2Inventory:", error);
            throw error;
        });
};

export const updateLocationItem = (userUID, item, newItem, dispatch)=>{
   
    return  firestore()
        .collection('pets')
        .doc(userUID)
        .update({
            inventory: firestore.FieldValue.arrayUnion(newItem)
        })
        .then(() => {
            return(
                firestore()
                .collection('pets')
                .doc(userUID)
                .update({
                    inventory: firestore.FieldValue.arrayRemove(item)
                })
                .then(()=>{
                    console.log(`update item successfully`)
                    dispatch(setPressInventory(true));
                })
                .catch((error) => {
                    console.error("Error remove locationItem:", error);
                    throw error;
                })
            )
            
        })
        .catch((error) => {
            console.error("Error add newLocationItem:", error);
            throw error;
        });
}


// ตรวจสอบว่ามี itemName ที่ซ้ำกับ newItemName ใน Firebase หรือไม่
export const checkDuplicateItem = async (userUID, newItemName) => {
    try {
        const inventory = await retrieveInventory(userUID);
        const isDuplicate = inventory.all.some(item => item.itemName === newItemName.itemName);        
        if (isDuplicate) {
            // ใช้เมธอด some เพื่อตรวจสอบว่ามีชื่อสินค้าซ้ำหรือไม่
            console.log('return: ' + isDuplicate)
            return isDuplicate;
        } else {
            // กรณีไม่พบข้อมูลใน inventory
            console.log("No inventory data found.");
            return false;
        }
    } catch (error) {
        console.error("Error checking duplicate item:", error);
        throw error;
    }
};

export const retrieveCurrencyPet = (userUID) => {
    const CurrencyData = {
        Money:0,
        Ruby:0,
        Guarantee:8
    };
    return firestore()
        .collection('pets')
        .doc(userUID)
        .get()
        .then((data) => {
            if (data.exists) { 
                CurrencyData.Money = data.data().Money
                CurrencyData.Ruby = data.data().Ruby
                CurrencyData.Guarantee = data.data().Guarantee
                return CurrencyData;
            } else {
                alert('field not have')
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving CurrencyData:", error);
            throw error;
        });
};

export const updateMoneyBalance = async (userUID, newBalance) => {
    try {
        await firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                Money: newBalance
            });
        console.log("Money balance updated successfully!");
    } catch (error) {
        console.error("Error updating money balance: ", error);
        throw error;
    }
};

/*---------------------------------------------------------------------*/

export const addRandomQuest = async (userUID) => {
    try {
        const allQuest = await retrieveRandomQuest();
        // Add daily quests
        for (const element of allQuest.daily) {
            await addQuestToUser('pets', userUID, element);
        }
        
        // Add weekly quests
        for (const element of allQuest.weekly) {
            await addQuestToUser('pets', userUID, element);
        }

        console.log("All quests added successfully!");
    } catch (error) {
        console.error("Error adding quests:", error);
        throw error;
    }
}

export const addRandomDailyQuest = async (userUID) => {
    try {
        const dailyQuests = await retrieveRandomDailyQuest();
        await addQuestToUser('pets', userUID, dailyQuests[0]);
        await addQuestToUser('pets', userUID, dailyQuests[1]);
        console.log("Daily quests added successfully!");
    } catch (error) {
        console.error("Error adding daily quests:", error);
        throw error;
    }
}

export const addRandomWeeklyQuest = async (userUID) => {
    try {
        const weeklyQuests = await retrieveRandomWeeklyQuest();
        await addQuestToUser('pets', userUID, weeklyQuests[0])
        // .then(async()=>{
        //     await addQuestToUser('pets', userUID, weeklyQuests[1]).then(async()=>{
        //         await addQuestToUser('pets', userUID, weeklyQuests[2]).then(()=>{
        //             console.log("Weekly quests added successfully!");
        //         })
        //     })
        // })
        await addQuestToUser('pets', userUID, weeklyQuests[1]);
        await addQuestToUser('pets', userUID, weeklyQuests[2]);
        console.log("Weekly quests added successfully!");
    } catch (error) {
        console.error("Error adding weekly quests:", error);
        throw error;
    }
}

const addQuestToUser = async (collection, userUID, element) => {
    try {
        await firestore().collection(collection).doc(userUID)
            .update({
                quest: firestore.FieldValue.arrayUnion(element)
            });
        console.log("Quest added successfully!");
    } catch (error) {
        console.error("Error adding quest:", error);
        throw error;
    }
}

export const retrieveRandomQuest = async () => {
    try {
        const allQuest = {
            daily: [],
            weekly: []
        };

        const dailyQuests = await retrieveRandomDailyQuest();
        allQuest.daily = dailyQuests;

        const weeklyQuests = await retrieveRandomWeeklyQuest();
        allQuest.weekly = weeklyQuests;

        return allQuest;
    } catch (error) {
        console.error("Error retrieving random quests:", error);
        throw error;
    }
}

export const retrieveRandomDailyQuest = async () => {
    try {
        const data = await firestore().collection('quests').doc('daily').get();
        if (data.exists) {
            const allData = data.data().quest;
            let randomIndex1 = 0
            let randomIndex2 = 0
            do{
            randomIndex1 = Math.floor(Math.random() * allData.length);
            randomIndex2 = Math.floor(Math.random() * allData.length);
            }while(randomIndex1 == randomIndex2)
            return [allData[randomIndex1], allData[randomIndex2]];
        } else {
            throw new Error("No daily quests found");
        }
    } catch (error) {
        console.error("Error retrieving random daily quests:", error);
        throw error;
    }
}

export const retrieveRandomWeeklyQuest = async () => {
    try {
        const data = await firestore().collection('quests').doc('weekly').get();
        if (data.exists) {
            const allData = data.data().quest;
            let randomIndex1 = 0
            let randomIndex2 = 0
            let randomIndex3 = 0
            do{
            randomIndex1 = Math.floor(Math.random() * allData.length);
            randomIndex2 = Math.floor(Math.random() * allData.length);
            randomIndex3 = Math.floor(Math.random() * allData.length);
            }while(randomIndex1 == randomIndex2 || randomIndex2 == randomIndex3 || randomIndex3 == randomIndex1)
            return [allData[randomIndex1], allData[randomIndex2], allData[randomIndex3]];
        } else {
            throw new Error("No weekly quests found");
        }
    } catch (error) {
        console.error("Error retrieving random weekly quests:", error);
        throw error;
    }
}

export const  retrievePersonalQuest = (userUID)=>{
    const QuestData = []
    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().quest;
            allData.forEach(element => {
                if(element.questType == 'Personal Goal'){
                    QuestData.push(element)
                }
            });

            return QuestData
        }
    })
};

export const newStampQuestTime = (userUID,formattedCurrentDate) => {
    const newDate = formattedCurrentDate;
    return firestore().collection('pets').doc(userUID)
    .update({
        stampQuestTime : newDate
    })
    .then(()=>{
        console.log("Add Stamp Quest Time success")
    })
    .catch((error) => {
        console.error("Error Stamp Quest Time:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}

export const newCurrentQuestTime = (userUID,formattedCurrentDate) => {
    const newDate = formattedCurrentDate;
    return firestore().collection('pets').doc(userUID)
    .update({
        currentQuestTime : newDate
    })
    .then(()=>{
        console.log("Add Current Quest Time success")
    })
    .catch((error) => {
        console.error("Error currentQuestTime:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}

export const retrieveAllQuest = (userUID)=>{
    const allQuest ={
        Personal:[],
        Daily:[],
        Weekly:[]
    }
    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().quest;
            allData.forEach(element=>{
                if(element.questType == 'Personal Goal'){
                    allQuest.Personal.push(element)
                }
                if(element.questType == 'daily'){
                    allQuest.Daily.push(element)
                }
                if(element.questType == 'weekly'){
                    allQuest.Weekly.push(element)
                }
            });
        return allQuest
        }
    })
}

export const retrieveFinishedQuest = (userUID)=>{
    const finishedquest ={
        Daily:[],
        Weekly:[],
        Personal:[]
    }
    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().quest;
            allData.forEach(element=>{
                if(element.questType == 'daily' && element.questState == true && element.rewardStatus == false){
                    finishedquest.Daily.push(element)
                }
                if(element.questType == 'weekly' && element.questState == true && element.rewardStatus == false){
                    finishedquest.Weekly.push(element)
                }
                if(element.questType == 'Personal Goal' && element.questState == true && element.rewardStatus == false){
                    finishedquest.Personal.push(element)
                }
            });
        return finishedquest
        }
    })
}

export const retrieveCheckExpenseQuest = (userUID)=>{
    object=[]

    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().quest;
            allData.forEach(quest=>{
                if(quest.transactionType == 'ค่าใช้จ่าย'){
                    object.push(quest)
                }
            });
        return object
        }
    })
}

export const retrieveCurrentQuestTime = (userUID) => {
    
    return firestore().collection('pets').doc(userUID)
    .get()
    .then((doc) => {
        if (doc.exists) {
            const currentQuestTime = doc.data().currentQuestTime;
            return currentQuestTime;
        } else {
            // กรณีไม่พบเอกสาร
            console.log("No such document!");
            return null;
        }
    })
    .catch((error) => {
        // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
        console.error("Error getting document:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}

export const retrieveStampQuestTime = (userUID) => {
    
    return firestore().collection('pets').doc(userUID)
    .get()
    .then((doc) => {
        if (doc.exists) {
            const stampQuestTime = doc.data().stampQuestTime;
            return stampQuestTime;
        } else {
            // กรณีไม่พบเอกสาร
            console.log("No such document!");
            return null;
        }
    })
    .catch((error) => {
        // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
        console.error("Error getting document:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}

export const delDailyQuest = async (userUID) => {
    try {
        const questData = await retrieveAllDataQuest(userUID);
        for (const element of questData) {
            if (element.questType === 'daily') {
                await firestore().collection('pets').doc(userUID).update({
                    quest: firestore.FieldValue.arrayRemove(element)
                });
            }
        }
        console.log("Quests deleted successfully!");
    } catch (error) {
        console.error("Error deleting quests:", error);
        throw error;
    }
}


export const delWeeklyQuest = async(userUID)=>{
    const questData = await retrieveAllDataQuest(userUID);
    questData.forEach(element => {
        if(element.questType == 'weekly'){
            return firestore().collection('pets').doc(userUID)
            .update({
                quest: firestore.FieldValue.arrayRemove(element)
            })
            .then(() => {
                console.log("Quests deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting quests:", error);
                throw error;
            });
        }
    })
}

export const precheckDailyQuest = (userUID,dailyQuestSelected,formattedCurrentDate)=>{
    const progression = {
      Income:[],
      Expense:[],
      Assest:[],
      Debt:[],
    }

    const TypeSelect ={
        Income:false,
        Expense:false,
        Assest:false,
        Debt:false,
    }

    dailyQuestSelected.forEach(quest => {
        if(quest.transactionType == 'รายได้'){
            TypeSelect.Income = true
        }
        if(quest.transactionType == 'สินทรัพย์'){
            TypeSelect.Assest = true
        }
        if(quest.transactionType == 'ค่าใช้จ่าย'){
            TypeSelect.Expense = true
        }
        if(quest.transactionType == 'หนี้สิน'){
            TypeSelect.Debt = true
        }
    })

    return firestore().collection('financials').doc(userUID).get()
    .then((data)=>{
      if (data.exists){
        const allData = data.data().transactions;
        allData.forEach(element=>{
          if(element.date == formattedCurrentDate){
            if(TypeSelect.Income){
                if(element.transactionType == 'รายได้'){
                    progression.Income.push(element)
                }
            }
            if(TypeSelect.Assest){
                if(element.transactionType == 'สินทรัพย์'){
                    progression.Assest.push(element)
                }
            }
            if(TypeSelect.Expense){
                if(element.transactionType == 'ค่าใช้จ่าย'){
                    progression.Expense.push(element)
                }
            }
            if(TypeSelect.Debt){
                if(element.transactionType == 'ค่าใช้จ่าย' && (element.category == 'ค่าใช้จ่ายผันแปร(ชำระหนี้)' || element.category == 'ค่าใช้จ่ายคงที่(ชำระหนี้)')){
                    progression.Debt.push(element)
                }
            }
          }
        })
        return progression
      }
    })
    .catch((error) => {
        console.error("Error precheckDailyQuest:", error);
        throw error;
    });
}

export const precheckWeeklyQuest = (userUID,QuestSelected,formattedCurrentDate)=>{
    const formattedCurrentDateAsDateObject = new Date(formattedCurrentDate)
    const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()

    const Day2 = formattedCurrentDatetimestamp+86400000
    const Day3 = formattedCurrentDatetimestamp+172800000
    const Day4 = formattedCurrentDatetimestamp+259200000
    const Day5 = formattedCurrentDatetimestamp+345600000
    const Day6 = formattedCurrentDatetimestamp+432000000
    const Day7 = formattedCurrentDatetimestamp+518400000

    const nDay1 = convertDate(formattedCurrentDate)
    const nDay2 = convertDate(Day2)
    const nDay3 = convertDate(Day3)
    const nDay4 = convertDate(Day4)
    const nDay5 = convertDate(Day5)
    const nDay6 = convertDate(Day6)
    const nDay7 = convertDate(Day7)

    const progression = {
      Income:[],
      Expense:[],
      Assest:[],
      Debt:[],
    }

    const TypeSelect ={
        Income:false,
        Expense:false,
        Assest:false,
        Debt:false,
    }

    console.log('เควสโว้ย',QuestSelected)

    QuestSelected.forEach(quest => {
        if(quest.transactionType == 'รายได้'){
            TypeSelect.Income = true
        }
        if(quest.transactionType == 'สินทรัพย์'){
            TypeSelect.Assest = true
        }
        if(quest.transactionType == 'ค่าใช้จ่าย'){
            TypeSelect.Expense = true
        }
        if(quest.transactionType == 'หนี้สิน'){
            TypeSelect.Debt = true
        }
    })

    console.log(TypeSelect)

    return firestore().collection('financials').doc(userUID).get()
    .then((data)=>{
      if (data.exists){
        const allData = data.data().transactions;
        allData.forEach(element=>{
          if(element.date == nDay1 || element.date == nDay2 || element.date == nDay3 || element.date == nDay4 || element.date == nDay5 || element.date == nDay6 || element.date == nDay7){
            if(TypeSelect.Income){
                if(element.transactionType == 'รายได้'){
                    progression.Income.push(element)
                }
            }
            if(TypeSelect.Assest){
                if(element.transactionType == 'สินทรัพย์'){
                    progression.Assest.push(element)
                }
            }
            if(TypeSelect.Expense){
                if(element.transactionType == 'ค่าใช้จ่าย'){
                    progression.Expense.push(element)
                }
            }
            if(TypeSelect.Debt){
                if(element.transactionType == 'ค่าใช้จ่าย' && (element.category == 'ค่าใช้จ่ายผันแปร(ชำระหนี้)' || element.category == 'ค่าใช้จ่ายคงที่(ชำระหนี้)')){
                    progression.Debt.push(element)
                }
            }
          }
        })
        return progression
      }
    })
    .catch((error) => {
        console.error("Error precheckWeeklyQuest:", error);
        throw error;
    });
}

export const precheckExpenseQuest = (userUID,QuestSelected,formattedCurrentDate,questRound)=>{

    const formattedCurrentDateAsDateObject = new Date(questRound)
    const formattedCurrentDatetimestamp = formattedCurrentDateAsDateObject.getTime()

    const Day2 = formattedCurrentDatetimestamp+86400000
    const Day3 = formattedCurrentDatetimestamp+172800000
    const Day4 = formattedCurrentDatetimestamp+259200000
    const Day5 = formattedCurrentDatetimestamp+345600000
    const Day6 = formattedCurrentDatetimestamp+432000000
    const Day7 = formattedCurrentDatetimestamp+518400000

    const nDay1 = convertDate(questRound)
    const nDay2 = convertDate(Day2)
    const nDay3 = convertDate(Day3)
    const nDay4 = convertDate(Day4)
    const nDay5 = convertDate(Day5)
    const nDay6 = convertDate(Day6)
    const nDay7 = convertDate(Day7)

    const progression = {
        Daily:[],
        Expense:[]
    }

    return firestore().collection('financials').doc(userUID).get()
    .then((data)=>{
      if (data.exists){
        const allData = data.data().transactions;
        allData.forEach(element=>{
            if(element.date == formattedCurrentDate){
                //
                if(element.transactionType == 'ค่าใช้จ่าย'){
                    progression.Daily.push(element)
                }
            }
            if(element.date == nDay1 || element.date == nDay2 || element.date == nDay3 || element.date == nDay4 || element.date == nDay5 || element.date == nDay6 || element.date == nDay7){
                //
                if(element.transactionType == 'ค่าใช้จ่าย'){
                    progression.Expense.push(element)
                }
            }
        })
        return progression
      }
    })
    .catch((error) => {
        console.error("Error precheckWeeklyQuest:", error);
        throw error;
    });
}

export const precheckPersonalQuest = (userUID, QuestSelected) => {
    const progression = {
        Date:QuestSelected.addDate,
        Income: [],
        Expense: [],
        Assest: [],
        Debt: [],
    };

    return firestore()
        .collection('financials')
        .doc(userUID)
        .get()
        .then((data) => {
            if (data.exists) {
                const allData = data.data().transactions;
                allData.forEach((element) => {
                    const elementDate = element.date;
                    if (elementDate >= QuestSelected.addDate) {
                        if (element.transactionType === 'รายได้') {
                            progression.Income.push(element);
                        }
                        if (element.transactionType === 'สินทรัพย์') {
                            progression.Assest.push(element);
                        }
                        if (element.transactionType === 'ค่าใช้จ่าย') {
                            progression.Expense.push(element);
                            if (
                                element.category === 'ค่าใช้จ่ายผันแปร(ชำระหนี้)' ||
                                element.category === 'ค่าใช้จ่ายคงที่(ชำระหนี้)'
                            ) {
                                progression.Debt.push(element);
                            }
                        }
                    }
                });
                return progression;
            }
        })
        .catch((error) => {
            console.error("Error precheckPersonalQuest:", error);
            throw error;
        });
};


export const convertDate = (date) =>{
    const nDate = new Date(date)
    const year = nDate.getFullYear();
    const month = (nDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = nDate.getDate().toString().padStart(2, '0');
    const formattednDate = `${year}-${month}-${day}`;

    return formattednDate
}

export const changeFinished = async (allQuestSelected, checked, userUID) => {
    const filteredDailyQuests = allQuestSelected.Daily.filter(element1 => {
        return checked.some(element => element.value == element1.value && element.transactionType == element1.transactionType);
    }); 

    const filteredWeeklyQuests = allQuestSelected.Weekly.filter(element1 => {
      return checked.some(element => element.value == element1.value && element.transactionType == element1.transactionType);
    });

    const filteredPersonalQuests = allQuestSelected.Personal.filter(element1 => {
        return checked.some(element => element.value == element1.value && element.transactionType == element1.transactionType);
    });

    const delDailypromises = filteredDailyQuests.map(async (element) => {
        try {
          //console.log("damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayRemove(element)
            });
            console.log("Remove Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error;
        }
    });
    const addDailypromises = filteredDailyQuests.map(async (element) => {
      try {
        element.questState = true
        //console.log("Nooooooooooooooooooooooooooooooooooooooooooooo",element)
          await firestore().collection('pets').doc(userUID).update({
              quest: firestore.FieldValue.arrayUnion(element)
          });
          console.log("Update Finished Quest successfully!");
      } catch (error) {
          console.error("Error Remove Finished Quest:", error);
          throw error; 
      }
    });

    const delWeeklypromises = filteredWeeklyQuests.map(async (element) => {
      try {
        //console.log("damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",element)
          await firestore().collection('pets').doc(userUID).update({
              quest: firestore.FieldValue.arrayRemove(element)
          });
          console.log("Remove Finished Quest successfully!");
      } catch (error) {
          console.error("Error Remove Finished Quest:", error);
          throw error;
      }
    });
    const addWeeklypromises = filteredWeeklyQuests.map(async (element) => {
        try {
        element.questState = true
        //console.log("Nooooooooooooooooooooooooooooooooooooooooooooo",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayUnion(element)
            });
            console.log("Update Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error; 
        }
    });

    const delPersonalpromises = filteredPersonalQuests.map(async (element) => {
        try {
            // console.log("damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayRemove(element)
            });
            console.log("Remove Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error;
        }
    });

    const addPersonalpromises = filteredPersonalQuests.map(async (element) => {
        try {
        element.questState = true
        //console.log("Nooooooooooooooooooooooooooooooooooooooooooooo",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayUnion(element)
            });
            console.log("Update Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error; 
        }
    });

    await Promise.all(delDailypromises);
    await Promise.all(addDailypromises);
    await Promise.all(delWeeklypromises);
    await Promise.all(addWeeklypromises);
    await Promise.all(delPersonalpromises);
    await Promise.all(addPersonalpromises);
};

export const changeRewards = async (userUID,checkedQuest) =>{
    const trackingDailyQuest = checkedQuest.Daily
    const trackingWeeklyQuest = checkedQuest.Weekly
    const trackingPersonalQuest = checkedQuest.Personal 

    const delDailypromises = trackingDailyQuest.map(async (element) => {
        try {
          //console.log("damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayRemove(element)
            });
            console.log("Remove Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error;
        }
    });
    const addDailypromises = trackingDailyQuest.map(async (element) => {
      try {
        element.rewardStatus = true
        element.seen = true
        //console.log("Nooooooooooooooooooooooooooooooooooooooooooooo",element)
          await firestore().collection('pets').doc(userUID).update({
              quest: firestore.FieldValue.arrayUnion(element)
          });
          console.log("Update Finished Quest successfully!");
      } catch (error) {
          console.error("Error Remove Finished Quest:", error);
          throw error; 
      }
    });

    const delWeeklypromises = trackingWeeklyQuest.map(async (element) => {
        try {
          //console.log("damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayRemove(element)
            });
            console.log("Remove Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error;
        }
    });
    const addWeeklypromises = trackingWeeklyQuest.map(async (element) => {
      try {
        element.rewardStatus = true
        element.seen = true
        //console.log("Nooooooooooooooooooooooooooooooooooooooooooooo",element)
          await firestore().collection('pets').doc(userUID).update({
              quest: firestore.FieldValue.arrayUnion(element)
          });
          console.log("Update Finished Quest successfully!");
      } catch (error) {
          console.error("Error Remove Finished Quest:", error);
          throw error; 
      }
    });

    const addPersonalQuestReward = trackingPersonalQuest ? trackingPersonalQuest.map(async(element) => { 
        try {
            const prepare = {
                Daily:[],
                Weekly:[],
                Personal:[]
            } 

            trackingPersonalQuest.forEach(element=>{
                prepare.Personal.push(element)
            })
            await finalReward(userUID, prepare);
            console.log('Add Personal Quest Reward Success')
        } catch (error) {
            console.error("Error Add Personal Quest Reward:", error);
            throw error;
        }
    }) : [];

    const delPersonalpromises = trackingPersonalQuest.map(async (element) => {
        try {
          //console.log("damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",element)
            await firestore().collection('pets').doc(userUID).update({
                quest: firestore.FieldValue.arrayRemove(element)
            });
            console.log("Remove Finished Quest successfully!");
        } catch (error) {
            console.error("Error Remove Finished Quest:", error);
            throw error;
        }
    });
    
    await Promise.all(addPersonalQuestReward);
    await Promise.all(delDailypromises);
    await Promise.all(addDailypromises);
    await Promise.all(delWeeklypromises);
    await Promise.all(addWeeklypromises);
    await Promise.all(delPersonalpromises);
}

export const finalReward = async (userUID, checkedQuest ) => {
    const rewards = {
        Money: 0,
        Ruby: 0
    };

    if (Object.keys(checkedQuest).length === 0 && checkedQuest.constructor === Object) {
        console.log("test object is empty");
      } else {
        console.log("test object has values");
        checkedQuest.Daily.forEach(element => {
            if (element.questType == 'daily') {
                let moneyReward = element.value / 10;
                rewards.Money += moneyReward;
            }
        })
        checkedQuest.Weekly.forEach(element => {
            if (element.questType == 'weekly') {
                let moneyReward = element.value / 10;
                let rubyReward = Math.floor(element.value / 30);
                rewards.Money += moneyReward;
                rewards.Ruby += rubyReward;
            }
        })
        checkedQuest.Personal.forEach(element => {
            if (element.questType == 'Personal Goal') {
                let moneyReward = element.value / 10;
                rewards.Money += moneyReward;
            }
        })
    }
    
    const newRewardAmount = async (rewards) => {
        const oldValue = {
            Money: 0,
            Ruby: 0
        };


        const data = await firestore().collection('pets').doc(userUID).get()
        if (data.exists) {
            oldValue.Money = data.data().Money
            oldValue.Ruby = data.data().Ruby
        }

        oldValue.Money += rewards.Money;
        oldValue.Ruby += rewards.Ruby;

        return oldValue;
    };

    const newReward = await newRewardAmount(rewards);

    if (newReward.hasOwnProperty('Money')) {
        await firestore().collection('pets').doc(userUID).update({
            Money: newReward.Money
        });
    }

    if (newReward.hasOwnProperty('Ruby')) {
        await firestore().collection('pets').doc(userUID).update({
            Ruby: newReward.Ruby
        });
    }
};

export const updateRubyBalance = async (userUID, newRuby) => {
    try {
        await firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                Ruby: newRuby
            });
        console.log("Ruby balance updated successfully!");
    } catch (error) {
        console.error("Error updating Ruby balance: ", error);
        throw error;
    }
};

export const updateGuarantee = async (userUID, newGuarantee) => {
    try {
        await firestore()
            .collection('pets')
            .doc(userUID)
            .update({
                Guarantee: newGuarantee
            });
        console.log("Guarantee balance updated successfully!");
    } catch (error) {
        console.error("Error updating Guarantee: ", error);
        throw error;
    }
};
//update seen เป็น true ใน quest ที่มี rewardStatus เป็น true
export const updateAllQuestSeenStatus = (userUID, questArray) => {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('pets').doc(userUID);

    // ตรวจสอบว่า questArray ไม่ใช่ค่า null หรือ undefined
    if (questArray && questArray.length > 0) {
        const updatedQuestArray = questArray.map((quest) => {
            if (quest.questState) {
                return { ...quest, seen: true };
            } else {
                return quest;
            }
        });

        return docRef.update({ quest: updatedQuestArray })
            .then(() => {
                console.log('Seen status updated successfully for quests with rewardStatus = true');
            })
            .catch((error) => {
                console.error('Error updating seen status:', error);
                throw error;
            });
    } else {
        return Promise.resolve(); // หรือสามารถใส่การคืนค่า Promise.reject() ได้เพื่อแสดงว่ามีข้อผิดพลาด
    }
};

const deleteDocument = (uid) => {
    return firestore()
        .collection('users')
        .doc(uid)
        .delete()
        .then(() => {
            console.log(`Document with ID ${uid} successfully deleted!`);
        })
        .catch((error) => {
            console.error(`Error deleting document: ${error}`);
        });
};
