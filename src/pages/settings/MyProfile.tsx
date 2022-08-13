import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './MyProfile.css';

const MyProfile: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            MY PROFILE
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='center'>
                            <img src="../assets/profile.svg" alt="" />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="First Name"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="Last Name"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem className='input-border'>
                                <IonIcon slot='start' src='../assets/email.svg'></IonIcon>
                                <IonInput value={''} placeholder="Phone Number"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="Email Address"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol className='m-auto mt-32' size='11'>
                            <IonButton className='sign-btn' size='default' expand="block">Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default MyProfile;
