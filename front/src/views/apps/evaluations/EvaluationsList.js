import{
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Avatar,
    AvatarGroup,
    Chip,
    Paper,
    TableContainer,
    Stack,
    Grid,
} from '@mui/material';

import './Evaluations.css';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import {fetchEvaluations} from '/src/store/apps/evaluations/EvaluationsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
  

  
const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
      ];
  
  
const EvaluationsList = () => {
  
const dispatch = useDispatch();
const evaluations = useSelector((state) => state.evaluations);
  
useEffect(() => {
    dispatch(fetchEvaluations());
}, [dispatch]);
  
  
  console.log(evaluations)
  
  if (evaluations) {
    return <div>Loading...</div>;
  }else{

    return(
      <PageContainer title="Basic Table" description="this is Basic Tables page">
      {/* breadcrumb */}
      <Breadcrumb title="LISTADO DE REPORTES DE PROCESO" subtitle="Calificaciones / REPORTE DE PROCESOS "items={BCrumb} />
      {/* end breadcrumb */}

      <PageContainer title="Blog" description="this is Blog page">
        <p className="evaluations-message">NO DISPONE DE REPORTES DE PROCESO</p>
      </PageContainer>
            {/* pagination */}
            <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
        <Typography variant="body2">Page 1 of 1</Typography>
      </Stack>
      {/* end pagination */}
    </PageContainer>
    );

}
};
export default EvaluationsList;