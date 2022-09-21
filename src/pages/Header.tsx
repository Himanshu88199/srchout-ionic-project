import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import './Header.css';

const Header: React.FC = () => {
    const history = useHistory();
    return (
        <>
            <IonRow>
                <IonCol size='12'>
                    <IonItem className='bg-custom'>
                        <IonButton className='pl-0' slot='start' size='default' fill='clear' onClick={() => history.goBack()} >
                            <IonIcon className='size' src='../assets/back.svg' />
                        </IonButton>
                        <IonButton className='pr-0' slot='end' size='default' fill='clear' routerLink='/my/notifications'>
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
