import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    data: [],
};

export const EvaluationsSlice = createSlice({
    name: 'evaluations',
    initialState,
    reducers: {
      getEvaluations: (state, action) => {
        state.data = action.payload;
      },
      addEvaluation: (state, action) => {
        state.data.push(action.payload);
        state.error = null;
      },
      addAnswer: (state, action) => {
        state.data.push(action.payload);
        state.error = null;
      },
      postSumary: (state, action) => {
        state.data.push(action.payload);
        state.error = null;
      },
    

      setError: (state, action) => {
        state.error = action.payload;
      },
   
    },
  });
  

export const { getEvaluations } = EvaluationsSlice.actions;

export const fetchEvaluations = () => async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/questionarie/');
      dispatch(getEvaluations(response.data));
    } catch (err) {
      throw new Error();
    }
  };

//add sumary
export const postEvaluation = (data) => async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/questionarie/add/sumary', data);
      dispatch(getEvaluations(response.data));
    } catch (err) {
      throw new Error();
    }
  };


//add answer
export const postAnswer = (data) => async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/questionarie/add', data);
      dispatch(getEvaluations(response.data));
    } catch (err) {
      throw new Error();
    }
  };

  //get sumary

  export const postSumary = (data) => async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/questionarie/sumary', data);
      dispatch(getEvaluations(response.data));
    } catch (err) {
      throw new Error();
    }
  };


  export const postPDF = () => async () => {
    try {
      const response = await axios.get('/api/v1/questionarie/pdf', {
        responseType: 'blob', // importante para manejar archivos binarios
      });
  
      // Crear un blob para el PDF y descargarlo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte.pdf'); // nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
  
    } catch (err) {
      console.error('Error al descargar el PDF:', err);
      throw new Error('No se pudo descargar el PDF');
    }
  };
  
  export const postMoodle = (data) => async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/questionarie/sumary', data);
      dispatch(getEvaluations(response.data));
    } catch (err) {
      throw new Error();
    }
  };

  
  export default EvaluationsSlice.reducer;
