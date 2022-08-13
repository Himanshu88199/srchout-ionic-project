import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, ellipse, informationCircle, logoGoogle, map, personCircle, square, triangle } from "ionicons/icons";
import { Redirect, Route } from 'react-router-dom';
import MyEvent from './events/MyEvent';
import Setting from './settings/Setting';
import Createuser from './user/Createuser';

import './Tabs.css';
import Header from './Header';

const Tabs: React.FC = () => {
    return (
        <>
            <IonReactRouter>

                <IonTabs>
                    <IonRouterOutlet >
                        <Route exact path="/home">

                        </Route>
                        <Route exact path="/event">
                            <MyEvent />
                        </Route>
                        <Route path="/task">
                            <Setting />
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
                        <IonTabButton tab="tab2" href="/event">
                            <IonIcon src='../assets/events.svg' />
                            <IonLabel className='c-fff'>Events</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/task">
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