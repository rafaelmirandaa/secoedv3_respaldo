class Docente():
    def __init__(self, id, email=None, nombres=None, apellidos=None, identificacion=None, direccion=None, telefono=None):
        self.id = id
        self.email = email
        self.nombres = nombres
        self.apellidos = apellidos
        self.identificacion = identificacion
        self.direccion = direccion
        self.telefono = telefono

   

    def to_JSON(self):
        return {
            'id': self.id,
            'email': self.email,
            'nombres': self.nombres,
            'apellidos': self.apellidos,
            'identificacion': self.identificacion,
            'direccion': self.direccion,
            'telefono': self.telefono
        }
