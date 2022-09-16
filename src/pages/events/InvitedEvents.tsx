import { IonCol, IonContent, IonPage, IonRow } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
// import { Route, Redirect } from 'react-router';
import Header from '../Header';
// import Setting from '../settings/Setting';
import './InvitedEvents.css';

const InvitedEvents: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent className='border-radius'>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            Invited EVENTS
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>

                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>

        </>
    );
};

export default InvitedEvents;
