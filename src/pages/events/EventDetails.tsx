import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../Header";
import "./EventDetails.css";

const EventDetails: React.FC = () => {
<<<<<<< HEAD
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            EVENT DETAILS
                        </IonCol>
                    </IonRow>
                    <IonRow className='bg-light-grey'>
                        <IonRow className='text-grey2  mt-11'>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Event :</IonLabel>
                                <IonText>World cup soccer finals</IonText>
                            </IonCol>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Location :</IonLabel>
                                <IonText>Babu's House</IonText>
                            </IonCol>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Date :</IonLabel>
                                <IonText>Aug 20, 2022</IonText>
                            </IonCol>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Time :</IonLabel>
                                <IonText>3:00PM</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className='text-grey2 mt-9'>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Total Invitees :</IonLabel>
                                <IonText>15</IonText>
                            </IonCol>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Accepted :</IonLabel>
                                <IonText>9</IonText>
                            </IonCol>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Declined :</IonLabel>
                                <IonText>2</IonText>
                            </IonCol>
                            <IonCol className='pd-0 ' size='12' >
                                <IonLabel className='dark-text'> Undecided :</IonLabel>
                                <IonText>4</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className='text-grey2 mt-8'>
                            <IonCol size='12' >
                                <IonLabel className='dark-text'> Invitees :</IonLabel>
                            </IonCol>
                            <IonRow>
                                <IonCol className='pd-0 pb-0' size='12'>Sankaran - Accepted Giri</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Giri V. - Accepted </IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Dev Patel - Declined</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Sarthak - Accepted</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Sudhanshu - Undecided</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>more...</IonCol>
                            </IonRow>
                        </IonRow>
                        <IonRow className='text-grey2 mt-16'>
                            <IonCol size='12' >
                                <IonLabel className='dark-text'> Tasks :</IonLabel>
                            </IonCol>
                            <IonRow>
                                <IonCol className='pd-0 pb-0' size='12'>Sankaran - Accepted Giri</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Giri V. - Accepted </IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Dev Patel - Declined</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Sarthak - Accepted</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>Sudhanshu - Undecided</IonCol>
                                <IonCol className='pd-0 pb-0' size='12'>more...</IonCol>
                            </IonRow>
                        </IonRow>
                        <IonRow className='btn-right'>
                            <IonCol className='p-0'>
                                <IonButton fill='clear' >
                                    <IonIcon className='icon-size' src='../assets/users.svg' />
                                </IonButton>
                                <IonButton fill='clear'>
                                    <IonIcon className='icon-size-2' src='../assets/tick.svg' />
                                </IonButton>
                                <IonButton fill='clear'>
                                    <IonIcon className='icon-size-2' src='../assets/edit.svg' />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
=======
  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol className="center text-grey">EVENT DETAILS</IonCol>
          </IonRow>
          <IonRow className="bg-light-grey">
            <IonRow className="text-grey2  mt-11">
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Event :</IonLabel>
                <IonText className="dark-text event-text">
                  World cup soccer finals
                </IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Location :</IonLabel>
                <IonText className="dark-text event-text">Babu's House</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Date :</IonLabel>
                <IonText className="dark-text event-text">Aug 20, 2022</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Time :</IonLabel>
                <IonText className="dark-text event-text">3:00PM</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-9">
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Total Invitees :</IonLabel>
                <IonText className="dark-text event-text">15</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Accepted :</IonLabel>
                <IonText className="dark-text event-text">9</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Declined :</IonLabel>
                <IonText className="dark-text event-text">2</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Undecided :</IonLabel>
                <IonText className="dark-text event-text">4</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-8">
              <IonCol size="12">
                <IonLabel className="dark-text"> Invitees :</IonLabel>
              </IonCol>
              <IonRow>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Sankaran - Accepted Giri
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Giri V. - Accepted{" "}
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Dev Patel - Declined
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Sarthak - Accepted
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Sudhanshu - Undecided
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  more...
                </IonCol>
              </IonRow>
            </IonRow>
            <IonRow className="text-grey2 mt-16">
              <IonCol size="12">
                <IonLabel className="dark-text"> Tasks :</IonLabel>
              </IonCol>
              <IonRow>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Sankaran - Accepted Giri
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Giri V. - Accepted{" "}
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Dev Patel - Declined
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Sarthak - Accepted
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  Sudhanshu - Undecided
                </IonCol>
                <IonCol className="pd-0 pb-0 dark-text invite-text" size="12">
                  more...
                </IonCol>
              </IonRow>
            </IonRow>
            <IonRow className="btn-right">
              <IonCol>
                <IonButton fill="clear">
                  <IonIcon className="icon-size" src="../assets/users.svg" />
                </IonButton>
                <IonButton fill="clear">
                  <IonIcon className="icon-size" src="../assets/tick.svg" />
                </IonButton>
                <IonButton fill="clear">
                  <IonIcon className="icon-size" src="../assets/edit.svg" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
>>>>>>> 0721e7287e8e01960e2efd85fb553f92d6f5305a
};

export default EventDetails;
