import {  Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import { fetchQuestions } from '/src/store/apps/questions/QuestionsSlice';
import { Box } from "@mui/system";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import SalesOverview from "../../../components/dashboards/ecommerce/SalesOverview";


const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    
  ];

const Report = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const [isActivate , setIsActivate] = useState(false);

    
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

  





    const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };

if(isActivate ){
  return (
    <Card sx={{   width: '100%'}}>

  {/* breadcrumb */}
  <Breadcrumb title="REPORTE DE PROCESO" subtitle="Docente/Preguntas/Autoevaluación " items={BCrumb} />
      {/* end breadcrumb */}
    <Card title="Blog" description="this is Blog page">
    <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold'}}
        variant="h2" component="h1" gutterBottom>
REPORTE DE PROCESO
            </Typography>

  
    </Card>

</Card>
    )
}else{

    return (
        <Card sx={{   width: '100%'}}>

        <PageContainer title="Blog" description="this is Blog page">

  {/* breadcrumb */}
  <Breadcrumb title="REPORTE DE PROCESO " subtitle="Docente/Calificación/Eva-Reporte " items={BCrumb} />
      {/* end breadcrumb */}

        <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold'}}
        variant="h2" component="h1" gutterBottom>
    REPORTE DE PROCESO
            </Typography>

            <Grid container alignItems="center" justifyContent="space-between " sx={{ border: '1px solid  78DADB' }}>

<Grid item xs={6}>

<SalesOverview >

</SalesOverview>

    </Grid>


    
<Grid item xs={6}>

<Box textAlign="center" mb={3}>
          <img src='/src/assets/image.png' alt="cart" width="200px" />
          <Typography variant="h5" mb={2}>
             Semáforo
          </Typography>
        
        </Box>
    </Grid>
    </Grid>
   
            
      
        

      </PageContainer>

    </Card>
 
    );
}

    

};

export default Report;