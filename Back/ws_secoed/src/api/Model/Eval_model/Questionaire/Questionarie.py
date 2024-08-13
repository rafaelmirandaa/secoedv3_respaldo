class Questionarie:
    def __init__(self, epc_id, epc_process_career_period_id=None, epc_question_id=None, epc_state=None, qst_id=None, qst_description=None, qst_tooltip_text=None, qst_dimension_id=None, qst_answer_type_id=None, qst_state=None):
        self.epc_id = epc_id
        self.epc_process_career_period_id = epc_process_career_period_id
        self.epc_question_id = epc_question_id
        self.epc_state = epc_state
        self.qst_id = qst_id
        self.qst_description = qst_description
        self.qst_tooltip_text = qst_tooltip_text
        self.qst_dimension_id = qst_dimension_id
        self.qst_answer_type_id = qst_answer_type_id
        self.qst_state = qst_state

    def to_JSON(self):
        return {
            'epc_id': self.epc_id,
            'epc_process_career_period_id': self.epc_process_career_period_id,
            'epc_question_id': self.epc_question_id,
            'epc_state': self.epc_state,
            'qst_id': self.qst_id,
            'qst_description': self.qst_description,
            'qst_tooltip_text': self.qst_tooltip_text,
            'qst_dimension_id': self.qst_dimension_id,
            'qst_answer_type_id': self.qst_answer_type_id,
            'qst_state': self.qst_state
        }
