import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <>
            <IonRow>
                <IonCol size='12'>
                    <IonItem className='bg-custom'>
                        <IonIcon slot='start' src='../assets/back.svg' />
                        <IonIcon slot='end' src='../assets/bell.svg' />
                    </IonItem>
                </IonCol>
                <IonCol className='white-head'></IonCol>
            </IonRow>
        </>
    );
};

export default Header;
