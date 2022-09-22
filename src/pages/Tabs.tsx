import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import CreateEvent from './events/CreateEvent';
import EventDetails from './events/EventDetails';
import MyEvent from './events/MyEvent';
import Notifications from './Notifications';
import Setting from './settings/Setting';
// import Createuser from './user/Createuser';

import './Tabs.css';
import CreateEventTask from './task/CreateEventTask';
import CreatePersonalTask from './task/CreatePersonalTask';
// import Header from './Header';
// import EventsPage from './events/EventsPage';
import Mytask from './task/Mytask';

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet ionPage>
                <Route exact path="/my/home">
                    <Dashboard />
                </Route>
                <Route exact path="/my/events">
                    <MyEvent />
                </Route>
                <Route path="/my/mytask">
                    <Mytask />
                </Route>
                <Route path="/my/setting">
                    <Setting />
                </Route>
                <Route path="/my/createevent">
                    <CreateEvent />
                </Route>
                <Route exact path="/my/eventdetails">
                    <EventDetails />
                </Route>
                <Route exact path="/my/createeventtask">
                    <CreateEventTask />
                </Route>
                <Route exact path="/my/createpersonaltask">
                    <CreatePersonalTask />
                </Route>
                <Route exact path="/my/notifications">
                    <Notifications />
                </Route>

                {/* <Route exact path="/app">
                    <Redirect to="/tab1" />
                </Route> */}
            </IonRouterOutlet>
            <IonTabBar className='dark-tabbar' slot="bottom">
                <IonTabButton tab="tab1" href="/my/home">
                    <IonIcon src='../assets/home.svg' />
                    <IonLabel className='c-fff'>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/my/events">
                    <IonIcon src='../assets/events.svg' />
                    <IonLabel className='c-fff'>Events</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/my/mytask">
                    <IonIcon src='../assets/task.svg' />
                    <IonLabel className='c-fff'>Task</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab4" href="/my/setting">
                    <IonIcon src='../assets/setting.svg' />
                    <IonLabel className='c-fff'>Settings</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;