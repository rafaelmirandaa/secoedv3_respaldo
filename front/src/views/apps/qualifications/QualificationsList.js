import {  Card, Typography} from "@mui/material";
import { useEffect, useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSumary } from '/src/store/apps/evaluations/EvaluationsSlice';
import { Box } from "@mui/system";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    
  ];


  
  const params={
    per_process_user_asigment_id:1,
    limit:10,
    offset:0,
    order_by:"user_created DESC"
}



const QualificationList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'per_dimension_id', 
        header: 'CICLO',
        size: 150,
      },
      {
        accessorKey: 'per_names',
        header: 'COEVALUADOR',
        size: 150,
      },
      {
        accessorKey: 'per_average_value_question', 
        header: 'NOTA COEVALUACIÓN',
        size: 200,
      },
      {
        accessorKey: 'per_real_value_question',
        header: 'NOTA EVALUACIÓN',
        size: 150,
      },
      {
        accessorKey: 'per_max_total_value_question',
        header: 'NOTA TOTAL',
        size: 150,
      },
    ],
    [],
  );

  
  
    const dispatch = useDispatch();
    const summaryData = useSelector((state) => state.evaluationsReducer.data
    || []);
    const [isLoading, setIsLoading] = useState(true);

  

    
    const table = useMaterialReactTable({
      columns,
      data:summaryData ,
      state: {
        isLoading,
      },
    });
   

    
    useEffect(() => {
      dispatch(postSumary(params));
    }, [dispatch]);

 
    useEffect(() => {
      setIsLoading(false)

    }, [summaryData]);

    
   
 


    return (
        <Card sx={{   width: '100%'}}>

        <PageContainer title="Blog" description="this is Blog page">

  {/* breadcrumb */}
  <Breadcrumb title="PROCESO DE COEVALUACIÓN - AUTOEVALUACIÓN" subtitle="Docente/Calificación/Coe-Evaluación " items={BCrumb} />
      {/* end breadcrumb */}

        <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold'}}
        variant="h2" component="h1" gutterBottom>
    PROCESO DE COEVALUACIÓN - AUTOEVALUACIÓN
            </Typography>

        <Box sx={{ p: 4 }}>
          

          
  

      
       
 
      <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </div>
        

        </Box>
      </PageContainer>

    </Card>
 
    );
}

    



export default QualificationList;
