import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import LoginIcons from '../user/loginIcons';
import './ChangePassword.css';

const ChangePassword: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CHANGE PASSWORD
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='center'>
                            <img src="../assets/profile.svg" alt="" />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol >
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="Security Code"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol >
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="New Password"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol >
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="Confirm Password"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='m-auto mt-43' size='11'>
                            <IonButton className='sign-btn' size='default' expand="block">Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default ChangePassword;
