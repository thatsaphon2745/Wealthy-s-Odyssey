import { createSlice } from '@reduxjs/toolkit';

const INIT_VARIABLES = {
    isEdit: false,
    selectedItems:[],
    transactionType: "",
    category: "",
    photoURL: "",
    itemData: {},
    selectedDate: "",
    isUpdate: false,
    status: false,
    guageWealth: 0, 
    guageRiability: 0, 
    totalGuage: 0,
    totalDifferenceDate: "",
    editItemLocation: false,
    isUpdateItemPet: false,
    hasNotification: false,
    cameFromNoti: false,
    cameFrom: "",
    totalDownGradeCardValue: false,
    pressInventory: true,
}

const variableSlice = createSlice({
    name: 'variables',
    initialState: INIT_VARIABLES,
    reducers: {
      
      setEditStatus(state, action) {
        state.isEdit = action.payload;
      },
      setSelectedItems(state, action) {
        state.selectedItems = action.payload;
      },
      setItemTransactionType(state, action) {
        state.transactionType = action.payload;
      },
      setItemCategory(state, action) {
        state.category = action.payload;
      },
      setItemPhotoURL(state, action) {
        state.photoURL = action.payload;
      },
      setItemData(state, action) {
        state.itemData = action.payload;
      },
      setSelectedDate(state, action) {
        state.selectedDate = action.payload;
      },
      setIsUpdate(state, action) {
        state.isUpdate = action.payload;
      },
      setStatus(state, action) {
        state.status = action.payload;
      },
      setGuageValues(state, action) {
        state.guageWealth = action.payload.guageWealth;
        state.guageRiability = action.payload.guageRiability;
      },
      setTotalGuage(state, action) {
        state.totalGuage = action.payload;
      },
      setTotalDifferenceDate(state, action) {
        state.totalDifferenceDate = action.payload;
      },
      setEditItemLocation(state, action) {
        state.editItemLocation = action.payload;
      },
      setIsUpdateItemPet(state, action) {
        state.isUpdateItemPet = action.payload;
      },
      setHasNotification(state, action) {
        state.hasNotification = action.payload;
      },
      setCameFromNoti(state, action) {
        state.cameFromNoti = action.payload;
      },
      setCameFrom(state, action) {
        state.cameFrom = action.payload;
      },
      setTotalDownGradeCardValue(state, action) {
        state.totalDownGradeCardValue = action.payload;
      },
      setPressInventory(state, action) {
        state.pressInventory = action.payload;
      }
    },
});

const { actions, reducer } = variableSlice;
export const { setEditStatus, setSelectedItems, setItemTransactionType, setItemCategory, 
  setItemPhotoURL, setItemData, setSelectedDate, setIsUpdate, setStatus, setGuageValues, 
  setTotalGuage, setTotalDifferenceDate,setEditItemLocation, setIsUpdateItemPet,
  setTotalDownGradeCardValue, setHasNotification, setCameFromNoti, setCameFrom, setPressInventory  } = actions;
export default reducer;
