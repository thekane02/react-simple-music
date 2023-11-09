const { createSlice } = require("@reduxjs/toolkit");

const globalSlice = createSlice({
  name: "global",
  initialState: {
    modal: {
      isShow: false,
      content: null,
    },
    tempBoolean: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.modal.isShow = true;
      state.modal.content = action.payload;
    },
    closeModal: (state) => {
      state.modal.isShow = false;
      state.modal.content = null;
    },
    rerender: (state) => {
      state.tempBoolean = !state.tempBoolean;
    },
  },
});

export const { openModal, closeModal, rerender } = globalSlice.actions;
export default globalSlice.reducer;
