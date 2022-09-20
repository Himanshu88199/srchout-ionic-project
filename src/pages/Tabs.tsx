import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import { calendar, ellipse, informationCircle, logoGoogle, map, personCircle, square, triangle } from "ionicons/icons";
import { Redirect, Route } from 'react-router-dom';
import MyEvent from './events/MyEvent';
import Home from './Home';
import { HomeTab } from './HomeTab';
import Setting from './settings/Setting';
// import Createuser from './user/Createuser';

import './Tabs.css';
// import Header from './Header';
// import EventsPage from './events/EventsPage';
import Mytask from './task/Mytask';

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet ionPage>
                <Route exact path="/my/home">
                    {/* <Home isFromHome={true} /> */}
                    <HomeTab />
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