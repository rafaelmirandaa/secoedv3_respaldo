import {
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

import './Course.css';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import {fetchCourse} from '/src/store/apps/course/CourseSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const basics = [
  {
    categoria: "Pedagogía",
    fecha_creacion: "Sun, 24 Oct 2021 18:02:37 GMT",
    fecha_inicio: "Fri, 01 Oct 2021 00:00:00 GMT",
    id: 1,
    id_moodle: 31,
    imagen: "images/eva/pedagogia.jpg",
    nombre_corto: "Pedagogía"
  },
  {
    categoria: "Didáctica",
    fecha_creacion: "Sun, 24 Oct 2021 18:02:37 GMT",
    fecha_inicio: "Mon, 11 Oct 2021 00:00:00 GMT",
    id: 2,
    id_moodle: 32,
    imagen: "images/eva/didactica.jpg",
    nombre_corto: "Didáctica"
  }
];
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  
];





const CourseList = () => {

const dispatch = useDispatch();
const course = useSelector((state) => state.course);
useEffect(() => {
  dispatch(fetchCourse());
}, [dispatch]);


const handleDownload = () => {
  // Create a CSV string
  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(
    "date_created,date_deleted,date_modified,moc_course_career_period_id,moc_course_data_end,moc_course_date_start,moc_course_description,moc_course_dimension_id,moc_course_is_closed,moc_course_name,moc_course_origin_categorie_id,moc_course_origin_moodle_id,moc_course_shortname,moc_course_state,moc_course_user_asesor_id,moc_id,user_created,user_deleted,user_modified\n" +
    course.data.map(item => 
      `${item.date_created},${item.date_deleted},${item.date_modified},${item.moc_course_career_period_id},${item.moc_course_data_end},${item.moc_course_date_start},${item.moc_course_description},${item.moc_course_dimension_id},${item.moc_course_is_closed},${item.moc_course_name},${item.moc_course_origin_categorie_id},${item.moc_course_origin_moodle_id},${item.moc_course_shortname},${item.moc_course_state},${item.moc_course_user_asesor_id},${item.moc_id},${item.user_created},${item.user_deleted},${item.user_modified}`
    ).join("\n")
  );

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = csvContent;
  link.download = "course.csv";
  link.target = "_blank";

  link.click();
};

if (!course) {
  return <div>Loading...</div>;
}else{

  return (


    <PageContainer title="Basic Table" description="this is Basic Tables page">
      {/* breadcrumb */}
      <Breadcrumb title="LISTADO DE CURSOS CON SUS ACTIVIDADES Y CALIFICACIONES" subtitle="Docente / LISTADO DE CURSOS CON SUS ACTIVIDADES Y CALIFICACIONES "items={BCrumb} />
      {/* end breadcrumb */}

      <Button
      style={{marginBottom: '10px'}}
      
      variant="contained" color="primary" onClick={handleDownload}>
        Listado de Cursos CSV
      </Button>



      <PageContainer title="Blog" description="this is Blog page">
        <p className="course-message">NO DISPONE DE CURSOS Y ACTIVIDADES</p>
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

export default CourseList;
/*
     <ParentCard>
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
                    <Typography variant="h6">Categoria</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Fecha de Creación</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Fecha de Inicio</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">ID Moodle</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Imagen</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Nombre Corto</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant="h6">{item.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.categoria}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.fecha_creacion}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.fecha_inicio}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.id_moodle}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.imagen}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.nombre_corto}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ParentCard>
*/

