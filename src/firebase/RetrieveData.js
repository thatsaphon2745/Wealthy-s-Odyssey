import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

//ใช้ดึงวันที่ของรายการที่ทำ
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
//ดึงข้อมูลมาเก็บใน List
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
//ทำเพิ่มมา
export const retrieveDataIncome = (userUID)=>{
    const IncomeData ={
        work:[], //รายได้จากการทำงาน
        asset:[], //รายได้จากสินทรัพย์
        other:[]  //รายได้อื่นๆ
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
                if(element.category == 'รายได้จากการทำงาน'){
                    IncomeData.work.push(element)
                }
                if(element.category == 'รายได้จากสินทรัพย์'){
                    IncomeData.asset.push(element)
                }
                if(element.category == 'รายได้อื่นๆ'){
                    IncomeData.other.push(element)
                }
            });

            return IncomeData
        }
    })
}
//ทำเพิ่มมา
export const retrieveDataExpenses = (userUID)=>{
    const ExpensesData ={
        variable:[], //ค่าใช้จ่ายผันแปร
        fixed:[],  //ค่าใช้จ่ายคงที่
        savingsAndinvestment:[]  //ค่าใช้จ่ายออมและลงทุน
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
                if(element.category == 'ค่าใช้จ่ายผันแปร'){
                    ExpensesData.variable.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายคงที่'){
                    ExpensesData.fixed.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายออมและลงทุน'){
                    ExpensesData.savingsAndinvestment.push(element)
                }
            });

            return ExpensesData
        }
    })
}
// ทำเพิ่มมา เพื่อหา transaction ที่เป็น เงินออมเพื่อนำไปคำนวณ แต่น่าจะแก้ แต่ทำไว้ก่อน
export const retrieveDataExpensesSavings = (userUID)=>{
    const ExpensesSavingsData ={
        savings:[]
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
                if(element.category == 'ค่าใช้จ่ายออมและลงทุน(ออม)' && element.subCategory == 'ค่าใช้จ่ายออมและลงทุน(ลงทุน)'){
                    ExpensesSavingsData.savings.push(element)
                }
            });
            
            return ExpensesSavingsData
        }
    })
}

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

            //console.log(assetData)
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

