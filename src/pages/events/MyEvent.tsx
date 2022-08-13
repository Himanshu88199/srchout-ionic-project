import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './MyEvent.css';

const MyEvent: React.FC = () => {
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            EVENTS
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>

        </>
    );
};

export default MyEvent;
