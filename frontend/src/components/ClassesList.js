import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClasses } from '../actions/classes';
import FacebookCircularProgress from './FacebookCircularProgress';
import LoadingPage from './LoadingPage';
import useSWR from 'swr';
import ClassesListItem from './ClassesListItem';
import Header from './Header';

const ClassesList = ({ classes, getClasses }) => {
  useSWR('/classes', () => {
    console.log('hi swr classes');
    getClasses();
  });
  return (
    <div>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        Classes
        <Link to={'/add/class'}>Create Class</Link>
        {classes.map((_class) => (
          <ClassesListItem key={_class._id} _class={_class} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  classes: state.classes,
});

export default connect(mapStateToProps, { getClasses })(ClassesList);
