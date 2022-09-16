import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './Setting.css';

const Setting: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            SETTINGS
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                            Notification
                        </IonCol>
                        <IonCol class='text-right pr-2 setting-text' size='6'>
                            On/Off
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                            Notification
                        </IonCol>
                        <IonCol class='text-right pr-2 setting-text' size='6'>
                            On/Off
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                            Sound
                        </IonCol>
                        <IonCol class='text-right pr-2 setting-text' size='6'>
                            On/Off
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="/ChangePassword" className='text-dec' >Change Password</a> 
                        </IonCol>
                    </IonRow>
                    <IonRow className='mt-50'>
                        <IonCol className='pl-2 setting-text' size='6'>
                           Subscription 
                        </IonCol>
                        <IonCol class='text-right pr-2 setting-text' size='6'>
                            Free
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="" className='text-dec' >Help</a> 
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="" className='text-dec' >Tell your friends</a> 
                        </IonCol>
                    </IonRow>
                    <IonRow className='mt-50'>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="" className='text-dec' >Privacy Policy</a> 
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="" className='text-dec' >Terms and Conditions</a> 
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="" className='text-dec' >Delete my account</a> 
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='6'>
                           <a href="" className='text-dec' >Contact Us</a> 
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Setting;
