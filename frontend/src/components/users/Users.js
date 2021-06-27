import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingPage from '../LoadingPage';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import FacebookCircularProgress from '../FacebookCircularProgress';
import Header from '../Header';
const Users = ({ getUsers, users }) => {
  useSWR('/users/students', () => {
    getUsers();
  });
  return !users ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        Users
        <Link to={'/users/students'}>Students</Link>
        <Link to={'/users/teachers'}>Teachers</Link>
        <Link to={'/users/admins'}>Admins</Link>
        <Link to={'/users/add'}>Add Users</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
