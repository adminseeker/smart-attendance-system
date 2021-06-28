import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FacebookCircularProgress from '../FacebookCircularProgress';
import LoadingPage from '../LoadingPage';
import useSWR from 'swr';
import TeachersListItem from './TeachersListItem';
import Header from '../Header';

const TeachersList = ({ teachers }) => {
  return !teachers ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        teachers
        {teachers.map((teacher) => (
          <TeachersListItem key={teacher._id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  teachers: state.users.teachers,
});

export default connect(mapStateToProps)(TeachersList);
