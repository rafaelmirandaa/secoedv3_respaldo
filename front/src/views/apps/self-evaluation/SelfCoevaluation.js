import { Card, Typography, Button, Box } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSumary } from '/src/store/apps/evaluations/EvaluationsSlice';
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { postPDF } from '/src/store/apps/evaluations/EvaluationsSlice';

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

const params = {
  per_process_user_asigment_id: 1,
  limit: 10,
  offset: 0,
  order_by: "user_created DESC"
};

const Coevaluation = () => {
  const columns = useMemo(
    () => [
      { accessorKey: 'per_dimension_id', header: 'CICLO', size: 150 },
      { accessorKey: 'per_names', header: 'COEVALUADOR', size: 150 },
      { accessorKey: 'per_average_value_question', header: 'NOTA COEVALUACIÓN', size: 200 },
      { accessorKey: 'per_real_value_question', header: 'NOTA EVALUACIÓN', size: 150 },
      { accessorKey: 'per_max_total_value_question', header: 'NOTA TOTAL', size: 150 },
      {
        id: 'actions',
        header: 'Acciones',
        size: 200,
        Cell: ({ row }) => {
          const data = row.original;  // Get row data
          
          // Handlers for button actions
          const handleViewMore = () => {
            alert(`Ver más detalles de ${data.per_names}`);
          };

          const handleSendEmail = () => {
            alert(`Estudiante ${data.per_names} matriculado  con exito en unos momentos se enviara un correo de confirmacion ` ); 
          };

          const handleDownloadPDF = () => {
            dispatch(postPDF());
            alert(`Estudiante ${data.per_names} matriculado con éxito. En unos momentos se enviará un correo de confirmación.`);
          };

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" color="primary" onClick={handleViewMore}>
                Calificar
              </Button>
              <Button variant="contained" color="secondary" onClick={handleSendEmail}>
                Matriculación
              </Button>
              <Button variant="contained" color="success" onClick={handleDownloadPDF}>
                Descargar PDF
              </Button>
            </Box>
          );
        },
      },
    ],
    [],
  );

  const dispatch = useDispatch();
  const summaryData = useSelector((state) => state.evaluationsReducer.data || []);
  const [isLoading, setIsLoading] = useState(true);

  const table = useMaterialReactTable({
    columns,
    data: summaryData,
    state: { isLoading },
  });

  useEffect(() => {
    setIsLoading(true);  // Set loading to true before starting fetch
    dispatch(postSumary(params)).finally(() => {
      setIsLoading(false);  // Set loading to false after fetch completes
    });
  }, [dispatch]);

  return (
    <Card sx={{ width: '100%' }}>
      <PageContainer title="Blog" description="this is Blog page">
        {/* breadcrumb */}
        <Breadcrumb title="PROCESO DE COEVALUACIÓN " subtitle="Docente/Calificación/Coe-Evaluación " items={BCrumb} />
        {/* end breadcrumb */}
        <Typography
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
          variant="h2" component="h1" gutterBottom>
          PROCESO DE COEVALUACIÓN 
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
};

export default Coevaluation;
