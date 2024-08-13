from ...utils.general.logs import HandleLogs
from ...utils.database.connection_db import DataBaseHandle

class LoginComponent:

    @staticmethod
    def Login(user, clave):
        try:
            respuesta = False
            sql = "SELECT count(*) as valor FROM dawa.tb_user WHERE user_login = %s AND user_password = %s"
            record = (user, clave)

            resultado = DataBaseHandle.getRecords(sql, 1, record)

            if resultado is None:
                HandleLogs.write_error("Error al Buscar login de usuario")
            else:
                if resultado['valor'] > 0:
                    respuesta = True
                    HandleLogs.write_log("Login Exitoso para usuario: " + user)
                else:
                    HandleLogs.write_log("Login No existoso para usuario: " + user)

        except Exception as err:
            HandleLogs.write_error(err)
        finally:
            return respuesta


