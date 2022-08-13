import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './CreateEvent.css';

const CreateEvent: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CREATE EVENT
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
                            Event Description:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonTextarea rows={6} className='input-border-2'></IonTextarea>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='6' className='text-grey2 pb-0 ml-10'>
                            <IonLabel> Event Date:</IonLabel>
                            <IonInput className='input-border2'></IonInput>
                        </IonCol>
                        <IonCol size='5' className='text-grey2 pb-0 '>
                            <IonLabel>Event Time:</IonLabel>
                            <IonInput className='input-border2'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Event Location:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='m-auto mt-34' size='11'>
                            <IonButton className='sign-btn' size='default' expand="block">Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default CreateEvent;
