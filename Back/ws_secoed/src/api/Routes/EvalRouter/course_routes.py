from flask import Blueprint, jsonify
from src.api.Model.Eval_model.Courses.CourseModel import CourseModel
from src.utils.middleware.require_api_key import require_api_key

course = Blueprint('course', __name__)

@course.route('/')
@require_api_key
def get_courses():
    #return jsonify({'message': 'Docente'})

    try:
        courses_list = CourseModel.get_courses()
        #return courses_list 
        return jsonify([course.to_JSON() for course in courses_list])  
     
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500
    
    
@course.route('/moodle')
def get_courses_moodle():
    #return jsonify({'message': 'Docente'})

    try:
        courses_list = CourseModel.get_courses_moodle()
        return courses_list 
        #return jsonify([course.to_JSON() for course in courses_list])  
     
    except Exception as ex:
        print(ex)
        return jsonify({'error': str(ex)}), 500
