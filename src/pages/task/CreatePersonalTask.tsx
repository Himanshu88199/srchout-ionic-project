import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../Header';
import './CreatePersonalTask.css';

const CreatePersonalTask: React.FC = () => {
    return (
        <>
             <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CREATE PERSONAL TASK
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Task Name:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Task Description:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonTextarea rows={6} className='input-border-2'></IonTextarea>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Task Due Date:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border'></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                            Category:
                        </IonCol>
                        <IonCol className='pd-0' size='12'>
                            <IonInput className='input-border'></IonInput>
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

export default CreatePersonalTask;
