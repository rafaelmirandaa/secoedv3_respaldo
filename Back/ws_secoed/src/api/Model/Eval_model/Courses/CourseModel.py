from src.utils.database.connection_db import conn_db
from flask import  jsonify
from src.api.Model.Eval_model.Courses.Course  import Course
import requests
import xmltodict
import json

class CourseModel:

    @classmethod    
    def get_courses_moodle(cls):
        courses_list = []
        try:
            url = "https://5.161.135.79/aula-virtual/webservice/rest/server.php"
            params = {
                "wstoken": "ab61ed3cbc76ae6bae91c51bf55c18de",
                "wsfunction": "core_course_get_courses",
                "moodlewsrestformat": "json"
            }
            #response = requests.get(url, params=params)
            response = requests.get(url, params=params, verify=False)

            
            if response.status_code == 200:
                
                return response.json()
                
            
            
            else:
                print(f"Failed to get courses. Status code: {response.status_code}")
      
        except Exception as ex:
            print(ex)
            raise Exception(ex)
        
    # This method saves the courses in the database
    def save_courses(self):
        try:
            courses_list = self.get_courses_moodle()
            connection = conn_db()
            
            with connection.cursor() as course:
                for course in courses_list['RESPONSE']['VALUE']:
                    course.execute('INSERT INTO pt_curso (id_moodle, nombre_corto, categoria, imagen, fecha_inicio, fecha_creacion) VALUES (%s, %s, %s, %s, %s, %s)', (course['id'], course['shortname'], course['category'], course['image'], course['startdate'], course['timecreated']))
            
            connection.commit()
            connection.close()
            
            return jsonify({'message': 'Courses saved successfully'}), 201
        
        except Exception as ex:
            print(ex)
            raise Exception(ex)    
    
    def get_courses():
        try:
            connection = conn_db()
            courses_list = []

            with connection.cursor() as cursor:
                cursor.execute('select *from mood_courses')
                resp = cursor.fetchall()

                for row in resp:
                    courses = Course(
                        moc_id=row['moc_id'],
                        moc_course_name=row['moc_course_name'],
                        moc_course_shortname=row['moc_course_shortname'],
                        moc_course_description=row['moc_course_description'],
                        moc_course_origin_moodle_id=row['moc_course_origin_moodle_id'],
                        moc_course_origin_categorie_id=row['moc_course_origin_categorie_id'],
                        moc_course_dimension_id=row['moc_course_dimension_id'],
                        moc_course_career_period_id=row['moc_course_career_period_id'],
                        moc_course_date_start=row['moc_course_date_start'],
                        moc_course_data_end=row['moc_course_data_end'],
                        moc_course_is_closed=row['moc_course_is_closed'],
                        moc_course_user_asesor_id=row['moc_course_user_asesor_id'],
                        moc_course_state=row['moc_course_state'],
                        user_created=row['user_created'],
                        date_created=row['date_created'],
                        user_modified=row['user_modified'],
                        date_modified=row['date_modified'],
                        user_deleted=row['user_deleted'],
                        date_deleted=row['date_deleted']
                    )
                    courses_list.append(courses)
            
            
            connection.close()

            return courses_list

        except Exception as ex:
            print(ex)
            raise Exception(ex)


   
