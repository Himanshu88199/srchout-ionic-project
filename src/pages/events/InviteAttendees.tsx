import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './InviteAttendees.css';

const InviteAttendees: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            INVITE ATTENDEES
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Event Name:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Invite Attendees:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonTextarea rows={10} className='input-border-2'></IonTextarea>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='m-auto mt-41' size='11'>
                            <IonButton className='sign-btn' size='default' expand="block">Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default InviteAttendees;
