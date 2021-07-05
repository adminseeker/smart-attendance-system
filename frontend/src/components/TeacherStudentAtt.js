import React from 'react';
import ClassesList from './ClassesList';
import { connect } from 'react-redux';
import useSWR from 'swr';
import { getClassAttendanceTeacher } from '../actions/attendance';
const TeacherStudentAtt = ({
  match,
  getClassAttendanceTeacher,
  teacherClassAttendance,
}) => {
  useSWR('/attendance', () => {
    getClassAttendanceTeacher(match.params.id);
  });
  return (
    <ClassesList
      NoAddOption={true}
      $classes={teacherClassAttendance.classes}
      attendance={teacherClassAttendance.attendance}
    />
  );
};

const mapStateToProps = (state) => ({
  teacherClassAttendance: state.attendance,
});

export default connect(mapStateToProps, { getClassAttendanceTeacher })(
  TeacherStudentAtt
);
