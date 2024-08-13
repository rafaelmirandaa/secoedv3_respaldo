class Course:
    def __init__(self, moc_id, moc_course_name=None, moc_course_shortname=None, moc_course_description=None, moc_course_origin_moodle_id=None, moc_course_origin_categorie_id=None, moc_course_dimension_id=None, moc_course_career_period_id=None, moc_course_date_start=None, moc_course_data_end=None, moc_course_is_closed=None, moc_course_user_asesor_id=None, moc_course_state=None, user_created=None, date_created=None, user_modified=None, date_modified=None, user_deleted=None, date_deleted=None):
        self.moc_id = moc_id
        self.moc_course_name = moc_course_name
        self.moc_course_shortname = moc_course_shortname
        self.moc_course_description = moc_course_description
        self.moc_course_origin_moodle_id = moc_course_origin_moodle_id
        self.moc_course_origin_categorie_id = moc_course_origin_categorie_id
        self.moc_course_dimension_id = moc_course_dimension_id
        self.moc_course_career_period_id = moc_course_career_period_id
        self.moc_course_date_start = moc_course_date_start
        self.moc_course_data_end = moc_course_data_end
        self.moc_course_is_closed = moc_course_is_closed
        self.moc_course_user_asesor_id = moc_course_user_asesor_id
        self.moc_course_state = moc_course_state
        self.user_created = user_created
        self.date_created = date_created
        self.user_modified = user_modified
        self.date_modified = date_modified
        self.user_deleted = user_deleted
        self.date_deleted = date_deleted

    def to_JSON(self):
        return {
            'moc_id': self.moc_id,
            'moc_course_name': self.moc_course_name,
            'moc_course_shortname': self.moc_course_shortname,
            'moc_course_description': self.moc_course_description,
            'moc_course_origin_moodle_id': self.moc_course_origin_moodle_id,
            'moc_course_origin_categorie_id': self.moc_course_origin_categorie_id,
            'moc_course_dimension_id': self.moc_course_dimension_id,
            'moc_course_career_period_id': self.moc_course_career_period_id,
            'moc_course_date_start': self.moc_course_date_start,
            'moc_course_data_end': self.moc_course_data_end,
            'moc_course_is_closed': self.moc_course_is_closed,
            'moc_course_user_asesor_id': self.moc_course_user_asesor_id,
            'moc_course_state': self.moc_course_state,
            'user_created': self.user_created,
            'date_created': self.date_created,
            'user_modified': self.user_modified,
            'date_modified': self.date_modified,
            'user_deleted': self.user_deleted,
            'date_deleted': self.date_deleted
        }
