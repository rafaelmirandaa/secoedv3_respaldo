import requests


class EnrollmentModel:
    def enroll_user(moodle_user_id, course_id):
        try:
            url = "http://localhost:8080/webservice/rest/server.php"
            params = {
                "wstoken": "b5a4b5f5c6f7b8b9b0b1b2b3b4b5b6b7",
                "wsfunction": "enrol_manual_enrol_users",
                "moodlewsrestformat": "json",
                "courseid": course_id,
                "userid": moodle_user_id,
                "roleid": 5
            }
            response = requests.post(url, params)
            return response.json()
        except Exception as ex:
            print(ex)
            raise Exception(ex)