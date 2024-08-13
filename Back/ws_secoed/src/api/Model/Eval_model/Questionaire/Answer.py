class Answer:
    def __init__(self, ped_id, ped_process_user_asigment_id, ped_process_question_id, ped_answer_scale_id, ped_state, user_created, date_created, user_modified=None, date_modified=None, user_deleted=None, date_deleted=None):
        self.ped_id = ped_id
        self.ped_process_user_asigment_id = ped_process_user_asigment_id
        self.ped_process_question_id = ped_process_question_id
        self.ped_answer_scale_id = ped_answer_scale_id
        self.ped_state = ped_state
        self.user_created = user_created
        self.date_created = date_created
        self.user_modified = user_modified
        self.date_modified = date_modified
        self.user_deleted = user_deleted
        self.date_deleted = date_deleted

    def to_JSON(self):
        return {
            'ped_id': self.ped_id,
            'ped_process_user_asigment_id': self.ped_process_user_asigment_id,
            'ped_process_question_id': self.ped_process_question_id,
            'ped_answer_scale_id': self.ped_answer_scale_id,
            'ped_state': self.ped_state,
            'user_created': self.user_created,
            'date_created': self.date_created,
            'user_modified': self.user_modified,
            'date_modified': self.date_modified,
            'user_deleted': self.user_deleted,
            'date_deleted': self.date_deleted
        }

