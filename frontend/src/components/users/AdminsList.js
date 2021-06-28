import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FacebookCircularProgress from '../FacebookCircularProgress';
import LoadingPage from '../LoadingPage';
import useSWR from 'swr';
import AdminsListItem from './AdminsListItem';
import Header from '../Header';

const AdminsList = ({ admins }) => {
  return !admins ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        Admins
        {admins.map((admin) => (
          <AdminsListItem key={admin._id} admin={admin} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  admins: state.users.admins,
});

export default connect(mapStateToProps)(AdminsList);
