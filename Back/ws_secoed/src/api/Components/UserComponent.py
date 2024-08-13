from ...utils.general.logs import HandleLogs
from ...utils.database.connection_db import DataBaseHandle
from ..Model.Response.UserResponse import UserResponse

class UserComponent:

    @staticmethod
    def ListAllUsers():
        try:
            respuesta = False
            sql = "SELECT id, user_login, user_password, user_names, user_lastname, user_state FROM dawa.tb_user"

            resultado = DataBaseHandle.getRecords(sql, 0)

            if resultado is None:
                HandleLogs.write_error("Error al Busar Datos de Usuarios")
            else:
                #Formatear la respuesta
                array_response = []
                for registro in resultado:
                    values = registro.values()
                    dato = UserResponse(*values).to_json()
                    array_response.append(dato)

                respuesta = array_response
        except Exception as err:
            HandleLogs.write_error(err)
        finally:
            return respuesta


