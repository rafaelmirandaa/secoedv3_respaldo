from src.utils.smpt.smpt_goolge import get_email
from src.utils.database.connection_db import conn_db
from src.api.Model.Eval_model.Questionaire.Questionarie import Questionarie
from src.api.Model.Eval_model.Questionaire.Sumary import Sumary
import requests
import json



class QuestionnarieModel:

    @classmethod
    def get_questionnarie(cls):
        try:
            connection = conn_db()
            questionarie = []

            with connection.cursor() as cursor:
                cursor.execute('SELECT epq.epc_id, epq.epc_process_career_period_id, epq.epc_question_id, epq.epc_state, eq.qst_id, eq.qst_description, eq.qst_tooltip_text, eq.qst_dimension_id, eq.qst_answer_type_id, eq.qst_state FROM eval_process_questions epq JOIN eval_questions eq ON epq.epc_question_id = eq.qst_id WHERE epq.epc_process_career_period_id = 1;')
                resp = cursor.fetchall()

                for row in resp:
                    dataQ = Questionarie(row['epc_id'], row['epc_process_career_period_id'], row['epc_question_id'], row['epc_state'], row['qst_id'], row['qst_description'], row['qst_tooltip_text'], row['qst_dimension_id'], row['qst_answer_type_id'], row['qst_state'])
                    questionarie.append(dataQ)

            print(questionarie)
            connection.close()
            return questionarie

        except Exception as ex:
            print(ex)
            raise Exception(ex)

    
    def get_process_executed_resume( per_process_user_asigment_id=None, limit=10, offset=0, order_by='user_created DESC'):
        try:
            connection = conn_db()
            questionarie = []

            with connection.cursor() as cursor:
                # Construcción de la consulta SQL con parámetros dinámicos
                query = f'''
                SELECT eper.*, ap.per_names
                FROM eval_process_executed_resume eper
                JOIN admin_person ap ON eper.per_process_user_asigment_id = ap.per_id 

                WHERE eper.per_process_user_asigment_id = COALESCE(%s, eper.per_process_user_asigment_id)
                ORDER BY eper.{order_by}
                LIMIT %s OFFSET %s;
                '''
                cursor.execute(query, (per_process_user_asigment_id, limit, offset))
                resp = cursor.fetchall()

                for row in resp:
                    dataQ = Sumary(
                        row['per_id'], 
                        row['per_process_user_asigment_id'], 
                        row['per_dimension_id'], 
                        row['per_number_total_question'], 
                        row['per_max_total_value_question'], 
                        row['per_real_value_question'], 
                        row['per_average_value_question'], 
                        row['per_traffic_lights_id'], 
                        row['per_state'], 
                        row['user_created'], 
                        row['date_created'], 
                        row['user_modified'], 
                        row['date_modified'], 
                        row['user_deleted'], 
                        row['date_deleted'],
                        row['per_names']
                    )
                    questionarie.append(dataQ)

            print(questionarie)
            connection.close()
            return questionarie

        except Exception as ex:
            print(ex)
            raise Exception(ex)


    
    
    def save_answer( response):
        
       connection = conn_db()
       try:
          with connection.cursor() as cursor: 
            for key, value in response.items():
                print(f'Clave: {key}, Valor: {value}')
                query = """
                INSERT INTO eval_process_executed_detail
                (ped_id, ped_process_user_asigment_id, ped_process_question_id, ped_answer_scale_id, ped_state, user_created, date_created)
                VALUES(nextval('eval_process_executed_detail_ped_id_seq'::regclass), 1, %s, %s, true, 'admin', '06-08-2024')
                """
                cursor.execute(query, (
                   
                    key,  # Usamos `key` como el `ped_process_question_id`
                    value,  # Usamos `value` como el `ped_answer_scale_id`
                    
                ))
          

        
        
          connection.commit()
          connection.close()

       except Exception as ex:
           print(ex)
           raise Exception(ex)


    def saveSumary(response):
        print(response)
        try:
            connection = conn_db()

            with connection.cursor() as cursor:
                # Nueva consulta SQL
                query = """
                    INSERT INTO eval_process_executed_resume
                    (per_id, 
                     per_process_user_asigment_id,
                     per_dimension_id, 
                     per_number_total_question, 
                     per_max_total_value_question,
                     per_real_value_question, 
                     per_average_value_question, 
                     per_traffic_lights_id, 
                     per_state, 
                     user_created, 
                     date_created)
                    VALUES (
                        nextval('eval_process_executed_resume_per_id_seq'::regclass), 
                        %s, 
                        %s, 
                        %s, 
                        %s, 
                        %s, 
                        %s, 
                        %s, 
                        %s, 
                        %s, 
                        %s
                    )
                """
                
                # Parámetros de la consulta
                params = (
                    response.get('process_user_assignment_id'), 
                    response.get('dimension_id'), 
                    response.get('number_total_question'), 
                    response.get('max_total_value_question'), 
                    response.get('real_value_question'), 
                    response.get('average_value_question'), 
                    response.get('traffic_lights_id'), 
                    response.get('state'), 
                    response.get('user_created'), 
                    response.get('date_created')
                )

                cursor.execute(query, params)

            connection.commit()
            connection.close()

        except Exception as ex:
            print(ex)
            raise Exception(ex)
        
        
        
        
    def enrollment(data):
        
        roleId = data.get('roleId')
        userId = data.get('userId')
        courseId = data.get('courseId')
        
        try:
            url = "https://5.161.135.79/aula-virtual/webservice/rest/server.php"
            params = {
                "wstoken": "ab61ed3cbc76ae6bae91c51bf55c18de",
                "wsfunction": "core_course_get_courses",
                "moodlewsrestformat": "json",
                "enrolments[0][roleid]": roleId,
                "enrolments[0][userid]": userId,
                "enrolments[0][courseid]": courseId
            }
            
            
            response = requests.get(url, params=params, verify=False)

            
           
            if response.status_code == 200:
                
               
               return json.dumps({'message': 'Enrollment success'}), 201
               
                
            
            
            else:
                return json.dumps({'error': 'Error in enrollment'}), 500

                
      
        except Exception as ex:
            print(ex)
            raise Exception(ex)