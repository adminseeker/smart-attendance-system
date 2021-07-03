import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import FacebookCircularProgress from './FacebookCircularProgress';
import RoomsList from './RoomsList';

const AdminDashboard = ({ loading }) => {
  return loading ? (
    <FacebookCircularProgress />
  ) : (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <RoomsList />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(AdminDashboard);
