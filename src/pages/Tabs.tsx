import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import { calendar, ellipse, informationCircle, logoGoogle, map, personCircle, square, triangle } from "ionicons/icons";
import { Redirect, Route } from 'react-router-dom';
import MyEvent from './events/MyEvent';
import Home from './Home';
import Setting from './settings/Setting';
// import Createuser from './user/Createuser';

import './Tabs.css';
// import Header from './Header';
// import EventsPage from './events/EventsPage';
import Mytask from './task/Mytask';

const Tabs: React.FC = () => {
    return (
        <>
            <IonReactRouter>

                <IonTabs>
                    <IonRouterOutlet >
                        <Route exact path="/tab1">
                            <Home />
                        </Route>
                        <Route exact path="/events">
                            <MyEvent />
                        </Route>
                        <Route path="/mytask">
                            <Mytask />
                        </Route>
                        <Route path="/setting">
                            <Setting />
                        </Route>
                        <Route exact path="/app">
                            <Redirect to="/tab1" />
                        </Route>

                    </IonRouterOutlet>

                    <IonTabBar className='dark-tabbar' slot="bottom">
                        <IonTabButton tab="tab1" href="/home">
                            <IonIcon src='../assets/home.svg' />
                            <IonLabel className='c-fff'>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/events">
                            <IonIcon src='../assets/events.svg' />
                            <IonLabel className='c-fff'>Events</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/mytask">
                            <IonIcon src='../assets/task.svg' />
                            <IonLabel className='c-fff'>Task</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab4" href="/setting">
                            <IonIcon src='../assets/setting.svg' />
                            <IonLabel className='c-fff'>Settings</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </>
    );
};

export default Tabs;