from flask import Blueprint, jsonify
from src.api.Model.Docente.DocenteModel import DocenteModel

docente = Blueprint('docente', __name__)

@docente.route('/')
def get_docentes():
    #return jsonify({'message': 'Docente'})

    try:
        docente_list = DocenteModel.get_docentes()
          
        return jsonify([docente.to_JSON() for docente in docente_list])  
     
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500
