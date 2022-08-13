import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <>
            <IonRow>
                <IonCol size='12'>
                    <IonItem className='bg-custom'>
                        <IonButton className='pl-0' slot='start' size='default' fill='clear'>
                        <IonIcon className='size' src='../assets/back.svg' />
                        </IonButton>
                        <IonButton className='pr-0' slot='end' size='default' fill='clear'>
                        <IonIcon className='size' src='../assets/bell.svg' />
                        </IonButton>
                    </IonItem>
                </IonCol>
                <IonCol className='white-head'></IonCol>
            </IonRow>
        </>
    );
};

export default Header;
