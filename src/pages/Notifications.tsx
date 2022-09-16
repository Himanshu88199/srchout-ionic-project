import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from './Header';
import './Notifications.css';

const Notifications: React.FC = () => {
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
                    <IonList>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                        <IonItem className='notification-text'>
                            <IonCol size='12'>
                            <IonLabel>Babu assigned a task to you</IonLabel>
                            <span className='line-height'>July 18,2022</span>
                            </IonCol>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Notifications;
