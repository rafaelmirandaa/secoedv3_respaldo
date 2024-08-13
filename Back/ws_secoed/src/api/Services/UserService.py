from ...utils.general.logs import HandleLogs
from flask_restful import Resource
from ...utils.general.response import response_success, response_not_found, response_error, response_unauthorize
from ..Components.UserComponent import UserComponent
from ..Components.TokenComponent import TokenComponent
from flask import request

class UserService(Resource):

    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Listado de Usuarios")
            #Obtengo el token
            token = request.headers['tokenapp']
            if token is None:
                return response_error("Error: No se ha podido Obtener el Token")

            #Validar el Token
            token_valido = TokenComponent.Token_Validate(token)
            if not token_valido:
                return response_unauthorize()

            #LLamar al metodo del componente
            resultado = UserComponent.ListAllUsers()
            if resultado:
                return response_success(resultado)
            else:
                return response_not_found()
        except Exception as err:
            HandleLogs.write_error(err)