export const retrieveAllData = (userUID)=>{
    const dataFinancial ={
        transactionAll:[],
        incomeWork:[], //รายได้จากการทำงาน
        incomeAsset:[], //รายได้จากสินทรัพย์
        incomeInvestAsset:[], //รายได้จากสินทรัพย์(ลงทุน)
        incomeOther:[],  //รายได้อื่นๆ
        expensesVariable:[], //ค่าใช้จ่ายผันแปร
        expensesFixed:[],  //ค่าใช้จ่ายคงที่
        expenseSavings:[],  //ค่าใช้จ่ายออม
        expenseInvest:[],  //ค่าใช้จ่ายลงทุน
        expenseRepayDebt:[],//ค่าใช้จ่ายชำระหนี้
        assetLiquid:[],
        assetInvest:[],
        assetPersonal:[],
        liabilityShort:[],
        liabilityLong:[],
        liabilityShortRemaining:[],
        liabilityLongRemaining:[],
        currentDate: "",
        lastedDate: "",
        isFirstTransaction: true,
        guageRiability: 0 
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
                if(element.category == 'รายได้จากการทำงาน'){
                    dataFinancial.incomeWork.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'รายได้จากสินทรัพย์'){
                    dataFinancial.incomeAsset.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'รายได้จากสินทรัพย์(ลงทุน)'){
                    dataFinancial.incomeInvestAsset.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'รายได้อื่นๆ'){
                    dataFinancial.incomeOther.push(element)
                    dataFinancial.transactionAll.push(element)
                }

                if(element.category == 'ค่าใช้จ่ายผันแปร'){
                    dataFinancial.expensesVariable.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายคงที่'){
                    dataFinancial.expensesFixed.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายออมและลงทุน(ออม)'){
                    dataFinancial.expenseSavings.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายออมและลงทุน(ลงทุน)'){
                    dataFinancial.expenseInvest.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายผันแปร(ชำระหนี้)'){
                    dataFinancial.expenseRepayDebt.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายคงที่(ชำระหนี้)'){
                    dataFinancial.expenseRepayDebt.push(element)
                    dataFinancial.transactionAll.push(element)
                }

                if(element.category == 'สินทรัพย์สภาพคล่อง'){
                    dataFinancial.assetLiquid.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'สินทรัพย์ลงทุน'){
                    dataFinancial.assetInvest.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'สินทรัพย์ส่วนตัว'){
                    dataFinancial.assetPersonal.push(element)
                    dataFinancial.transactionAll.push(element)
                }

                if(element.category == 'หนี้สินระยะสั้น'){
                    dataFinancial.liabilityShort.push(element)
                    dataFinancial.transactionAll.push(element)
                }
                if(element.category == 'หนี้สินระยะยาว'){
                    dataFinancial.liabilityLong.push(element)
                    dataFinancial.transactionAll.push(element)
                }
            });
            dataFinancial.currentDate = data.data().CurrentDate
            dataFinancial.lastedDate = data.data().LastedDate
            dataFinancial.isFirstTransaction = data.data().IsFirstTransaction
            dataFinancial.guageRiability = data.data().GuageRiability

            //ค่าใช้จ่ายชำระหนี้
            dataFinancial.liabilityShort.forEach(liability => {
                const matchingDebts = dataFinancial.expenseRepayDebt.filter(debt => debt.transactionId === liability.transactionId);
                
                const totalValue = matchingDebts.reduce((accumulator, debt) => accumulator + parseFloat(debt.value), 0);
                //console.log(totalValue)
                if (matchingDebts) {
                    // แก้ไขค่า value ของ liabilityData โดยลบค่า value ของรายการที่ตรงกันใน repayDebtData
                    if(liability.value - totalValue >= 0){
                        liability.value -= totalValue; 
                    }
                    
                }
                if(liability.value > 0){
                    // เพิ่มข้อมูลใหม่เข้าไปใน liabilityRemaining
                    liability.value = liability.value + '';
                    dataFinancial.liabilityShortRemaining.push(liability);
                } 
            });
        
            dataFinancial.liabilityLong.forEach(liability => {
                const matchingDebts = dataFinancial.expenseRepayDebt.filter(debt => debt.transactionId === liability.transactionId);
                //console.log(matchingDebts)
                
                const totalValue = matchingDebts.reduce((accumulator, debt) => accumulator + parseFloat(debt.value), 0);
                //console.log(totalValue)
                if (matchingDebts) {
                    // แก้ไขค่า value ของ liabilityData โดยลบค่า value ของรายการที่ตรงกันใน repayDebtData
                    if(liability.value - totalValue >= 0){
                        liability.value -= totalValue; 
                    }
                    
                }
                if(liability.value > 0){
                    // เพิ่มข้อมูลใหม่เข้าไปใน liabilityRemaining
                    liability.value = liability.value + '';
                    dataFinancial.liabilityLongRemaining.push(liability);
                } 
            });


            return dataFinancial
        }
    })
}

