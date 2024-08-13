class Sumary:
    def __init__(self, per_id, per_process_user_asigment_id, per_dimension_id, per_number_total_question, per_max_total_value_question, per_real_value_question, per_average_value_question, per_traffic_lights_id, per_state, user_created, date_created, user_modified=None, date_modified=None, user_deleted=None, date_deleted=None,per_names=None):
        self.per_id = per_id
        self.per_process_user_asigment_id = per_process_user_asigment_id
        self.per_dimension_id = per_dimension_id
        self.per_number_total_question = per_number_total_question
        self.per_max_total_value_question = per_max_total_value_question
        self.per_real_value_question = per_real_value_question
        self.per_average_value_question = per_average_value_question
        self.per_traffic_lights_id = per_traffic_lights_id
        self.per_state = per_state
        self.user_created = user_created
        self.date_created = date_created
        self.user_modified = user_modified
        self.date_modified = date_modified
        self.user_deleted = user_deleted
        self.date_deleted = date_deleted
        self.per_names = per_names

    def to_JSON(self):
        return {
            'per_id': self.per_id,
            'per_process_user_asigment_id': self.per_process_user_asigment_id,
            'per_dimension_id': self.per_dimension_id,
            'per_number_total_question': self.per_number_total_question,
            'per_max_total_value_question': self.per_max_total_value_question,
            'per_real_value_question': self.per_real_value_question,
            'per_average_value_question': self.per_average_value_question,
            'per_traffic_lights_id': self.per_traffic_lights_id,
            'per_state': self.per_state,
            'user_created': self.user_created,
            'date_created': self.date_created,
            'user_modified': self.user_modified,
            'date_modified': self.date_modified,
            'user_deleted': self.user_deleted,
            'date_deleted': self.date_deleted,
            'per_names': self.per_names
        }
