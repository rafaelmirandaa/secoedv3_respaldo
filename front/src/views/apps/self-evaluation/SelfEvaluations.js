import { Alert, Button, Card, FormControlLabel, Grid, Radio, RadioGroup, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from '/src/store/apps/questions/QuestionsSlice';
import { postEvaluation } from '/src/store/apps/evaluations/EvaluationsSlice'; 
import { postAnswer } from '/src/store/apps/evaluations/EvaluationsSlice';

import { Box } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    
  ];
  const MySwal = withReactContent(Swal);
/*
  const showAlert = () => {
    MySwal.fire({
      title: <p>Beveiligingswaarschuwing</p>,
      footer: 'Zorg ervoor dat je actie onderneemt',
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
    });
  };
*/



 const  replies= [
    { id:1,value: '1' },
    {id:2, value: '2' },
    { id:3, value: '3' },
    { id:4, value: '4' }
]
const SelfEvaluations = () => {
    const dispatch = useDispatch();
    const [answers, setAnswers] = useState({});
    const [isActivate , setIsActivate] = useState(false);

    const questions = useSelector((state) => state.questionReducer.data);
    
    const handleConfirm = () => {

        const data = {
            process_user_assignment_id: 1, 
            dimension_id: 1, 
            number_total_question: Object.keys(answers).length,
            max_total_value_question: Math.max(...Object.values(answers).map(answer => parseInt(answer.replace('option', '')))),
            real_value_question: Object.values(answers).reduce((total, answer) => total + parseInt(answer.replace('option', '')), 0),
            average_value_question: Object.values(answers).reduce((total, answer) => total + parseInt(answer.replace('option', '')), 0) / Object.keys(answers).length,
            traffic_lights_id: 1, 
            state: true,
            user_created: "admin", 
            date_created: new Date().toISOString().split('T')[0]
        };


        MySwal.fire({
          title: '¿Estás seguro?',
          text: 'Estás a punto de enviar tu evaluación, una vez enviada no podrás modificarla',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, Enviar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            MySwal.fire(
              'Guardado ',
              'Tus respuestas han sido enviadas con éxito',
              'success'
            );
            dispatch(postEvaluation(data));
            dispatch(postAnswer(answers));

            setIsActivate(true);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            MySwal.fire(
              'Cancelado',
              '',
              'error'
            );
          }
        });
      };



    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

/*
    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answer,
        }));
    };
*/
const handleAnswerChange = (epc_id, answer) => {
    setAnswers(prevAnswers => ({
        ...prevAnswers,
        [epc_id]: answer
    }));
};

    
    const handleSubmit = (e) => {
        handleConfirm();
        handleConfirm(() => {
          
            
            dispatch(postEvaluation(answers));
        });
        e.preventDefault();
        console.log(e);
        console.log(answers);
        console.log("Enviando respuestas...");
       
    };


if(isActivate ){
  return (
    <Card sx={{   width: '100%'}}>

  {/* breadcrumb */}
  <Breadcrumb title="Autoevaluación" subtitle="Docente/Preguntas/Autoevaluación " items={BCrumb} />
      {/* end breadcrumb */}
    <PageContainer title="Blog" description="this is Blog page">
    <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold'}}
        variant="h2" component="h1" gutterBottom>
        AUTO EVALUACIÓN DOCENTE
            </Typography>

    <Box sx={{ p: 4 }}>
     <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        <Typography
        sx={{ textAlign: 'center'}}
        variant="h4" component="h1" gutterBottom>
        El proceso de evaluación ha sido completado con éxito 
        </Typography>
  </Alert>
    </Box>
    </PageContainer>

</Card>
    )
}else{

    return (
        <Card sx={{   width: '100%'}}>

        <PageContainer title="Blog" description="this is Blog page">

  {/* breadcrumb */}
  <Breadcrumb title="Autoevaluación" subtitle="Docente/Preguntas/Autoevaluación " items={BCrumb} />
      {/* end breadcrumb */}

        <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold'}}
        variant="h2" component="h1" gutterBottom>
        AUTO EVALUACIÓN DOCENTE
            </Typography>

        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Bienvenido
            </Typography>

            <Typography variant="h4" component="h1" gutterBottom>
                En este proceso de fortalecimiento de la profesión docente es posible con su ayuda. le 
                invitamos a completar el test de manera objetiva.
            </Typography>
            <br />


            <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold'}}
        variant="h2" component="h1" gutterBottom>
           Tabla de valoración
            </Typography>

            
            <Typography variant="h5" component="h2" gutterBottom>
                Responde las siguientes preguntas
            </Typography>
            <br />

        
           
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">


            <TableContainer sx={{ width: '100%', margin: '20px auto' ,fontSize:'25px',backgroundColor: '#D6F3E9', fontWeight:'bold'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Recuerde 1</TableCell>
            <TableCell align="center">Recuerde y Comprenda 2</TableCell>
            <TableCell align="center">Recuerde, comprenda y aplique 3</TableCell>
            <TableCell align="center">Aplique e investigue 4</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>

            <Grid container alignItems="center">




            <Grid item xs={8} sx={{backgroundColor: '#DDE2FA', textAlign:'center', fontSize:'25px', padding:'2px' }}>

<Typography variant="h5" component="h2" gutterBottom>
TIPS
            </Typography>
            </Grid>
            <Grid item xs={4} sx={{backgroundColor: '#DCEDFC', textAlign:'center', fontSize:'25px', padding:'2px'   }}>
            <Typography variant="h5" component="h2" gutterBottom>
OPCIONES
            </Typography>
            </Grid>
            </Grid>
<br></br>
            {questions.map((question,index) => (
                <Box
                
                key={question.epc_id} sx={{ mb: 2}}>

                 

                    <Grid container alignItems="center">
                        <Grid item xs={7}>
                           
                            <Typography variant="h6" component="h2">
                                {`${index +1}) ${question.qst_description}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4}>
                            <RadioGroup
                                row
                                aria-label={`Pregunta ${question.epc_id}`}
                                name={`question-${question.epc_id}`}
                                value={answers[question.epc_id] || ''}
                                onChange={(e) => {
                                    const answerValue = e.target.value;
                                    handleAnswerChange(question.epc_id, answerValue);
                                }}
                            >
                                {replies.map((resp) => (
                                    <FormControlLabel
                                        key={resp.value}
                                        value={resp.value}
                                        control={<Radio />}
                                        label={resp.value} // Etiqueta para el radio button
                                    />
                                ))}
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <Grid container alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                    Enviar preguntas
                </Button>
            </Grid>
        </Box>
        </Box>
      </PageContainer>

    </Card>
 
    );
}

    

};

export default SelfEvaluations;
