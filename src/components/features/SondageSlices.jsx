import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lienSondagesStockes: [],
  sondageId: [],
};

const sondageSlice = createSlice({
  name: "sondage",
  initialState,
  reducers: {
    setLienSondageStockes: (state, action) => {
      const existingLink = state.lienSondagesStockes.find(
        (link) => link.sondageId === action.payload.sondageId
      );

      if (existingLink) {
        existingLink.lien = action.payload.lien;
      } else {
        state.lienSondagesStockes.push(action.payload);
      }
    },
    setSondageId: (state, action) => {
      state.sondageId = [...state.sondageId, ...action.payload];
    },    
    resetSondageState: (state) => {
      state.lienSondagesStockes = initialState.lienSondagesStockes;
      state.sondageId = initialState.sondageId;
    },
  },
});

export const {
  setLienSondageStockes,
  setSondageId,
  resetSondageState,
} = sondageSlice.actions;

export const selectLienSondageStockes = (state) =>
  state.sondage.lienSondagesStockes;
export const selectSondageId = (state) => state.sondage.sondageId;

export default sondageSlice.reducer;
