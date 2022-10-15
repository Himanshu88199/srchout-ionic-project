import { IonButton, IonCol, IonIcon, IonItem, IonRow, useIonRouter } from '@ionic/react';
import { useHistory } from 'react-router';
import './Header.css';
import { App as IonicApp } from '@capacitor/app';

const Header: React.FC = () => {
    const history = useHistory();
    const ionRouter = useIonRouter();

    return (
        <>
            <IonRow>
                <IonCol size='12'>
                    <IonItem className='bg-custom header-height' lines='none'>
                        <IonButton className='pl-0' slot='start' size='default' fill='clear' onClick={() => {
                            if (!ionRouter.canGoBack()) {
                                IonicApp.exitApp();
                            } else {
                                history.goBack()
                            }
                        }} >
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
