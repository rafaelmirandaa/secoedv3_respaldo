
from flask import Blueprint, jsonify, request, send_file, make_response
from src.api.Model.Eval_model.Questionaire.QuestionarieModel import QuestionnarieModel
from src.utils.pdf.generate_pdf import generate_pdf
from src.utils.smpt.smpt_goolge import get_email



questionarie = Blueprint('questionarie', __name__)


@questionarie.route('/')

def get_questionnarie():
  try:
        questionarie_list = QuestionnarieModel.get_questionnarie()
        
        #return  docente_list
        return jsonify([quest.to_JSON() for quest in questionarie_list])  

  except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500


@questionarie.route('/sumary', methods=['POST'])
def get_process_executed_resume():
    try:
        data = request.get_json()
        per_process_user_asigment_id = data.get('per_process_user_asigment_id', None)
        limit = data.get('limit', 10)
        offset = data.get('offset', 0)
        order_by = data.get('order_by', 'user_created DESC')
      
        sumary_list = QuestionnarieModel.get_process_executed_resume(
            per_process_user_asigment_id=per_process_user_asigment_id, 
            limit=limit, 
            offset=offset, 
            order_by=order_by
        )
        return jsonify([item.to_JSON() for item in sumary_list]) 
      
      
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500
    
    

@questionarie.route('/add/sumary', methods=['POST'])
def add_sumary():
    try:
        data = request.get_json()
        
        sumaryAdd = QuestionnarieModel.saveSumary(data)
        
        
        return jsonify({
            'message': 'Questionnaire added successfully',
            'data_received': data
        }), 201
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500




@questionarie.route('/add', methods=['POST'])
def add_questionnaire():
    try:
        data = request.get_json()
        
        answerAdd = QuestionnarieModel.save_answer(data)

        return jsonify({
            'message': 'Questionnaire added successfully',
            'data_received': data
        }), 201
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500

@questionarie.route('/enrollment', methods=['POST'])
def add_enrollment():
    try:
        data = request.get_json()
        
        resp = QuestionnarieModel.enrollment(data)

        return jsonify({
            'message': resp,
            'data_received': data
        }), 201
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500
    
    

@questionarie.route('/pdf')
def download_pdf():
    pdf_buffer = generate_pdf()
    pdf_buffer.seek(0)
    
    response = make_response(send_file(pdf_buffer, as_attachment=True, download_name="reporte.pdf", mimetype='application/pdf'))
    response.headers["Content-Disposition"] = "attachment; filename=reporte.pdf"
    return response



@questionarie.route('/smpt', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        
        resp = get_email(data['destinatario'], data['asunto'], data['mensaje'])
        return resp
    
       
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500
    
    
    
    