export const retrieveDataLiabilityRemaining = async(userUID) => {
    const liabilityRemaining = {
        short: [],
        long: []
    };
    const liabilityData = await retrieveDataLiability(userUID);
    const repayDebtData = await retrieveRepayDebt(userUID);
    //console.log(`Liability.long.length: ${liabilityData.long.length}`)
    //console.log(`Liability.short.length: ${liabilityData.short.length}`)
    //console.log(`RepayDebtData.length: ${repayDebtData.length}`)

    // เช็คว่า transactionId ของ liabilityData ตรงกับรายการใดใน repayDebtData
    liabilityData.short.forEach(liability => {
        const matchingDebts = repayDebtData.filter(debt => debt.transactionId === liability.transactionId);
        //console.log(matchingDebts)
        
        const totalValue = matchingDebts.reduce((accumulator, debt) => accumulator + parseFloat(debt.value), 0);
        //console.log(totalValue)
        if (matchingDebts) {
            // แก้ไขค่า value ของ liabilityData โดยลบค่า value ของรายการที่ตรงกันใน repayDebtData
            if(liability.value - totalValue >= 0){
                liability.value -= totalValue; 
            }
            
        }
        if(liability.value > 0){
            // เพิ่มข้อมูลใหม่เข้าไปใน liabilityRemaining
            liability.value = liability.value + '';
            liabilityRemaining.short.push(liability);
        } 
    });

    liabilityData.long.forEach(liability => {
        const matchingDebts = repayDebtData.filter(debt => debt.transactionId === liability.transactionId);
        //console.log(matchingDebts)
        
        const totalValue = matchingDebts.reduce((accumulator, debt) => accumulator + parseFloat(debt.value), 0);
        //console.log(totalValue)
        if (matchingDebts) {
            // แก้ไขค่า value ของ liabilityData โดยลบค่า value ของรายการที่ตรงกันใน repayDebtData
            if(liability.value - totalValue >= 0){
                liability.value -= totalValue; 
            }
            
        }
        if(liability.value > 0){
            // เพิ่มข้อมูลใหม่เข้าไปใน liabilityRemaining
            liability.value = liability.value + '';
            liabilityRemaining.long.push(liability);
        } 
    });
    //console.log(liabilityRemaining)
    //console.log(`LiabilityRemaining.long.length: ${liabilityRemaining.long.length}`)
    //console.log(`LiabilityRemaining.short.length: ${liabilityRemaining.short.length}`)
    return liabilityRemaining;
};

export const retrieveRepayDebt = (userUID)=>{
    const repayDebt = []

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            
            allData.forEach(element => {
                if(element.category == 'ค่าใช้จ่ายผันแปร(ชำระหนี้)'){
                    repayDebt.push(element)
                }
                if(element.category == 'ค่าใช้จ่ายคงที่(ชำระหนี้)'){
                    repayDebt.push(element)
                }
            });

            return repayDebt
        }
    })
}
//ไม่ได้ใช้ อันนี้
export const retriveCalculateRiability = (userUID) => {
    const calculateRiability = {
        currentDate: "",
        lastedDate: "",
        isFirstTransaction: true 
    };

    return firestore()
        .collection('financials')
        .doc(userUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                calculateRiability.currentDate = data.CurrentDate;
                calculateRiability.lastedDate = data.LastedDate;
                calculateRiability.isFirstTransaction = data.IsFirstTransaction;
                return calculateRiability;
            } else {
                // กรณีไม่พบเอกสารหรือข้อมูล
                console.log("No such document!");
                return null;
            }
        })
        .catch((error) => {
            // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
            console.log("Error getting document:", error);
            return null;
        });
};

export const retrieveInventory = (userUID)=>{
    const inventory = {
        all:[],
        wall:[],
        table:[],
        forUse:[],
        totalPositionWall:0,
        totalPositionTable:0
    };

    
    
    return firestore()
    .collection('pets')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data){
            const allData = data.data().inventory;
            
            if(allData){
                allData.forEach(element => {
                    if(element.itemType == 'wall'){
                        inventory.totalPositionWall+=element.itemLocation
                        inventory.wall.push(element)
                    }
                    if(element.itemType == 'table'){
                        inventory.totalPositionTable+=element.itemLocation
                        inventory.table.push(element)
                    }
                    if(element.itemType == 'forUse'){
                        inventory.forUse.push(element)
                    }
    
                    inventory.all.push(element)
                });
            }
            
            return inventory
        }
    })
}
