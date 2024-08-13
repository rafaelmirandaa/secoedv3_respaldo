from ...utils.general.logs import HandleLogs
from ..Model.Request.LoginRequest import LoginRequest
from flask import request
from flask_restful import Resource
from ...utils.general.response import response_error, response_success, response_not_found
from ..Components.LoginComponent import LoginComponent
from ..Components.TokenComponent import TokenComponent


class LoginService(Resource):

    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ingreso a Validar el Login")
            # Obtengo el Request
            rq_json = request.get_json()
            #Validar ese Request con mi modelo
            new_request = LoginRequest()
            error = new_request.validate(rq_json)
            if error:
                HandleLogs.write_error("Error al Validar el Request -> " + str(error))
                return response_error("Error al Validar el Request -> " + str(error))
            #LLamar al metodo del componente

            resultado = LoginComponent.Login(rq_json['login_user'], rq_json['login_password'])
            if resultado:
                #Generamos el Token de Respuesta
                token = TokenComponent.Token_Generate(rq_json['login_user'])
                if token is None:
                    return response_error("Error al Generar Token")
                else:
                    #Validar el Token
                    print(TokenComponent.Token_Validate(token))
                    return response_success(token)
            else:
                return response_not_found()
        except Exception as err:
            HandleLogs.write_error(err)

