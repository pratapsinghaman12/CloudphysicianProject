// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   text: '',
//   submittedText: '',
// };

// const textSlice = createSlice({
//   name: 'textEditor',
//   initialState,
//   reducers: {
//     updateText(state, action) {
//       state.text = action.payload;
//     },
//     submitText(state) {
//       state.submittedText = state.text;
//     },
//   },
// });

// export const {updateText, submitText} = textSlice.actions;
// export default textSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  editorContent: '',
  formatting: {
    isBold: false,
    isItalic: false,
    isUnderline: false,
  },
  submittedText: '',
  submittedStyle: {}, // Style applied to the submitted text
};

const textSlice = createSlice({
  name: 'textEditor',
  initialState,
  reducers: {
    updateContent: (state, action) => {
      state.editorContent = action.payload;
    },
    toggleBold: state => {
      state.formatting.isBold = !state.formatting.isBold;
    },
    toggleItalic: state => {
      state.formatting.isItalic = !state.formatting.isItalic;
    },
    toggleUnderline: state => {
      state.formatting.isUnderline = !state.formatting.isUnderline;
    },
    submitText: state => {
      state.submittedText = state.editorContent;
      state.submittedStyle = {
        fontWeight: state.formatting.isBold ? 'bold' : 'normal',
        fontStyle: state.formatting.isItalic ? 'italic' : 'normal',
        textDecorationLine: state.formatting.isUnderline ? 'underline' : 'none',
      };
    },
    resetEditor: state => {
      state.editorContent = '';
      state.formatting = {isBold: false, isItalic: false, isUnderline: false};
    },
  },
});

export const {
  updateContent,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  submitText,
  resetEditor,
} = textSlice.actions;

export default textSlice.reducer;