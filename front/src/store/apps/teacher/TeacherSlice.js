import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    data: [],
};

export const TeacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
      getTeacher: (state, action) => {
        state.data = action.payload;
      },
   
    },
  });
  

export const { getTeacher } = TeacherSlice.actions;

export const fetchTeacher = () => async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/teachers/');
      dispatch(getTeacher(response.data));
    } catch (err) {
      throw new Error();
    }
  };



  
  

  
  export default TeacherSlice.reducer;


