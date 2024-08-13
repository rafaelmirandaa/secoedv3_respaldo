import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    data:   [],
};

export const QuestionsSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
      getQuestions: (state, action) => {
        state.data = action.payload;
      },
   
    },
  });
  

export const { getQuestions } = QuestionsSlice.actions;

export const fetchQuestions = () => async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/questionarie/');
      dispatch(getQuestions(response.data));
    } catch (err) {
      throw new Error();
    }
  };

  export default QuestionsSlice.reducer;  


  