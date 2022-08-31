import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import TabBar from '../Tabs';
import './Createuser.css';
import LoginIcons from './loginIcons';

const Createuser: React.FC = () => {
    return (
        <>
            <IonPage >
                <IonContent>
                    <IonRow className='bg-fix'>
                        <IonCol size='12' className='bg-grey'></IonCol>
                        <IonCol size='12' className='white-head'></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CREATE YOUR ACCOUNT
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
                                <IonSelect>
                                    <IonSelectOption value="+1">+1</IonSelectOption>
                                    <IonSelectOption value="+91">+91</IonSelectOption>
                                    <IonSelectOption value="+92">+92</IonSelectOption>
                                    <IonSelectOption value="+11">+11</IonSelectOption>
                                </IonSelect>
                                {/* <IonIcon slot='start' src='../assets/email.svg'></IonIcon> */}
                                <IonInput value={''} placeholder="Phone Number"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="Email Address"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem className='input-border'>
                                <IonInput value={''} placeholder="Password"></IonInput>
                                <IonIcon slot='end' src='../assets/eye.svg'></IonIcon>
                            </IonItem>
                        </IonCol>
                        <IonCol className='m-auto mt-56' size='11'>
                            <IonButton className='sign-btn' size='default' expand="block">Sign In</IonButton>
                        </IonCol>
                        <IonCol size='11' className='remember-forgot'>
                            <div>
                                <input type="checkbox" name="remember" />
                                <label htmlFor="remember">&nbsp;&nbsp;I agree with Terms and Conditions</label>
                            </div>
                        </IonCol>
                        <IonCol size='12' className='sign-with'>
                            or Register with
                        </IonCol>
                    </IonRow>
                    <IonRow className='center'>
                        <LoginIcons />
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='center'>
                            <span className='light-text'>Already have an account?</span><a href='/'><span className='dark-text'>Sign In</span></a>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Createuser;
