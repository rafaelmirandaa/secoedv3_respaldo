import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    data: [],
};

export const CourseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
      getCourse: (state, action) => {
        state.data = action.payload;
      },
   
    },
  });
  

export const { getCourse } = CourseSlice.actions;

export const fetchCourse = () => async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/courses/');
      dispatch(getCourse(response.data));
    } catch (err) {
      throw new Error();
    }
  };



  
  

  
  export default CourseSlice.reducer;


