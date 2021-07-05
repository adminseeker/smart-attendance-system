import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import StudentsList from './StudentsList';
import { cleanUserState } from '../../actions/users';
import TeacherList from './TeacherList';
import { getClassUsers } from '../../actions/classes';
import Header from '../Header';
import { Grid } from '@material-ui/core';
const ClassUsers = ({ id, getClassUsers, cleanUserState }) => {
  useEffect(() => {
    cleanUserState();
    getClassUsers(id);
  }, [getClassUsers, cleanUserState, id]);
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Typography
          component='h1'
          variant='h2'
          color='primary'
          style={{ textAlign: 'center' }}
        >
          Users
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <StudentsList class_id={id} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TeacherList class_id={id} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.id,
});

export default connect(mapStateToProps, { getClassUsers, cleanUserState })(
  ClassUsers
);
