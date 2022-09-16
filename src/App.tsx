import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Createuser from "./pages/user/Createuser";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
// import Login from "./pages/user/Login";
import Tabs from "./pages/Tabs";
// import Setting from "./pages/settings/Setting";
import ChangePassword from "./pages/settings/ChangePassword";
import MyEvent from "./pages/events/MyEvent";
import ContactUs from "./pages/settings/ContactUs";
import MyProfile from "./pages/settings/MyProfile";
import Notifications from "./pages/Notifications";
import CreatePersonalTask from "./pages/task/CreatePersonalTask";
import CreateEventTask from "./pages/task/CreateEventTask";
import CreateEvent from "./pages/events/CreateEvent";
import InviteAttendees from "./pages/events/InviteAttendees";
import EventDetails from "./pages/events/EventDetails";
import Assignedtasks from "./pages/task/Assignedtasks";
import Mytask from "./pages/task/Mytask";
import InvitedEvents from "./pages/events/InvitedEvents";
import Login from "./pages/user/Login";
import Events from "./pages/events/Events";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* <Route exact path="/Home">
          <Home />
        </Route> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createuser" component={Createuser} />
        <Route exact path="/events" component={MyEvent} />
        <Route exact path="/eventdetails" component={EventDetails} />
        <Route
          exact
          path="/createpersonaltask"
          component={CreatePersonalTask}
        />
        <Route exact path="/invitedevents" component={InvitedEvents} />
        <Route exact path="/createeventtask" component={CreateEventTask} />
        <Route exact path="/createevent" component={CreateEvent} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/myprofile" component={MyProfile} />
        <Route exact path="/inviteattendees" component={InviteAttendees} />
        <Route exact path="/changepassword" component={ChangePassword} />
        <Route exact path="/mytask" component={Mytask} />
        <Route exact path="/myevents" component={Events} />
        <Route exact path="/assignedtasks" component={Assignedtasks} />
        {/* <Route exact path="/setting" component={Setting} /> */}
        <Route exact path="/app" component={Tabs} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
