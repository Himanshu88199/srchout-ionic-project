import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import Header from '../Header';
import Setting from '../settings/Setting';
import EventsPage from './EventsPage';
import './MyEvent.css';

const MyEvent: React.FC = () => {
    return (
        <>
<IonPage>
    <Header />
    <IonContent>
<EventsPage />

            <IonCol className='pd-0 ' size='12' >
                <IonLabel className='dark-text'> Event:</IonLabel>
                <IonText>World cup soccer finals</IonText>
            </IonCol>
            <IonCol className='pd-0 ' size='12' >
                <IonLabel className='dark-text'>Location:</IonLabel>
                <IonText>Babu's House</IonText>
            </IonCol>
            <IonCol className='pd-0 ' size='12' >
                <IonLabel className='dark-text'> Date: </IonLabel>
                <IonText>Aug 20, 2022</IonText>
            </IonCol>
            <IonCol className='pd-0 ' size='12' >
                <IonLabel className='dark-text'> Time:</IonLabel>
                <IonText>3:00PM</IonText>
            </IonCol>
    </IonContent>
</IonPage>

        </>
    );
};

export default MyEvent;
