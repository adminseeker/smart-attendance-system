import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory"
import Landing from "../components/Landing";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import AddVehicles from "../components/AddVehicles";
import EditVehicle from "../components/EditVehicle";
import JourneyDashboard from "../components/JourneyDashboard";
import AddJourneys from "../components/AddJourneys";
import EditJourney from "../components/EditJourney";
import PassengersDashboard from "../components/PassengersDashboard";
import ViewPassengerDetails from "../components/ViewPassengerDetails";
import UserJourneyDetails from "../components/UserJourneyDetails";
import Tracking from "../components/Tracking";

import MyAccount from "../components/MyAccount";
import ChangePassword from "../components/ChangePassword";
import ForgotPassword from "../components/ForgotPassword";
import ClassesList from "../components/ClassesList";
import Users from "../components/users/Users";
import StudentsList from "../components/users/StudentsList";
import TeachersList from "../components/users/TeachersList";
import AdminsList from "../components/users/AdminsList";
import AddRoom from "../components/AddRoom";
import EditRoom from "../components/EditRoom";
import AddClass from "../components/AddClass";
import EditClass from "../components/EditClass";
import AddUsers from "../components/users/AddUsers";
import EditStudents from "../components/users/EditStudents";
import EditTeachers from "../components/users/EditTeachers";
import EditAdmins from "../components/users/EditAdmins";

const history = createHistory();


const AppRouter = ()=>{
    return(
        <Router history={history}>
            <Switch>
                <Route path="/" component={Login} exact={true}/>
                <Route path="/login" component={Login} exact={true} />
                <Route path="/forgotpassword" component={ForgotPassword} exact={true}/>
                <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
                <PrivateRoute path="/account" component={MyAccount} exact={true}/>
                <PrivateRoute path="/changepassword" component={ChangePassword} exact={true}/>
                <PrivateRoute path="/classes" component={ClassesList} exact={true}/>
                <PrivateRoute path="/users" component={Users} exact={true}/>
                <PrivateRoute path="/users/students" component={StudentsList} exact={true}/>
                <PrivateRoute path="/users/teachers" component={TeachersList} exact={true}/>
                <PrivateRoute path="/users/admins" component={AdminsList} exact={true}/>
                <PrivateRoute path="/add/room" component={AddRoom} exact={true}/>
                <PrivateRoute path="/edit/room/:id" component={EditRoom} exact={true}/>
                <PrivateRoute path="/add/class" component={AddClass} exact={true}/>
                <PrivateRoute path="/edit/class/:id" component={EditClass} exact={true}/>
                <PrivateRoute path="/users/add/" component={AddUsers} exact={true}/>
                <PrivateRoute path="/edit/students/:id" component={EditStudents} exact={true}/>
                <PrivateRoute path="/edit/teachers/:id" component={EditTeachers} exact={true}/>
                <PrivateRoute path="/edit/admins/:id" component={EditAdmins} exact={true}/>

                <PrivateRoute path="/vehicles/add" component={AddVehicles} exact={true}/>
                <PrivateRoute path="/vehicles/edit/:id" component={EditVehicle} exact={true}/>
                <PrivateRoute path="/vehicles/:id/journeys/" component={JourneyDashboard} exact={true}/>
                <PrivateRoute path="/vehicles/:id/journeys/add" component={AddJourneys} exact={true}/>
                <PrivateRoute path="/journeys/edit/:id" component={EditJourney} exact={true}/>
                <PrivateRoute path="/vehicles/:id1/journeys/:id2/passengers" component={PassengersDashboard} exact={true}/>
                <PrivateRoute path="/vehicles/:id1/journeys/:id2/passengers/:id3" component={ViewPassengerDetails} exact={true}/>
                <PrivateRoute path="/journey/:id" component={UserJourneyDetails} exact={true}/>
                <PrivateRoute path="/vehicles/track/:id" component={Tracking} exact={true}/>
            </Switch>
        </Router>
    )
}

export default AppRouter;
