import { Preferences } from '@capacitor/preferences';
import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../Header';
import './Setting.css';

const Setting: React.FC = () => {
    const history = useHistory();
    const [success, setSuccess] = useState(false);

    const handleLogout = async () => {
        await Preferences.remove({ key: 'token' });
        history.push("/");
    }
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
                        <IonCol className='pl-2 setting-text' size='10' onClick={() => history.push('/my/profile')}>
                            My Profile
                        </IonCol>
                    </IonRow>
               
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='5'>
                            Subscription
                        </IonCol>
                        <IonCol class='text-right pr-2 setting-text' size='5'>
                            Free
                        </IonCol>
                    </IonRow>

                    <IonRow className='mt-50'>
                        <IonCol className='pl-2 setting-text' size='10'>
                            <span onClick={() => history.push('/my/changepassword')} className='text-dec' >Change Password</span>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='10'>
                            <a href="" className='text-dec' >Help</a>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='10'>
                            <a href="" className='text-dec' >Tell your friends</a>
                        </IonCol>
                    </IonRow>
                    <IonRow className='mt-50'>
                        <IonCol className='pl-2 setting-text' size='10'>
                            <a href="" className='text-dec' >Privacy Policy</a>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='pl-2 setting-text' size='10'>
                            <a href="" className='text-dec' >Terms and Conditions</a>
                        </IonCol>
                    </IonRow>

                    <IonRow  className='mt-50'>
                        <IonCol className='pl-2 setting-text' size='10'>
                            <span onClick={() => history.push('/my/contactus')} className='text-dec' >Contact Us</span>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='ad'>
                            Advertisements
                        </IonCol>
                    </IonRow>
                    <IonRow >
                    <IonCol className='pl-2 setting-text' size='10'>
                    <a href="" className='text-dec save-btn' onClick={() => handleLogout()} >Sign out</a>
                    </IonCol>
                    </IonRow>
                    <IonToast
                        isOpen={success}
                        onDidDismiss={() => {
                            setSuccess(false);
                            history.goBack();
                        }}
                        message="Successfully Logged out"
                        duration={200}
                        color="dark"
                    />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Setting;
