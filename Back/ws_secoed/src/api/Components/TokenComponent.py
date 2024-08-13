from ...utils.general.logs import HandleLogs
from ...utils.general.config import Parametros
import pytz
import jwt
from datetime import datetime, timedelta


class TokenComponent:

    @staticmethod
    def Token_Generate(p_user):
        try:
            respuesta = None
            timezone = pytz.timezone('America/Guayaquil')
            payload = {
                'iat': datetime.now(tz=timezone),
                'exp': datetime.now(tz=timezone) + timedelta(minutes=15),
                'username': p_user
            }
            respuesta = jwt.encode(payload, Parametros.secret_jwt, algorithm="HS256")
        except Exception as err:
            HandleLogs.write_error(err)
        finally:
            return respuesta



    @staticmethod
    def Token_Validate(token):
        try:
            respuesta = False

            payload = jwt.decode(token, Parametros.secret_jwt, algorithms=['HS256'])
            print(payload)
            respuesta = True

        except Exception as err:
            HandleLogs.write_error(err)
        finally:
            return respuesta
