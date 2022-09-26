import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './MyProfile.css';
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css";

const MyProfile: React.FC = () => {

    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow className='con'>
                        <IonCol className='center text-grey myprofile'>
                            MY PROFILE
                        </IonCol>
                        <IonCol className='edit'>
                            <img src="../assets/edit.svg" alt="" />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='center'>
                            <img src="../assets/profile.svg" alt="" />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='camera'>
                            <img src="../assets/camera.png" alt="" width={25} />
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
                            {/* <IonIcon slot='start' src='../assets/email.svg'></IonIcon>
                                <IonInput value={''} placeholder="Phone Number"></IonInput> */}

                            <PhoneInput country={"us"}
                                onChange={phone => console.log({ phone })}
                                containerStyle={{ margin: '5px', marginLeft: '1.2rem', border: '1px solid #707070', borderRadius: '9px', width: '87vw', height: '45px' }}
                                inputStyle={{ width: '86vw', height: '42px', border: 'none', borderRadius: '9px' }}
                                dropdownStyle={{ height: '200px' }}
                                buttonStyle={{ height: '30px', margin: '7px', borderRadius: '9px' }}
                            />

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
