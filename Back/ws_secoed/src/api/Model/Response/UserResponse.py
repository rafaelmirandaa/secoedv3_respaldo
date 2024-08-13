
class UserResponse:

    def __init__(self, id, user_login, user_password, user_names, user_lastname, user_state):
        self.id = id
        self.user_login = user_login
        self.user_password = user_password
        self.user_names = user_names
        self.user_lastname = user_lastname
        self.user_state = user_state

    def to_json(self):
        return {
            'Credentials': {
                'id': self.id,
                'login': self.user_login,
                'password': self.user_password
            },
            'GeneralData': {
                'names': self.user_names,
                'lastname': self.user_lastname
            },
            'state': self.user_state
        }


