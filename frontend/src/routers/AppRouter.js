import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../components/Dashboard';
import ChangePassword from '../components/ChangePassword';
import ForgotPassword from '../components/ForgotPassword';
import ClassesList from '../components/ClassesList';
import Users from '../components/users/Users';
import StudentsList from '../components/users/StudentsList';
import TeachersList from '../components/users/TeachersList';
import AdminsList from '../components/users/AdminsList';
import AddRoom from '../components/AddRoom';
import EditRoom from '../components/EditRoom';
import AddClass from '../components/AddClass';
import EditClass from '../components/EditClass';
import AddUsers from '../components/users/AddUsers';
import EditStudents from '../components/users/EditStudents';
import EditTeachers from '../components/users/EditTeachers';
import EditAdmins from '../components/users/EditAdmins';
import ClassUsers from '../components/classes/ClassUsers';
import RoomTimings from '../components/rooms/RoomTimings';
import RoomDayTimes from '../components/rooms/RoomDayTimes';
import AddTiming from '../components/rooms/AddTiming';
import EditTiming from '../components/rooms/EditTiming';
import Landing from '../components/Landing';
import Profile from '../components/Profile';
const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' component={Landing} exact={true} />
        <Route path='/login' component={Landing} exact={true} />
        <Route path='/forgotpassword' component={ForgotPassword} exact={true} />
        <PrivateRoute path='/dashboard' component={Dashboard} exact={true} />
        <PrivateRoute path='/profile' component={Profile} exact={true} />

        <PrivateRoute
          path='/changepassword'
          component={ChangePassword}
          exact={true}
        />
        <PrivateRoute path='/classes' component={ClassesList} exact={true} />
        <PrivateRoute path='/users' component={Users} exact={true} />
        <PrivateRoute
          path='/users/students'
          component={StudentsList}
          exact={true}
        />
        <PrivateRoute
          path='/users/teachers'
          component={TeachersList}
          exact={true}
        />
        <PrivateRoute
          path='/users/admins'
          component={AdminsList}
          exact={true}
        />
        <PrivateRoute path='/add/room' component={AddRoom} exact={true} />
        <PrivateRoute path='/edit/room/:id' component={EditRoom} exact={true} />
        <PrivateRoute path='/add/class' component={AddClass} exact={true} />
        <PrivateRoute
          path='/edit/class/:id'
          component={EditClass}
          exact={true}
        />
        <PrivateRoute path='/users/add/' component={AddUsers} exact={true} />
        <PrivateRoute
          path='/edit/students/:id'
          component={EditStudents}
          exact={true}
        />
        <PrivateRoute
          path='/edit/teachers/:id'
          component={EditTeachers}
          exact={true}
        />
        <PrivateRoute
          path='/edit/admins/:id'
          component={EditAdmins}
          exact={true}
        />
        <PrivateRoute
          path='/class/:id/users'
          component={ClassUsers}
          exact={true}
        />
        <PrivateRoute
          path='/room/:id/timings'
          component={RoomTimings}
          exact={true}
        />
        <PrivateRoute
          path='/room/:id/timings/:day'
          component={RoomDayTimes}
          exact={true}
        />
        <PrivateRoute
          path='/add/room/:roomId/:day/timings'
          component={AddTiming}
          exact={true}
        />

        <PrivateRoute
          path='/edit/room/:roomId/:day/timings/:id'
          component={EditTiming}
          exact={true}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
