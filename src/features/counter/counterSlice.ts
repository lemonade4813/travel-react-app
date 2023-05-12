import { createSlice } from '@reduxjs/toolkit';

type stateType = {
  flightItem : any[],
  hotelItem : any[]
}

const initialState : stateType = {
  flightItem : [],
  hotelItem : []
}

export const counterSlice = createSlice({
  name : 'counter',
  initialState,
  reducers : {
    addFlight : (state, action) => {
      state.flightItem = [...state.flightItem, action.payload];
    },
    addHotel : (state, action) =>{
      state.hotelItem= [...state.hotelItem, action.payload];
    }
  }
})


export const {addFlight, addHotel} = counterSlice.actions;


export default counterSlice.reducer;
