import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableContainer,
  Stack,
} from '@mui/material';


import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import {fetchTeacher} from '/src/store/apps/teacher/TeacherSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const basics = [
  {
    apellidos: "TORRES MARTINEZ",
    direccion: "Urdesa",
    email: "dennisse_1502@hotmail.com",
    id: 146,
    identificacion: "0930881909",
    nombres: "DENNISSE EUGENIA",
    telefono: "0000000000"
  },
  {
    apellidos: "GUAMAN TUMBACO",
    direccion: "Urdesa Central",
    email: "ana.guamant@yahoo.com",
    id: 1,
    identificacion: "0923639744",
    nombres: "ANA LOURDES",
    telefono: "0987323544"
  }
];
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  

];






const handleDownload = () => {
  // Create a CSV string
  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent("apellidos,direccion,email,id,identificacion,nombres,telefono\n" +
    basics.map(item => `${item.apellidos},${item.direccion},${item.email},${item.id},${item.identificacion},${item.nombres},${item.telefono}`).join("\n"));

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = csvContent;
  link.download = "teachers.csv";
  link.target = "_blank";

  link.click();
};


const TeacherList = () => {

const dispatch = useDispatch();
const teacher = useSelector((state) => state.teacher);

useEffect(() => {
  dispatch(fetchTeacher());
}, [dispatch]);


console.log(teacher.data)

if (!teacher) {
  return <div>Loading...</div>;
}else{

  return (


    
    <PageContainer title="Basic Table" description="this is Basic Table page">
      {/* breadcrumb */}
      <Breadcrumb title="LISTADO DE DOCENTES" subtitle="Docente / LISTADO DE DOCENTES " items={BCrumb} />
      {/* end breadcrumb */}
      <Button
      style={{marginBottom: '10px'}}
      
      variant="contained" color="primary" onClick={handleDownload}>
        Lista de Docentes
      </Button>
      
      <ParentCard /*</PageContainer>title="Basic Table"*/>
        <Paper variant="outlined">
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Nombre</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Apellido</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Identificación</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Dirección</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Teléfono</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacher.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant="h6">{item.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.nombres}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.apellidos}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.identificacion}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.direccion}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.telefono}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ParentCard>
      {/* pagination */}
      <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
        <Typography variant="body2">Page 1 of 1</Typography>
      </Stack>
      {/* end pagination */}
      
    </PageContainer>
  );

}


};

export default TeacherList;
