import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FacebookCircularProgress from '../FacebookCircularProgress';
import LoadingPage from '../LoadingPage';
import useSWR from 'swr';
import StudentsListItem from './StudentsListItem';
import Header from '../Header';

const StudentsList = ({ students }) => {
  return !students ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        Students
        {students.map((student) => (
          <StudentsListItem key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  students: state.users.students,
});

export default connect(mapStateToProps)(StudentsList);
