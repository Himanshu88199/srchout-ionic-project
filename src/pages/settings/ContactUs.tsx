import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './ContactUs.css';

const ContactUs: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CONTACT US
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10 mt-43'>
                            Name
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border pd'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Email Address
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border pd'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Comments/Suggestions
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonTextarea rows={6} className='input-border-2'></IonTextarea>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='m-auto mt-32' size='11'>
                            <IonButton className='sign-btn' size='default' expand="block">Send</IonButton>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default ContactUs;
