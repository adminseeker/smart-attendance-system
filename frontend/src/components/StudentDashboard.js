import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage';
import { Link } from 'react-router-dom';
import Header from './Header';
import FacebookCircularProgress from './FacebookCircularProgress';

const StudentDashboard = ({ user, loading }) => {
  return loading ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <div>Student Dashboard</div>{' '}
      </div>{' '}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(StudentDashboard);
