from ..Services.LoginService import LoginService
from ..Services.UserService import UserService

def load_routes(api):
    #metodo para el login
    api.add_resource(LoginService, '/security/login')
    #Metodos para clase Usuario
    api.add_resource(UserService, '/user/list')

    

