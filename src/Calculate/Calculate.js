//ความมั่งคั่งสุทธิ (สินทรัพย์รวม - หนี้สินรวม)
export const getNetWealth = (assetValues,liabilityValues)=>{
    let netWealthValue = assetValues - liabilityValues;
    return netWealthValue;
}
//กระแสเงินสดสุทธิ (รายได้รวม - ค่าใช้จ่ายรวม)
export const getNetCashFlow = (incomeValuesAll,expensesValuesAll)=>{
    let netCashFlowValue = incomeValuesAll - expensesValuesAll;
    return netCashFlowValue;
}
// retrive รายได้จากการทำงาน //ทำแล้ว
//อัตราส่วนความอยู่รอด (รายได้จากการทำงาน+รายได้จากสินทรัพย์)/ค่าใช้จ่ายรวม
export const getSurvivalRatio = (incomeWorkValue,incomeAssetValue,expensesValuesAll,incomeInvestAsset)=>{
    if(expensesValuesAll > 0){
        let survivalRatioValue = ( (incomeWorkValue+incomeAssetValue+incomeInvestAsset)/expensesValuesAll ).toFixed(2);
        return survivalRatioValue;
    }else{
        return "good";
    }
    
    
}
//อัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้น (สินทรัพย์สภาพคล่อง/หนี้สินระยะสั้น)
export const getRatioMeasureShortLiability = (assetLiquidValue,liabilityShortValues)=>{
    if(liabilityShortValues > 0){
        let ratioMeasureShortLiabilityValue = ( assetLiquidValue/liabilityShortValues ).toFixed(2);
        return ratioMeasureShortLiabilityValue;
    }else{
        return 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น'
    }
    
}
//อัตราส่วนสภาพคล่องพื้นฐาน (สินทรัพย์สภาพคล่อง/ค่าใช้จ่ายรวม)
export const getBasicLiquidityRatio = (assetLiquidValue,expensesValuesAll)=>{
    if(expensesValuesAll > 0){
        let basicLiquidityRatioValue = (assetLiquidValue/expensesValuesAll).toFixed(2);
        return basicLiquidityRatioValue;
    }else{
        return 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย'
    }
    
}
//อัตราส่วนหนี้สินต่อสินทรัพย์ (หนี้สินรวม/สินทรัพย์รวม)
export const getLiabilityToAssetRatio = (liabilityValues,assetValues)=>{
    if(assetValues > 0){
        let liabilityToAssetRatioValue = (liabilityValues/assetValues).toFixed(2);
        return liabilityToAssetRatioValue;
    }else{
        return 'bad';
    }
    
}
//,liabilityAll
//ยังไม่ได้ทำ retrive การชำระหนี้สิน (อยู่ในค่าใช้จ่าย) //Hard code ก่อน ยังทำไม่ได้
//อัตราส่วนการชำระคืนหนี้สินจากรายได้ (การชำระหนี้สิน/รายได้รวม)
export const getDebtRepaymentRatioFromIncome = (debtSettlementValue,incomeValuesAll,liabilityAll)=>{
    if(incomeValuesAll > 0 && liabilityAll > 0){
        let debtRepaymentRatioFromIncomeValue = (debtSettlementValue/incomeValuesAll).toFixed(2);
        return debtRepaymentRatioFromIncomeValue;
    }else if(incomeValuesAll > 0 && liabilityAll == 0){
        return 'ไม่สามารถคำนวณได้เนื่องจากยังไม่มีหนี้สิน';
    }else if(incomeValuesAll == 0 && liabilityAll == 0){
        return 'ไม่สามารถคำนวณได้เนื่องจากยังไม่มีหนี้สิน';
    }
    else{
        return 'bad';
    }
    
}
//ยังไม่ได้ทำ retrive การออม (อยู่ในค่าใช้จ่าย) //Hard code ก่อน ยังทำไม่ได้
//อัตราส่วนการออม (เงินออม/รายได้รวม)
export const getSavingsRatio = (savingsValue,incomeValuesAll)=>{
    if(incomeValuesAll > 0){
        let savingsRatioValue = (savingsValue/incomeValuesAll).toFixed(2) * 100;
        return savingsRatioValue;
    }else{
        return 0;
    }
}
//อัตราส่วนสินทรัพย์ลงทุน (สินทรัพย์ลงทุน / สินทรัพย์รวม)
export const getInvestmentAssetRatio = (assetInvestValue,assetValues)=>{
    if(assetValues > 0){
        let investmentAssetRatioValue = (assetInvestValue/assetValues).toFixed(2);
        return investmentAssetRatioValue;
    }else{
        return 0;
    }
    
}
//ยังไม่ได้ทำ retrive รายได้จากสินทรัพย์ (อยู่ในรายได้ subcategory รายได้จากสินทรัพย์)
//อัตราส่วนการสร้างรายได้จากสินทรัพย์ลงทุน (รายได้จากสินทรัพย์ลงทุน/ รายรับรวม)
export const getIncomeFromInvestmentAssetRatio =(incomeAssetValue,incomeValuesAll)=>{
    if(incomeValuesAll > 0){
        let incomeFromInvestmentAssetRatioValue = (incomeAssetValue/incomeValuesAll).toFixed(2);
        return incomeFromInvestmentAssetRatioValue;
    }else{
        return 0;
    }
    
}
//ยังไม่ได้ทำ retrive รายได้จากสินทรัพย์ (อยู่ในรายได้ subcategory รายได้จากสินทรัพย์)
//อัตราส่วนอิสรภาพทางการเงิน (รายได้จากสินทรัพย์ลงทุน/รายจ่ายรวม)
export const getFinancialFreedomRatio =(incomeAssetValue,expensesValuesAll)=>{
    if(expensesValuesAll > 0){
        let financialFreedomRatioValue = (incomeAssetValue/expensesValuesAll).toFixed(2);
        return financialFreedomRatioValue;
    }else{
        return 'good';
    }
    
}
