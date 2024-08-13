from src.utils.database.connection_db import conn_db
from src.api.Model.Docente.Docente import Docente

class DocenteModel:

    @classmethod
    def get_docentes(self):
        try:
            connection=conn_db()
            docente=[]

            with connection.cursor() as cursor:
                cursor.execute(' SELECT id, email,nombres,apellidos, identificacion  ,direccion,telefono  FROM conf_user where rol_moodle_id = 4')
                resp = cursor.fetchall()
                
                #return resp
                
                for row in resp:
                
                    docentes = Docente(row['id'],row['email'],row['nombres'],row['apellidos'],row['identificacion'],row['direccion'],row['telefono'])
                    docente.append(docentes)
                

            connection.close()

 
            return docente
        
        except Exception as ex:
            print(ex)
            raise Exception(ex)


   
